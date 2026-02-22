import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Clock3, MapPin, MessageSquare, Package, Search, Store, TrendingUp, Users } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type CustomerRow = {
    id: number;
    name: string;
    phone: string;
    telegram_id: string | null;
    telegram_username: string | null;
    orders_count: number;
    total_spent: number;
    last_order_at: string | null;
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

type SourceChannel = 'web' | 'telegram' | 'table';

type SelectedCustomer = {
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
} | null;

type Summary = {
    total_customers: number;
    active_customers: number;
};

type SmsTemplate = {
    key: string;
    label: string;
    body: string;
};

type SmsPlaceholder = {
    token: string;
    description: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/staff/customers',
    },
];

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

function sourceChannelLabel(channel: SourceChannel): string {
    if (channel === 'telegram') {
        return 'Telegram';
    }

    if (channel === 'table') {
        return 'Table';
    }

    return 'Web';
}

function sourceBadgeClass(channel: SourceChannel): string {
    if (channel === 'telegram') {
        return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200';
    }

    if (channel === 'table') {
        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
    }

    return 'bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200';
}

export default function StaffCustomers({
    customers,
    selectedCustomer,
    filters,
    smsTemplates,
    smsPlaceholders,
    summary,
}: {
    customers: Paginated<CustomerRow>;
    selectedCustomer: SelectedCustomer;
    filters: {
        search?: string | null;
        customer_id?: string | null;
    };
    smsTemplates: SmsTemplate[];
    smsPlaceholders: SmsPlaceholder[];
    summary: Summary;
}) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const searchForm = useForm({
        search: filters.search ?? '',
    });

    const smsForm = useForm({
        customer_ids: [] as number[],
        message: '',
    });

    const isAllOnPageSelected = useMemo(() => {
        if (customers.data.length === 0) {
            return false;
        }

        return customers.data.every((customer) => selectedIds.includes(customer.id));
    }, [customers.data, selectedIds]);

    const toggleCustomerSelection = (customerId: number) => {
        setSelectedIds((previous) => {
            if (previous.includes(customerId)) {
                return previous.filter((id) => id !== customerId);
            }
            return [...previous, customerId];
        });
    };

    const togglePageSelection = () => {
        if (isAllOnPageSelected) {
            setSelectedIds((previous) =>
                previous.filter((id) => !customers.data.some((customer) => customer.id === id)),
            );
            return;
        }

        setSelectedIds((previous) => [
            ...new Set([...previous, ...customers.data.map((customer) => customer.id)]),
        ]);
    };

    const applySearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get('/staff/customers', searchForm.data, {
            preserveState: true,
            replace: true,
        });
    };

    const sendSms = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        smsForm.transform((data) => ({
            ...data,
            customer_ids: selectedIds,
        }));
        smsForm.post('/staff/customers/sms', {
            preserveScroll: true,
            onSuccess: () => {
                smsForm.reset('message');
            },
        });
    };

    const closeHistoryModal = () => {
        if (typeof window === 'undefined') {
            router.get('/staff/customers', { search: searchForm.data.search || undefined }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
            return;
        }

        const params = new URLSearchParams(window.location.search);
        params.delete('customer_id');
        const nextQuery = params.toString();
        const nextUrl = nextQuery.length > 0 ? `/staff/customers?${nextQuery}` : '/staff/customers';

        router.get(nextUrl, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="space-y-8 bg-zinc-50/50 p-6 min-h-screen">
                {/* 📌 Header Summary Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">Total Customers</p>
                                    <h3 className="mt-2 text-3xl font-black text-[#212121]">{summary.total_customers.toLocaleString()}</h3>
                                </div>
                                <div className="rounded-2xl bg-[#F57C00]/10 p-3 text-[#F57C00]">
                                    <Users className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-emerald-500">Active (With Orders)</p>
                                    <h3 className="mt-2 text-3xl font-black text-[#212121]">{summary.active_customers.toLocaleString()}</h3>
                                </div>
                                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-500">
                                    <TrendingUp className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 📌 Search & Filter Section */}
                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <Search className="size-4 text-[#F57C00]" />
                            Search Database
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form className="flex flex-wrap items-end gap-3" onSubmit={applySearch}>
                            <div className="min-w-[300px] flex-1">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="search">Name or Phone Number</Label>
                                <div className="relative mt-1.5">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                                    <Input
                                        id="search"
                                        className="h-11 pl-10 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                        value={searchForm.data.search}
                                        onChange={(event) => searchForm.setData('search', event.target.value)}
                                        placeholder="Enter name, phone, @username, or Telegram ID..."
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="h-11 px-8 rounded-xl bg-[#F57C00] font-black shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100]">Apply Filter</Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 rounded-xl font-bold border-zinc-200"
                                onClick={() => router.get('/staff/customers')}
                            >
                                Reset
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* 📌 Customer List Table */}
                <Card className="overflow-hidden border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-white py-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                                <Users className="size-4 text-[#F57C00]" />
                                Customer Directory
                            </CardTitle>
                            {selectedIds.length > 0 && (
                                <Badge className="bg-[#F57C00] font-black uppercase tracking-tighter shadow-none">
                                    {selectedIds.length} Selected
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-zinc-100 bg-zinc-50/50">
                                        <th className="w-12 px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                checked={isAllOnPageSelected}
                                                onChange={togglePageSelection}
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Customer Info</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Order Stats</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Volume</th>
                                        <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.data.map((customer) => (
                                        <tr key={customer.id} className="group border-b border-zinc-50 transition-colors hover:bg-zinc-50/50 last:border-0">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                    checked={selectedIds.includes(customer.id)}
                                                    onChange={() => toggleCustomerSelection(customer.id)}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-xs font-black text-zinc-500 transition-colors group-hover:bg-[#F57C00]/10 group-hover:text-[#F57C00]">
                                                        {customer.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-[#212121]">{customer.name}</p>
                                                        <p className="text-xs font-medium text-zinc-500">{customer.phone}</p>
                                                        {customer.telegram_username && (
                                                            <p className="text-[11px] font-semibold text-sky-600">@{customer.telegram_username}</p>
                                                        )}
                                                        {customer.telegram_id && (
                                                            <p className="text-[10px] font-semibold text-zinc-400">TG ID: {customer.telegram_id}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Badge className="bg-zinc-100 font-bold text-zinc-700 shadow-none ring-1 ring-zinc-200">
                                                        {customer.orders_count} Orders
                                                    </Badge>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-black text-[#212121]">{currency(customer.total_spent)}</p>
                                                {customer.last_order_at && (
                                                    <p className="text-[10px] font-medium text-zinc-400">Last: {customer.last_order_at}</p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="sm" asChild className="h-8 rounded-lg font-bold text-[#F57C00] hover:bg-[#F57C00]/10">
                                                    <Link
                                                        href={`/staff/customers?search=${encodeURIComponent(
                                                            searchForm.data.search ?? '',
                                                        )}&customer_id=${customer.id}`}
                                                        preserveState
                                                        preserveScroll
                                                    >
                                                        View History
                                                    </Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* 📌 SMS Composer Section */}
                <Card className="border-none shadow-lg ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <MessageSquare className="size-4 text-[#F57C00]" />
                            Outreach & Promotions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form className="grid gap-8 lg:grid-cols-12" onSubmit={sendSms}>
                            {/* Templates Column */}
                            <div className="lg:col-span-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Message Templates</Label>
                                    <Badge variant="outline" className="text-[10px] font-bold text-[#F57C00] border-[#F57C00]/30">{smsTemplates.length}</Badge>
                                </div>
                                <div className="grid gap-2">
                                    {smsTemplates.length > 0 ? (
                                        <div className="flex flex-col gap-2">
                                            {smsTemplates.map((template) => (
                                                <button
                                                    key={template.key}
                                                    type="button"
                                                    onClick={() => smsForm.setData('message', template.body)}
                                                    className="flex flex-col rounded-xl border border-zinc-100 bg-zinc-50/50 p-3 text-left transition-all hover:border-[#F57C00]/30 hover:bg-white hover:shadow-sm"
                                                >
                                                    <span className="text-xs font-black text-[#212121]">{template.label}</span>
                                                    <span className="mt-1 line-clamp-1 text-[10px] text-zinc-500">{template.body}</span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-xl border border-dashed border-zinc-200 py-6 text-center">
                                            <p className="text-[10px] font-bold text-zinc-400">No templates defined</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Message Composer Column */}
                            <div className="lg:col-span-8 space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Compose Message</Label>
                                    <span className={`text-[10px] font-black tracking-widest ${smsForm.data.message.length > 400 ? 'text-rose-500' : 'text-zinc-400'}`}>
                                        {smsForm.data.message.length}/480 Characters
                                    </span>
                                </div>

                                <div className="relative">
                                    <textarea
                                        id="message"
                                        className="min-h-[160px] w-full rounded-2xl border border-zinc-200 bg-white p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20 transition-all placeholder:text-zinc-300"
                                        value={smsForm.data.message}
                                        maxLength={480}
                                        onChange={(event) => smsForm.setData('message', event.target.value)}
                                        placeholder="Enter your promotional or notification message here..."
                                    />
                                    <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-[10px] font-black text-zinc-400 ring-1 ring-zinc-200">
                                        {selectedIds.length}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div className="flex-1 space-y-1">
                                        {smsPlaceholders.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {smsPlaceholders.map((placeholder) => (
                                                    <Badge key={placeholder.token} variant="outline" className="cursor-help rounded-lg border-zinc-200 bg-white px-2 py-0.5 text-[9px] font-bold text-zinc-500 hover:text-[#F57C00]" title={placeholder.description}>
                                                        {`{${placeholder.token}}`}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Click to use placeholders in your message</p>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={smsForm.processing || selectedIds.length === 0 || !smsForm.data.message}
                                        className="h-12 px-10 rounded-xl bg-[#212121] font-black shadow-lg shadow-zinc-200 hover:bg-[#F57C00] transition-colors"
                                    >
                                        {smsForm.processing ? 'Delivering...' : `Send to ${selectedIds.length} Recipients`}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* 📌 Customer History Modal */}
                <Dialog
                    open={Boolean(selectedCustomer)}
                    onOpenChange={(open) => {
                        if (!open) {
                            closeHistoryModal();
                        }
                    }}
                >
                    {selectedCustomer ? (
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
                                            {selectedCustomer.name}
                                        </h3>
                                        <p className="mt-1 font-bold text-[#F57C00] opacity-80">{selectedCustomer.phone}</p>
                                        {selectedCustomer.telegram_username && (
                                            <p className="mt-1 text-xs font-semibold text-sky-200">@{selectedCustomer.telegram_username}</p>
                                        )}
                                        {selectedCustomer.telegram_id && (
                                            <p className="mt-1 text-[11px] font-semibold text-zinc-300">TG ID: {selectedCustomer.telegram_id}</p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <Badge className="border border-white/20 bg-white/10 font-black uppercase tracking-widest text-white shadow-none backdrop-blur-md">
                                            {selectedCustomer.source_summary.total} Total Orders
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6 p-4 md:p-8">
                                <div className="grid gap-4 lg:grid-cols-4">
                                    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Source Mix</p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <Badge className="bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 shadow-none">
                                                Web {selectedCustomer.source_summary.web}
                                            </Badge>
                                            <Badge className="bg-sky-50 text-sky-700 ring-1 ring-sky-200 shadow-none">
                                                Telegram {selectedCustomer.source_summary.telegram}
                                            </Badge>
                                            <Badge className="bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 shadow-none">
                                                Table {selectedCustomer.source_summary.table}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                        <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                            <Clock3 className="size-3.5" />
                                            Frequent Time
                                        </p>
                                        <div className="mt-3 space-y-1.5">
                                            {selectedCustomer.top_order_hours.length > 0 ? (
                                                selectedCustomer.top_order_hours.map((entry) => (
                                                    <p key={entry.hour} className="text-xs font-semibold text-zinc-700">
                                                        {entry.label} <span className="text-zinc-400">({entry.orders_count})</span>
                                                    </p>
                                                ))
                                            ) : (
                                                <p className="text-xs font-semibold text-zinc-400">No ordering pattern yet</p>
                                            )}
                                        </div>
                                        {selectedCustomer.top_order_weekdays.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                {selectedCustomer.top_order_weekdays.map((entry) => (
                                                    <Badge key={entry.weekday} className="bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200 shadow-none">
                                                        {entry.weekday} {entry.orders_count}
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
                                            {selectedCustomer.top_branch?.pickup_location ?? 'N/A'}
                                        </p>
                                        {selectedCustomer.top_branch && (
                                            <p className="text-xs font-semibold text-zinc-500">
                                                {selectedCustomer.top_branch.orders_count} order(s)
                                            </p>
                                        )}
                                        {selectedCustomer.branch_summary.length > 1 && (
                                            <div className="mt-3 space-y-1">
                                                {selectedCustomer.branch_summary.slice(1).map((branch) => (
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
                                            {selectedCustomer.top_items.length > 0 ? (
                                                selectedCustomer.top_items.slice(0, 4).map((item) => (
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
                                    {selectedCustomer.orders.length === 0 ? (
                                        <div className="py-12 text-center">
                                            <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No order history found for this account</p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {selectedCustomer.orders.map((order) => (
                                                <div key={order.id} className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50/50 p-5 transition-all hover:bg-white hover:shadow-md hover:ring-1 hover:ring-[#F57C00]/20">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Order Ref</p>
                                                            <p className="text-sm font-black text-[#212121]">#{order.id}</p>
                                                        </div>
                                                        <p className="text-lg font-black text-[#F57C00]">{currency(order.total_amount)}</p>
                                                    </div>
                                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                                        <Badge className={`rounded-lg px-2 py-0.5 text-[9px] font-black uppercase tracking-widest shadow-none ${sourceBadgeClass(order.source_channel)}`}>
                                                            {sourceChannelLabel(order.source_channel)}
                                                        </Badge>
                                                        <Badge className="rounded-lg bg-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-zinc-500 ring-1 ring-zinc-200 shadow-none">
                                                            {order.order_status}
                                                        </Badge>
                                                        <Badge className="rounded-lg bg-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[#F57C00] ring-1 ring-[#F57C00]/20 shadow-none">
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
                                                                    <Badge key={item.id} className="bg-white text-zinc-600 ring-1 ring-zinc-200 shadow-none">
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
                    ) : null}
                </Dialog>

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-muted-foreground text-sm">
                        Showing {customers.from ?? 0} to {customers.to ?? 0} of {customers.total} customer(s)
                    </p>
                    <div className="flex items-center gap-2">
                        {customers.links.map((link) => (
                            <Button
                                key={link.label}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                asChild={Boolean(link.url)}
                                className={`h-11 rounded-xl px-4 font-bold transition-all ${link.active ? 'bg-[#F57C00] text-white shadow-lg shadow-[#F57C00]/20' : 'text-zinc-500 border-zinc-200'}`}
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
        </AppLayout>
    );
}
