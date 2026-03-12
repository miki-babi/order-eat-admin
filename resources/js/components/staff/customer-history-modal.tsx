import { Clock3, MapPin, Package, Store } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export type SourceChannel = 'web' | 'telegram' | 'table';

export type SelectedCustomer = {
    id: number;
    name: string;
    phone: string;
    telegram_id: string | null;
    telegram_username: string | null;
    source_summary: {
        total: number;
        web: number;
        telegram: number;
        table: number;
    };
    top_branch: {
        pickup_location: string;
        orders_count: number;
    } | null;
    branch_summary: Array<{
        pickup_location: string;
        orders_count: number;
    }>;
    top_order_hours: Array<{
        hour: number;
        label: string;
        orders_count: number;
    }>;
    top_order_weekdays: Array<{
        weekday: string;
        orders_count: number;
    }>;
    top_items: Array<{
        name: string;
        quantity: number;
        orders_count: number;
    }>;
    orders: Array<{
        id: number;
        pickup_date: string | null;
        pickup_location: string | null;
        source_channel: SourceChannel;
        table_name: string | null;
        order_status: string;
        receipt_status: string;
        total_amount: number;
        created_at: string | null;
        items: Array<{
            id: number;
            name: string | null;
            quantity: number;
            price: number;
            line_total: number;
        }>;
    }>;
};

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

function sourceChannelLabel(channel: SourceChannel): string {
    if (channel === 'telegram') return 'Telegram';
    if (channel === 'table') return 'Table';
    return 'Web';
}

function sourceBadgeClass(channel: SourceChannel): string {
    if (channel === 'telegram') return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200';
    if (channel === 'table') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    return 'bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200';
}

interface CustomerHistoryModalProps {
    customer: SelectedCustomer | null;
    onClose: () => void;
}

export function CustomerHistoryModal({ customer, onClose }: CustomerHistoryModalProps) {
    return (
        <Dialog
            open={Boolean(customer)}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            {customer && (
                <DialogContent className="max-h-[92vh] overflow-y-auto border-none p-0 sm:max-w-6xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Customer History</DialogTitle>
                        <DialogDescription>
                            Detailed order history, source channels, top branch, and ordering habits.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="border-b border-zinc-100 bg-[#212121] px-6 py-6 text-white md:px-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Client Dossier</p>
                                <h3 className="mt-2 text-2xl font-black">
                                    {customer.name}
                                </h3>
                                <p className="mt-1 font-bold text-[#F57C00] opacity-80">{customer.phone}</p>
                                {customer.telegram_username && (
                                    <p className="mt-1 text-xs font-semibold text-sky-200">@{customer.telegram_username}</p>
                                )}
                                {customer.telegram_id && (
                                    <p className="mt-1 text-[11px] font-semibold text-zinc-300">TG ID: {customer.telegram_id}</p>
                                )}
                            </div>
                            <div className="text-right">
                                <Badge className="border border-white/20 bg-white/10 font-black uppercase tracking-widest text-white shadow-none backdrop-blur-md">
                                    {customer.source_summary.total} Total Orders
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 p-4 md:p-8">
                        <div className="grid gap-4 lg:grid-cols-4">
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Source Mix</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge className="bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 shadow-none hover:bg-zinc-100">
                                        Web ({customer.source_summary.web})
                                    </Badge>
                                    <Badge className="bg-sky-50 text-sky-700 ring-1 ring-sky-200 shadow-none hover:bg-sky-50">
                                        Telegram ({customer.source_summary.telegram})
                                    </Badge>
                                    <Badge className="bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 shadow-none hover:bg-emerald-50">
                                        Table ({customer.source_summary.table})
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    <Clock3 className="size-3.5" />
                                    Frequent Time
                                </p>
                                <div className="mt-3 space-y-1.5">
                                    {customer.top_order_hours.length > 0 ? (
                                        customer.top_order_hours.map((entry) => (
                                            <p key={entry.hour} className="text-xs font-semibold text-zinc-700">
                                                {entry.label} <span className="text-zinc-400">({entry.orders_count})</span>
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-xs font-semibold text-zinc-400">No ordering pattern yet</p>
                                    )}
                                </div>
                                {customer.top_order_weekdays.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {customer.top_order_weekdays.map((entry) => (
                                            <Badge key={entry.weekday} className="bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200 shadow-none hover:bg-zinc-100">
                                                {entry.weekday} ({entry.orders_count})
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    <Store className="size-3.5" />
                                    Top Branch
                                </p>
                                <p className="mt-3 text-sm font-black text-[#212121]">
                                    {customer.top_branch?.pickup_location ?? 'N/A'}
                                </p>
                                {customer.top_branch && (
                                    <p className="text-xs font-semibold text-zinc-500">
                                        {customer.top_branch.orders_count} order(s)
                                    </p>
                                )}
                                {customer.branch_summary.length > 1 && (
                                    <div className="mt-3 space-y-1">
                                        {customer.branch_summary.slice(1).map((branch) => (
                                            <p key={branch.pickup_location} className="text-xs font-medium text-zinc-500">
                                                {branch.pickup_location}: {branch.orders_count}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    <Package className="size-3.5" />
                                    Most Ordered
                                </p>
                                <div className="mt-3 space-y-1.5">
                                    {customer.top_items.length > 0 ? (
                                        customer.top_items.slice(0, 4).map((item) => (
                                            <p key={item.name} className="text-xs font-semibold text-zinc-700">
                                                {item.name} <span className="text-zinc-400">x{item.quantity}</span>
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-xs font-semibold text-zinc-400">No items yet</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                <MapPin className="size-3.5" />
                                Recent Orders (20)
                            </p>
                            {customer.orders.length === 0 ? (
                                <div className="py-12 text-center">
                                    <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No order history found for this account</p>
                                </div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {customer.orders.map((order) => (
                                        <div key={order.id} className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50/50 p-5 transition-all hover:bg-white hover:shadow-md hover:ring-1 hover:ring-[#F57C00]/20">
                                            <div className="flex items-center justify-between gap-2">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Order Ref</p>
                                                    <p className="text-sm font-black text-[#212121]">#{order.id}</p>
                                                </div>
                                                <p className="text-lg font-black text-[#F57C00]">{currency(order.total_amount)}</p>
                                            </div>

                                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                                <Badge className={`rounded-lg px-2 py-0.5 text-[9px] font-black uppercase tracking-widest shadow-none hover:bg-transparent ${sourceBadgeClass(order.source_channel)}`}>
                                                    {sourceChannelLabel(order.source_channel)}
                                                </Badge>
                                                <Badge className="rounded-lg bg-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-zinc-500 ring-1 ring-zinc-200 shadow-none hover:bg-white">
                                                    {order.order_status}
                                                </Badge>
                                                <Badge className="rounded-lg bg-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#F57C00] ring-1 ring-[#F57C00]/20 shadow-none hover:bg-white">
                                                    Receipt {order.receipt_status}
                                                </Badge>
                                            </div>

                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Location</p>
                                                    <p className="truncate text-[11px] font-bold text-zinc-600">{order.pickup_location ?? 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Date</p>
                                                    <p className="text-[11px] font-bold text-zinc-600">{order.pickup_date ?? 'N/A'}</p>
                                                </div>
                                            </div>

                                            {order.table_name && (
                                                <p className="mt-2 text-[10px] font-semibold text-emerald-700">Table: {order.table_name}</p>
                                            )}

                                            <div className="mt-3">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Items</p>
                                                {order.items.length > 0 ? (
                                                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                                                        {order.items.map((item) => (
                                                            <Badge key={item.id} className="bg-white text-zinc-600 ring-1 ring-zinc-200 shadow-none hover:bg-white">
                                                                {item.quantity}x {item.name ?? 'Unknown'}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="mt-1 text-[11px] font-semibold text-zinc-400">No item details</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
}
