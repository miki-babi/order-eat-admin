import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, Clock3, MapPin, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {  CardContent } from '@/components/ui/card';

type OrderItem = {
    id: number;
    name: string | null;
    image_url: string | null;
    quantity: number;
    price: number;
    line_total: number;
};

type Order = {
    id: number;
    tracking_token: string;
    pickup_date: string;
    pickup_location: {
        id: number | null;
        name: string | null;
        address: string | null;
        google_maps_url: string | null;
    };
    customer: {
        name: string | null;
        phone: string | null;
    };
    receipt_status: 'pending' | 'approved' | 'disapproved';
    order_status: 'pending' | 'preparing' | 'ready' | 'completed';
    total_amount: number;
    items: OrderItem[];
};

function isTelegramContext(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    const telegram = (window as Window & { Telegram?: { WebApp?: unknown } }).Telegram;

    if (telegram?.WebApp) {
        return true;
    }

    const hasInitData = (raw: string): boolean => {
        const normalized = raw.trim().replace(/^[?#]/, '');

        if (normalized === '') {
            return false;
        }

        return new URLSearchParams(normalized).has('tgWebAppData');
    };

    return hasInitData(window.location.search) || hasInitData(window.location.hash);
}

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

export default function Confirmation({ order }: { order: Order }) {
    const menuHref = isTelegramContext() ? '/telegram/menu' : '/';

    return (
        <>
            <Head title={`Order #${order.id} Confirmed - Cafe`} />
            <div className="min-h-screen bg-[#FAFAFA] text-[#212121] selection:bg-[#F57C00]/20">
                <main className="mx-auto max-w-2xl px-4 py-12 md:py-20">
                    {/* Success Header Area */}
                    <div className="mb-12 text-center animate-in fade-in zoom-in duration-700">
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2E7D32] shadow-sm">
                            <BadgeCheck className="size-14" />
                        </div>
                        <h1 className="text-3xl font-black text-[#212121] md:text-4xl">Order Confirmed!</h1>
                        <p className="mt-4 text-lg text-[#757575]">
                            We've received your order <span className="font-bold text-[#212121]">#{order.id}</span>
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#757575] shadow-sm ring-1 ring-zinc-100">
                            <span className="h-2 w-2 rounded-full bg-[#2E7D32] animate-pulse"></span>
                            Sent tracking link to {order.customer.phone}
                        </div>
                    </div>

                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        {/* Summary & Tracking Card */}
                        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-zinc-200/50 ring-1 ring-zinc-200">
                            <div className="bg-[#212121] p-6 text-white md:p-8">
                                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">Pickup Details</p>
                                        <h3 className="mt-1 text-xl font-bold">{order.pickup_location.name}</h3>
                                        <p className="mt-1 text-sm text-[#757575]">{order.pickup_location.address}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 flex">
                                            <Clock3 className="size-5 text-[#F57C00]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Reserved For</p>
                                            <p className="text-sm font-bold">{order.pickup_date}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    <Button asChild className="h-14 w-full rounded-2xl bg-[#F57C00] px-8 text-base font-black text-white shadow-lg shadow-[#F57C00]/20 transition-all hover:bg-[#E65100] active:scale-[0.98] sm:flex-1">
                                        <Link href={`/orders/${order.tracking_token}/track`}>
                                            Track Live Status
                                            <ArrowRight className="ml-2 size-5" />
                                        </Link>
                                    </Button>
                                    {order.pickup_location.google_maps_url && (
                                        <Button asChild variant="outline" className="h-14 rounded-2xl border-white/20 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white transition-all">
                                            <a
                                                href={order.pickup_location.google_maps_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-shrink-0"
                                            >
                                                <MapPin className="size-5" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <CardContent className="p-0">
                                <div className="p-6 md:p-8">
                                    <h4 className="mb-6 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#9E9E9E]">
                                        <ShoppingBag className="size-4" />
                                        Order Summary
                                    </h4>

                                    <div className="space-y-6">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between gap-4">
                                                <div className="flex min-w-0 items-center gap-4">
                                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-zinc-100 bg-[#FAFAFA] shadow-sm">
                                                        {item.image_url ? (
                                                            <img
                                                                src={item.image_url}
                                                                alt={item.name ?? 'Item'}
                                                                className="h-full w-full object-cover"
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-[10px] font-black uppercase text-zinc-300">
                                                                No Photo
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="truncate text-base font-bold text-[#212121]">{item.name ?? 'Item'}</p>
                                                        <p className="text-sm font-medium text-[#757575]">Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <span className="text-base font-black text-[#212121]">{currency(item.line_total)}</span>
                                            </div>
                                        ))}

                                        <div className="mt-8 space-y-4 border-t border-zinc-100 pt-8">
                                            <div className="flex justify-between text-[#757575]">
                                                <span className="text-sm font-medium">Subtotal</span>
                                                <span className="font-bold">{currency(order.total_amount)}</span>
                                            </div>
                                            <div className="flex justify-between text-[#757575]">
                                                <span className="text-sm font-medium flex items-center gap-2">
                                                    Service Fee
                                                    <BadgeCheck className="size-3 text-[#2E7D32]" />
                                                </span>
                                                <span className="font-black text-[#2E7D32] animate-pulse">FREE</span>
                                            </div>
                                            <div className="flex justify-between pt-2">
                                                <span className="text-xl font-black text-[#212121]">Total Paid</span>
                                                <span className="text-2xl font-black text-[#F57C00]">{currency(order.total_amount)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </div>

                        {/* Secondary Actions */}
                        <div className="flex flex-col items-center justify-center gap-6 pt-8">
                            <Button asChild variant="link" className="text-sm font-bold text-[#757575] hover:text-[#F57C00]">
                                <Link href={menuHref}>
                                    Need to order more? Return to Menu
                                </Link>
                            </Button>

                            <div className="flex items-center gap-4 text-[#9E9E9E]">
                                <div className="h-[1px] w-12 bg-zinc-200"></div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Premium Cafe Experience</p>
                                <div className="h-[1px] w-12 bg-zinc-200"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
