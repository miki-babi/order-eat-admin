import { Head, Link, router, useForm } from '@inertiajs/react';
import { Filter, Receipt, Search } from 'lucide-react';
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
};

type Summary = {
    total_orders: number;
    pending_orders: number;
    pending_receipts: number;
    ready_orders: number;
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

function badgeVariant(
    value: 'pending' | 'approved' | 'disapproved' | 'preparing' | 'ready' | 'completed',
): 'default' | 'secondary' | 'destructive' | 'outline' {
    if (value === 'approved' || value === 'ready') {
        return 'default';
    }

    if (value === 'disapproved') {
        return 'destructive';
    }

    if (value === 'preparing') {
        return 'secondary';
    }

    if (value === 'completed') {
        return 'outline';
    }

    return 'secondary';
}

export default function StaffOrders({
    orders,
    pickupLocations,
    filters,
    statusOptions,
    receiptStatusOptions,
    summary,
}: {
    orders: Paginated<OrderRow>;
    pickupLocations: PickupLocation[];
    filters: Filters;
    statusOptions: string[];
    receiptStatusOptions: string[];
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
        });
        router.get('/staff/orders', {}, { preserveState: true, replace: true });
    };

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
            <div className="space-y-5 p-4">
                <div className="grid gap-3 md:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Total Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.total_orders}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Pending Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.pending_orders}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Pending Receipts</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.pending_receipts}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Ready Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.ready_orders}</CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Filter className="size-4" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-3 md:grid-cols-7" onSubmit={applyFilters}>
                            <div className="md:col-span-2">
                                <Label htmlFor="search">Search</Label>
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-2.5 left-3 size-4" />
                                    <Input
                                        id="search"
                                        className="pl-9"
                                        value={form.data.search}
                                        onChange={(event) => form.setData('search', event.target.value)}
                                        placeholder="Order ID, customer, phone"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="status">Order Status</Label>
                                <select
                                    id="status"
                                    className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                                    value={form.data.status}
                                    onChange={(event) => form.setData('status', event.target.value)}
                                >
                                    <option value="">All</option>
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="receipt_status">Receipt Status</Label>
                                <select
                                    id="receipt_status"
                                    className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                                    value={form.data.receipt_status}
                                    onChange={(event) =>
                                        form.setData('receipt_status', event.target.value)
                                    }
                                >
                                    <option value="">All</option>
                                    {receiptStatusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="location">Pickup Location</Label>
                                <select
                                    id="location"
                                    className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                                    value={form.data.pickup_location_id}
                                    onChange={(event) =>
                                        form.setData('pickup_location_id', event.target.value)
                                    }
                                >
                                    <option value="">All</option>
                                    {pickupLocations.map((location) => (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="date">Pickup Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={form.data.date}
                                    onChange={(event) => form.setData('date', event.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="time_bucket">Time Window</Label>
                                <select
                                    id="time_bucket"
                                    className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                                    value={form.data.time_bucket}
                                    onChange={(event) => form.setData('time_bucket', event.target.value)}
                                >
                                    <option value="">All</option>
                                    <option value="today">Today</option>
                                    <option value="tomorrow">Tomorrow</option>
                                    <option value="upcoming">Upcoming</option>
                                </select>
                            </div>
                            <div className="md:col-span-7 flex items-end gap-2">
                                <Button type="submit">Apply</Button>
                                <Button type="button" variant="outline" onClick={clearFilters}>
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Receipt className="size-4" />
                            Order Queue
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {orders.data.length === 0 ? (
                            <p className="text-muted-foreground text-sm">No orders found for current filters.</p>
                        ) : (
                            orders.data.map((order) => (
                                <div key={order.id} className="space-y-3 rounded-lg border p-4">
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                        <div>
                                            <p className="text-sm font-semibold">
                                                Order #{order.id} | {order.customer_name}
                                            </p>
                                            <p className="text-sm text-zinc-500">
                                                {order.customer_phone} | Pickup: {order.pickup_date} at{' '}
                                                {order.pickup_location}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                Ready SMS:{' '}
                                                {order.notify_when_ready
                                                    ? 'Customer opted in'
                                                    : 'Customer opted out'}
                                            </p>
                                            <p className="text-sm font-medium">{currency(order.total_amount)}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={badgeVariant(order.order_status)}>
                                                {order.order_status}
                                            </Badge>
                                            <Badge variant={badgeVariant(order.receipt_status)}>
                                                {order.receipt_status}
                                            </Badge>
                                            <a
                                                href={order.tracking_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-sm text-blue-600 underline"
                                            >
                                                Tracking Link
                                            </a>
                                        </div>
                                    </div>

                                    <div className="grid gap-3 rounded-md bg-zinc-50 p-3 md:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label className="text-xs">Order Status</Label>
                                            <select
                                                className="border-input h-9 w-full rounded-md border bg-white px-3 text-sm"
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
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs">Receipt Status</Label>
                                            <div className="flex flex-wrap gap-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    disabled={updatingOrderId === order.id}
                                                    onClick={() => openApproveDialog(order)}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    disabled={updatingOrderId === order.id}
                                                    onClick={() =>
                                                        updateOrder(order.id, { receipt_status: 'pending' })
                                                    }
                                                >
                                                    Pending
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="destructive"
                                                    disabled={updatingOrderId === order.id}
                                                    onClick={() => openDisapproveDialog(order)}
                                                >
                                                    Disapprove
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs">Receipt</Label>
                                            {order.receipt_url ? (
                                                <a
                                                    href={order.receipt_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm text-blue-600 underline"
                                                >
                                                    View uploaded receipt
                                                </a>
                                            ) : (
                                                <p className="text-sm text-zinc-500">No receipt uploaded.</p>
                                            )}
                                            {order.disapproval_reason ? (
                                                <p className="text-xs text-red-600">
                                                    Reason: {order.disapproval_reason}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="space-y-1 text-sm">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex justify-between">
                                                <span>
                                                    {item.name ?? 'Item'} x {item.quantity}
                                                </span>
                                                <span>{currency(item.line_total)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

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
                            >
                                {link.url ? (
                                    <Link href={link.url} preserveState preserveScroll>
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </Link>
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
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
