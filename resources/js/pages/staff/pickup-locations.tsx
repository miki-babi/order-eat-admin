import { Head, router, useForm } from '@inertiajs/react';
import { BarChart3, Clock3, Globe, MapPin, MapPinPlus, Package, Send, Table2, Trash2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type PickupLocation = {
    id: number;
    name: string;
    address: string;
    google_maps_url: string | null;
    is_active: boolean;
    orders_count: number;
    source_traffic: {
        total: number;
        web: number;
        telegram: number;
        table: number;
        web_share: number;
        telegram_share: number;
        table_share: number;
    };
    top_items: Array<{
        name: string;
        quantity_sold: number;
    }>;
    traffic_trend: Array<{
        date: string;
        total: number;
        web: number;
        telegram: number;
        table: number;
    }>;
    hourly_profile: Array<{
        hour: number;
        label: string;
        orders_count: number;
    }>;
    peak_hours: Array<{
        hour: number;
        label: string;
        orders_count: number;
    }>;
    peak_weekdays: Array<{
        weekday: string;
        orders_count: number;
    }>;
    updated_at: string | null;
};

type Summary = {
    total_locations: number;
    active_locations: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pickup Locations',
        href: '/staff/pickup-locations',
    },
];

type LineSeries = {
    label: string;
    color: string;
    points: number[];
};

function formatShortDate(value: string): string {
    const date = new Date(`${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
}

function AnalyticsLineChart({
    title,
    labels,
    series,
}: {
    title: string;
    labels: string[];
    series: LineSeries[];
}) {
    const width = 760;
    const height = 220;
    const padding = { top: 18, right: 16, bottom: 28, left: 36 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;
    const pointsCount = labels.length;
    const allValues = series.flatMap((line) => line.points);
    const maxValue = Math.max(1, ...allValues, 0);

    const xForIndex = (index: number) =>
        padding.left + (pointsCount <= 1 ? innerWidth / 2 : (index / (pointsCount - 1)) * innerWidth);
    const yForValue = (value: number) =>
        padding.top + innerHeight - (Math.max(value, 0) / maxValue) * innerHeight;

    const labelIndexes = Array.from(
        new Set([0, Math.max(0, Math.floor((pointsCount - 1) / 2)), Math.max(0, pointsCount - 1)]),
    ).filter((index) => index < pointsCount);

    const ticks = [0, 0.25, 0.5, 0.75, 1];
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const activeX = activeIndex !== null ? xForIndex(activeIndex) : null;
    const isTooltipRightAligned = activeX !== null && activeX > width * 0.66;

    const updateActiveIndex = (clientX: number, svg: SVGSVGElement) => {
        if (pointsCount < 1) {
            return;
        }

        const rect = svg.getBoundingClientRect();

        if (rect.width <= 0) {
            return;
        }

        const xInViewBox = ((clientX - rect.left) / rect.width) * width;
        const clampedX = Math.min(Math.max(xInViewBox, padding.left), width - padding.right);
        const nextIndex = pointsCount === 1
            ? 0
            : Math.round(((clampedX - padding.left) / innerWidth) * (pointsCount - 1));

        setActiveIndex(Math.min(pointsCount - 1, Math.max(0, nextIndex)));
    };

    return (
        <div className="rounded-2xl border border-zinc-100 bg-white p-4">
            <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">{title}</p>
            {pointsCount > 0 ? (
                <>
                    <div className="relative">
                        <svg
                            className="h-56 w-full"
                            viewBox={`0 0 ${width} ${height}`}
                            preserveAspectRatio="none"
                            onMouseMove={(event) => updateActiveIndex(event.clientX, event.currentTarget)}
                            onMouseLeave={() => setActiveIndex(null)}
                            onTouchStart={(event) => updateActiveIndex(event.touches[0].clientX, event.currentTarget)}
                            onTouchMove={(event) => updateActiveIndex(event.touches[0].clientX, event.currentTarget)}
                            onTouchEnd={() => setActiveIndex(null)}
                        >
                            {ticks.map((ratio) => {
                                const y = padding.top + innerHeight - innerHeight * ratio;
                                const value = Math.round(maxValue * ratio);

                                return (
                                    <g key={ratio}>
                                        <line
                                            x1={padding.left}
                                            y1={y}
                                            x2={width - padding.right}
                                            y2={y}
                                            stroke="#e4e4e7"
                                            strokeWidth="1"
                                            strokeDasharray="3 3"
                                        />
                                        <text x={padding.left - 8} y={y + 4} fill="#a1a1aa" fontSize="10" textAnchor="end">
                                            {value}
                                        </text>
                                    </g>
                                );
                            })}

                            {activeIndex !== null && activeX !== null && (
                                <line
                                    x1={activeX}
                                    y1={padding.top}
                                    x2={activeX}
                                    y2={padding.top + innerHeight}
                                    stroke="#d4d4d8"
                                    strokeWidth="1.2"
                                    strokeDasharray="3 3"
                                />
                            )}

                            {series.map((line) => {
                                const path = line.points
                                    .map((value, index) => `${index === 0 ? 'M' : 'L'} ${xForIndex(index)} ${yForValue(value)}`)
                                    .join(' ');

                                return (
                                    <path
                                        key={line.label}
                                        d={path}
                                        fill="none"
                                        stroke={line.color}
                                        strokeWidth="2.4"
                                        strokeLinecap="round"
                                    />
                                );
                            })}

                            {activeIndex !== null && activeX !== null && series.map((line) => {
                                const value = line.points[activeIndex] ?? 0;
                                const y = yForValue(value);

                                return (
                                    <circle
                                        key={`marker-${line.label}`}
                                        cx={activeX}
                                        cy={y}
                                        r="3.8"
                                        fill={line.color}
                                        stroke="#ffffff"
                                        strokeWidth="1.6"
                                    />
                                );
                            })}

                            {labelIndexes.map((index) => (
                                <text
                                    key={`${labels[index]}-${index}`}
                                    x={xForIndex(index)}
                                    y={height - 8}
                                    fill="#a1a1aa"
                                    fontSize="10"
                                    textAnchor="middle"
                                >
                                    {labels[index]}
                                </text>
                            ))}
                        </svg>

                        {activeIndex !== null && activeX !== null && (
                            <div
                                className="pointer-events-none absolute top-2 z-10 w-44 rounded-xl border border-zinc-200 bg-white/95 p-2.5 shadow-lg shadow-zinc-200/70 backdrop-blur-sm"
                                style={{
                                    left: `${(activeX / width) * 100}%`,
                                    transform: isTooltipRightAligned ? 'translate(calc(-100% - 12px), 0)' : 'translate(12px, 0)',
                                }}
                            >
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    {labels[activeIndex] ?? 'Point'}
                                </p>
                                <div className="mt-1.5 space-y-1">
                                    {series.map((line) => (
                                        <div key={`tip-${line.label}`} className="flex items-center justify-between text-[11px] font-bold text-zinc-700">
                                            <span className="inline-flex items-center gap-1.5">
                                                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: line.color }} />
                                                {line.label}
                                            </span>
                                            <span>{line.points[activeIndex] ?? 0}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {series.map((line) => (
                            <Badge key={line.label} className="bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 shadow-none">
                                <span className="mr-1 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: line.color }} />
                                {line.label}
                            </Badge>
                        ))}
                    </div>
                    <p className="mt-2 text-[10px] font-semibold text-zinc-400">Hover the chart lines for exact values.</p>
                </>
            ) : (
                <p className="text-[11px] font-semibold text-zinc-400">No line data available</p>
            )}
        </div>
    );
}

export default function PickupLocations({
    locations,
    summary,
}: {
    locations: PickupLocation[];
    summary: Summary;
}) {
    const [editing, setEditing] = useState<PickupLocation | null>(null);
    const [analyticsBranch, setAnalyticsBranch] = useState<PickupLocation | null>(null);

    const createForm = useForm({
        name: '',
        address: '',
        google_maps_url: '',
        is_active: true,
    });

    const editForm = useForm({
        name: '',
        address: '',
        google_maps_url: '',
        is_active: true,
    });

    const startEdit = (location: PickupLocation) => {
        setEditing(location);
        editForm.setData({
            name: location.name,
            address: location.address,
            google_maps_url: location.google_maps_url ?? '',
            is_active: location.is_active,
        });
    };

    const createLocation = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createForm.post('/staff/pickup-locations', {
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
                createForm.setData('google_maps_url', '');
                createForm.setData('is_active', true);
            },
        });
    };

    const updateLocation = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editing) {
            return;
        }

        editForm.put(`/staff/pickup-locations/${editing.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditing(null);
            },
        });
    };

    const deleteLocation = (location: PickupLocation) => {
        if (!window.confirm(`Delete or deactivate "${location.name}"?`)) {
            return;
        }

        router.delete(`/staff/pickup-locations/${location.id}`, {
            preserveScroll: true,
        });
    };

    const openAnalytics = (location: PickupLocation) => {
        setAnalyticsBranch(location);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pickup Locations" />
            <div className="space-y-8 bg-zinc-50/50 p-6 min-h-screen">
                {/* 📌 Summary Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">Total Locations</p>
                                    <h3 className="mt-2 text-3xl font-black text-[#212121]">{summary.total_locations}</h3>
                                </div>
                                <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-500">
                                    <MapPin className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-[#F57C00]">Active Distribution</p>
                                    <h3 className="mt-2 text-3xl font-black text-[#212121]">{summary.active_locations}</h3>
                                </div>
                                <div className="rounded-2xl bg-[#F57C00]/10 p-3 text-[#F57C00]">
                                    <MapPinPlus className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>


                {/* 📌 Registered Locations List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-black uppercase tracking-widest text-[#212121]">
                            <MapPin className="size-5 text-[#F57C00]" />
                            Location Directory
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {locations.map((location) => (
                            <Card
                                key={location.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => openAnalytics(location)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        openAnalytics(location);
                                    }
                                }}
                                className="relative cursor-pointer overflow-hidden border-none shadow-md ring-1 ring-zinc-200 transition-all hover:ring-[2px] hover:ring-[#F57C00]/20"
                            >
                                <div className={`absolute top-0 right-0 h-1.5 w-full ${location.is_active ? 'bg-emerald-500' : 'bg-zinc-300'}`} />
                                <CardContent className="pt-6">
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-xl font-black text-[#212121]">{location.name}</p>
                                                <Badge className={`mt-1.5 rounded-lg px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${location.is_active ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200' : 'bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200'} shadow-none`}>
                                                    {location.is_active ? 'Distribution Active' : 'Distribution Inactive'}
                                                </Badge>
                                            </div>
                                            <div className="rounded-xl bg-zinc-50 p-2 text-zinc-400">
                                                <MapPin className="size-5" />
                                            </div>
                                        </div>

                                        <div className="mt-6 flex-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Main Hub</p>
                                            <p className="mt-1 line-clamp-2 text-xs font-bold leading-relaxed text-zinc-600">{location.address}</p>
                                            {location.google_maps_url && (
                                                <a
                                                    href={location.google_maps_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-black text-[#F57C00] hover:underline"
                                                >
                                                    <MapPin className="size-3" />
                                                    Pin on Digital Maps
                                                </a>
                                            )}
                                        </div>

                                        <div className="mt-4 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Traffic Snapshot</p>
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                <Badge className="bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 shadow-none">
                                                    <Globe className="mr-1 size-3" />Web {location.source_traffic.web}
                                                </Badge>
                                                <Badge className="bg-sky-50 text-sky-700 ring-1 ring-sky-200 shadow-none">
                                                    <Send className="mr-1 size-3" />Telegram {location.source_traffic.telegram}
                                                </Badge>
                                                <Badge className="bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 shadow-none">
                                                    <Table2 className="mr-1 size-3" />Table {location.source_traffic.table}
                                                </Badge>
                                            </div>
                                            <p className="mt-2 text-[10px] font-bold text-zinc-500">Click card to open analytics modal with line graphs.</p>
                                        </div>

                                        <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-5">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400">Total Serviced</span>
                                                <span className="text-sm font-black text-[#212121]">{location.orders_count} Orders</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-9 rounded-xl font-bold transition-all hover:bg-[#F57C00]/10 hover:text-[#F57C00]"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        startEdit(location);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-9 rounded-xl font-bold text-rose-500 transition-all hover:bg-rose-50 hover:text-rose-600"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        deleteLocation(location);
                                                    }}
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <Dialog
                    open={Boolean(analyticsBranch)}
                    onOpenChange={(open) => {
                        if (!open) {
                            setAnalyticsBranch(null);
                        }
                    }}
                >
                    {analyticsBranch ? (
                        <DialogContent className="max-h-[92vh] overflow-y-auto border-none p-0 sm:max-w-6xl">
                            <DialogHeader className="border-b border-zinc-100 bg-[#212121] px-6 py-5 text-left text-white md:px-8">
                                <DialogTitle className="text-2xl font-black text-white">{analyticsBranch.name}</DialogTitle>
                                <DialogDescription className="mt-1 text-xs font-semibold text-zinc-300">
                                    Branch traffic intelligence by source, peak ordering windows, and item demand.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-5 p-5 md:p-8">
                                <div className="grid gap-3 md:grid-cols-4">
                                    <Card className="border-zinc-200 shadow-none">
                                        <CardContent className="pt-5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Orders</p>
                                            <p className="mt-1 text-2xl font-black text-zinc-800">{analyticsBranch.source_traffic.total}</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-zinc-200 shadow-none">
                                        <CardContent className="pt-5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Web Share</p>
                                            <p className="mt-1 text-2xl font-black text-zinc-700">{analyticsBranch.source_traffic.web_share.toFixed(1)}%</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-zinc-200 shadow-none">
                                        <CardContent className="pt-5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Telegram Share</p>
                                            <p className="mt-1 text-2xl font-black text-sky-600">{analyticsBranch.source_traffic.telegram_share.toFixed(1)}%</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-zinc-200 shadow-none">
                                        <CardContent className="pt-5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Table Share</p>
                                            <p className="mt-1 text-2xl font-black text-emerald-600">{analyticsBranch.source_traffic.table_share.toFixed(1)}%</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="grid gap-4 lg:grid-cols-2">
                                    <AnalyticsLineChart
                                        title="Traffic Trend (Daily)"
                                        labels={analyticsBranch.traffic_trend.map((row) => formatShortDate(row.date))}
                                        series={[
                                            {
                                                label: 'Total',
                                                color: '#18181b',
                                                points: analyticsBranch.traffic_trend.map((row) => row.total),
                                            },
                                            {
                                                label: 'Web',
                                                color: '#71717a',
                                                points: analyticsBranch.traffic_trend.map((row) => row.web),
                                            },
                                            {
                                                label: 'Telegram',
                                                color: '#0ea5e9',
                                                points: analyticsBranch.traffic_trend.map((row) => row.telegram),
                                            },
                                            {
                                                label: 'Table',
                                                color: '#10b981',
                                                points: analyticsBranch.traffic_trend.map((row) => row.table),
                                            },
                                        ]}
                                    />
                                    <AnalyticsLineChart
                                        title="Traffic Curve (By Hour)"
                                        labels={analyticsBranch.hourly_profile.map((row) => row.label.slice(0, 5))}
                                        series={[
                                            {
                                                label: 'Orders',
                                                color: '#f57c00',
                                                points: analyticsBranch.hourly_profile.map((row) => row.orders_count),
                                            },
                                        ]}
                                    />
                                </div>

                                <div className="grid gap-4 lg:grid-cols-3">
                                    <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4">
                                        <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                            <BarChart3 className="size-3.5" />
                                            Source Traffic Mix
                                        </p>
                                        <div className="mt-3 space-y-2">
                                            <div
                                                className="flex items-center justify-between text-xs font-bold text-zinc-600"
                                                title={`Web orders: ${analyticsBranch.source_traffic.web} (${analyticsBranch.source_traffic.web_share.toFixed(1)}% of total)`}
                                            >
                                                <span className="inline-flex items-center gap-1"><Globe className="size-3.5" />Web</span>
                                                <span>{analyticsBranch.source_traffic.web}</span>
                                            </div>
                                            <div
                                                className="flex items-center justify-between text-xs font-bold text-zinc-600"
                                                title={`Telegram orders: ${analyticsBranch.source_traffic.telegram} (${analyticsBranch.source_traffic.telegram_share.toFixed(1)}% of total)`}
                                            >
                                                <span className="inline-flex items-center gap-1"><Send className="size-3.5" />Telegram</span>
                                                <span>{analyticsBranch.source_traffic.telegram}</span>
                                            </div>
                                            <div
                                                className="flex items-center justify-between text-xs font-bold text-zinc-600"
                                                title={`Table orders: ${analyticsBranch.source_traffic.table} (${analyticsBranch.source_traffic.table_share.toFixed(1)}% of total)`}
                                            >
                                                <span className="inline-flex items-center gap-1"><Table2 className="size-3.5" />Table</span>
                                                <span>{analyticsBranch.source_traffic.table}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4">
                                        <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                            <Clock3 className="size-3.5" />
                                            Peak Time
                                        </p>
                                        {analyticsBranch.peak_hours.length > 0 ? (
                                            <div className="mt-3 space-y-1.5">
                                                {analyticsBranch.peak_hours.map((slot) => (
                                                    <p
                                                        key={slot.hour}
                                                        className="text-xs font-bold text-zinc-600"
                                                        title={`${slot.orders_count} orders during ${slot.label}`}
                                                    >
                                                        {slot.label} <span className="text-zinc-400">({slot.orders_count})</span>
                                                    </p>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="mt-3 text-xs font-semibold text-zinc-400">No peak data</p>
                                        )}
                                        {analyticsBranch.peak_weekdays.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                {analyticsBranch.peak_weekdays.map((day) => (
                                                    <Badge
                                                        key={day.weekday}
                                                        className="bg-white text-zinc-600 ring-1 ring-zinc-200 shadow-none"
                                                        title={`${day.orders_count} orders on ${day.weekday}`}
                                                    >
                                                        {day.weekday} {day.orders_count}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4">
                                        <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                            <Package className="size-3.5" />
                                            Most Sold Items
                                        </p>
                                        {analyticsBranch.top_items.length > 0 ? (
                                            <div className="mt-3 space-y-1.5">
                                                {analyticsBranch.top_items.map((item) => (
                                                    <p
                                                        key={item.name}
                                                        className="line-clamp-1 text-xs font-bold text-zinc-600"
                                                        title={`${item.quantity_sold} total units sold of ${item.name}`}
                                                    >
                                                        {item.name} <span className="text-zinc-400">x{item.quantity_sold}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="mt-3 text-xs font-semibold text-zinc-400">No item sales yet</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    ) : null}
                </Dialog>

                {/* 📌 Add Location Card */}
                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <MapPinPlus className="size-4 text-[#F57C00]" />
                            Register New Pickup Point
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form className="grid gap-6 md:grid-cols-3" onSubmit={createLocation}>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="name">Branch Name</Label>
                                <Input
                                    id="name"
                                    className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                    value={createForm.data.name}
                                    onChange={(event) => createForm.setData('name', event.target.value)}
                                    placeholder="e.g. Bole Branch"
                                />
                                <InputError message={createForm.errors.name} />
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="address">Physical Address</Label>
                                <Input
                                    id="address"
                                    className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                    value={createForm.data.address}
                                    onChange={(event) => createForm.setData('address', event.target.value)}
                                    placeholder="Street, Building, Flat number..."
                                />
                                <InputError message={createForm.errors.address} />
                            </div>
                            <div className="grid gap-2 md:col-span-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="google_maps_url">Google Maps URL (Optional)</Label>
                                <Input
                                    id="google_maps_url"
                                    className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                    value={createForm.data.google_maps_url}
                                    onChange={(event) =>
                                        createForm.setData('google_maps_url', event.target.value)
                                    }
                                    placeholder="https://maps.google.com/..."
                                />
                                <InputError message={createForm.errors.google_maps_url} />
                            </div>

                            <div className="flex items-center gap-2 md:col-span-3">
                                <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-2 ring-1 ring-zinc-200">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                        checked={createForm.data.is_active}
                                        onChange={(event) =>
                                            createForm.setData('is_active', event.target.checked)
                                        }
                                    />
                                    <Label htmlFor="is_active" className="cursor-pointer text-xs font-bold text-zinc-600">Active Location</Label>
                                </div>
                                <Button type="submit" className="h-11 px-8 ml-auto rounded-xl bg-[#F57C00] font-black shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100]" disabled={createForm.processing}>
                                    {createForm.processing ? 'Saving...' : 'Create Location'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* 📌 Edit Modal (Inline Card) */}
                {editing ? (
                    <Card className="border-none shadow-xl ring-2 ring-[#212121]">
                        <CardHeader className="border-b border-zinc-100 bg-[#212121] py-4 text-white">
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                                <MapPinPlus className="size-4 text-[#F57C00]" />
                                Modify Branch: {editing.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form className="grid gap-6 md:grid-cols-3" onSubmit={updateLocation}>
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="edit-name">Branch Name</Label>
                                    <Input
                                        id="edit-name"
                                        className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                        value={editForm.data.name}
                                        onChange={(event) => editForm.setData('name', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.name} />
                                </div>
                                <div className="grid gap-2 md:col-span-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="edit-address">Physical Address</Label>
                                    <Input
                                        id="edit-address"
                                        className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                        value={editForm.data.address}
                                        onChange={(event) => editForm.setData('address', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.address} />
                                </div>
                                <div className="grid gap-2 md:col-span-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="edit-google-maps-url">Google Maps URL</Label>
                                    <Input
                                        id="edit-google-maps-url"
                                        className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                        value={editForm.data.google_maps_url}
                                        onChange={(event) =>
                                            editForm.setData('google_maps_url', event.target.value)
                                        }
                                    />
                                    <InputError message={editForm.errors.google_maps_url} />
                                </div>

                                <div className="flex items-center gap-2 md:col-span-3">
                                    <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-2 ring-1 ring-zinc-200">
                                        <input
                                            type="checkbox"
                                            id="edit_is_active"
                                            className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                            checked={editForm.data.is_active}
                                            onChange={(event) =>
                                                editForm.setData('is_active', event.target.checked)
                                            }
                                        />
                                        <Label htmlFor="edit_is_active" className="cursor-pointer text-xs font-bold text-zinc-600">Active Location</Label>
                                    </div>
                                    <div className="flex items-center gap-3 ml-auto">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-11 rounded-xl font-bold"
                                            onClick={() => setEditing(null)}
                                        >
                                            Discard Changes
                                        </Button>
                                        <Button type="submit" className="h-11 px-8 rounded-xl bg-[#F57C00] font-black shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100]" disabled={editForm.processing}>
                                            Save Modifications
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                ) : null}

            </div>
        </AppLayout>
    );
}
