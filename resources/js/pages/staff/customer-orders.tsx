import { Head, Link, useForm,  router } from '@inertiajs/react';

import {

    ChevronLeft,
    ChevronRight,
 
} from 'lucide-react';
import { useState } from 'react';
import { OrderTable } from '@/components/staff/order-table';

import { Button } from '@/components/ui/button';




import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export type OrderItem = {
    id: number;
    name: string | null;
    image_url: string | null;
    quantity: number;
    price: number;
    line_total: number;
};

export type OrderRow = {
    id: number;
    customer_name: string | null;
    customer_phone: string | null;
    pickup_date: string;
    pickup_location: string | null;
    source_channel: 'web' | 'telegram' | 'table';
    type: 'pickup' | 'delivery';
    
    order_status: string;
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
    order_type?: 'pickup' | 'delivery' | null;
    pickup_location_id?: string | null;
    date?: string | null;
    time_bucket?: string | null;
    source_channel?: string | null;
};

// type Summary = {
//     total_orders: number;
//     pending_orders: number;
//     pending_receipts: number;
//     ready_orders: number;
//     complaints: number;
// };



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/staff/customer-orders',
    },
];


export default function CustomerOrders({
    orders,
    // pickupLocations,
    filters,
}: {
    orders: Paginated<OrderRow>;
    pickupLocations: PickupLocation[];
    filters: Filters;
    statusOptions: string[];
    receiptStatusOptions: string[];
}) {

    

    const form = useForm({
        search: filters.search ?? '',
        status: filters.status ?? '',
        receipt_status: filters.receipt_status ?? '',
        order_type: filters.order_type ?? 'pickup',
        pickup_location_id: filters.pickup_location_id ?? '',
        date: filters.date ?? '',
        time_bucket: filters.time_bucket ?? '',
        source_channel: filters.source_channel ?? 'all',
    });

 

    





    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Staff Orders" />
            <div className="space-y-8 bg-zinc-50/50 p-6 min-h-screen">
                {/* Tabs */}
                <div className="space-y-4">
                    

                    <div className="flex gap-4 sm: sm:flex-row sm:items-center sm:justify-center">
                        <div className="flex bg-white p-1 rounded-xl ring-1 ring-zinc-200 w-fit gap-2">
                            {[
                                { label: 'All', value: '' },
                                { label: 'Pending', value: 'pending' },
                                { label: 'In Progress', value: 'preparing,ready' },
                                { label: 'Completed', value: 'completed' },
                            ].map((tab) => {
                                const isActive = form.data.status === tab.value || (tab.value === '' && form.data.status === '');
                                return (
                                    <Button
                                        key={tab.label}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            form.setData('status', tab.value);
                                            router.get('/staff/customer-orders', { ...form.data, status: tab.value }, { preserveState: true, replace: true });
                                        }}
                                        className={`rounded-lg px-4 h-9 text-xs font-bold transition-all ${isActive
                                            ? 'bg-primary text-white shadow-md hover:bg-primary/90 hover:text-white'
                                            : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                                            }`}
                                    >
                                        {tab.label}
                                    </Button>
                                );
                            })}
                        </div>

                        
                    </div>

                    
                </div>

<OrderTable orders={orders.data} />
                
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
                                className={`h-10 rounded-xl px-4 font-bold transition-all ${link.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-zinc-500 border-zinc-200'}`}
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
