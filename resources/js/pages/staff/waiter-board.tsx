import { Head, router } from '@inertiajs/react';
import { CheckCheck, Clock3, ConciergeBell, Flame, HandPlatter, History, Package, Tags, Timer, UtensilsCrossed } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Screen = {
    id: number;
    name: string;
    pickup_location_id: number;
    pickup_location_name: string | null;
};

type OrderItem = {
    id: number;
    name: string | null;
    quantity: number;
};

type KitchenScreenProgress = {
    id: number;
    name: string | null;
    status: 'pending' | 'preparing' | 'prepared' | string;
};

type OrderRow = {
    id: number;
    customer_id: number | null;
    source_channel: 'web' | 'telegram' | 'table';
    pickup_location: string | null;
    table_name: string | null;
    customer_name: string | null;
    customer_phone: string | null;
    waiter_status: 'pending_confirmation' | 'confirmed' | 'served' | string;
    order_status: string;
    total_amount: number;
    created_at: string | null;
    waiter_confirmed_at: string | null;
    served_at: string | null;
    items: OrderItem[];
    kitchen_progress: {
        total: number;
        prepared: number;
    };
    kitchen_screens: KitchenScreenProgress[];
    is_ready_to_serve: boolean;
};

type Summary = {
    pending_confirmation: number;
    awaiting_kitchen: number;
    ready_to_serve: number;
    served: number;
};

type CustomerHistoryOrder = {
    id: number;
    source_channel: 'web' | 'telegram' | 'table' | string;
    waiter_status: string;
    order_status: string;
    table_name: string | null;
    total_amount: number;
    created_at: string | null;
    items: Array<{
        name: string;
        quantity: number;
    }>;
};

type CustomerFrequentItem = {
    name: string;
    quantity: number;
    orders_count: number;
};

type CustomerInsight = {
    behavior_tags: Record<string, unknown> | unknown[] | null;
    recent_orders: CustomerHistoryOrder[];
    frequent_items: CustomerFrequentItem[];
};

type BehaviorTagGroup = {
    key: string;
    title: string;
    note: string | null;
    description: string[];
    tags: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Waiter Board',
        href: '/staff/waiter-board',
    },
];

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

function sourceBadgeClass(source: string): string {
    if (source === 'telegram') {
        return 'bg-sky-100 text-sky-700';
    }

    if (source === 'table') {
        return 'bg-orange-100 text-orange-700';
    }

    return 'bg-zinc-100 text-zinc-700';
}

function kitchenStatusBadgeClass(status: string): string {
    if (status === 'prepared') {
        return 'bg-emerald-100 text-emerald-700';
    }

    if (status === 'preparing') {
        return 'bg-indigo-100 text-indigo-700';
    }

    return 'bg-amber-100 text-amber-700';
}

function waiterStatusBadgeClass(status: string): string {
    if (status === 'served') {
        return 'bg-emerald-100 text-emerald-700';
    }

    if (status === 'confirmed') {
        return 'bg-indigo-100 text-indigo-700';
    }

    return 'bg-amber-100 text-amber-700';
}

function prettyStatus(status: string): string {
    return status.replace(/_/g, ' ');
}

function formatDateTime(value: string | null): string {
    if (!value) {
        return 'Unknown time';
    }

    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
        return value;
    }

    return parsed.toLocaleString('en-ET', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
}

function normalizeGroupKey(value: string): string {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
}

function buildInitialTagSelection(
    input: CustomerInsight['behavior_tags'],
    catalog: BehaviorTagGroup[],
): Record<string, string[]> {
    const defaults = catalog.reduce<Record<string, string[]>>((accumulator, group) => {
        accumulator[group.key] = [];
        return accumulator;
    }, {});

    if (!input || typeof input !== 'object' || Array.isArray(input)) {
        return defaults;
    }

    const groupLookup = new Map<string, BehaviorTagGroup>(
        catalog.map((group) => [normalizeGroupKey(group.key), group]),
    );

    const nextSelection = { ...defaults };

    for (const [rawGroupKey, rawTags] of Object.entries(input)) {
        const matchedGroup = groupLookup.get(normalizeGroupKey(rawGroupKey));

        if (!matchedGroup) {
            continue;
        }

        const candidateTags = (Array.isArray(rawTags) ? rawTags : [rawTags])
            .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
            .filter((entry): entry is string => entry.length > 0);

        const validTags = matchedGroup.tags.filter((tag) => candidateTags.includes(tag));

        nextSelection[matchedGroup.key] = Array.from(new Set(validTags));
    }

    return nextSelection;
}

export default function WaiterBoard({
    screens,
    selectedScreenId,
    pendingConfirmationOrders,
    awaitingKitchenOrders,
    readyToServeOrders,
    servedOrders,
    customerInsights,
    behaviorTagCatalog,
    summary,
}: {
    screens: Screen[];
    selectedScreenId: number | null;
    pendingConfirmationOrders: OrderRow[];
    awaitingKitchenOrders: OrderRow[];
    readyToServeOrders: OrderRow[];
    servedOrders: OrderRow[];
    customerInsights: Record<string, CustomerInsight>;
    behaviorTagCatalog: BehaviorTagGroup[];
    summary: Summary;
}) {
    const [processingOrderId, setProcessingOrderId] = useState<number | null>(null);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [isTagEditorOpen, setIsTagEditorOpen] = useState(false);
    const [tagSelection, setTagSelection] = useState<Record<string, string[]>>({});
    const [isSavingTags, setIsSavingTags] = useState(false);
    const initializedTagOrderIdRef = useRef<number | null>(null);

    const allOrders = [...pendingConfirmationOrders, ...awaitingKitchenOrders, ...readyToServeOrders, ...servedOrders];
    const activeOrders = [...pendingConfirmationOrders, ...awaitingKitchenOrders, ...readyToServeOrders];
    const selectedOrder = selectedOrderId === null ? null : allOrders.find((order) => order.id === selectedOrderId) ?? null;

    const selectedCustomerInsight =
        selectedOrder?.customer_id !== null && selectedOrder?.customer_id !== undefined
            ? (customerInsights[String(selectedOrder.customer_id)] ?? null)
            : null;

    const currentOrdersForCustomer =
        selectedOrder?.customer_id !== null && selectedOrder?.customer_id !== undefined
            ? activeOrders.filter((order) => order.customer_id === selectedOrder.customer_id)
            : selectedOrder
              ? [selectedOrder]
              : [];

    const previousOrders = (selectedCustomerInsight?.recent_orders ?? [])
        .filter((historyOrder) => historyOrder.id !== selectedOrder?.id)
        .slice(0, 10);

    const savedTagSelection = buildInitialTagSelection(selectedCustomerInsight?.behavior_tags ?? null, behaviorTagCatalog);
    const savedBehaviorTagCards = behaviorTagCatalog
        .map((group) => ({
            key: group.key,
            title: group.title,
            tags: savedTagSelection[group.key] ?? [],
        }))
        .filter((group) => group.tags.length > 0);

    const canEditBehaviorTags = selectedOrder?.customer_id !== null && selectedOrder?.customer_id !== undefined;
    const selectedTagCount = behaviorTagCatalog.reduce(
        (total, group) => total + (tagSelection[group.key]?.length ?? 0),
        0,
    );

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ['pendingConfirmationOrders', 'awaitingKitchenOrders', 'readyToServeOrders', 'servedOrders', 'customerInsights', 'summary'],
            });
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedOrderId !== null && !selectedOrder) {
            setSelectedOrderId(null);
        }
    }, [selectedOrderId, selectedOrder]);

    useEffect(() => {
        if (selectedOrderId === null) {
            setTagSelection({});
            initializedTagOrderIdRef.current = null;
            return;
        }

        if (initializedTagOrderIdRef.current === selectedOrderId) {
            return;
        }

        setTagSelection(buildInitialTagSelection(selectedCustomerInsight?.behavior_tags ?? null, behaviorTagCatalog));
        initializedTagOrderIdRef.current = selectedOrderId;
    }, [selectedOrderId, selectedCustomerInsight, behaviorTagCatalog]);

    const selectScreen = (screenId: number) => {
        router.get(
            '/staff/waiter-board',
            { screen_id: screenId },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const confirmOrder = (orderId: number) => {
        setProcessingOrderId(orderId);

        router.patch(
            `/staff/waiter-board/orders/${orderId}/confirm`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setProcessingOrderId((current) => (current === orderId ? null : current)),
            },
        );
    };

    const serveOrder = (orderId: number) => {
        setProcessingOrderId(orderId);

        router.patch(
            `/staff/waiter-board/orders/${orderId}/serve`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setProcessingOrderId((current) => (current === orderId ? null : current)),
            },
        );
    };

    const openOrderDetails = (orderId: number) => {
        setSelectedOrderId(orderId);
    };

    const toggleBehaviorTag = (group: BehaviorTagGroup, tag: string) => {
        setTagSelection((current) => {
            const currentTags = current[group.key] ?? [];
            const alreadySelected = currentTags.includes(tag);

            const nextTags = alreadySelected
                ? currentTags.filter((existingTag) => existingTag !== tag)
                : [...currentTags, tag];

            return {
                ...current,
                [group.key]: group.tags.filter((allowedTag) => nextTags.includes(allowedTag)),
            };
        });
    };

    const saveBehaviorTags = () => {
        if (!selectedOrder || !canEditBehaviorTags) {
            return;
        }

        setIsSavingTags(true);

        router.patch(
            `/staff/waiter-board/orders/${selectedOrder.id}/customer-tags`,
            {
                tags: tagSelection,
            },
            {
                preserveScroll: true,
                preserveState: true,
                only: [
                    'pendingConfirmationOrders',
                    'awaitingKitchenOrders',
                    'readyToServeOrders',
                    'servedOrders',
                    'customerInsights',
                    'summary',
                ],
                onSuccess: () => {
                    setIsTagEditorOpen(false);
                },
                onFinish: () => setIsSavingTags(false),
            },
        );
    };

    const renderOrderCard = (
        order: OrderRow,
        action?: {
            label: string;
            onClick: (orderId: number) => void;
            className?: string;
        },
    ) => {
        return (
            <Card
                key={order.id}
                className="cursor-pointer border-none shadow-sm ring-1 ring-zinc-200 transition hover:shadow-md hover:ring-[#F57C00]/40"
                role="button"
                tabIndex={0}
                onClick={() => openOrderDetails(order.id)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openOrderDetails(order.id);
                    }
                }}
            >
                <CardContent className="space-y-4 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-black text-zinc-900">
                                #{order.id} {order.customer_name ?? 'Guest'}
                            </p>
                            <p className="text-xs font-medium text-zinc-500">
                                {order.customer_phone ?? 'No phone'}
                                {order.table_name ? ` • Table ${order.table_name}` : ''}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge className={sourceBadgeClass(order.source_channel)}>{order.source_channel}</Badge>
                            <Badge className="bg-zinc-100 text-zinc-700">{currency(order.total_amount)}</Badge>
                        </div>
                    </div>

                    <div className="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Items</p>
                        <p className="mt-1 text-sm font-medium text-zinc-700">
                            {order.items.map((item) => `${item.name ?? 'Item'} x${item.quantity}`).join(' • ')}
                        </p>
                        <p className="mt-2 text-[11px] font-bold text-[#F57C00]">Tap to view full order details</p>
                    </div>

                    {order.kitchen_progress.total > 0 ? (
                        <div className="space-y-2 rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                Kitchen Progress {order.kitchen_progress.prepared}/{order.kitchen_progress.total}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {order.kitchen_screens.map((screen) => (
                                    <Badge
                                        key={screen.id}
                                        className={kitchenStatusBadgeClass(screen.status)}
                                    >
                                        {screen.name ?? 'Kitchen'}: {screen.status}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                            No kitchen routing needed. Ready for serving.
                        </div>
                    )}

                    {action ? (
                        <Button
                            type="button"
                            className={`h-10 w-full rounded-xl font-black ${action.className ?? 'bg-[#F57C00] hover:bg-[#E65100]'}`}
                            disabled={processingOrderId === order.id}
                            onClick={(event) => {
                                event.stopPropagation();
                                action.onClick(order.id);
                            }}
                        >
                            {processingOrderId === order.id ? 'Processing...' : action.label}
                        </Button>
                    ) : null}
                </CardContent>
            </Card>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Waiter Board" />
            <div className="min-h-screen space-y-6 bg-zinc-50/60 p-6">
                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                            <ConciergeBell className="size-4 text-[#F57C00]" />
                            Waiter Screens
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        {screens.length === 0 ? (
                            <p className="text-sm font-medium text-zinc-500">
                                No waiter screen assigned to your account yet.
                            </p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {screens.map((screen) => (
                                    <Button
                                        key={screen.id}
                                        type="button"
                                        size="sm"
                                        variant={selectedScreenId === screen.id ? 'default' : 'outline'}
                                        className={selectedScreenId === screen.id ? 'bg-[#F57C00] hover:bg-[#E65100]' : ''}
                                        onClick={() => selectScreen(screen.id)}
                                    >
                                        {screen.name} ({screen.pickup_location_name})
                                    </Button>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Pending Confirmation</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.pending_confirmation}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Awaiting Kitchen</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.awaiting_kitchen}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Ready To Serve</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.ready_to_serve}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Served (Recent)</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.served}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <section className="space-y-3">
                        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                            <HandPlatter className="size-4 text-amber-500" />
                            Confirm Orders
                        </h2>
                        {pendingConfirmationOrders.length === 0 ? (
                            <Card className="border-dashed border-zinc-300">
                                <CardContent className="py-8 text-center text-sm font-medium text-zinc-500">
                                    No pending confirmation orders.
                                </CardContent>
                            </Card>
                        ) : (
                            pendingConfirmationOrders.map((order) =>
                                renderOrderCard(order, {
                                    label: 'Confirm And Send',
                                    onClick: confirmOrder,
                                }),
                            )
                        )}
                    </section>

                    <section className="space-y-3">
                        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                            <Timer className="size-4 text-indigo-500" />
                            Waiting Kitchen
                        </h2>
                        {awaitingKitchenOrders.length === 0 ? (
                            <Card className="border-dashed border-zinc-300">
                                <CardContent className="py-8 text-center text-sm font-medium text-zinc-500">
                                    No confirmed orders waiting on kitchen.
                                </CardContent>
                            </Card>
                        ) : (
                            awaitingKitchenOrders.map((order) => renderOrderCard(order))
                        )}
                    </section>

                    <section className="space-y-3">
                        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                            <CheckCheck className="size-4 text-emerald-500" />
                            Ready To Serve
                        </h2>
                        {readyToServeOrders.length === 0 ? (
                            <Card className="border-dashed border-zinc-300">
                                <CardContent className="py-8 text-center text-sm font-medium text-zinc-500">
                                    No orders ready to serve.
                                </CardContent>
                            </Card>
                        ) : (
                            readyToServeOrders.map((order) =>
                                renderOrderCard(order, {
                                    label: 'Mark As Served',
                                    onClick: serveOrder,
                                    className: 'bg-emerald-600 hover:bg-emerald-700',
                                }),
                            )
                        )}
                    </section>
                </div>

                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                            <UtensilsCrossed className="size-4 text-zinc-500" />
                            Recently Served
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-4">
                        {servedOrders.length === 0 ? (
                            <p className="text-sm font-medium text-zinc-500">No served orders yet.</p>
                        ) : (
                            servedOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex cursor-pointer flex-wrap items-center justify-between gap-2 rounded-xl bg-zinc-50 px-3 py-2 ring-1 ring-zinc-100 transition hover:bg-white hover:ring-[#F57C00]/40"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => openOrderDetails(order.id)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' || event.key === ' ') {
                                            event.preventDefault();
                                            openOrderDetails(order.id);
                                        }
                                    }}
                                >
                                    <p className="text-sm font-bold text-zinc-800">
                                        #{order.id} {order.customer_name ?? 'Guest'}
                                        {order.table_name ? ` • Table ${order.table_name}` : ''}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge className={sourceBadgeClass(order.source_channel)}>{order.source_channel}</Badge>
                                        <Badge className="bg-emerald-100 text-emerald-700">
                                            <Flame className="mr-1 size-3" />
                                            Served
                                        </Badge>
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                <Dialog
                    open={Boolean(selectedOrder)}
                    onOpenChange={(open) => {
                        if (!open) {
                            setSelectedOrderId(null);
                        }
                    }}
                >
                    {selectedOrder ? (
                        <DialogContent className="max-h-[92vh] overflow-y-auto border-none p-0 sm:max-w-6xl">
                            <DialogHeader className="border-b border-zinc-100 bg-[#212121] px-6 py-5 text-white">
                                <DialogTitle className="text-xl font-black">
                                    Order #{selectedOrder.id} • {selectedOrder.customer_name ?? 'Guest'}
                                </DialogTitle>
                                <DialogDescription className="text-zinc-300">
                                    Current order, previous order history, frequent order items, and behavior tags.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6 p-6">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge className={sourceBadgeClass(selectedOrder.source_channel)}>{selectedOrder.source_channel}</Badge>
                                    <Badge className={waiterStatusBadgeClass(selectedOrder.waiter_status)}>
                                        {prettyStatus(selectedOrder.waiter_status)}
                                    </Badge>
                                    <Badge className="bg-zinc-100 text-zinc-700">{currency(selectedOrder.total_amount)}</Badge>
                                    {selectedOrder.table_name ? (
                                        <Badge className="bg-zinc-100 text-zinc-700">Table {selectedOrder.table_name}</Badge>
                                    ) : null}
                                    <Badge className="bg-zinc-100 text-zinc-700">{formatDateTime(selectedOrder.created_at)}</Badge>
                                </div>

                                <div className="grid gap-4 lg:grid-cols-2">
                                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                                        <CardHeader className="border-b border-zinc-100 pb-3">
                                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                                                <Package className="size-4 text-[#F57C00]" />
                                                Current Order
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2 pt-4">
                                            {selectedOrder.items.length === 0 ? (
                                                <p className="text-sm font-medium text-zinc-500">No items in this order.</p>
                                            ) : (
                                                selectedOrder.items.map((item) => (
                                                    <div key={item.id} className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2 ring-1 ring-zinc-100">
                                                        <p className="text-sm font-semibold text-zinc-800">{item.name ?? 'Item'}</p>
                                                        <Badge className="bg-zinc-100 text-zinc-700">x{item.quantity}</Badge>
                                                    </div>
                                                ))
                                            )}
                                        </CardContent>
                                    </Card>

                                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                                        <CardHeader className="border-b border-zinc-100 pb-3">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                                                    <Flame className="size-4 text-amber-500" />
                                                    Customer Behavior Tags
                                                </CardTitle>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-violet-200 text-violet-600 hover:bg-violet-50 hover:text-violet-700"
                                                    onClick={() => setIsTagEditorOpen(true)}
                                                >
                                                    <Tags className="mr-1.5 size-3.5" />
                                                    Add Tags
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-2 pt-4">
                                            <div className="pt-2">
                                                {savedBehaviorTagCards.length === 0 ? (
                                                    <p className="text-sm font-medium text-zinc-500">No saved behavior tags yet.</p>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {savedBehaviorTagCards.map((group) => (
                                                            <div key={group.key} className="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                                                                <p className="text-xs font-black text-zinc-700">{group.title}</p>
                                                                <div className="mt-2 flex flex-wrap gap-2">
                                                                    {group.tags.map((tag) => (
                                                                        <Badge key={`${group.key}-${tag}`} className="bg-violet-100 text-violet-700">
                                                                            {tag}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                                    <CardHeader className="border-b border-zinc-100 pb-3">
                                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                                            <UtensilsCrossed className="size-4 text-orange-500" />
                                            Frequent Customer Items
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                                            {selectedCustomerInsight?.frequent_items?.length ? (
                                                selectedCustomerInsight.frequent_items.map((item) => (
                                                    <div key={item.name} className="flex items-center justify-between rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                                                        <div>
                                                            <p className="text-sm font-semibold text-zinc-800">{item.name}</p>
                                                            <p className="text-xs font-medium text-zinc-500">{item.orders_count} previous orders</p>
                                                        </div>
                                                        <Badge className="bg-zinc-100 text-zinc-700">x{item.quantity}</Badge>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="col-span-full py-4 text-center text-sm font-medium text-zinc-500">
                                                    No frequent order history available for this customer.
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Dialog open={isTagEditorOpen} onOpenChange={setIsTagEditorOpen}>
                                    <DialogContent className="max-h-[85vh] overflow-y-auto border-none p-0 sm:max-w-2xl">
                                        <DialogHeader className="border-b border-zinc-100 bg-violet-600 px-6 py-5 text-white">
                                            <DialogTitle className="flex items-center gap-2 text-xl font-black">
                                                <Tags className="size-5" />
                                                Manage Behavior Tags ({selectedTagCount})
                                            </DialogTitle>
                                            <DialogDescription className="text-violet-100">
                                                Select tags that best describe this customer's behavior and preferences.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="space-y-4 p-6">
                                            {!canEditBehaviorTags ? (
                                                <p className="py-8 text-center text-sm font-medium text-zinc-500">
                                                    This order has no customer profile attached, so behavior tags cannot be saved.
                                                </p>
                                            ) : (
                                                behaviorTagCatalog.map((group, groupIndex) => (
                                                    <div key={group.key} className="rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-100">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <p className="text-[11px] font-black uppercase tracking-widest text-zinc-700">
                                                                {groupIndex + 1}. {group.title}
                                                            </p>
                                                            {group.note ? (
                                                                <Badge className="bg-red-100 text-red-700">{group.note}</Badge>
                                                            ) : null}
                                                        </div>

                                                        <div className="mt-2 space-y-1 text-xs font-medium text-zinc-500">
                                                            {group.description.map((point) => (
                                                                <p key={point}>{point}</p>
                                                            ))}
                                                        </div>

                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            {group.tags.map((tag) => {
                                                                const selected = tagSelection[group.key]?.includes(tag) ?? false;
                                                                return (
                                                                    <Button
                                                                        key={`${group.key}-${tag}`}
                                                                        type="button"
                                                                        size="sm"
                                                                        variant="outline"
                                                                        className={
                                                                            selected
                                                                                ? 'border-violet-300 bg-violet-100 text-violet-700 hover:bg-violet-100'
                                                                                : 'bg-white text-zinc-700 hover:bg-zinc-100'
                                                                        }
                                                                        onClick={() => toggleBehaviorTag(group, tag)}
                                                                    >
                                                                        {tag}
                                                                    </Button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        <div className="flex items-center justify-end gap-3 border-t border-zinc-100 bg-zinc-50 p-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setIsTagEditorOpen(false)}
                                                disabled={isSavingTags}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="button"
                                                className="bg-violet-600 text-white hover:bg-violet-700"
                                                disabled={!canEditBehaviorTags || isSavingTags}
                                                onClick={saveBehaviorTags}
                                            >
                                                {isSavingTags ? 'Saving...' : 'Save Behavior Tags'}
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                                    <CardHeader className="border-b border-zinc-100 pb-3">
                                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                                            <Clock3 className="size-4 text-indigo-500" />
                                            Current Orders
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 pt-4">
                                        {currentOrdersForCustomer.length === 0 ? (
                                            <p className="text-sm font-medium text-zinc-500">No open orders found for this customer right now.</p>
                                        ) : (
                                            currentOrdersForCustomer.map((order) => (
                                                <div key={order.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-zinc-50 px-3 py-2 ring-1 ring-zinc-100">
                                                    <p className="text-sm font-semibold text-zinc-800">
                                                        #{order.id}
                                                        {order.table_name ? ` • Table ${order.table_name}` : ''}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <Badge className={waiterStatusBadgeClass(order.waiter_status)}>{prettyStatus(order.waiter_status)}</Badge>
                                                        <Badge className="bg-zinc-100 text-zinc-700">{currency(order.total_amount)}</Badge>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                                    <CardHeader className="border-b border-zinc-100 pb-3">
                                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                                            <History className="size-4 text-zinc-600" />
                                            Previous Order History
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3 pt-4">
                                        {previousOrders.length === 0 ? (
                                            <p className="text-sm font-medium text-zinc-500">No previous orders found for this customer yet.</p>
                                        ) : (
                                            previousOrders.map((historyOrder) => (
                                                <div key={historyOrder.id} className="space-y-2 rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <p className="text-sm font-black text-zinc-800">#{historyOrder.id}</p>
                                                        <div className="flex items-center gap-2">
                                                            <Badge className={waiterStatusBadgeClass(historyOrder.waiter_status)}>
                                                                {prettyStatus(historyOrder.waiter_status)}
                                                            </Badge>
                                                            <Badge className="bg-zinc-100 text-zinc-700">{currency(historyOrder.total_amount)}</Badge>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs font-medium text-zinc-500">{formatDateTime(historyOrder.created_at)}</p>
                                                    <p className="text-sm font-medium text-zinc-700">
                                                        {historyOrder.items.length > 0
                                                            ? historyOrder.items.map((item) => `${item.name} x${item.quantity}`).join(' • ')
                                                            : 'No items recorded'}
                                                    </p>
                                                </div>
                                            ))
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </DialogContent>
                    ) : null}
                </Dialog>
            </div>
        </AppLayout>
    );
}
