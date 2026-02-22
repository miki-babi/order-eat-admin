import { Head, Link } from '@inertiajs/react';
import { ArrowRight, ExternalLink, LoaderCircle, MapPin, Package, RefreshCw, ShoppingBag } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

type Scope = 'active' | 'history';

type PageProps = {
    scope: Scope;
};

type TelegramMiniAppUser = {
    id?: number | string;
};

type TelegramWebApp = {
    initData?: string;
    initDataUnsafe?: {
        user?: TelegramMiniAppUser;
    };
    ready?: () => void;
    expand?: () => void;
};

type TelegramOrder = {
    id: number;
    tracking_token: string;
    order_status: 'pending' | 'preparing' | 'ready' | 'completed';
    receipt_status: 'pending' | 'approved' | 'disapproved';
    pickup_date: string | null;
    total_amount: number;
    created_at: string | null;
    pickup_location: {
        name: string | null;
        address: string | null;
        google_maps_url: string | null;
    };
};

type MiniAppOrdersResponse = {
    ok?: boolean;
    scope?: Scope;
    meta?: {
        active_orders_count?: number;
        history_orders_count?: number;
    };
    orders?: TelegramOrder[];
    error?: string;
};

function telegramWebApp(): TelegramWebApp | null {
    if (typeof window === 'undefined') {
        return null;
    }

    const telegram = (window as Window & { Telegram?: { WebApp?: TelegramWebApp } }).Telegram;

    return telegram?.WebApp ?? null;
}

function telegramInitDataFromLocation(): string | null {
    if (typeof window === 'undefined') {
        return null;
    }

    const extractFrom = (raw: string): string | null => {
        const trimmed = raw.trim().replace(/^[?#]/, '');

        if (trimmed === '') {
            return null;
        }

        const params = new URLSearchParams(trimmed);
        const value = params.get('tgWebAppData');

        if (typeof value !== 'string') {
            return null;
        }

        const normalized = value.trim();

        return normalized === '' ? null : normalized;
    };

    return extractFrom(window.location.search) ?? extractFrom(window.location.hash);
}

function statusLabel(status: TelegramOrder['order_status']): string {
    if (status === 'preparing') {
        return 'Preparing';
    }

    if (status === 'ready') {
        return 'Ready for Pickup';
    }

    if (status === 'completed') {
        return 'Completed';
    }

    return 'Pending';
}

function statusClassName(status: TelegramOrder['order_status']): string {
    if (status === 'completed') {
        return 'bg-emerald-100 text-emerald-700';
    }

    if (status === 'ready') {
        return 'bg-blue-100 text-blue-700';
    }

    if (status === 'preparing') {
        return 'bg-amber-100 text-amber-700';
    }

    return 'bg-zinc-100 text-zinc-700';
}

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

export default function TelegramOrdersPage({ scope }: PageProps) {
    const [orders, setOrders] = useState<TelegramOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [historyCount, setHistoryCount] = useState(0);

    const title = scope === 'history' ? 'Telegram Order History' : 'Active Telegram Orders';

    const scopeDescription = useMemo(
        () =>
            scope === 'history'
                ? 'All orders you placed through Telegram.'
                : 'Orders currently pending, preparing, or ready for pickup.',
        [scope],
    );

    useEffect(() => {
        let isDisposed = false;
        let abortController: AbortController | null = null;
        let injectedScript: HTMLScriptElement | null = null;

        const fetchOrders = async (initData: string): Promise<void> => {
            setLoading(true);
            setError(null);
            abortController = new AbortController();

            try {
                const response = await fetch('/api/telegram/miniapp/orders', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        init_data: initData,
                        scope,
                    }),
                    signal: abortController.signal,
                });

                const payload = (await response.json()) as MiniAppOrdersResponse;

                if (!response.ok || !payload.ok) {
                    throw new Error(payload.error ?? 'Unable to load Telegram orders.');
                }

                if (isDisposed) {
                    return;
                }

                setOrders(Array.isArray(payload.orders) ? payload.orders : []);
                setActiveCount(Number(payload.meta?.active_orders_count ?? 0));
                setHistoryCount(Number(payload.meta?.history_orders_count ?? 0));
            } catch {
                if (!isDisposed) {
                    setOrders([]);
                    setError('Could not load Telegram orders. Please open this page from the Telegram bot and try again.');
                }
            } finally {
                if (!isDisposed) {
                    setLoading(false);
                }
            }
        };

        const syncOrders = (webApp: TelegramWebApp | null): void => {
            if (isDisposed) {
                return;
            }

            webApp?.ready?.();
            webApp?.expand?.();

            const initDataFromWebApp = typeof webApp?.initData === 'string'
                ? webApp.initData.trim()
                : '';
            const initData = initDataFromWebApp !== ''
                ? initDataFromWebApp
                : (telegramInitDataFromLocation() ?? '');

            if (initData === '') {
                setLoading(false);
                setError('Telegram session data is missing. Open this from /track or /history in the bot.');
                return;
            }

            void fetchOrders(initData);
        };

        const existingWebApp = telegramWebApp();

        if (existingWebApp !== null || telegramInitDataFromLocation() !== null) {
            syncOrders(existingWebApp);
        } else if (typeof document !== 'undefined') {
            injectedScript = document.createElement('script');
            injectedScript.src = 'https://telegram.org/js/telegram-web-app.js';
            injectedScript.async = true;
            injectedScript.onload = () => {
                syncOrders(telegramWebApp());
            };
            document.head.appendChild(injectedScript);
        }

        return () => {
            isDisposed = true;
            abortController?.abort();

            if (injectedScript) {
                injectedScript.remove();
            }
        };
    }, [scope, refreshKey]);

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-[#FAFAFA] text-[#212121]">
                <main className="mx-auto w-full max-w-4xl px-4 py-8 md:px-8">
                    <div className="mb-8 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-zinc-100">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9E9E9E]">Telegram Miniapp</p>
                                <h1 className="mt-1 text-2xl font-black text-[#212121]">{title}</h1>
                                <p className="mt-2 text-sm text-[#757575]">{scopeDescription}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-10 rounded-xl border-zinc-200"
                                    onClick={() => setRefreshKey((value) => value + 1)}
                                    disabled={loading}
                                >
                                    <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
                                    Refresh
                                </Button>
                                <Button asChild className="h-10 rounded-xl bg-[#F57C00] font-black hover:bg-[#E65100]">
                                    <Link href="/telegram/menu">
                                        <ShoppingBag className="size-4" />
                                        Menu
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-bold text-[#616161]">
                            <span className="rounded-full bg-[#FFF3E0] px-3 py-1 text-[#E65100]">Active: {activeCount}</span>
                            <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700">History: {historyCount}</span>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <Button
                                asChild
                                variant={scope === 'active' ? 'default' : 'outline'}
                                className={scope === 'active'
                                    ? 'h-11 rounded-xl bg-[#212121] font-black hover:bg-[#000000]'
                                    : 'h-11 rounded-xl border-zinc-200 font-bold'}
                            >
                                <Link href="/telegram/orders?scope=active">Active Orders</Link>
                            </Button>
                            <Button
                                asChild
                                variant={scope === 'history' ? 'default' : 'outline'}
                                className={scope === 'history'
                                    ? 'h-11 rounded-xl bg-[#212121] font-black hover:bg-[#000000]'
                                    : 'h-11 rounded-xl border-zinc-200 font-bold'}
                            >
                                <Link href="/telegram/orders?scope=history">History</Link>
                            </Button>
                        </div>
                    </div>

                    {loading && (
                        <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-zinc-100">
                            <LoaderCircle className="mx-auto size-8 animate-spin text-[#F57C00]" />
                            <p className="mt-4 text-sm font-medium text-[#757575]">Loading orders...</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm font-bold text-rose-700">
                            {error}
                        </div>
                    )}

                    {!loading && !error && orders.length === 0 && (
                        <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-zinc-100">
                            <Package className="mx-auto size-8 text-zinc-300" />
                            <p className="mt-4 text-sm font-bold text-zinc-500">
                                {scope === 'history' ? 'No Telegram order history yet.' : 'No active Telegram orders.'}
                            </p>
                        </div>
                    )}

                    {!loading && !error && orders.length > 0 && (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-black text-[#212121]">Order #{order.id}</p>
                                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${statusClassName(order.order_status)}`}>
                                                    {statusLabel(order.order_status)}
                                                </span>
                                            </div>
                                            <p className="text-xs font-medium text-[#757575]">
                                                Pickup: {order.pickup_date ?? 'N/A'}
                                            </p>
                                            <p className="text-xs font-medium text-[#757575]">
                                                Branch: {order.pickup_location.name ?? 'Unknown'}
                                            </p>
                                            <p className="text-sm font-black text-[#F57C00]">
                                                {currency(order.total_amount)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {order.pickup_location.google_maps_url && (
                                                <Button asChild variant="outline" className="h-10 rounded-xl border-zinc-200">
                                                    <a href={order.pickup_location.google_maps_url} target="_blank" rel="noopener noreferrer">
                                                        <MapPin className="size-4" />
                                                        <ExternalLink className="size-3" />
                                                    </a>
                                                </Button>
                                            )}
                                            <Button asChild className="h-10 rounded-xl bg-[#212121] font-black hover:bg-[#000000]">
                                                <Link href={`/orders/${order.tracking_token}/track`}>
                                                    Track
                                                    <ArrowRight className="size-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
