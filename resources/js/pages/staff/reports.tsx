import { Head, router, useForm } from '@inertiajs/react';
import { BarChart3, Filter, TrendingUp, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type PickupLocation = {
    id: number;
    name: string;
};

type Overview = {
    revenue: number;
    orders: number;
    customers: number;
    average_order_value: number;
    orders_with_phone: number;
    phone_capture_rate: number;
};

type GrowthTrend = {
    period: string;
    orders: number;
    revenue: number;
    customers: number;
};

type VisitFunnelRow = {
    visit: number;
    label: string;
    customers: number;
};

type TimeToSecondOrderRow = {
    label: string;
    customers: number;
};

type AvgDaysByPeriodRow = {
    period: string;
    average_days: number;
    repeat_orders: number;
};

type VisitAccelerationRow = {
    transition: string;
    average_days: number;
    samples: number;
};

type Retention = {
    visit_funnel: VisitFunnelRow[];
    customers_with_5_orders: number;
    fifth_visit_rate: number;
    first_order_cohort_size: number;
    time_to_second_order: TimeToSecondOrderRow[];
    average_days_between_orders: number | null;
    average_days_between_orders_by_period: AvgDaysByPeriodRow[];
    visit_acceleration: VisitAccelerationRow[];
};

type Momentum = {
    hot: number;
    warm: number;
    cooling: number;
    lost: number;
};

type LifecycleOverview = {
    new: number;
    active: number;
    cooling: number;
    lost: number;
};

type Lifecycle = {
    momentum: Momentum;
    overview: LifecycleOverview;
    active_revenue: number;
    recovered_revenue: number;
};

type TopSellingItem = {
    item_name: string;
    quantity: number;
};

type TopRevenueItem = {
    item_name: string;
    revenue: number;
};

type RepeatDrivingItem = {
    item_name: string;
    repeat_rate: number;
    repeat_customers: number;
    total_customers: number;
};

type MenuIntelligence = {
    top_selling_items: TopSellingItem[];
    top_revenue_items: TopRevenueItem[];
    repeat_driving_items: RepeatDrivingItem[];
};

type RevenueConcentration = {
    top_10_customers: number;
    top_25_customers: number;
    top_10_share: number;
    top_25_share: number;
    bottom_75_share: number;
};

type Clv = {
    avg_orders_per_customer: number;
    aov: number;
    clv: number;
};

type RevenueIntelligence = {
    concentration: RevenueConcentration;
    clv: Clv;
};

type ReportTab = 'overview' | 'growth' | 'retention' | 'lifecycle' | 'menu' | 'revenue';
type ChartDatum = {
    label: string;
    value: number;
    note?: string;
};

type Segment = {
    label: string;
    value: number;
    color: string;
    valueLabel?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Intelligence',
        href: '/staff/reports',
    },
];

const reportTabs: Array<{ id: ReportTab; label: string }> = [
    { id: 'overview', label: '1. Business Overview' },
    { id: 'growth', label: '2. Growth Trends' },
    { id: 'retention', label: '3. Retention & Behavior' },
    { id: 'lifecycle', label: '4. Lifecycle & Health' },
    { id: 'menu', label: '5. Menu Intelligence' },
    { id: 'revenue', label: '6. Revenue Intelligence' },
];

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 0,
    }).format(value);
}

function formatNumber(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        maximumFractionDigits: 0,
    }).format(value);
}

function percent(value: number, digits = 1): string {
    return `${value.toFixed(digits)}%`;
}

function compactPeriod(value: string): string {
    if (value.length >= 10 && value.includes('-')) {
        return value.slice(5);
    }

    return value;
}

function StatCard({
    label,
    value,
    sub,
    icon: Icon,
    trend,
}: {
    label: string;
    value: string;
    sub?: string;
    icon?: any;
    trend?: {
        value: number;
        label: string;
    };
}) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-white p-5 transition-all duration-300 hover:border-zinc-200 hover:shadow-sm">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.1em] text-zinc-400">{label}</p>
                    <p className="text-2xl font-black tracking-tight text-zinc-900">{value}</p>
                </div>
                {Icon && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 text-zinc-400 group-hover:bg-[#F57C00]/5 group-hover:text-[#F57C00] transition-colors duration-300">
                        <Icon className="size-5" />
                    </div>
                )}
            </div>
            {sub || trend ? (
                <div className="mt-4 flex items-center gap-2">
                    {trend && (
                        <div className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${trend.value >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            <TrendingUp className={`size-3 ${trend.value < 0 ? 'rotate-180' : ''}`} />
                            {trend.value >= 0 ? '+' : ''}{trend.value.toFixed(1)}%
                        </div>
                    )}
                    {sub && <p className="text-[10px] font-medium text-zinc-500">{sub}</p>}
                </div>
            ) : null}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#F57C00] transition-all duration-500 group-hover:w-full" />
        </div>
    );
}

function SegmentBar({ segments }: { segments: Segment[] }) {
    const total = segments.reduce((sum, segment) => sum + Math.max(0, segment.value), 0);

    return (
        <div className="space-y-4">
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-zinc-100/80">
                {segments.map((segment) => (
                    <div
                        key={segment.label}
                        className="h-full transition-all duration-500 ease-out"
                        style={{
                            width: `${total > 0 ? (segment.value / total) * 100 : 0}%`,
                            backgroundColor: segment.color,
                        }}
                    />
                ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
                {segments.map((segment) => (
                    <div key={segment.label} className="flex flex-col gap-1 rounded-xl border border-zinc-100 bg-zinc-50/50 p-3 transition-colors hover:bg-zinc-50">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full shadow-sm" style={{ backgroundColor: segment.color }} />
                            <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">{segment.label}</p>
                        </div>
                        <p className="text-sm font-black text-zinc-900">{segment.valueLabel ?? formatNumber(segment.value)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MiniBarChart({
    data,
    color = '#F57C00',
    formatValue = (value: number) => formatNumber(value),
    emptyText = 'No data available',
}: {
    data: ChartDatum[];
    color?: string;
    formatValue?: (value: number) => string;
    emptyText?: string;
}) {
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                <BarChart3 className="size-8 opacity-20 mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest">{emptyText}</p>
            </div>
        );
    }

    const maxValue = Math.max(1, ...data.map((item) => item.value));

    return (
        <div className="space-y-4">
            {data.map((item) => (
                <div key={item.label} className="group/bar space-y-1.5">
                    <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-[10px] font-black uppercase tracking-wider text-zinc-500 group-hover/bar:text-zinc-900 transition-colors">{item.label}</p>
                        <p className="whitespace-nowrap text-[11px] font-black text-zinc-900">{item.note ?? formatValue(item.value)}</p>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100/80">
                        <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                                width: `${(item.value / maxValue) * 100}%`,
                                backgroundColor: color,
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

function MiniLineChart({
    data,
    color = '#F57C00',
    formatValue = (value: number) => formatNumber(value),
    emptyText = 'No trend data available',
}: {
    data: ChartDatum[];
    color?: string;
    formatValue?: (value: number) => string;
    emptyText?: string;
}) {
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
                <TrendingUp className="size-10 opacity-20 mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest">{emptyText}</p>
            </div>
        );
    }

    const chartWidth = 800;
    const chartHeight = 280;
    const paddingX = 40;
    const paddingTop = 30;
    const paddingBottom = 50;
    const plotWidth = chartWidth - paddingX * 2;
    const plotHeight = chartHeight - paddingTop - paddingBottom;
    const maxValue = Math.max(1, ...data.map((item) => item.value));

    const points = data.map((item, index) => {
        const x =
            data.length === 1
                ? paddingX + plotWidth / 2
                : paddingX + (index / (data.length - 1)) * plotWidth;
        const y = paddingTop + (1 - item.value / maxValue) * plotHeight;

        return {
            ...item,
            x,
            y,
        };
    });

    const polyline = points.map((point) => `${point.x},${point.y}`).join(' ');
    const area =
        points.length > 0
            ? `M ${points[0].x} ${paddingTop + plotHeight} L ${points.map((point) => `${point.x} ${point.y}`).join(' L ')} L ${
                  points[points.length - 1].x
              } ${paddingTop + plotHeight} Z`
            : '';
    const labelStep = data.length > 8 ? Math.ceil(data.length / 6) : 1;

    return (
        <div className="group relative rounded-2xl border border-zinc-100 bg-white p-4 transition-all hover:border-zinc-200">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full overflow-visible" role="img" aria-label="Trend line chart">
                <defs>
                    <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {[0, 0.5, 1].map((ratio) => {
                    const y = paddingTop + ratio * plotHeight;

                    return (
                        <g key={`grid-${ratio}`}>
                            <line
                                x1={paddingX}
                                y1={y}
                                x2={chartWidth - paddingX}
                                y2={y}
                                stroke="#F4F4F5"
                                strokeWidth="1"
                            />
                            <text
                                x={paddingX - 10}
                                y={y + 3}
                                textAnchor="end"
                                className="fill-zinc-300 text-[9px] font-bold"
                            >
                                {ratio === 0 ? formatValue(maxValue) : ratio === 0.5 ? formatValue(maxValue / 2) : '0'}
                            </text>
                        </g>
                    );
                })}

                {area ? <path d={area} fill={`url(#gradient-${color.replace('#', '')})`} className="animate-in fade-in duration-1000" /> : null}
                {points.length > 1 ? (
                    <polyline
                        points={polyline}
                        fill="none"
                        stroke={color}
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-in slide-in-from-left-2 duration-700"
                    />
                ) : null}

                {points.map((point, index) => (
                    <g key={`${point.label}-${index}`} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={5}
                            fill="white"
                            stroke={color}
                            strokeWidth={2}
                            className="drop-shadow-sm"
                        />
                        <title>{`${point.label}: ${formatValue(point.value)}`}</title>
                    </g>
                ))}

                {points.map((point, index) => {
                    if (index % labelStep !== 0 && index !== points.length - 1) {
                        return null;
                    }

                    return (
                        <text
                            key={`label-${point.label}-${index}`}
                            x={point.x}
                            y={paddingTop + plotHeight + 24}
                            textAnchor="middle"
                            className="fill-zinc-400 text-[10px] font-bold uppercase tracking-wider"
                        >
                            {compactPeriod(point.label)}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
}

export default function Reports({
    filters,
    pickupLocations,
    overview,
    growthTrends,
    retention,
    lifecycle,
    menuIntelligence,
    revenueIntelligence,
}: {
    filters: {
        from: string;
        to: string;
        pickup_location_id?: string | null;
    };
    pickupLocations: PickupLocation[];
    overview: Overview;
    growthTrends: GrowthTrend[];
    retention: Retention;
    lifecycle: Lifecycle;
    menuIntelligence: MenuIntelligence;
    revenueIntelligence: RevenueIntelligence;
}) {
    const filterForm = useForm({
        from: filters.from,
        to: filters.to,
        pickup_location_id: filters.pickup_location_id ?? '',
    });
    const [activeTab, setActiveTab] = useState<ReportTab>('overview');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const applyFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get('/staff/reports', filterForm.data, {
            preserveState: true,
            replace: true,
        });
    };

    const firstTrend = growthTrends[0] ?? null;
    const lastTrend = growthTrends[growthTrends.length - 1] ?? null;

    const revenueTrendPercent =
        firstTrend && lastTrend && firstTrend.revenue > 0
            ? ((lastTrend.revenue - firstTrend.revenue) / firstTrend.revenue) * 100
            : null;
    const ordersTrendPercent =
        firstTrend && lastTrend && firstTrend.orders > 0
            ? ((lastTrend.orders - firstTrend.orders) / firstTrend.orders) * 100
            : null;
    const customersTrendPercent =
        firstTrend && lastTrend && firstTrend.customers > 0
            ? ((lastTrend.customers - firstTrend.customers) / firstTrend.customers) * 100
            : null;

    const revenuePerCustomer = overview.customers > 0 ? overview.revenue / overview.customers : 0;
    const ordersPerCustomer = overview.customers > 0 ? overview.orders / overview.customers : 0;
    const missingPhoneOrders = Math.max(overview.orders - overview.orders_with_phone, 0);
    const recoveredRevenueShare =
        lifecycle.active_revenue + lifecycle.recovered_revenue > 0
            ? (lifecycle.recovered_revenue / (lifecycle.active_revenue + lifecycle.recovered_revenue)) * 100
            : 0;

    const growthRevenueSeries = growthTrends.map((row) => ({ label: row.period, value: row.revenue }));
    const growthOrdersSeries = growthTrends.map((row) => ({ label: row.period, value: row.orders }));
    const growthCustomersSeries = growthTrends.map((row) => ({ label: row.period, value: row.customers }));

    const funnelBase = retention.visit_funnel[0]?.customers ?? 0;
    const funnelSeries: ChartDatum[] = retention.visit_funnel.map((row) => ({
        label: `${row.label} visit`,
        value: row.customers,
        note: `${formatNumber(row.customers)} (${funnelBase > 0 ? percent((row.customers / funnelBase) * 100, 1) : '0.0%'})`,
    }));

    const secondOrderSeries: ChartDatum[] = retention.time_to_second_order.map((row) => ({
        label: row.label,
        value: row.customers,
    }));

    const betweenOrdersSeries: ChartDatum[] = retention.average_days_between_orders_by_period.map((row) => ({
        label: row.period,
        value: row.average_days,
        note: `${row.average_days.toFixed(1)}d`,
    }));

    const accelerationSeries: ChartDatum[] = retention.visit_acceleration.map((row) => ({
        label: row.transition,
        value: row.average_days,
        note: `${row.average_days.toFixed(1)}d`,
    }));

    const momentumSeries: ChartDatum[] = [
        { label: 'Hot', value: lifecycle.momentum.hot },
        { label: 'Warm', value: lifecycle.momentum.warm },
        { label: 'Cooling', value: lifecycle.momentum.cooling },
        { label: 'Lost', value: lifecycle.momentum.lost },
    ];

    const lifecycleSeries: ChartDatum[] = [
        { label: 'New', value: lifecycle.overview.new },
        { label: 'Active', value: lifecycle.overview.active },
        { label: 'Cooling', value: lifecycle.overview.cooling },
        { label: 'Lost', value: lifecycle.overview.lost },
    ];

    const topSellingSeries: ChartDatum[] = menuIntelligence.top_selling_items.slice(0, 8).map((item) => ({
        label: item.item_name,
        value: item.quantity,
    }));

    const topRevenueSeries: ChartDatum[] = menuIntelligence.top_revenue_items.slice(0, 8).map((item) => ({
        label: item.item_name,
        value: item.revenue,
        note: currency(item.revenue),
    }));

    const repeatStickinessSeries: ChartDatum[] = menuIntelligence.repeat_driving_items.slice(0, 8).map((item) => ({
        label: item.item_name,
        value: item.repeat_rate,
        note: percent(item.repeat_rate, 1),
    }));

    const concentrationSeries: ChartDatum[] = [
        {
            label: `Top 10% (${revenueIntelligence.concentration.top_10_customers})`,
            value: revenueIntelligence.concentration.top_10_share,
            note: percent(revenueIntelligence.concentration.top_10_share, 1),
        },
        {
            label: `Top 25% (${revenueIntelligence.concentration.top_25_customers})`,
            value: revenueIntelligence.concentration.top_25_share,
            note: percent(revenueIntelligence.concentration.top_25_share, 1),
        },
        {
            label: 'Bottom 75%',
            value: revenueIntelligence.concentration.bottom_75_share,
            note: percent(revenueIntelligence.concentration.bottom_75_share, 1),
        },
    ];
    const nextFifteenShare = Math.max(
        0,
        revenueIntelligence.concentration.top_25_share - revenueIntelligence.concentration.top_10_share,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Intelligence Dashboard" />
            <div className="min-h-screen space-y-8 bg-zinc-50/30 p-8">
                {/* Brand Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-black tracking-tight text-zinc-900">Intelligence Dashboard</h1>
                    <p className="text-sm font-medium text-zinc-500">Deep insights into business performance, retention, and menu health.</p>
                </div>

                {/* Parameters & Filters */}
                <div className="rounded-3xl border border-zinc-100 bg-white shadow-sm overflow-hidden">
                    <button
                        type="button"
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className="flex w-full items-center justify-between p-6 transition-colors hover:bg-zinc-50/50"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F57C00]/10 text-[#F57C00]">
                                <Filter className="size-4" />
                            </div>
                            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Analysis Parameters</h2>
                            {!isFiltersOpen && (
                                <div className="ml-4 flex items-center gap-2">
                                    <Badge variant="outline" className="rounded-full bg-zinc-50 text-[10px] font-bold text-zinc-500 border-zinc-100">
                                        {filterForm.data.from} to {filterForm.data.to}
                                    </Badge>
                                </div>
                            )}
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-300 transition-transform duration-300">
                            {isFiltersOpen ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                        </div>
                    </button>

                    <Collapsible open={isFiltersOpen}>
                        <CollapsibleContent className="animate-in slide-in-from-top-2 duration-300 ease-out">
                            <div className="px-6 pb-6 pt-2 border-t border-zinc-50">
                                <form className="grid gap-6 md:grid-cols-4 lg:grid-cols-5" onSubmit={applyFilters}>
                                    <div className="space-y-2 lg:col-span-1">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400" htmlFor="from">
                                            Start Date
                                        </Label>
                                        <Input
                                            id="from"
                                            type="date"
                                            className="h-11 rounded-xl border-zinc-100 bg-zinc-50/50 px-4 font-bold transition-all focus:border-[#F57C00] focus:ring-4 focus:ring-[#F57C00]/5"
                                            value={filterForm.data.from}
                                            onChange={(event) => filterForm.setData('from', event.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2 lg:col-span-1">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400" htmlFor="to">
                                            End Date
                                        </Label>
                                        <Input
                                            id="to"
                                            type="date"
                                            className="h-11 rounded-xl border-zinc-100 bg-zinc-50/50 px-4 font-bold transition-all focus:border-[#F57C00] focus:ring-4 focus:ring-[#F57C00]/5"
                                            value={filterForm.data.to}
                                            onChange={(event) => filterForm.setData('to', event.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2 lg:col-span-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-400" htmlFor="pickup_location_id">
                                            Branch Network
                                        </Label>
                                        <select
                                            id="pickup_location_id"
                                            className="h-11 w-full rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-xs font-bold ring-offset-white transition-all focus:border-[#F57C00] focus:outline-none focus:ring-4 focus:ring-[#F57C00]/5"
                                            value={filterForm.data.pickup_location_id}
                                            onChange={(event) => filterForm.setData('pickup_location_id', event.target.value)}
                                        >
                                            <option value="">Global Network (All Branches)</option>
                                            {pickupLocations.map((location) => (
                                                <option key={location.id} value={location.id}>
                                                    {location.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-end gap-3">
                                        <Button type="submit" className="h-11 flex-1 rounded-xl bg-[#212121] text-[11px] font-black uppercase tracking-widest text-white transition-all hover:bg-[#F57C00] hover:shadow-lg hover:shadow-[#F57C00]/20 active:scale-95">
                                            Analyze
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-11 rounded-xl border-zinc-100 font-bold transition-all hover:bg-zinc-50 active:scale-95"
                                            onClick={() => router.get('/staff/reports')}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                {/* Tab Navigation */}
                <div className="inline-flex w-full overflow-hidden rounded-2xl border border-zinc-100 bg-white p-1.5 shadow-sm lg:w-auto">
                    <div className="flex flex-wrap gap-1">
                        {reportTabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                className={`relative h-10 rounded-xl px-4 text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95 ${
                                    activeTab === tab.id
                                        ? 'bg-[#212121] text-white shadow-md'
                                        : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600'
                                }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {activeTab === 'overview' ? (
                        <div className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                                <StatCard label="Total Revenue" value={currency(overview.revenue)} icon={TrendingUp} trend={revenueTrendPercent !== null ? { value: revenueTrendPercent, label: 'vs last' } : undefined} />
                                <StatCard label="Processed Orders" value={formatNumber(overview.orders)} icon={Filter} trend={ordersTrendPercent !== null ? { value: ordersTrendPercent, label: 'vs last' } : undefined} />
                                <StatCard label="Customer Base" value={formatNumber(overview.customers)} icon={Users} trend={customersTrendPercent !== null ? { value: customersTrendPercent, label: 'vs last' } : undefined} />
                                <StatCard label="Average Basket" value={currency(overview.average_order_value)} sub="Per individual order" />
                                <StatCard
                                    label="Data Quality"
                                    value={percent(overview.phone_capture_rate, 1)}
                                    sub={`${formatNumber(overview.orders_with_phone)} / ${formatNumber(overview.orders)} entries`}
                                />
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <div className="mb-6 flex items-center justify-between">
                                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Marketing Reach</p>
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                                                <div className="size-2 rounded-full bg-emerald-500" /> Captured
                                            </span>
                                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-orange-600">
                                                <div className="size-2 rounded-full bg-orange-500" /> Missing
                                            </span>
                                        </div>
                                    </div>
                                    <SegmentBar
                                        segments={[
                                            { label: 'Captured', value: overview.orders_with_phone, color: '#10B981' },
                                            { label: 'Missing', value: missingPhoneOrders, color: '#F57C00' },
                                        ]}
                                    />
                                </div>

                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Unit Economics</p>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="mb-2 flex items-center justify-between">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Rev / Customer</p>
                                                <p className="text-sm font-black text-zinc-900">{currency(revenuePerCustomer)}</p>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-50">
                                                <div
                                                    className="h-full rounded-full bg-indigo-500 transition-all duration-1000"
                                                    style={{ width: `${Math.min(100, (revenuePerCustomer / Math.max(overview.average_order_value, 1)) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-2 flex items-center justify-between">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Orders / Customer</p>
                                                <p className="text-sm font-black text-zinc-900">{ordersPerCustomer.toFixed(2)}</p>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-50">
                                                <div
                                                    className="h-full rounded-full bg-[#F57C00] transition-all duration-1000"
                                                    style={{ width: `${Math.min(100, (ordersPerCustomer / 3) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-2 flex items-center justify-between">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">AOV Level</p>
                                                <p className="text-sm font-black text-zinc-900">{currency(overview.average_order_value)}</p>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-50">
                                                <div
                                                    className="h-full rounded-full bg-emerald-500 transition-all duration-1000"
                                                    style={{ width: `${Math.min(100, (overview.average_order_value / Math.max(revenuePerCustomer, 1)) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {activeTab === 'growth' ? (
                        <div className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <StatCard
                                    label="Revenue Growth"
                                    value={revenueTrendPercent === null ? 'N/A' : `${revenueTrendPercent >= 0 ? '+' : ''}${revenueTrendPercent.toFixed(1)}%`}
                                    icon={TrendingUp}
                                />
                                <StatCard
                                    label="Order Volume"
                                    value={ordersTrendPercent === null ? 'N/A' : `${ordersTrendPercent >= 0 ? '+' : ''}${ordersTrendPercent.toFixed(1)}%`}
                                    icon={Filter}
                                />
                                <StatCard
                                    label="Customer Acquisition"
                                    value={customersTrendPercent === null ? 'N/A' : `${customersTrendPercent >= 0 ? '+' : ''}${customersTrendPercent.toFixed(1)}%`}
                                    icon={Users}
                                />
                            </div>

                            <div className="grid gap-6 xl:grid-cols-3">
                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Revenue Velocity</p>
                                    <MiniLineChart data={growthRevenueSeries} color="#F57C00" formatValue={currency} />
                                </div>
                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Order Frequency</p>
                                    <MiniLineChart data={growthOrdersSeries} color="#0EA5E9" formatValue={formatNumber} />
                                </div>
                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Database Expansion</p>
                                    <MiniLineChart data={growthCustomersSeries} color="#10B981" formatValue={formatNumber} />
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm">
                                <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4">
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Historical Performance Ledger</p>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-zinc-100 bg-zinc-50/30">
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Reporting Period</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Orders</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Revenue</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Unique Customers</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-50">
                                            {growthTrends.length === 0 ? (
                                                <tr>
                                                    <td className="px-6 py-12 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-300" colSpan={4}>
                                                        No historical data available for this range
                                                    </td>
                                                </tr>
                                            ) : (
                                                growthTrends.slice(-12).map((row) => (
                                                    <tr key={row.period} className="transition-colors hover:bg-zinc-50/50">
                                                        <td className="px-6 py-4 text-xs font-black text-zinc-900">{row.period}</td>
                                                        <td className="px-6 py-4 text-right text-xs font-bold text-zinc-600">{formatNumber(row.orders)}</td>
                                                        <td className="px-6 py-4 text-right text-xs font-bold text-zinc-900">{currency(row.revenue)}</td>
                                                        <td className="px-6 py-4 text-right text-xs font-bold text-zinc-600">{formatNumber(row.customers)}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {activeTab === 'retention' ? (
                        <div className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <StatCard label="High-Value Core" value={formatNumber(retention.customers_with_5_orders)} sub="Customers with 5+ visits" icon={Users} />
                                <StatCard label="Deep Loyalty Rate" value={percent(retention.fifth_visit_rate, 1)} sub="Conversion to 5th visit" icon={TrendingUp} />
                                <StatCard
                                    label="Order Intervallum"
                                    value={retention.average_days_between_orders === null ? 'N/A' : `${retention.average_days_between_orders.toFixed(1)}d`}
                                    sub="Avg days between orders"
                                    icon={Filter}
                                />
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Visit Funnel Erosion</p>
                                    <MiniBarChart data={funnelSeries} color="#F57C00" />
                                </div>

                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Velocity to Second Order</p>
                                    <p className="mb-6 text-[10px] font-medium text-zinc-400">Cohort size: {formatNumber(retention.first_order_cohort_size)} first-time customers</p>
                                    <MiniBarChart data={secondOrderSeries} color="#0EA5E9" />
                                </div>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Inter-Order Latency Trend</p>
                                    <MiniLineChart
                                        data={betweenOrdersSeries}
                                        color="#10B981"
                                        formatValue={(value) => `${value.toFixed(1)}d`}
                                        emptyText="Insufficient data for trend analysis"
                                    />
                                </div>

                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Visit Acceleration Metrics</p>
                                    <MiniBarChart
                                        data={accelerationSeries}
                                        color="#F59E0B"
                                        formatValue={(value) => `${value.toFixed(1)}d`}
                                        emptyText="No acceleration data detected"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {activeTab === 'lifecycle' ? (
                        <div className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <StatCard label="Recovered Revenue" value={currency(lifecycle.recovered_revenue)} sub="From churned segments" icon={TrendingUp} />
                                <StatCard label="Active Portfolio" value={currency(lifecycle.active_revenue)} sub="Current healthy revenue" icon={BarChart3} />
                                <StatCard label="Recovery Index" value={percent(recoveredRevenueShare, 1)} icon={Users} />
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Customer Momentum</p>
                                    <MiniBarChart data={momentumSeries} color="#F57C00" />
                                </div>

                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Lifecycle Distribution</p>
                                    <MiniBarChart data={lifecycleSeries} color="#0EA5E9" />
                                </div>
                            </div>

                            <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Revenue Structural Mix: Active vs Recovered</p>
                                <SegmentBar
                                    segments={[
                                        { label: 'Active', value: lifecycle.active_revenue, color: '#10B981' },
                                        { label: 'Recovered', value: lifecycle.recovered_revenue, color: '#F59E0B' },
                                    ]}
                                />
                            </div>
                        </div>
                    ) : null}

                    {activeTab === 'menu' ? (
                        <div className="space-y-6">
                            <div className="grid gap-6 lg:grid-cols-3">
                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Volume Leaders (Top Selling)</p>
                                    <MiniBarChart data={topSellingSeries} color="#F57C00" />
                                </div>

                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Revenue Drivers</p>
                                    <MiniBarChart data={topRevenueSeries} color="#10B981" formatValue={currency} />
                                </div>

                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-1 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Customer Stickiness (Repeat Drivers)</p>
                                    <p className="mb-6 text-[10px] font-medium text-zinc-400">% of customers who reorder this item</p>
                                    <MiniBarChart data={repeatStickinessSeries} color="#0EA5E9" formatValue={(value) => percent(value, 1)} />
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {activeTab === 'revenue' ? (
                        <div className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <StatCard label="Top 10% Revenue Share" value={percent(revenueIntelligence.concentration.top_10_share, 1)} icon={TrendingUp} />
                                <StatCard label="Top 25% Revenue Share" value={percent(revenueIntelligence.concentration.top_25_share, 1)} icon={BarChart3} />
                                <StatCard label="Customer LTV" value={currency(revenueIntelligence.clv.clv)} sub="Lifetime projection" icon={Users} />
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Revenue Concentration Analysis</p>
                                    <div className="space-y-8">
                                        <SegmentBar
                                            segments={[
                                                {
                                                    label: 'Top 10%',
                                                    value: revenueIntelligence.concentration.top_10_share,
                                                    color: '#F57C00',
                                                    valueLabel: percent(revenueIntelligence.concentration.top_10_share, 1),
                                                },
                                                {
                                                    label: 'Next 15%',
                                                    value: nextFifteenShare,
                                                    color: '#0EA5E9',
                                                    valueLabel: percent(nextFifteenShare, 1),
                                                },
                                                {
                                                    label: 'Bottom 75%',
                                                    value: revenueIntelligence.concentration.bottom_75_share,
                                                    color: '#10B981',
                                                    valueLabel: percent(revenueIntelligence.concentration.bottom_75_share, 1),
                                                },
                                            ]}
                                        />
                                        <div className="pt-4 border-t border-zinc-50">
                                            <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Contribution per decile</p>
                                            <MiniBarChart
                                                data={concentrationSeries}
                                                color="#F57C00"
                                                formatValue={(value) => percent(value, 1)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Customer Lifetime Value (CLV) Logic</p>
                                    <div className="mb-6 rounded-2xl bg-zinc-50 p-4 border border-zinc-100/50">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm text-zinc-400">
                                                <Filter className="size-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Economic Formula</p>
                                                <p className="text-[11px] font-bold text-zinc-600">Avg Orders Per Customer × Average Order Value</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Frequency Multiplier</p>
                                            <p className="text-xl font-black text-zinc-900">{revenueIntelligence.clv.avg_orders_per_customer.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">AOV Factor</p>
                                            <p className="text-xl font-black text-zinc-900">{currency(revenueIntelligence.clv.aov)}</p>
                                        </div>
                                        <div className="flex items-center justify-between rounded-2xl bg-[#212121] p-5 text-white shadow-lg shadow-zinc-200">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Est. Lifetime Value</p>
                                                <p className="text-3xl font-black tracking-tighter text-white">{currency(revenueIntelligence.clv.clv)}</p>
                                            </div>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                                                <TrendingUp className="size-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </AppLayout>
    );
}
