import {
    ChevronDown,
    ChevronUp,
    MoreHorizontal,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    ClipboardList,
    Clock3,
    Coffee,
    Filter,
    Receipt,
    Search,
    MapPin,
    RotateCcw
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

type OrderItem = {
    id: number;
    name: string | null;
    image_url: string | null;
    quantity: number;
    price: number;
    line_total: number;
};

type OrderRow = {
    id: number;
    customer_name: string | null;
    customer_phone: string | null;
    pickup_date: string;
    pickup_location: string | null;
    source_channel: 'web' | 'telegram' | 'table';
    table_name: string | null;
    table_qr_code: string | null;
    table_session_id: number | null;
    table_session_token_short: string | null;
    table_session_verified: boolean;
    table_session_verified_by: string | null;
    receipt_url: string | null;
    receipt_status: 'pending' | 'approved' | 'disapproved';
    order_status: 'pending' | 'preparing' | 'ready' | 'completed';
    disapproval_reason: string | null;
    notify_when_ready: boolean;
    total_amount: number;
    tracking_url: string;
    created_at: string | null;
    items: OrderItem[];
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Paginated<T> = {
    data: T[];
    links: PaginationLink[];
    total: number;
    from: number | null;
    to: number | null;
};

type PickupLocation = {
    id: number;
    name: string;
};

type Filters = {
    search?: string | null;
    status?: string | null;
    receipt_status?: string | null;
    pickup_location_id?: string | null;
    date?: string | null;
    time_bucket?: string | null;
    source_channel?: string | null;
};

type Summary = {
    total_orders: number;
    pending_orders: number;
    pending_receipts: number;
    ready_orders: number;
};

type SourceSummary = {
    all: number;
    web: number;
    telegram: number;
    table: number;
};

type UpdatePayload = {
    order_status?: string;
    receipt_status?: string;
    disapproval_reason?: string;
    notify_customer?: boolean;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/staff/orders',
    },
];

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

function badgeStyle(
    value: 'pending' | 'approved' | 'disapproved' | 'preparing' | 'ready' | 'completed' | string,
): string {
    switch (value) {
        case 'pending':
            return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200';
        case 'approved':
        case 'completed':
            return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200';
        case 'disapproved':
            return 'bg-rose-100 text-rose-700 ring-1 ring-rose-200';
        case 'preparing':
            return 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200';
        case 'ready':
            return 'bg-sky-100 text-sky-700 ring-1 ring-sky-200';
        default:
            return 'bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200';
    }
}

export default function StaffOrders({
    orders,
    // pickupLocations,
    filters,
    statusOptions,
    receiptStatusOptions,
    sourceSummary,
    summary,
}: {
    orders: Paginated<OrderRow>;
    pickupLocations: PickupLocation[];
    filters: Filters;
    statusOptions: string[];
    receiptStatusOptions: string[];
    sourceSummary: SourceSummary;
    summary: Summary;
}) {
    const [expandedCards, setExpandedCards] = useState<number[]>([]);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
    const [approveDialogOrder, setApproveDialogOrder] = useState<OrderRow | null>(null);
    const [approveNotifyCustomer, setApproveNotifyCustomer] = useState(true);
    const [disapproveDialogOrder, setDisapproveDialogOrder] = useState<OrderRow | null>(null);
    const [disapprovalReason, setDisapprovalReason] = useState('');
    const [disapproveNotifyCustomer, setDisapproveNotifyCustomer] = useState(true);
    const [disapprovalError, setDisapprovalError] = useState<string | null>(null);

    const toggleCard = (orderId: number) => {
        setExpandedCards(prev =>
            prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
        );
    };

    const form = useForm({
        search: filters.search ?? '',
        status: filters.status ?? '',
        receipt_status: filters.receipt_status ?? '',
        pickup_location_id: filters.pickup_location_id ?? '',
        date: filters.date ?? '',
        time_bucket: filters.time_bucket ?? '',
        source_channel: filters.source_channel ?? 'all',
    });

    const applyFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get('/staff/orders', form.data, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        form.setData({
            search: '',
            status: '',
            receipt_status: '',
            pickup_location_id: '',
            date: '',
            time_bucket: '',
            source_channel: 'all',
        });
        router.get('/staff/orders', {}, { preserveState: true, replace: true });
    };

    const selectSourceTab = (sourceChannel: 'all' | 'web' | 'telegram' | 'table') => {
        form.setData('source_channel', sourceChannel);
        router.get(
            '/staff/orders',
            {
                ...form.data,
                source_channel: sourceChannel,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const sourceLabel: Record<'all' | 'web' | 'telegram' | 'table', string> = {
        all: 'All',
        web: 'Web',
        telegram: 'Telegram',
        table: 'Table',
    };

    const sourceTabs: Array<'all' | 'web' | 'telegram' | 'table'> = ['all', 'web', 'telegram', 'table'];

    const updateOrder = (orderId: number, payload: UpdatePayload, onSuccess?: () => void) => {
        setUpdatingOrderId(orderId);

        router.patch(`/staff/orders/${orderId}`, payload, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onSuccess?.();
            },
            onFinish: () => {
                setUpdatingOrderId((current) => (current === orderId ? null : current));
            },
        });
    };

    const openApproveDialog = (order: OrderRow) => {
        setApproveDialogOrder(order);
        setApproveNotifyCustomer(true);
    };

    const confirmApproveReceipt = () => {
        if (!approveDialogOrder) {
            return;
        }

        updateOrder(
            approveDialogOrder.id,
            {
                receipt_status: 'approved',
                notify_customer: approveNotifyCustomer,
            },
            () => {
                setApproveDialogOrder(null);
            },
        );
    };

    const openDisapproveDialog = (order: OrderRow) => {
        setDisapproveDialogOrder(order);
        setDisapprovalReason(order.disapproval_reason ?? '');
        setDisapproveNotifyCustomer(true);
        setDisapprovalError(null);
    };

    const confirmDisapproveReceipt = () => {
        if (!disapproveDialogOrder) {
            return;
        }

        const reason = disapprovalReason.trim();

        if (!reason) {
            setDisapprovalError('Disapproval reason is required.');
            return;
        }

        updateOrder(
            disapproveDialogOrder.id,
            {
                receipt_status: 'disapproved',
                disapproval_reason: reason,
                notify_customer: disapproveNotifyCustomer,
            },
            () => {
                setDisapproveDialogOrder(null);
                setDisapprovalReason('');
                setDisapprovalError(null);
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Staff Orders" />
            <div className="space-y-8 bg-zinc-50/50 p-6 min-h-screen">
                {/* 📌 Section 1 — Header Summary */}
                <div className="hidden grid gap-4 md:grid-cols-4">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">Total Orders</p>
                                    <h3 className="mt-2 text-3xl font-black text-[#212121]">{summary.total_orders}</h3>
                                </div>
                                <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-500">
                                    <ClipboardList className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-amber-500">Pending</p>
                                    <h3 className="mt-2 text-3xl font-black text-[#212121]">{summary.pending_orders}</h3>
                                </div>
                                <div className="rounded-2xl bg-amber-50 p-3 text-amber-500">
                                    <Clock3 className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-indigo-500">Wait Receipt</p>
                                    <h3 className="mt-2 text-3xl font-black text-[#212121]">{summary.pending_receipts}</h3>
                                </div>
                                <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-500">
                                    <Receipt className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-sky-500">Ready</p>
                                    <h3 className="mt-2 text-3xl font-black text-[#212121]">{summary.ready_orders}</h3>
                                </div>
                                <div className="rounded-2xl bg-sky-50 p-3 text-sky-500">
                                    <Coffee className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 📌 Section 2 — Filters & Tabs */}
                <div className="space-y-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex bg-white p-1 rounded-xl ring-1 ring-zinc-200 w-fit">
                            {[
                                { label: 'Pending', value: 'pending' },
                                { label: 'In Progress', value: 'preparing,ready' },
                                { label: 'Completed', value: 'completed' },
                                { label: 'All', value: '' }
                            ].map((tab) => {
                                const isActive = form.data.status === tab.value || (tab.value === '' && form.data.status === '');
                                return (
                                    <Button
                                        key={tab.label}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            form.setData('status', tab.value);
                                            router.get('/staff/orders', { ...form.data, status: tab.value }, { preserveState: true, replace: true });
                                        }}
                                        className={`rounded-lg px-6 h-9 text-xs font-bold transition-all ${isActive
                                            ? 'bg-[#F57C00] text-white shadow-md hover:bg-[#E65100] hover:text-white'
                                            : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                                            }`}
                                    >
                                        {tab.label}
                                    </Button>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-2">
                            <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                                <CollapsibleTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-11 rounded-xl gap-2 font-bold bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50">
                                        <Filter className="size-4" />
                                        Filters
                                        {isFiltersOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                                    </Button>
                                </CollapsibleTrigger>
                            </Collapsible>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearFilters}
                                className="h-11 rounded-xl font-bold bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                            >
                                <RotateCcw className="size-4" />
                            </Button>
                        </div>
                    </div>

                    <Collapsible open={isFiltersOpen}>
                        <CollapsibleContent>
                            <Card className="border-none shadow-md ring-1 ring-zinc-200 overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="mb-5 flex flex-wrap gap-2">
                                        <p className="w-full text-[10px] font-black uppercase tracking-widest text-[#9E9E9E] mb-2">Order Source</p>
                                        {sourceTabs.map((source) => {
                                            const active = form.data.source_channel === source;

                                            return (
                                                <Button
                                                    key={source}
                                                    type="button"
                                                    size="sm"
                                                    variant={active ? 'default' : 'outline'}
                                                    className={`rounded-full px-4 text-[10px] font-black uppercase tracking-widest transition-all ${active
                                                        ? 'bg-[#212121] text-white shadow-lg hover:bg-black'
                                                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-bold'
                                                        }`}
                                                    onClick={() => selectSourceTab(source)}
                                                >
                                                    {sourceLabel[source]} ({sourceSummary[source]})
                                                </Button>
                                            );
                                        })}
                                    </div>
                                    <form className="grid gap-6 md:grid-cols-4 lg:grid-cols-12" onSubmit={applyFilters}>
                                        <div className="lg:col-span-5">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="search">Search</Label>
                                            <div className="relative mt-1.5">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                                                <Input
                                                    id="search"
                                                    className="h-11 pl-10 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all bg-white"
                                                    value={form.data.search}
                                                    onChange={(event) => form.setData('search', event.target.value)}
                                                    placeholder="Order ID, customer, phone, table..."
                                                />
                                            </div>
                                        </div>
                                        <div className="lg:col-span-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="receipt_status">Receipt</Label>
                                            <select
                                                id="receipt_status"
                                                className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20 transition-all font-bold"
                                                value={form.data.receipt_status}
                                                onChange={(event) =>
                                                    form.setData('receipt_status', event.target.value)
                                                }
                                            >
                                                <option value="">All Receipts</option>
                                                {receiptStatusOptions.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="lg:col-span-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="date">Date</Label>
                                            <Input
                                                id="date"
                                                type="date"
                                                className="mt-1.5 h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all bg-white"
                                                value={form.data.date}
                                                onChange={(event) => form.setData('date', event.target.value)}
                                            />
                                        </div>
                                        <div className="lg:col-span-1 flex items-end">
                                            <Button type="submit" className="h-11 w-full rounded-xl bg-[#F57C00] font-black shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100]">Apply</Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                {/* 📌 Section 3 — Order Queue */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <ClipboardList className="size-5 text-[#F57C00]" />
                            Order Queue
                        </h2>
                        <Badge variant="outline" className="rounded-full px-4 py-1 text-xs font-bold text-zinc-500 bg-white">
                            {orders.total} Total Orders
                        </Badge>
                    </div>

                    {orders.data.length === 0 ? (
                        <Card className="border-dashed border-2 p-12 text-center bg-white shadow-none">
                            <p className="text-zinc-500 font-medium font-bold uppercase tracking-widest text-[10px]">No orders found for current filters.</p>
                        </Card>
                    ) : (
                        <div className="grid gap-3">
                            {orders.data.map((order) => {
                                const isExpanded = expandedCards.includes(order.id);

                                return (
                                    <Card key={order.id} className="overflow-hidden border-none shadow-sm ring-1 ring-zinc-200 transition-all hover:ring-[#F57C00]/30 bg-white rounded-2xl">
                                        <div className="p-4 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F57C00]/10 text-[#F57C00] shrink-0">
                                                    <span className="text-sm font-black">#{order.id}</span>
                                                </div>
                                                <div className="truncate">
                                                    <h3 className="text-base font-black text-[#212121] truncate">{order.customer_name}</h3>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-xs font-bold text-[#F57C00]">ETB {order.total_amount.toLocaleString()}</span>
                                                        <span className="text-zinc-300">•</span>
                                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">{order.source_channel}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">
                                                <div className="hidden sm:flex items-center gap-2">
                                                    <Badge className={`rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-tight shadow-none border-none ${badgeStyle(order.order_status)}`}>
                                                        {order.order_status}
                                                    </Badge>
                                                    <Badge className={`rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-tight shadow-none border-none ${badgeStyle(order.receipt_status)}`}>
                                                        {order.receipt_status === 'approved' ? 'Paid' : order.receipt_status === 'disapproved' ? 'Rejected' : 'Unpaid'}
                                                    </Badge>
                                                </div>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-zinc-100">
                                                            <MoreHorizontal className="size-5 text-zinc-500" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 shadow-xl border-zinc-100">
                                                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Change Status</DropdownMenuLabel>
                                                        {statusOptions.map((st) => (
                                                            <DropdownMenuItem
                                                                key={st}
                                                                disabled={order.order_status === st || updatingOrderId === order.id}
                                                                onClick={() => updateOrder(order.id, { order_status: st })}
                                                                className="rounded-lg font-bold text-sm capitalize"
                                                            >
                                                                Mark as {st}
                                                            </DropdownMenuItem>
                                                        ))}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Receipt Actions</DropdownMenuLabel>
                                                        {order.receipt_status !== 'approved' && (
                                                            <DropdownMenuItem
                                                                onClick={() => openApproveDialog(order)}
                                                                className="rounded-lg font-bold text-sm text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50"
                                                            >
                                                                Approve Receipt
                                                            </DropdownMenuItem>
                                                        )}
                                                        {order.receipt_status !== 'disapproved' && (
                                                            <DropdownMenuItem
                                                                onClick={() => openDisapproveDialog(order)}
                                                                className="rounded-lg font-bold text-sm text-rose-600 focus:text-rose-700 focus:bg-rose-50"
                                                            >
                                                                Reject Receipt
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem asChild>
                                                            <a href={order.tracking_url} target="_blank" rel="noreferrer" className="rounded-lg font-bold text-sm text-sky-600">
                                                                Live Tracking
                                                            </a>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className={`h-9 w-9 rounded-xl transition-all ${isExpanded ? 'bg-[#F57C00]/10 text-[#F57C00]' : 'hover:bg-zinc-100 text-zinc-400'}`}
                                                    onClick={() => toggleCard(order.id)}
                                                >
                                                    {isExpanded ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                                                </Button>
                                            </div>
                                        </div>

                                        <Collapsible open={isExpanded}>
                                            <CollapsibleContent>
                                                <div className="border-t border-zinc-100 bg-zinc-50/30 p-4 sm:p-6 space-y-6">
                                                    <div className="grid gap-6 md:grid-cols-2">
                                                        <div className="space-y-4">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Items Summary</h4>
                                                            <div className="space-y-2">
                                                                {order.items.map((item) => (
                                                                    <div key={item.id} className="flex items-center justify-between rounded-xl bg-white p-3 ring-1 ring-zinc-100 shadow-sm">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="size-9 shrink-0 overflow-hidden rounded-lg bg-zinc-50 ring-1 ring-zinc-100">
                                                                                {item.image_url ? (
                                                                                    <img src={item.image_url} alt={item.name ?? 'Item'} className="h-full w-full object-cover" />
                                                                                ) : (
                                                                                    <div className="flex h-full w-full items-center justify-center text-[8px] font-bold uppercase text-zinc-300">Prep</div>
                                                                                )}
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-xs font-bold text-[#212121]">{item.name}</p>
                                                                                <p className="text-[10px] font-bold text-zinc-400">Quantity: {item.quantity}</p>
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-xs font-black text-[#212121]">{currency(item.line_total)}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Delivery & Payment</h4>
                                                            <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-100 shadow-sm space-y-4">
                                                                <div className="flex items-start gap-3">
                                                                    <div className="p-2 rounded-lg bg-zinc-50">
                                                                        <MapPin className="size-4 text-zinc-400" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[10px] font-black uppercase tracking-tight text-zinc-400">Pickup Details</p>
                                                                        <p className="text-xs font-bold text-zinc-700 mt-0.5">{order.pickup_location} • {order.pickup_date}</p>
                                                                        {order.table_name && (
                                                                            <div className="mt-1 flex items-center gap-2">
                                                                                <Badge className="bg-zinc-100 text-zinc-700 text-[9px] font-bold px-2 py-0 border-none">Table {order.table_name}</Badge>
                                                                                <Badge className={`${order.table_session_verified ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} text-[9px] font-bold px-2 py-0 border-none`}>
                                                                                    {order.table_session_verified ? 'Verified' : 'Unverified'}
                                                                                </Badge>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center justify-between border-t border-zinc-50 pt-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="p-2 rounded-lg bg-zinc-50">
                                                                            <Receipt className={`size-4 ${order.receipt_url ? 'text-[#F57C00]' : 'text-zinc-300'}`} />
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-[10px] font-black uppercase tracking-tight text-zinc-400">Payment Receipt</p>
                                                                            {order.receipt_url ? (
                                                                                <a href={order.receipt_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#F57C00] hover:underline">View Uploaded Image</a>
                                                                            ) : (
                                                                                <p className="text-xs font-bold text-zinc-300">Not Uploaded</p>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    {order.disapproval_reason && (
                                                                        <div className="text-right">
                                                                            <p className="text-[10px] font-black uppercase tracking-tight text-rose-400">Rejected</p>
                                                                            <p className="text-xs font-bold text-rose-600">{order.disapproval_reason}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-muted-foreground text-sm">
                        Showing {orders.from ?? 0} to {orders.to ?? 0} of {orders.total} order(s)
                    </p>
                    <div className="flex items-center gap-2">
                        {orders.links.map((link) => (
                            <Button
                                key={link.label}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                asChild={Boolean(link.url)}
                                className={`h-10 rounded-xl px-4 font-bold transition-all ${link.active ? 'bg-[#F57C00] text-white shadow-lg shadow-[#F57C00]/20' : 'text-zinc-500 border-zinc-200'}`}
                            >
                                {link.url ? (
                                    <Link href={link.url} preserveState preserveScroll>
                                        {link.label.includes('Previous') ? <ChevronLeft className="size-4" /> : link.label.includes('Next') ? <ChevronRight className="size-4" /> : <span dangerouslySetInnerHTML={{ __html: link.label }} />}
                                    </Link>
                                ) : (
                                    <span>
                                        {link.label.includes('Previous') ? <ChevronLeft className="size-4" /> : link.label.includes('Next') ? <ChevronRight className="size-4" /> : <span dangerouslySetInnerHTML={{ __html: link.label }} />}
                                    </span>
                                )}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <Dialog
                open={approveDialogOrder !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setApproveDialogOrder(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Approve Receipt</DialogTitle>
                        <DialogDescription>
                            {approveDialogOrder
                                ? `Confirm receipt approval for order #${approveDialogOrder.id}.`
                                : 'Confirm receipt approval.'}
                        </DialogDescription>
                    </DialogHeader>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={approveNotifyCustomer}
                            onChange={(event) => setApproveNotifyCustomer(event.target.checked)}
                        />
                        Notify customer by SMS
                    </label>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setApproveDialogOrder(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            disabled={
                                !approveDialogOrder ||
                                (approveDialogOrder ? updatingOrderId === approveDialogOrder.id : false)
                            }
                            onClick={confirmApproveReceipt}
                        >
                            Confirm Approval
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog
                open={disapproveDialogOrder !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setDisapproveDialogOrder(null);
                        setDisapprovalError(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Disapprove Receipt</DialogTitle>
                        <DialogDescription>
                            {disapproveDialogOrder
                                ? `Provide a reason for order #${disapproveDialogOrder.id}.`
                                : 'Provide a disapproval reason.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="disapproval-reason">Reason</Label>
                        <textarea
                            id="disapproval-reason"
                            className="border-input min-h-28 w-full rounded-md border px-3 py-2 text-sm"
                            value={disapprovalReason}
                            onChange={(event) => {
                                setDisapprovalReason(event.target.value);
                                if (disapprovalError) {
                                    setDisapprovalError(null);
                                }
                            }}
                            placeholder="Tell the customer what needs to be fixed"
                        />
                        {disapprovalError ? (
                            <p className="text-sm text-red-600">{disapprovalError}</p>
                        ) : null}
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={disapproveNotifyCustomer}
                            onChange={(event) => setDisapproveNotifyCustomer(event.target.checked)}
                        />
                        Notify customer by SMS
                    </label>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setDisapproveDialogOrder(null);
                                setDisapprovalError(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            disabled={
                                !disapproveDialogOrder ||
                                !disapprovalReason.trim() ||
                                (disapproveDialogOrder ? updatingOrderId === disapproveDialogOrder.id : false)
                            }
                            onClick={confirmDisapproveReceipt}
                        >
                            Confirm Disapproval
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
