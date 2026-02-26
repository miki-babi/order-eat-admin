import { Head, Link, useForm } from '@inertiajs/react';
import { BadgeCheck, Clock3, MapPin, Phone, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

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
    source_channel: 'web' | 'telegram' | 'table';
    should_prompt_phone_capture: boolean;
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
    const initialPhone = !order.should_prompt_phone_capture && typeof order.customer.phone === 'string'
        ? order.customer.phone.trim()
        : '';
    const [savedPhone, setSavedPhone] = useState(initialPhone);
    const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(
        order.source_channel === 'table' && order.should_prompt_phone_capture,
    );
    const phoneForm = useForm<{ phone: string }>({
        phone: '',
    });

    const submitTablePhone = () => {
        phoneForm.post(`/orders/${order.tracking_token}/phone`, {
            preserveScroll: true,
            onSuccess: () => {
                setSavedPhone(phoneForm.data.phone.replace(/[^\d+]/g, '').trim());
                setIsPhoneDialogOpen(false);
                phoneForm.reset();
            },
        });
    };

    return (
        <>
            <Head title={`Order #${order.id} Confirmed - Cafe`} />
            <div className="min-h-screen bg-[#FAFAFA] text-[#212121] selection:bg-[#F57C00]/20">
                <Dialog
                    open={isPhoneDialogOpen}
                    onOpenChange={(open) => {
                        if (phoneForm.processing) {
                            return;
                        }

                        setIsPhoneDialogOpen(open);
                    }}
                >
                    <DialogContent className="top-auto right-0 bottom-0 left-0 w-full max-w-none translate-x-0 translate-y-0 rounded-t-2xl rounded-b-none border-zinc-200 bg-white p-6 sm:top-[50%] sm:right-auto sm:bottom-auto sm:left-[50%] sm:w-full sm:max-w-md sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-[#212121]">
                                <Phone className="size-5 text-[#F57C00]" />
                                Add your phone number
                            </DialogTitle>
                            <DialogDescription className="text-[#757575]">
                                become our customer and receive real-time updates via SMS.
                            </DialogDescription>
                        </DialogHeader>

                        <form
                            className="space-y-3"
                            onSubmit={(event) => {
                                event.preventDefault();
                                submitTablePhone();
                            }}
                        >
                            <Input
                                className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                value={phoneForm.data.phone}
                                onChange={(event) => phoneForm.setData('phone', event.target.value)}
                                placeholder="251 9XX XXX XXX"
                            />
                            <InputError message={phoneForm.errors.phone} />

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="rounded-xl"
                                    disabled={phoneForm.processing}
                                    onClick={() => setIsPhoneDialogOpen(false)}
                                >
                                    Skip
                                </Button>
                                <Button
                                    type="submit"
                                    className="rounded-xl bg-[#F57C00] text-white hover:bg-[#E65100]"
                                    disabled={phoneForm.processing || phoneForm.data.phone.trim() === ''}
                                >
                                    {phoneForm.processing ? 'Saving...' : 'Save Phone'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

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
                        {savedPhone !== '' ? (
                            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#757575] shadow-sm ring-1 ring-zinc-100">
                                <span className="h-2 w-2 rounded-full bg-[#2E7D32] animate-pulse"></span>
                                {order.source_channel === 'table'
                                    ? `SMS updates will be sent to ${savedPhone}`
                                    : `Sent tracking link to ${savedPhone}`}
                            </div>
                        ) : (
                            <div className="mt-6 space-y-2">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#757575] shadow-sm ring-1 ring-zinc-100">
                                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                                    Add your phone number to receive SMS updates.
                                </div>
                                {order.source_channel === 'table' && (
                                    <div>
                                        <Button
                                            type="button"
                                            variant="link"
                                            className="h-auto p-0 text-sm font-bold text-[#F57C00] hover:text-[#E65100]"
                                            onClick={() => setIsPhoneDialogOpen(true)}
                                        >
                                            Add phone now
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
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
