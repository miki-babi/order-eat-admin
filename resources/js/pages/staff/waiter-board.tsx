import { Head, router } from '@inertiajs/react';
import { CheckCheck, ConciergeBell, Flame, HandPlatter, Timer, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function WaiterBoard({
    screens,
    selectedScreenId,
    pendingConfirmationOrders,
    awaitingKitchenOrders,
    readyToServeOrders,
    servedOrders,
    summary,
}: {
    screens: Screen[];
    selectedScreenId: number | null;
    pendingConfirmationOrders: OrderRow[];
    awaitingKitchenOrders: OrderRow[];
    readyToServeOrders: OrderRow[];
    servedOrders: OrderRow[];
    summary: Summary;
}) {
    const [processingOrderId, setProcessingOrderId] = useState<number | null>(null);

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

    const renderOrderCard = (
        order: OrderRow,
        action?: {
            label: string;
            onClick: (orderId: number) => void;
            className?: string;
        },
    ) => {
        return (
            <Card key={order.id} className="border-none shadow-sm ring-1 ring-zinc-200">
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
                            onClick={() => action.onClick(order.id)}
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
                                <div key={order.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-zinc-50 px-3 py-2 ring-1 ring-zinc-100">
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
            </div>
        </AppLayout>
    );
}
