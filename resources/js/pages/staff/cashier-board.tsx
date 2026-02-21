import { Head, router } from '@inertiajs/react';
import { CheckCircle2, ReceiptText, Wallet } from 'lucide-react';
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

type CashierOrderItem = {
    id: number;
    name: string | null;
    quantity: number;
    line_total: number;
};

type CashierOrderRow = {
    id: number;
    source_channel: 'web' | 'telegram' | 'table';
    pickup_location: string | null;
    table_name: string | null;
    customer_name: string | null;
    customer_phone: string | null;
    waiter_status: 'pending_confirmation' | 'confirmed' | 'served' | string;
    order_status: string;
    receipt_status: string;
    total_amount: number;
    created_at: string | null;
    waiter_confirmed_at: string | null;
    served_at: string | null;
    items: CashierOrderItem[];
};

type Summary = {
    confirmed: number;
    served: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cashier Board',
        href: '/staff/cashier-board',
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

export default function CashierBoard({
    screens,
    selectedScreenId,
    confirmedOrders,
    servedOrders,
    summary,
}: {
    screens: Screen[];
    selectedScreenId: number | null;
    confirmedOrders: CashierOrderRow[];
    servedOrders: CashierOrderRow[];
    summary: Summary;
}) {
    const selectScreen = (screenId: number) => {
        router.get(
            '/staff/cashier-board',
            { screen_id: screenId },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const renderOrder = (order: CashierOrderRow, served: boolean) => (
        <Card key={order.id} className="border-none shadow-sm ring-1 ring-zinc-200">
            <CardContent className="space-y-4 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <p className="text-sm font-black text-zinc-900">
                            #{order.id} {order.customer_name ?? 'Guest'}
                            {order.table_name ? ` • Table ${order.table_name}` : ''}
                        </p>
                        <p className="text-xs font-medium text-zinc-500">
                            {order.customer_phone ?? '-'} • Confirmed: {order.waiter_confirmed_at ?? '-'}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={sourceBadgeClass(order.source_channel)}>{order.source_channel}</Badge>
                        <Badge className={served ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}>
                            {served ? 'served' : 'confirmed'}
                        </Badge>
                        <Badge className="bg-zinc-100 text-zinc-700">{currency(order.total_amount)}</Badge>
                    </div>
                </div>

                <div className="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Items</p>
                    <p className="mt-1 text-sm font-medium text-zinc-700">
                        {order.items.map((item) => `${item.name ?? 'Item'} x${item.quantity}`).join(' • ')}
                    </p>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cashier Board" />
            <div className="min-h-screen space-y-6 bg-zinc-50/60 p-6">
                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                            <Wallet className="size-4 text-[#F57C00]" />
                            Cashier Screens
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        {screens.length === 0 ? (
                            <p className="text-sm font-medium text-zinc-500">
                                No cashier screen assigned to your account yet.
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

                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Confirmed Queue</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.confirmed}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Served (Recent)</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.served}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <section className="space-y-3">
                        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                            <ReceiptText className="size-4 text-indigo-500" />
                            Confirmed Orders
                        </h2>
                        {confirmedOrders.length === 0 ? (
                            <Card className="border-dashed border-zinc-300">
                                <CardContent className="py-8 text-center text-sm font-medium text-zinc-500">
                                    No confirmed orders yet.
                                </CardContent>
                            </Card>
                        ) : (
                            confirmedOrders.map((order) => renderOrder(order, false))
                        )}
                    </section>

                    <section className="space-y-3">
                        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                            <CheckCircle2 className="size-4 text-emerald-500" />
                            Served Orders
                        </h2>
                        {servedOrders.length === 0 ? (
                            <Card className="border-dashed border-zinc-300">
                                <CardContent className="py-8 text-center text-sm font-medium text-zinc-500">
                                    No served orders yet.
                                </CardContent>
                            </Card>
                        ) : (
                            servedOrders.map((order) => renderOrder(order, true))
                        )}
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
