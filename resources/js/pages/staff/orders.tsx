import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowRight, ChevronLeft, ChevronRight, ClipboardList, Clock3, Coffee, Filter, Receipt, Search, MapPin } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
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
    const [approveDialogOrder, setApproveDialogOrder] = useState<OrderRow | null>(null);
    const [approveNotifyCustomer, setApproveNotifyCustomer] = useState(true);
    const [disapproveDialogOrder, setDisapproveDialogOrder] = useState<OrderRow | null>(null);
    const [disapprovalReason, setDisapprovalReason] = useState('');
    const [disapproveNotifyCustomer, setDisapproveNotifyCustomer] = useState(true);
    const [disapprovalError, setDisapprovalError] = useState<string | null>(null);
    const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);

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

                {/* 📌 Section 2 — Filter Panel */}
                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <Filter className="size-4 text-[#F57C00]" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="mb-5 flex flex-wrap gap-2">
                            {sourceTabs.map((source) => {
                                const active = form.data.source_channel === source;

                                return (
                                    <Button
                                        key={source}
                                        type="button"
                                        size="sm"
                                        variant={active ? 'default' : 'outline'}
                                        className={`rounded-full px-4 text-xs font-black uppercase tracking-widest transition-all ${
                                            active
                                                ? 'bg-[#F57C00] text-white shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100]'
                                                : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                                        }`}
                                        onClick={() => selectSourceTab(source)}
                                    >
                                        {sourceLabel[source]} ({sourceSummary[source]})
                                    </Button>
                                );
                            })}
                        </div>
                        <form className="grid gap-6 md:grid-cols-4 lg:grid-cols-6" onSubmit={applyFilters}>
                            <div className="lg:col-span-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="search">Search</Label>
                                <div className="relative mt-1.5">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                                    <Input
                                        id="search"
                                        className="h-11 pl-10 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                        value={form.data.search}
                                        onChange={(event) => form.setData('search', event.target.value)}
                                        placeholder="Order ID, customer, phone, table..."
                                    />
                                </div>
                            </div>
                            <div>
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="status">Order Status</Label>
                                <select
                                    id="status"
                                    className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20 transition-all font-medium"
                                    value={form.data.status}
                                    onChange={(event) => form.setData('status', event.target.value)}
                                >
                                    <option value="">All Statuses</option>
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="receipt_status">Receipt</Label>
                                <select
                                    id="receipt_status"
                                    className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20 transition-all font-medium"
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
                            <div>
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    className="mt-1.5 h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                    value={form.data.date}
                                    onChange={(event) => form.setData('date', event.target.value)}
                                />
                            </div>
                            <div className="flex items-end gap-2 lg:col-span-1">
                                <Button type="submit" className="h-11 flex-1 rounded-xl bg-[#F57C00] font-black shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100]">Apply</Button>
                                <Button type="button" variant="outline" onClick={clearFilters} className="h-11 rounded-xl font-bold">Reset</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* 📌 Section 3 — Order Queue */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-black uppercase tracking-widest text-[#212121]">
                            <ClipboardList className="size-5 text-[#F57C00]" />
                            Order Queue
                        </h2>
                        <Badge variant="outline" className="rounded-full px-4 py-1 text-xs font-bold text-zinc-500">
                            {orders.total} Total Orders
                        </Badge>
                    </div>

                    {orders.data.length === 0 ? (
                        <Card className="border-dashed border-2 p-12 text-center bg-white shadow-none">
                            <p className="text-zinc-500 font-medium">No orders found for current filters.</p>
                        </Card>
                    ) : (
                        orders.data.map((order) => (
                            <Card key={order.id} className="overflow-hidden border-none shadow-md ring-1 ring-zinc-200 transition-all hover:ring-[#F57C00]/30 hover:shadow-xl">
                                <div className="border-b border-zinc-100 bg-white px-6 py-4">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F57C00]/10 text-[#F57C00]">
                                                <span className="text-base font-black">#{order.id}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-[#212121]">{order.customer_name}</h3>
                                                <p className="text-sm font-bold text-zinc-500">
                                                    {order.customer_phone} • <span className="text-[#F57C00]">ETB {order.total_amount.toLocaleString()}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Badge className={`rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest shadow-none border-none ${
                                                order.source_channel === 'web'
                                                    ? 'bg-zinc-100 text-zinc-700'
                                                    : order.source_channel === 'telegram'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-orange-100 text-orange-700'
                                            }`}>
                                                {order.source_channel}
                                            </Badge>
                                            <Badge className={`rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest shadow-none border-none ${badgeStyle(order.order_status)}`}>
                                                {order.order_status}
                                            </Badge>
                                            <Badge className={`rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest shadow-none border-none ${badgeStyle(order.receipt_status)}`}>
                                                Receipt {order.receipt_status}
                                            </Badge>
                                            <Button variant="ghost" size="sm" asChild className="h-8 gap-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:text-[#F57C00]">
                                                <a href={order.tracking_url} target="_blank" rel="noreferrer">
                                                    Live Tracking <ArrowRight className="size-3" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <div className="grid gap-8 lg:grid-cols-12">
                                        {/* Order Details List */}
                                        <div className="lg:col-span-5 space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Order Items</h4>
                                            <div className="space-y-3">
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="flex items-center justify-between rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-10 shrink-0 overflow-hidden rounded-lg border bg-white shadow-sm">
                                                                {item.image_url ? (
                                                                    <img src={item.image_url} alt={item.name ?? 'Item'} className="h-full w-full object-cover" />
                                                                ) : (
                                                                    <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-[8px] font-bold uppercase text-zinc-400">Prep</div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-[#212121]">{item.name}</p>
                                                                <p className="text-xs font-medium text-zinc-500">Qty: {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <span className="text-sm font-black text-[#212121]">{currency(item.line_total)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-2">
                                                <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                                    <MapPin className="size-3" />
                                                    {order.pickup_location} • {order.pickup_date}
                                                </p>
                                                {order.table_name ? (
                                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                                        <Badge className="bg-zinc-100 text-zinc-700">
                                                            Table {order.table_name}
                                                        </Badge>
                                                        <Badge className={order.table_session_verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}>
                                                            Session {order.table_session_verified ? 'Verified' : 'Unverified'}
                                                        </Badge>
                                                        {order.table_session_token_short ? (
                                                            <span className="text-[10px] font-mono text-zinc-500">
                                                                {order.table_session_token_short}...
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>

                                        {/* Action Controls */}
                                        <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-zinc-100 lg:pl-8">
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-3">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Order Status</Label>
                                                    <select
                                                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm font-bold text-[#212121] focus:ring-2 focus:ring-[#F57C00]/20 outline-none transition-all"
                                                        value={order.order_status}
                                                        disabled={updatingOrderId === order.id}
                                                        onChange={(event) =>
                                                            updateOrder(order.id, {
                                                                order_status: event.target.value,
                                                            })
                                                        }
                                                    >
                                                        {statusOptions.map((status) => (
                                                            <option key={status} value={status}>
                                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-3">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Receipt Status</Label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Button
                                                            size="sm"
                                                            className={`h-11 rounded-xl font-bold shadow-sm transition-all ${order.receipt_status === 'approved' ? 'bg-emerald-600 text-white' : 'bg-white border-zinc-200 text-[#212121] hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'}`}
                                                            variant={order.receipt_status === 'approved' ? 'default' : 'outline'}
                                                            disabled={updatingOrderId === order.id}
                                                            onClick={() => openApproveDialog(order)}
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className={`h-11 rounded-xl font-bold shadow-sm transition-all ${order.receipt_status === 'disapproved' ? 'bg-rose-600 text-white' : 'bg-white border-zinc-200 text-[#212121] hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'}`}
                                                            variant={order.receipt_status === 'disapproved' ? 'destructive' : 'outline'}
                                                            disabled={updatingOrderId === order.id}
                                                            onClick={() => openDisapproveDialog(order)}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-100">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-zinc-100">
                                                            <Receipt className={`size-5 ${order.receipt_url ? 'text-[#F57C00]' : 'text-zinc-300'}`} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Receipt Visualization</p>
                                                            {order.receipt_url ? (
                                                                <a href={order.receipt_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#F57C00] hover:underline">
                                                                    View Payment Receipt
                                                                </a>
                                                            ) : (
                                                                <p className="text-xs font-bold text-zinc-400">No receipt uploaded yet</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {order.disapproval_reason && (
                                                        <div className="text-right">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-400">Reject Reason</p>
                                                            <p className="text-xs font-bold text-rose-600">{order.disapproval_reason}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
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
