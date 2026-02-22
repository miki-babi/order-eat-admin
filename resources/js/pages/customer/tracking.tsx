import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Circle,
    Clock3,
    ExternalLink,
    MapPin,
    Package,
    Receipt,
    ShoppingBag,
    Upload
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

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
    receipt_url: string | null;
    receipt_status: 'pending' | 'approved' | 'disapproved';
    order_status: 'pending' | 'preparing' | 'ready' | 'completed';
    disapproval_reason: string | null;
    total_amount: number;
    created_at: string | null;
    items: Array<{
        id: number;
        name: string | null;
        image_url: string | null;
        quantity: number;
        line_total: number;
    }>;
};

type SharedProps = {
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

const orderStages = [
    { key: 'pending', label: 'Order Received', desc: 'We have received your order and are waiting for payment verification.' },
    { key: 'preparing', label: 'Preparing', desc: 'Our team is carefully preparing your delicious items.' },
    { key: 'ready', label: 'Ready for Pickup', desc: 'Your order is packaged and ready at the selected location.' },
    { key: 'completed', label: 'Picked Up', desc: 'Order has been successfully collected. Enjoy!' }
] as const;
const ORDER_REFRESH_INTERVAL_MS = 10000;

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

export default function Tracking({ order }: { order: Order }) {
    const { flash } = usePage<SharedProps>().props;
    const menuHref = isTelegramContext() ? '/telegram/menu' : '/';
    const form = useForm<{ receipt: File | null }>({
        receipt: null,
    });
    const isRefreshing = useRef(false);
    const lastScrollY = useRef(0);
    const [hideTopChrome, setHideTopChrome] = useState(false);
    const activeStageIndex = Math.max(orderStages.findIndex((stage) => stage.key === order.order_status), 0);
    const showReceiptUploadSection = order.receipt_status !== 'approved';

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        let ticking = false;

        const handleScroll = () => {
            if (ticking) {
                return;
            }

            ticking = true;

            window.requestAnimationFrame(() => {
                const currentY = window.scrollY || 0;
                const isDesktop = window.matchMedia('(min-width: 768px)').matches;

                if (isDesktop) {
                    setHideTopChrome(false);
                    lastScrollY.current = currentY;
                    ticking = false;
                    return;
                }

                const delta = currentY - lastScrollY.current;
                const hasScrolledEnough = currentY > 72;

                if (delta > 6 && hasScrolledEnough) {
                    setHideTopChrome(true);
                } else if (delta < -6 || currentY < 24) {
                    setHideTopChrome(false);
                }

                lastScrollY.current = currentY;
                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            if (document.visibilityState !== 'visible' || form.processing || isRefreshing.current) {
                return;
            }

            isRefreshing.current = true;

            router.reload({
                only: ['order'],
                preserveState: true,
                preserveScroll: true,
                onFinish: () => {
                    isRefreshing.current = false;
                },
            });
        }, ORDER_REFRESH_INTERVAL_MS);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [form.processing]);

    const uploadReceipt = () => {
        form.post(`/orders/${order.tracking_token}/receipt`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`Track Order #${order.id} - Cafe`} />
            <div className="min-h-screen bg-[#FAFAFA] text-[#212121] selection:bg-[#F57C00]/20 pb-20">
                {/* Slim Navigation Header */}
                <header className={`sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md transition-all duration-300 md:translate-y-0 md:opacity-100 md:pointer-events-auto ${hideTopChrome ? '-translate-y-[120%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
                    <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
                        <Link href={menuHref} className="flex items-center gap-2 group">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#212121] transition-transform group-hover:rotate-12">
                                <ShoppingBag className="size-4 text-[#F57C00]" />
                            </div>
                            <span className="text-sm font-black uppercase tracking-tighter">Cafe</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">Order #{order.id}</span>
                            <div className="h-4 w-[1px] bg-zinc-200"></div>
                            <Button asChild variant="ghost" className="h-8 rounded-full px-4 text-xs font-bold text-[#F57C00] hover:bg-[#FFF3E0]">
                                <Link href={menuHref}>
                                    New Order
                                </Link>
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-4xl px-4 pt-12">
                    {/* Status Alerts */}
                    {(flash?.success || flash?.error) && (
                        <div className="mb-8 animate-in slide-in-from-top-4 duration-500">
                            {flash?.success && (
                                <div className="flex items-center gap-3 rounded-2xl bg-[#E8F5E9] p-4 text-[#2E7D32] shadow-sm ring-1 ring-[#2E7D32]/20">
                                    <CheckCircle2 className="size-5" />
                                    <p className="text-sm font-bold">{flash.success}</p>
                                </div>
                            )}
                            {flash?.error && (
                                <div className="flex items-center gap-3 rounded-2xl bg-[#FFEBEE] p-4 text-[#C62828] shadow-sm ring-1 ring-[#C62828]/20">
                                    <AlertCircle className="size-5" />
                                    <p className="text-sm font-bold">{flash.error}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
                        <div className="lg:col-span-2">
                            {/* Order Info Card (Now Featured at Top) */}
                            <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-zinc-200/50 ring-1 ring-zinc-200">
                                <div className="relative bg-[#212121] px-6 py-7 text-white md:px-8">
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 md:right-8">
                                        <div className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl transition-all duration-500 ring-2 ring-[#F57C00]/20 ${order.order_status === 'completed' ? 'bg-[#2E7D32] text-white' :
                                            'bg-[#F57C00] text-white shadow-[#F57C00]/40 scale-110  '
                                            }`}>
                                            {orderStages[activeStageIndex].label}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Pickup Identification</p>
                                        <h4 className="mt-2 text-xl font-bold md:text-2xl">{order.pickup_location.name}</h4>
                                    </div>
                                </div>
                                <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
                                    <div className="flex items-start gap-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FAFAFA] text-[#212121] ring-1 ring-zinc-100">
                                            <Clock3 className="size-6 text-[#F57C00]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Scheduled Time</p>
                                            <p className="mt-1 text-base font-bold text-[#212121]">{order.pickup_date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FAFAFA] text-[#212121] ring-1 ring-zinc-100">
                                            <MapPin className="size-6 text-[#F57C00]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Pickup Address</p>
                                            <p className="mt-1 text-sm font-bold leading-relaxed text-[#212121]">{order.pickup_location.address}</p>
                                            {order.pickup_location.google_maps_url && (
                                                <a
                                                    href={order.pickup_location.google_maps_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group mt-3 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#F57C00] transition-colors hover:text-[#E65100]"
                                                >
                                                    Open in Google Maps <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Order Timeline Section */}
                            <section className="rounded-3xl bg-white p-8 shadow-xl shadow-zinc-200/50 ring-1 ring-zinc-200">
                                <h3 className="mb-8 flex items-center gap-3 text-sm font-black uppercase tracking-widest text-[#9E9E9E]">
                                    <Package className="size-5 text-[#F57C00]" />
                                    Order Journey
                                </h3>

                                <div className="relative space-y-12">
                                    {/* Vertical Line */}
                                    <div className="absolute left-[15px] top-2 h-[calc(100%-24px)] w-[2px] bg-zinc-100"></div>

                                    {orderStages.map((stage, index) => {
                                        const isPast = index < activeStageIndex;
                                        const isCurrent = index === activeStageIndex;

                                        return (
                                            <div key={stage.key} className="relative flex gap-6">
                                                <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${isPast ? 'bg-[#2E7D32] text-white' :
                                                    isCurrent ? 'bg-[#F57C00] text-white shadow-lg shadow-[#F57C00]/30 scale-125' :
                                                        'bg-white text-zinc-300 ring-4 ring-[#FAFAFA]'
                                                    }`}>
                                                    {isPast ? <CheckCircle2 className="size-5" /> :
                                                        isCurrent ? <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div> :
                                                            <Circle className="size-4" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-base font-black ${isPast || isCurrent ? 'text-[#212121]' : 'text-[#9E9E9E]'}`}>
                                                        {stage.label}
                                                    </p>
                                                    <p className="mt-1 text-sm leading-relaxed text-[#757575]">
                                                        {stage.desc}
                                                    </p>
                                                    {isCurrent && (
                                                        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#FFF3E0] px-3 py-1 text-[10px] font-black uppercase text-[#E65100]">
                                                            In Progress
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Receipt Upload Section */}
                            {showReceiptUploadSection && (
                                <section className={`rounded-3xl p-8 shadow-xl transition-all duration-500 ${order.receipt_status === 'disapproved'
                                    ? 'bg-[#FFEBEE] ring-2 ring-[#C62828]/20'
                                    : 'bg-white ring-1 ring-zinc-200'
                                    }`}>
                                    <h3 className={`mb-4 flex items-center gap-3 text-sm font-black uppercase tracking-widest ${order.receipt_status === 'disapproved' ? 'text-[#C62828]' : 'text-[#9E9E9E]'
                                        }`}>
                                        <Receipt className="size-5" />
                                        Payment Verification
                                    </h3>

                                    {order.receipt_status === 'disapproved' && (
                                        <div className="mb-6 rounded-2xl bg-white/50 p-4 text-[#C62828] shadow-sm">
                                            <p className="text-xs font-black uppercase tracking-widest opacity-60">Rejection Reason:</p>
                                            <p className="mt-1 text-sm font-bold">{order.disapproval_reason}</p>
                                        </div>
                                    )}

                                    <div className="grid gap-6">
                                        <div className="group relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 bg-[#FAFAFA] p-8 transition-all hover:border-[#F57C00] hover:bg-white text-center">
                                            <div className="mb-4 rounded-full bg-white p-4 shadow-sm group-hover:scale-110 group-hover:text-[#F57C00] transition-all">
                                                <Upload className="size-8 text-zinc-300" />
                                            </div>
                                            <div>
                                                <p className="text-base font-black text-[#212121]">
                                                    {form.data.receipt ? form.data.receipt.name : 'Choose receipt file'}
                                                </p>
                                                <p className="mt-1 text-xs text-[#9E9E9E]">High resolution images preferred (Max 5MB)</p>
                                            </div>
                                            <input
                                                id="receipt-tracking"
                                                type="file"
                                                className="absolute inset-0 cursor-pointer opacity-0"
                                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                                onChange={(event) =>
                                                    form.setData('receipt', event.target.files?.[0] ?? null)
                                                }
                                            />
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            {order.receipt_url && (
                                                <a
                                                    href={order.receipt_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 text-xs font-bold text-[#757575] hover:text-[#F57C00] transition-colors"
                                                >
                                                    <ExternalLink className="size-4" />
                                                    View Previously Uploaded Receipt
                                                </a>
                                            )}

                                            <Button
                                                className="h-14 w-full rounded-2xl bg-[#F57C00] text-base font-black text-white shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100] active:scale-[0.98] disabled:opacity-50 transition-all"
                                                disabled={form.processing || !form.data.receipt}
                                                onClick={uploadReceipt}
                                            >
                                                {form.processing ? 'Uploading...' : 'Submit Receipt for Verification'}
                                            </Button>
                                            <InputError message={form.errors.receipt} />
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar: Details & Items */}
                        <aside className="space-y-6">
                            {/* Items Card */}
                            <div className="rounded-3xl bg-white p-6 shadow-lg shadow-zinc-200/50 ring-1 ring-zinc-200">
                                <h4 className="mb-6 flex items-center justify-between text-sm font-black uppercase tracking-widest text-[#9E9E9E]">
                                    Your Order
                                    <span className="rounded-full bg-[#FAFAFA] px-2 py-1 text-[10px] ring-1 ring-zinc-100">
                                        {order.items.length} items
                                    </span>
                                </h4>
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-zinc-100 bg-[#FAFAFA]">
                                                    {item.image_url ? (
                                                        <img
                                                            src={item.image_url}
                                                            alt={item.name ?? 'Item'}
                                                            className="h-full w-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-[8px] font-black uppercase text-zinc-300">
                                                            P
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-bold text-[#212121]">{item.name}</p>
                                                    <p className="text-xs font-medium text-[#757575]">x{item.quantity}</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-black text-[#212121]">{currency(item.line_total)}</span>
                                        </div>
                                    ))}
                                    <div className="mt-6 border-t border-zinc-100 pt-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-[#757575]">Grand Total</span>
                                            <span className="text-xl font-black text-[#F57C00]">{currency(order.total_amount)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* Secondary Actions Footer */}
                    <div className="mt-12 flex flex-col items-center justify-center gap-6 border-t border-zinc-100 pt-12">
                        <Button asChild variant="ghost" className="h-12 rounded-xl px-8 font-bold text-[#757575] hover:bg-zinc-100">
                            <Link href={`/orders/${order.tracking_token}/confirmation`}>
                                <Clock3 className="mr-2 size-4" />
                                View Order Confirmation
                            </Link>
                        </Button>

                        <div className="flex items-center gap-4 text-[#9E9E9E]">
                            <div className="h-[1px] w-12 bg-zinc-200"></div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Premium Cafe Experience</p>
                            <div className="h-[1px] w-12 bg-zinc-200"></div>
                        </div>
                    </div>
                </main>

            </div>
        </>
    );
}
