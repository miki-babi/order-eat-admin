import { Head, router, useForm } from '@inertiajs/react';
import { BarChart3, ChartNoAxesCombined } from 'lucide-react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type PickupLocation = {
    id: number;
    name: string;
};

type Summary = {
    total_sales: number;
    total_orders: number;
    pending_receipts: number;
    completed_orders: number;
};

type SalesPeriod = {
    period: string;
    orders_count: number;
    total_sales: number;
};

type PopularItem = {
    item_name: string;
    quantity_sold: number;
    total_sales: number;
};

type LocationPerformance = {
    id: number;
    name: string;
    orders_count: number;
    total_sales: number;
};

type SmsStats = {
    sent: number;
    failed: number;
    pending: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports',
        href: '/staff/reports',
    },
];

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

export default function Reports({
    filters,
    pickupLocations,
    summary,
    salesByPeriod,
    popularItems,
    locationPerformance,
    smsStats,
}: {
    filters: {
        from: string;
        to: string;
        pickup_location_id?: string | null;
    };
    pickupLocations: PickupLocation[];
    summary: Summary;
    salesByPeriod: SalesPeriod[];
    popularItems: PopularItem[];
    locationPerformance: LocationPerformance[];
    smsStats: SmsStats;
}) {
    const filterForm = useForm({
        from: filters.from,
        to: filters.to,
        pickup_location_id: filters.pickup_location_id ?? '',
    });

    const applyFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get('/staff/reports', filterForm.data, {
            preserveState: true,
            replace: true,
        });
    };

    const maxSalesValue = Math.max(1, ...salesByPeriod.map((row) => row.total_sales));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports and Analytics" />
            <div className="space-y-5 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="size-4" />
                            Report Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-3 md:grid-cols-4" onSubmit={applyFilters}>
                            <div>
                                <Label htmlFor="from">From</Label>
                                <Input
                                    id="from"
                                    type="date"
                                    value={filterForm.data.from}
                                    onChange={(event) => filterForm.setData('from', event.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="to">To</Label>
                                <Input
                                    id="to"
                                    type="date"
                                    value={filterForm.data.to}
                                    onChange={(event) => filterForm.setData('to', event.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="pickup_location_id">Pickup Location</Label>
                                <select
                                    id="pickup_location_id"
                                    className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                                    value={filterForm.data.pickup_location_id}
                                    onChange={(event) =>
                                        filterForm.setData('pickup_location_id', event.target.value)
                                    }
                                >
                                    <option value="">All locations</option>
                                    {pickupLocations.map((location) => (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end gap-2">
                                <Button type="submit">Apply</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.get('/staff/reports')}
                                >
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid gap-3 md:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Total Sales</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xl font-semibold">
                            {currency(summary.total_sales)}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Total Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xl font-semibold">{summary.total_orders}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Pending Receipts</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xl font-semibold">
                            {summary.pending_receipts}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Completed Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xl font-semibold">
                            {summary.completed_orders}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <ChartNoAxesCombined className="size-4" />
                                Sales by Day
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {salesByPeriod.length === 0 ? (
                                <p className="text-muted-foreground text-sm">
                                    No sales data in selected range.
                                </p>
                            ) : (
                                salesByPeriod.map((row) => (
                                    <div key={row.period} className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span>{row.period}</span>
                                            <span>
                                                {row.orders_count} order(s) | {currency(row.total_sales)}
                                            </span>
                                        </div>
                                        <div className="h-2 rounded bg-zinc-100">
                                            <div
                                                className="h-2 rounded bg-blue-500"
                                                style={{
                                                    width: `${(row.total_sales / maxSalesValue) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Popular Items</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {popularItems.length === 0 ? (
                                <p className="text-muted-foreground text-sm">
                                    No item sales in selected range.
                                </p>
                            ) : (
                                popularItems.map((item) => (
                                    <div key={item.item_name} className="rounded-md border px-3 py-2">
                                        <p className="font-medium">{item.item_name}</p>
                                        <p className="text-sm text-zinc-600">
                                            Qty sold: {item.quantity_sold} | Revenue: {currency(item.total_sales)}
                                        </p>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Pickup Location Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {locationPerformance.map((location) => (
                                <div key={location.id} className="rounded-md border px-3 py-2">
                                    <p className="font-medium">{location.name}</p>
                                    <p className="text-sm text-zinc-600">
                                        Orders: {location.orders_count} | Sales: {currency(location.total_sales)}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Customer Engagement (SMS)</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3 md:grid-cols-3">
                            <div className="rounded-md border border-green-200 bg-green-50 px-3 py-4 text-center">
                                <p className="text-xs uppercase tracking-wide text-green-700">Sent</p>
                                <p className="text-xl font-semibold text-green-800">{smsStats.sent}</p>
                            </div>
                            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-4 text-center">
                                <p className="text-xs uppercase tracking-wide text-red-700">Failed</p>
                                <p className="text-xl font-semibold text-red-800">{smsStats.failed}</p>
                            </div>
                            <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-4 text-center">
                                <p className="text-xs uppercase tracking-wide text-amber-700">Pending</p>
                                <p className="text-xl font-semibold text-amber-800">{smsStats.pending}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
