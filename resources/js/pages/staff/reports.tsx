import { Head, router, useForm } from '@inertiajs/react';
import { AreaChart, BarChart3, CreditCard, Filter, MapPin, Package, Send, TrendingUp } from 'lucide-react';
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
        title: 'Intelligence',
        href: '/staff/reports',
    },
];

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 0,
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
    const revenueChartWidth = Math.max(720, salesByPeriod.length * 130);
    const revenueChartHeight = 280;
    const chartPaddingX = 44;
    const chartPaddingTop = 24;
    const chartPaddingBottom = 46;
    const revenuePlotWidth = Math.max(revenueChartWidth - chartPaddingX * 2, 1);
    const revenuePlotHeight = Math.max(revenueChartHeight - chartPaddingTop - chartPaddingBottom, 1);
    const revenueBaselineY = chartPaddingTop + revenuePlotHeight;
    const revenueGridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
        y: chartPaddingTop + ratio * revenuePlotHeight,
        value: maxSalesValue * (1 - ratio),
    }));
    const revenuePoints = salesByPeriod.map((row, index) => {
        const x =
            salesByPeriod.length === 1
                ? chartPaddingX + revenuePlotWidth / 2
                : chartPaddingX + (index / (salesByPeriod.length - 1)) * revenuePlotWidth;
        const y = chartPaddingTop + (1 - row.total_sales / maxSalesValue) * revenuePlotHeight;

        return {
            ...row,
            x,
            y,
        };
    });
    const revenueLinePoints = revenuePoints.map((point) => `${point.x},${point.y}`).join(' ');
    const revenueAreaPath =
        revenuePoints.length > 0
            ? `M ${revenuePoints[0].x} ${revenueBaselineY} L ${revenuePoints
                  .map((point) => `${point.x} ${point.y}`)
                  .join(' L ')} L ${revenuePoints[revenuePoints.length - 1].x} ${revenueBaselineY} Z`
            : '';
    const peakRevenuePeriod = salesByPeriod.reduce<SalesPeriod | null>(
        (peak, row) => (peak === null || row.total_sales > peak.total_sales ? row : peak),
        null,
    );
    const latestRevenuePeriod = salesByPeriod[salesByPeriod.length - 1] ?? null;
    const firstRevenuePeriod = salesByPeriod[0] ?? null;
    const revenueDeltaPercent =
        latestRevenuePeriod !== null && firstRevenuePeriod !== null && firstRevenuePeriod.total_sales > 0
            ? ((latestRevenuePeriod.total_sales - firstRevenuePeriod.total_sales) /
                  firstRevenuePeriod.total_sales) *
              100
            : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Performance Intelligence" />
            <div className="space-y-8 bg-zinc-50/50 p-6 min-h-screen">
                {/* 📌 Dynamic Summary Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Gross Revenue</p>
                                    <h3 className="mt-1 text-2xl font-black text-[#212121]">{currency(summary.total_sales)}</h3>
                                </div>
                                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                                    <TrendingUp className="size-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Volume</p>
                                    <h3 className="mt-1 text-2xl font-black text-[#212121]">{summary.total_orders} Invoices</h3>
                                </div>
                                <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-500">
                                    <BarChart3 className="size-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#F57C00]">Verification</p>
                                    <h3 className="mt-1 text-2xl font-black text-[#212121]">{summary.pending_receipts} Pending</h3>
                                </div>
                                <div className="rounded-2xl bg-[#F57C00]/10 p-3 text-[#F57C00]">
                                    <CreditCard className="size-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Fullfillment</p>
                                    <h3 className="mt-1 text-2xl font-black text-[#212121]">{summary.completed_orders} Done</h3>
                                </div>
                                <div className="rounded-2xl bg-[#212121] p-3 text-white">
                                    <Package className="size-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 📌 Parameters & Filters */}
                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#212121]">
                            <Filter className="size-4 text-[#F57C00]" />
                            Report parameters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form className="grid gap-6 md:grid-cols-4" onSubmit={applyFilters}>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="from">Start Date</Label>
                                <Input
                                    id="from"
                                    type="date"
                                    className="h-10 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                    value={filterForm.data.from}
                                    onChange={(event) => filterForm.setData('from', event.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="to">End Date</Label>
                                <Input
                                    id="to"
                                    type="date"
                                    className="h-10 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                    value={filterForm.data.to}
                                    onChange={(event) => filterForm.setData('to', event.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="pickup_location_id">Branch Filtering</Label>
                                <select
                                    id="pickup_location_id"
                                    className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20"
                                    value={filterForm.data.pickup_location_id}
                                    onChange={(event) =>
                                        filterForm.setData('pickup_location_id', event.target.value)
                                    }
                                >
                                    <option value="">Global Network</option>
                                    {pickupLocations.map((location) => (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end gap-2">
                                <Button type="submit" className="h-10 flex-1 rounded-xl bg-[#212121] font-black text-white hover:bg-[#F57C00]">Generate</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-10 rounded-xl font-bold border-zinc-200"
                                    onClick={() => router.get('/staff/reports')}
                                >
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* 📌 Revenue Timeline */}
                    <Card className="lg:col-span-8 border-none shadow-md ring-1 ring-zinc-200">
                        <CardHeader className="border-b border-zinc-100 py-5">
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                                <AreaChart className="size-4 text-[#F57C00]" />
                                Revenue trajectory
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <div className="space-y-6">
                                {salesByPeriod.length === 0 ? (
                                    <div className="py-20 text-center">
                                        <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">No ledger data for chosen range</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                            <div className="overflow-x-auto">
                                                <svg
                                                    viewBox={`0 0 ${revenueChartWidth} ${revenueChartHeight}`}
                                                    className="h-[320px] min-w-[680px] w-full"
                                                    role="img"
                                                    aria-label="Revenue trajectory line graph"
                                                >
                                                    <defs>
                                                        <linearGradient id="revenue-trajectory-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                                                            <stop offset="0%" stopColor="#F57C00" stopOpacity={0.32} />
                                                            <stop offset="100%" stopColor="#F57C00" stopOpacity={0.02} />
                                                        </linearGradient>
                                                    </defs>

                                                    {revenueGridLines.map((guide) => (
                                                        <g key={`guide-${guide.y}`}>
                                                            <line
                                                                x1={chartPaddingX}
                                                                y1={guide.y}
                                                                x2={revenueChartWidth - chartPaddingX}
                                                                y2={guide.y}
                                                                stroke="#E4E4E7"
                                                                strokeDasharray="4 6"
                                                            />
                                                            <text
                                                                x={chartPaddingX - 12}
                                                                y={guide.y + 3}
                                                                textAnchor="end"
                                                                className="fill-zinc-400 text-[9px] font-black"
                                                            >
                                                                {currency(Math.round(guide.value))}
                                                            </text>
                                                        </g>
                                                    ))}

                                                    {revenuePoints.map((point, index) => (
                                                        <line
                                                            key={`period-guide-${point.period}-${index}`}
                                                            x1={point.x}
                                                            y1={revenueBaselineY}
                                                            x2={point.x}
                                                            y2={chartPaddingTop}
                                                            stroke="#F4F4F5"
                                                        />
                                                    ))}

                                                    {revenueAreaPath ? <path d={revenueAreaPath} fill="url(#revenue-trajectory-fill)" /> : null}

                                                    {revenuePoints.length > 1 ? (
                                                        <polyline
                                                            points={revenueLinePoints}
                                                            fill="none"
                                                            stroke="#F57C00"
                                                            strokeWidth={3}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    ) : null}

                                                    {revenuePoints.map((point, index) => (
                                                        <g key={`${point.period}-${index}`}>
                                                            <circle cx={point.x} cy={point.y} r={5} fill="#F57C00" />
                                                            <circle cx={point.x} cy={point.y} r={8} fill="#F57C00" fillOpacity={0.18} />
                                                            <title>{`${point.period}: ${currency(point.total_sales)} from ${point.orders_count} invoices`}</title>
                                                        </g>
                                                    ))}

                                                    {revenuePoints.map((point, index) => (
                                                        <text
                                                            key={`label-${point.period}-${index}`}
                                                            x={point.x}
                                                            y={revenueBaselineY + 20}
                                                            textAnchor="middle"
                                                            className="fill-zinc-500 text-[9px] font-black uppercase"
                                                        >
                                                            {point.period}
                                                        </text>
                                                    ))}
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-3">
                                            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                                    Latest period
                                                </p>
                                                <p className="mt-1 text-sm font-black text-[#212121]">
                                                    {latestRevenuePeriod ? currency(latestRevenuePeriod.total_sales) : '-'}
                                                </p>
                                                <p className="mt-1 text-[10px] font-bold text-zinc-500">
                                                    {latestRevenuePeriod ? latestRevenuePeriod.period : 'No data'}
                                                </p>
                                            </div>
                                            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                                    Peak period
                                                </p>
                                                <p className="mt-1 text-sm font-black text-emerald-600">
                                                    {peakRevenuePeriod ? currency(peakRevenuePeriod.total_sales) : '-'}
                                                </p>
                                                <p className="mt-1 text-[10px] font-bold text-zinc-500">
                                                    {peakRevenuePeriod ? peakRevenuePeriod.period : 'No data'}
                                                </p>
                                            </div>
                                            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                                    Range trend
                                                </p>
                                                <p
                                                    className={`mt-1 text-sm font-black ${
                                                        revenueDeltaPercent === null
                                                            ? 'text-zinc-500'
                                                            : revenueDeltaPercent >= 0
                                                            ? 'text-emerald-600'
                                                            : 'text-rose-600'
                                                    }`}
                                                >
                                                    {revenueDeltaPercent !== null
                                                        ? `${revenueDeltaPercent >= 0 ? '+' : ''}${revenueDeltaPercent.toFixed(1)}%`
                                                        : 'N/A'}
                                                </p>
                                                <p className="mt-1 text-[10px] font-bold text-zinc-500">
                                                    {firstRevenuePeriod && latestRevenuePeriod
                                                        ? `${firstRevenuePeriod.period} to ${latestRevenuePeriod.period}`
                                                        : 'Needs 2+ periods'}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* 📌 Best Sellers */}
                    <Card className="lg:col-span-4 border-none shadow-md ring-1 ring-zinc-200">
                        <CardHeader className="border-b border-zinc-100 py-5">
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                                <Package className="size-4 text-[#F57C00]" />
                                Market leaders
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="divide-y divide-zinc-100">
                                {popularItems.length === 0 ? (
                                    <p className="py-12 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-400">Zero volume</p>
                                ) : (
                                    popularItems.slice(0, 6).map((item, idx) => (
                                        <div key={item.item_name} className="flex items-center justify-between py-4 first:pt-0 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-100 text-[10px] font-black text-zinc-400">{idx + 1}</span>
                                                <div>
                                                    <p className="text-xs font-black text-[#212121]">{item.item_name}</p>
                                                    <p className="text-[10px] font-bold text-zinc-400">{item.quantity_sold} Units</p>
                                                </div>
                                            </div>
                                            <p className="text-xs font-black text-emerald-600">{currency(item.total_sales)}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* 📌 Node Performance */}
                    <Card className="border-none shadow-md ring-1 ring-zinc-200">
                        <CardHeader className="border-b border-zinc-100 py-5">
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                                <MapPin className="size-4 text-[#F57C00]" />
                                Geographic distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                {locationPerformance.map((location) => (
                                    <div key={location.id} className="flex items-center justify-between rounded-xl border border-zinc-100 bg-white p-4 transition-transform hover:-translate-y-0.5">
                                        <div>
                                            <p className="text-xs font-black text-[#212121] uppercase tracking-wide">{location.name}</p>
                                            <p className="mt-1 text-[10px] font-bold text-zinc-400">{location.orders_count} Fullfilled Invoices</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-[#212121]">{currency(location.total_sales)}</p>
                                            <span className="text-[9px] font-black uppercase text-emerald-500">Revenue Contribution</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* 📌 Outreach Success */}
                    <Card className="border-none shadow-md ring-1 ring-zinc-200">
                        <CardHeader className="border-b border-zinc-100 py-5">
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                                <Send className="size-4 text-[#F57C00]" />
                                Communication metrics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border-none bg-emerald-50 p-6 text-center shadow-sm ring-1 ring-emerald-100">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Delivered</p>
                                    <p className="mt-2 text-3xl font-black text-emerald-700">{smsStats.sent}</p>
                                </div>
                                <div className="rounded-2xl border-none bg-rose-50 p-6 text-center shadow-sm ring-1 ring-rose-100">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">Failed</p>
                                    <p className="mt-2 text-3xl font-black text-rose-700">{smsStats.failed}</p>
                                </div>
                                <div className="rounded-2xl border-none bg-amber-50 p-6 text-center shadow-sm ring-1 ring-amber-100">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">In Transit</p>
                                    <p className="mt-2 text-3xl font-black text-amber-700">{smsStats.pending}</p>
                                </div>
                            </div>
                            <div className="mt-8 flex items-center justify-between rounded-xl bg-zinc-900 p-5 text-white">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-white/10 p-2">
                                        <TrendingUp className="size-4 text-[#F57C00]" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Active Outreach Campaign</p>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase text-[#F57C00] hover:bg-white/10">View Log</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
