import { Head, router } from '@inertiajs/react';
import { CheckCircle2, ChefHat, LoaderCircle, TimerReset } from 'lucide-react';
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

type KitchenOrderItem = {
    id: number;
    name: string | null;
    quantity: number;
};

type KitchenOrderStatusRow = {
    id: number;
    status: 'pending' | 'preparing' | 'prepared' | string;
    preparing_started_at: string | null;
    prepared_at: string | null;
    updated_by: string | null;
    updated_at: string | null;
    order: {
        id: number;
        source_channel: 'web' | 'telegram' | 'table';
        table_name: string | null;
        customer_name: string | null;
        customer_phone: string | null;
        waiter_confirmed_at: string | null;
        total_amount: number;
        created_at: string | null;
        items: KitchenOrderItem[];
    };
};

type Summary = {
    pending: number;
    preparing: number;
    prepared: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kitchen Board',
        href: '/staff/kitchen-board',
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

function statusBadgeClass(status: string): string {
    if (status === 'prepared') {
        return 'bg-emerald-100 text-emerald-700';
    }

    if (status === 'preparing') {
        return 'bg-indigo-100 text-indigo-700';
    }

    return 'bg-amber-100 text-amber-700';
}

export default function KitchenBoard({
    screens,
    selectedScreenId,
    statusFilter,
    orderStatuses,
    summary,
}: {
    screens: Screen[];
    selectedScreenId: number | null;
    statusFilter: 'all' | 'pending' | 'preparing' | 'prepared';
    orderStatuses: KitchenOrderStatusRow[];
    summary: Summary;
}) {
    const [processingStatusId, setProcessingStatusId] = useState<number | null>(null);

    const selectScreen = (screenId: number) => {
        router.get(
            '/staff/kitchen-board',
            {
                screen_id: screenId,
                status: statusFilter,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const selectStatus = (nextStatus: 'all' | 'pending' | 'preparing' | 'prepared') => {
        router.get(
            '/staff/kitchen-board',
            {
                screen_id: selectedScreenId,
                status: nextStatus,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const updateStatus = (statusId: number, nextStatus: 'pending' | 'preparing' | 'prepared') => {
        setProcessingStatusId(statusId);

        router.patch(
            `/staff/kitchen-board/statuses/${statusId}`,
            {
                status: nextStatus,
            },
            {
                preserveScroll: true,
                onFinish: () => setProcessingStatusId((current) => (current === statusId ? null : current)),
            },
        );
    };

    const statusTabs: Array<'all' | 'pending' | 'preparing' | 'prepared'> = ['all', 'pending', 'preparing', 'prepared'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kitchen Board" />
            <div className="min-h-screen space-y-6 bg-zinc-50/60 p-6">
                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                            <ChefHat className="size-4 text-[#F57C00]" />
                            Kitchen Screens
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        {screens.length === 0 ? (
                            <p className="text-sm font-medium text-zinc-500">
                                No kitchen screen assigned to your account yet.
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

                        <div className="flex flex-wrap gap-2">
                            {statusTabs.map((tab) => (
                                <Button
                                    key={tab}
                                    type="button"
                                    size="sm"
                                    variant={statusFilter === tab ? 'default' : 'outline'}
                                    className={statusFilter === tab ? 'bg-[#212121] hover:bg-black' : ''}
                                    onClick={() => selectStatus(tab)}
                                >
                                    {tab}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Pending</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.pending}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Preparing</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.preparing}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Prepared</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.prepared}</p>
                        </CardContent>
                    </Card>
                </div>

                <section className="space-y-4">
                    <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900">Kitchen Queue</h2>

                    {orderStatuses.length === 0 ? (
                        <Card className="border-dashed border-zinc-300">
                            <CardContent className="py-10 text-center text-sm font-medium text-zinc-500">
                                No kitchen orders for this screen and filter.
                            </CardContent>
                        </Card>
                    ) : (
                        orderStatuses.map((row) => (
                            <Card key={row.id} className="border-none shadow-sm ring-1 ring-zinc-200">
                                <CardContent className="space-y-4 p-4">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-black text-zinc-900">
                                                Order #{row.order.id} {row.order.customer_name ? `• ${row.order.customer_name}` : ''}
                                            </p>
                                            <p className="text-xs font-medium text-zinc-500">
                                                {row.order.table_name ? `Table ${row.order.table_name} • ` : ''}
                                                Confirmed: {row.order.waiter_confirmed_at ?? '-'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge className={sourceBadgeClass(row.order.source_channel)}>{row.order.source_channel}</Badge>
                                            <Badge className={statusBadgeClass(row.status)}>{row.status}</Badge>
                                            <Badge className="bg-zinc-100 text-zinc-700">{currency(row.order.total_amount)}</Badge>
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Items</p>
                                        <p className="mt-1 text-sm font-medium text-zinc-700">
                                            {row.order.items.map((item) => `${item.name ?? 'Item'} x${item.quantity}`).join(' • ')}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant={row.status === 'pending' ? 'default' : 'outline'}
                                            className={row.status === 'pending' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                                            disabled={processingStatusId === row.id}
                                            onClick={() => updateStatus(row.id, 'pending')}
                                        >
                                            <TimerReset className="mr-1 size-3" />
                                            Pending
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant={row.status === 'preparing' ? 'default' : 'outline'}
                                            className={row.status === 'preparing' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                                            disabled={processingStatusId === row.id}
                                            onClick={() => updateStatus(row.id, 'preparing')}
                                        >
                                            <LoaderCircle className="mr-1 size-3" />
                                            Preparing
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant={row.status === 'prepared' ? 'default' : 'outline'}
                                            className={row.status === 'prepared' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                                            disabled={processingStatusId === row.id}
                                            onClick={() => updateStatus(row.id, 'prepared')}
                                        >
                                            <CheckCircle2 className="mr-1 size-3" />
                                            Prepared
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </section>
            </div>
        </AppLayout>
    );
}
