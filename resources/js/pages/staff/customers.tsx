import { Head, Link, router, useForm } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Clock3, MapPin, MessageSquare, Package, Search, Store, TrendingUp, Users } from 'lucide-react';
import { useMemo, useRef, useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { CustomerHistoryModal, type SelectedCustomer } from '@/components/staff/customer-history-modal';
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

type OutreachPlatform = 'sms' | 'telegram';

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
        platform: 'sms' as OutreachPlatform,
        message: '',
        telegram_button_text: '',
        telegram_button_url: '',
    });
    const messageTextareaRef = useRef<HTMLTextAreaElement | null>(null);
    const isTelegramPlatform = smsForm.data.platform === 'telegram';
    const messageLimit = isTelegramPlatform ? 2000 : 480;
    const hasPartialTelegramButton =
        isTelegramPlatform &&
        ((smsForm.data.telegram_button_text.trim() === '') !==
            (smsForm.data.telegram_button_url.trim() === ''));

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
                smsForm.reset('message', 'telegram_button_text', 'telegram_button_url');
            },
        });
    };

    const insertMessageToken = (token: string) => {
        const tokenText = `{${token}}`;
        const textarea = messageTextareaRef.current;
        const currentMessage = smsForm.data.message;

        if (!textarea) {
            smsForm.setData('message', `${currentMessage}${tokenText}`.slice(0, messageLimit));
            return;
        }

        const selectionStart = textarea.selectionStart ?? currentMessage.length;
        const selectionEnd = textarea.selectionEnd ?? selectionStart;
        const nextMessage = `${currentMessage.slice(0, selectionStart)}${tokenText}${currentMessage.slice(selectionEnd)}`.slice(
            0,
            messageLimit,
        );

        smsForm.setData('message', nextMessage);

        const cursorPosition = Math.min(selectionStart + tokenText.length, nextMessage.length);
        const refocusTextarea = () => {
            textarea.focus();
            textarea.setSelectionRange(cursorPosition, cursorPosition);
        };

        if (typeof window !== 'undefined') {
            window.requestAnimationFrame(refocusTextarea);
            return;
        }

        refocusTextarea();
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
                                <div className="flex items-center justify-between gap-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Delivery Channel</Label>
                                    <div className="inline-flex rounded-xl border border-zinc-200 bg-white p-1">
                                        <button
                                            type="button"
                                            className={`rounded-lg px-4 py-1.5 text-xs font-black transition-colors ${
                                                smsForm.data.platform === 'sms'
                                                    ? 'bg-[#212121] text-white'
                                                    : 'text-zinc-600 hover:bg-zinc-50'
                                            }`}
                                            onClick={() => {
                                                smsForm.setData('platform', 'sms');
                                                smsForm.setData('telegram_button_text', '');
                                                smsForm.setData('telegram_button_url', '');
                                            }}
                                        >
                                            SMS
                                        </button>
                                        <button
                                            type="button"
                                            className={`rounded-lg px-4 py-1.5 text-xs font-black transition-colors ${
                                                smsForm.data.platform === 'telegram'
                                                    ? 'bg-[#212121] text-white'
                                                    : 'text-zinc-600 hover:bg-zinc-50'
                                            }`}
                                            onClick={() => smsForm.setData('platform', 'telegram')}
                                        >
                                            Telegram
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Compose Message</Label>
                                    <span className={`text-[10px] font-black tracking-widest ${smsForm.data.message.length > Math.floor(messageLimit * 0.85) ? 'text-rose-500' : 'text-zinc-400'}`}>
                                        {smsForm.data.message.length}/{messageLimit} Characters
                                    </span>
                                </div>

                                <div className="relative">
                                    <textarea
                                        id="message"
                                        ref={messageTextareaRef}
                                        className="min-h-[160px] w-full rounded-2xl border border-zinc-200 bg-white p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20 transition-all placeholder:text-zinc-300"
                                        value={smsForm.data.message}
                                        maxLength={messageLimit}
                                        onChange={(event) => smsForm.setData('message', event.target.value)}
                                        placeholder={
                                            isTelegramPlatform
                                                ? 'Enter your Telegram outreach message. Optional inline button fields are below.'
                                                : 'Enter your promotional or notification SMS here...'
                                        }
                                    />
                                    <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-[10px] font-black text-zinc-400 ring-1 ring-zinc-200">
                                        {selectedIds.length}
                                    </div>
                                </div>

                                {isTelegramPlatform && (
                                    <div className="grid gap-3 md:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="telegram_button_text">
                                                Inline Button Text
                                            </Label>
                                            <Input
                                                id="telegram_button_text"
                                                className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                                value={smsForm.data.telegram_button_text}
                                                maxLength={64}
                                                onChange={(event) => smsForm.setData('telegram_button_text', event.target.value)}
                                                placeholder="Open Offer"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="telegram_button_url">
                                                Inline Button URL
                                            </Label>
                                            <Input
                                                id="telegram_button_url"
                                                type="url"
                                                className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                                value={smsForm.data.telegram_button_url}
                                                onChange={(event) => smsForm.setData('telegram_button_url', event.target.value)}
                                                placeholder="https://example.com/promo"
                                            />
                                        </div>
                                        <p className={`text-[10px] font-bold uppercase tracking-widest md:col-span-2 ${
                                            hasPartialTelegramButton ? 'text-rose-500' : 'text-zinc-400'
                                        }`}>
                                            {hasPartialTelegramButton
                                                ? 'Provide both button text and URL, or leave both empty.'
                                                : 'If provided, Telegram recipients will receive a primary inline button.'}
                                        </p>
                                    </div>
                                )}

                                {(smsForm.errors.message || smsForm.errors.telegram_button_text || smsForm.errors.telegram_button_url) && (
                                    <div className="space-y-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                                        {smsForm.errors.message ? (
                                            <p className="text-[11px] font-bold text-rose-700">{smsForm.errors.message}</p>
                                        ) : null}
                                        {smsForm.errors.telegram_button_text ? (
                                            <p className="text-[11px] font-bold text-rose-700">{smsForm.errors.telegram_button_text}</p>
                                        ) : null}
                                        {smsForm.errors.telegram_button_url ? (
                                            <p className="text-[11px] font-bold text-rose-700">{smsForm.errors.telegram_button_url}</p>
                                        ) : null}
                                    </div>
                                )}

                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div className="flex-1 space-y-1">
                                        {smsPlaceholders.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {smsPlaceholders.map((placeholder) => (
                                                    <Badge
                                                        key={placeholder.token}
                                                        asChild
                                                        variant="outline"
                                                        className="rounded-lg border-zinc-200 bg-white px-0 py-0 text-[9px] font-bold text-zinc-500"
                                                    >
                                                        <button
                                                            type="button"
                                                            className="rounded-lg px-2 py-0.5 transition-colors hover:bg-zinc-50 hover:text-[#F57C00]"
                                                            title={placeholder.description}
                                                            onClick={() => insertMessageToken(placeholder.token)}
                                                        >
                                                            {`{${placeholder.token}}`}
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Click to use placeholders in your message</p>
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={
                                            smsForm.processing ||
                                            selectedIds.length === 0 ||
                                            smsForm.data.message.trim() === '' ||
                                            hasPartialTelegramButton
                                        }
                                        className="h-12 px-10 rounded-xl bg-[#212121] font-black shadow-lg shadow-zinc-200 hover:bg-[#F57C00] transition-colors"
                                    >
                                        {smsForm.processing
                                            ? 'Delivering...'
                                            : `Send ${isTelegramPlatform ? 'Telegram' : 'SMS'} to ${selectedIds.length} Recipients`}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* 📌 Customer History Modal */}
                <CustomerHistoryModal
                    customer={selectedCustomer}
                    onClose={closeHistoryModal}
                />

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
