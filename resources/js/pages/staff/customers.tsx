import { Head, Link, router, useForm } from '@inertiajs/react';
import { MessageSquare, Search, Users } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type CustomerRow = {
    id: number;
    name: string;
    phone: string;
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

type SelectedCustomer = {
    id: number;
    name: string;
    phone: string;
    orders: Array<{
        id: number;
        pickup_date: string;
        pickup_location: string | null;
        order_status: string;
        receipt_status: string;
        total_amount: number;
        created_at: string | null;
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="space-y-5 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Total Customers</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.total_customers}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Customers With Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.active_customers}</CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Search className="size-4" />
                            Search Customers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-wrap items-end gap-2" onSubmit={applySearch}>
                            <div className="min-w-[260px] flex-1">
                                <Label htmlFor="search">Search by name or phone</Label>
                                <Input
                                    id="search"
                                    value={searchForm.data.search}
                                    onChange={(event) => searchForm.setData('search', event.target.value)}
                                    placeholder="Customer name or phone"
                                />
                            </div>
                            <Button type="submit">Apply</Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.get('/staff/customers')}
                            >
                                Reset
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Users className="size-4" />
                            Customer List
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="rounded-md border">
                            <div className="grid grid-cols-[42px_1.2fr_1fr_120px_140px_160px] gap-2 border-b bg-zinc-50 px-3 py-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
                                <label className="flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={isAllOnPageSelected}
                                        onChange={togglePageSelection}
                                    />
                                </label>
                                <span>Name</span>
                                <span>Phone</span>
                                <span>Orders</span>
                                <span>Total Spent</span>
                                <span>Action</span>
                            </div>
                            {customers.data.map((customer) => (
                                <div
                                    key={customer.id}
                                    className="grid grid-cols-[42px_1.2fr_1fr_120px_140px_160px] items-center gap-2 border-b px-3 py-2 text-sm last:border-b-0"
                                >
                                    <label className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(customer.id)}
                                            onChange={() => toggleCustomerSelection(customer.id)}
                                        />
                                    </label>
                                    <span className="truncate">{customer.name}</span>
                                    <span>{customer.phone}</span>
                                    <span>{customer.orders_count}</span>
                                    <span>{currency(customer.total_spent)}</span>
                                    <span>
                                        <Link
                                            href={`/staff/customers?search=${encodeURIComponent(
                                                searchForm.data.search ?? '',
                                            )}&customer_id=${customer.id}`}
                                            preserveState
                                            preserveScroll
                                            className="text-blue-600 underline"
                                        >
                                            History
                                        </Link>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <MessageSquare className="size-4" />
                            Send SMS / Promo Message
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-3" onSubmit={sendSms}>
                            <p className="text-muted-foreground text-sm">
                                Selected customers: {selectedIds.length}
                            </p>
                            {smsTemplates.length > 0 ? (
                                <div className="grid gap-2">
                                    <Label>Templates</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {smsTemplates.map((template) => (
                                            <Button
                                                key={template.key}
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                onClick={() => smsForm.setData('message', template.body)}
                                            >
                                                {template.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                            <div className="grid gap-2">
                                <Label htmlFor="message">
                                    Message (supports placeholders)
                                </Label>
                                <textarea
                                    id="message"
                                    className="border-input min-h-28 rounded-md border px-3 py-2 text-sm"
                                    value={smsForm.data.message}
                                    maxLength={480}
                                    onChange={(event) => smsForm.setData('message', event.target.value)}
                                    placeholder="Type promotional or follow-up SMS content"
                                />
                                {smsPlaceholders.length > 0 ? (
                                    <p className="text-muted-foreground text-xs">
                                        Available placeholders:{' '}
                                        {smsPlaceholders
                                            .map(
                                                (placeholder) =>
                                                    `{${placeholder.token}} (${placeholder.description})`,
                                            )
                                            .join(', ')}
                                    </p>
                                ) : null}
                                <p className="text-muted-foreground text-xs">
                                    {smsForm.data.message.length}/480 characters
                                </p>
                            </div>
                            <Button
                                type="submit"
                                disabled={smsForm.processing || selectedIds.length === 0 || !smsForm.data.message}
                            >
                                {smsForm.processing ? 'Sending...' : 'Send SMS'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {selectedCustomer ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Recent Orders for {selectedCustomer.name} ({selectedCustomer.phone})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {selectedCustomer.orders.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No orders found.</p>
                            ) : (
                                selectedCustomer.orders.map((order) => (
                                    <div key={order.id} className="rounded-md border px-3 py-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Order #{order.id}</span>
                                            <span>{currency(order.total_amount)}</span>
                                        </div>
                                        <p className="text-zinc-600">
                                            {order.pickup_date} | {order.pickup_location}
                                        </p>
                                        <p className="text-zinc-600">
                                            Status: {order.order_status} | Receipt: {order.receipt_status}
                                        </p>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                ) : null}

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
        </AppLayout>
    );
}
