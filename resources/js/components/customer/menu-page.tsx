import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Clock3, ExternalLink, MapPin, Search, ShoppingCart, SparkleIcon, Upload, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type MenuItem = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    category: string | null;
    image_url: string | null;
    is_featured?: boolean;
};

type PickupLocation = {
    id: number;
    name: string;
    address: string;
    google_maps_url: string | null;
};

type CartEntry = MenuItem & {
    quantity: number;
    lineTotal: number;
};

export type CustomerMenuPageProps = {
    menuItems: MenuItem[];
    categories: string[];
    pickupLocations: PickupLocation[];
    customerToken: string;
    customerPrefill: {
        name: string | null;
        phone: string | null;
    };
    filters: {
        search?: string | null;
        category?: string | null;
        channel?: string | null;
    };
    staffRoute?: string | null;
    forcedChannel?: 'web' | 'telegram';
};

type SharedProps = {
    auth?: {
        user?: {
            name?: string;
        };
    };
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

type OrderForm = {
    customer_token: string;
    name: string;
    phone: string;
    telegram_id: number | null;
    telegram_username: string;
    pickup_date: string;
    pickup_location_id: number | '';
    channel: string;
    notify_when_ready: boolean;
    receipt: File | null;
    items: {
        menu_item_id: number;
        quantity: number;
    }[];
};

const steps = [
    '1. Browse Menu',
    '2. Review Cart',
    '3. Pickup Details',
    '4. Receipt Upload',
];

type TelegramMiniAppUser = {
    id?: number | string;
    username?: string;
    first_name?: string;
    last_name?: string;
};

type TelegramWebApp = {
    initData?: string;
    initDataUnsafe?: {
        user?: TelegramMiniAppUser;
    };
    ready?: () => void;
    expand?: () => void;
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

function isTelegramMiniAppContext(defaultChannel: string): boolean {
    if (defaultChannel === 'telegram') {
        return true;
    }

    return telegramWebApp() !== null || telegramInitDataFromLocation() !== null;
}

function normalizeTelegramId(value: unknown): number | null {
    if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
        return value;
    }

    if (typeof value !== 'string' || value.trim() === '') {
        return null;
    }

    const trimmed = value.trim();

    if (!/^\d+$/.test(trimmed)) {
        return null;
    }

    const parsed = Number(trimmed);

    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function normalizeTelegramUsername(value: unknown): string | null {
    if (typeof value !== 'string') {
        return null;
    }

    const normalized = value.trim().replace(/^@+/, '');

    return normalized === '' ? null : normalized;
}

function telegramDisplayName(user: TelegramMiniAppUser | undefined): string | null {
    if (!user) {
        return null;
    }

    const firstName = typeof user.first_name === 'string' ? user.first_name.trim() : '';
    const lastName = typeof user.last_name === 'string' ? user.last_name.trim() : '';
    const combined = `${firstName} ${lastName}`.trim();

    if (combined !== '') {
        return combined;
    }

    const username = normalizeTelegramUsername(user.username);

    return username ? `@${username}` : null;
}

function todayDate(): string {
    const now = new Date();
    const shifted = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    return shifted.toISOString().slice(0, 10);
}

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

function sanitizeCartPayload(raw: unknown, allowedMenuItemIds: Set<number>): Record<number, number> {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        return {};
    }

    const sanitized: Record<number, number> = {};

    Object.entries(raw).forEach(([rawItemId, rawQuantity]) => {
        const itemId = Number(rawItemId);
        const quantity = typeof rawQuantity === 'number' ? rawQuantity : Number(rawQuantity);

        if (!Number.isInteger(itemId) || itemId < 1 || !allowedMenuItemIds.has(itemId)) {
            return;
        }

        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
            return;
        }

        sanitized[itemId] = quantity;
    });

    return sanitized;
}

function loadPersistedCart(storageKey: string, allowedMenuItemIds: Set<number>): Record<number, number> {
    if (typeof window === 'undefined') {
        return {};
    }

    try {
        const saved = window.localStorage.getItem(storageKey);

        if (!saved) {
            return {};
        }

        return sanitizeCartPayload(JSON.parse(saved), allowedMenuItemIds);
    } catch {
        // Ignore storage read failures and fall back to an empty cart.
        return {};
    }
}

function persistCart(storageKey: string, cart: Record<number, number>): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        if (Object.keys(cart).length === 0) {
            window.localStorage.removeItem(storageKey);
            return;
        }

        window.localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch {
        // Ignore storage write failures to avoid blocking checkout.
    }
}

function clearPersistedCart(storageKey: string): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        window.localStorage.removeItem(storageKey);
    } catch {
        // Ignore storage clear failures.
    }
}

function sanitizeStepValue(raw: unknown): number {
    const step = typeof raw === 'number' ? raw : Number(raw);

    return Number.isInteger(step) && step >= 1 && step <= 4 ? step : 1;
}

function loadPersistedStep(storageKey: string): number {
    if (typeof window === 'undefined') {
        return 1;
    }

    try {
        const saved = window.localStorage.getItem(storageKey);

        if (!saved) {
            return 1;
        }

        return sanitizeStepValue(JSON.parse(saved));
    } catch {
        return 1;
    }
}

function persistStep(storageKey: string, step: number): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        window.localStorage.setItem(storageKey, JSON.stringify(sanitizeStepValue(step)));
    } catch {
        // Ignore storage write failures to avoid blocking checkout.
    }
}

function clearPersistedStep(storageKey: string): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        window.localStorage.removeItem(storageKey);
    } catch {
        // Ignore storage clear failures.
    }
}

export default function CustomerMenuPage({
    menuItems,
    categories,
    pickupLocations,
    customerToken,
    customerPrefill,
    filters,
    forcedChannel,
}: CustomerMenuPageProps) {
    const { auth, flash } = usePage<SharedProps>().props;
    const baseChannel = forcedChannel ?? (filters.channel ?? 'web');
    const channel = isTelegramMiniAppContext(baseChannel)
        ? 'telegram'
        : baseChannel;
    const cartStorageKey = `kds:customer:web-cart:${customerToken}`;
    const stepStorageKey = `kds:customer:web-step:${customerToken}`;
    const allowedMenuItemIds = useMemo(
        () => new Set(menuItems.map((item) => item.id)),
        [menuItems],
    );
    const [step, setStep] = useState(() => loadPersistedStep(stepStorageKey));
    const [search, setSearch] = useState(filters.search ?? '');
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(
        () => (filters.search ?? '').trim() !== '',
    );
    const [activeCategory, setActiveCategory] = useState(filters.category ?? 'all');
    const [hideTopChrome, setHideTopChrome] = useState(false);
    const [hideBottomActions, setHideBottomActions] = useState(false);
    const hasSyncedTelegramIdentity = useRef(false);
    const lastScrollY = useRef(0);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const featuredCarouselRef = useRef<HTMLDivElement | null>(null);
    const [cart, setCart] = useState<Record<number, number>>(
        () => loadPersistedCart(cartStorageKey, allowedMenuItemIds),
    );
    const [canScrollFeaturedPrev, setCanScrollFeaturedPrev] = useState(false);
    const [canScrollFeaturedNext, setCanScrollFeaturedNext] = useState(false);

    const form = useForm<OrderForm>({
        customer_token: customerToken,
        name: customerPrefill.name ?? auth?.user?.name ?? '',
        phone: customerPrefill.phone ?? '',
        telegram_id: null,
        telegram_username: '',
        pickup_date: todayDate(),
        pickup_location_id: pickupLocations[0]?.id ?? '',
        channel,
        notify_when_ready: false,
        receipt: null,
        items: [],
    });

    const menuById = useMemo(
        () =>
            menuItems.reduce<Record<number, MenuItem>>((accumulator, item) => {
                accumulator[item.id] = item;
                return accumulator;
            }, {}),
        [menuItems],
    );

    const filteredItems = useMemo(
        () =>
            menuItems.filter((item) => {
                const matchesCategory =
                    activeCategory === 'all' || (item.category ?? 'Uncategorized') === activeCategory;
                const lower = search.toLowerCase();
                const matchesSearch =
                    !lower ||
                    item.name.toLowerCase().includes(lower) ||
                    (item.description ?? '').toLowerCase().includes(lower) ||
                    (item.category ?? '').toLowerCase().includes(lower);
                return matchesCategory && matchesSearch;
            }),
        [activeCategory, menuItems, search],
    );

    const featuredItems = useMemo(
        () => filteredItems.filter((item) => item.is_featured === true),
        [filteredItems],
    );

    const updateFeaturedCarouselState = useCallback(() => {
        const carousel = featuredCarouselRef.current;

        if (!carousel) {
            setCanScrollFeaturedPrev(false);
            setCanScrollFeaturedNext(false);
            return;
        }

        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

        if (maxScrollLeft <= 1) {
            setCanScrollFeaturedPrev(false);
            setCanScrollFeaturedNext(false);
            return;
        }

        setCanScrollFeaturedPrev(carousel.scrollLeft > 4);
        setCanScrollFeaturedNext(carousel.scrollLeft < maxScrollLeft - 4);
    }, []);

    const scrollFeaturedCarousel = useCallback((direction: -1 | 1) => {
        const carousel = featuredCarouselRef.current;

        if (!carousel) {
            return;
        }

        carousel.scrollBy({
            left: carousel.clientWidth * 0.85 * direction,
            behavior: 'smooth',
        });
    }, []);

    const autoAdvanceFeaturedCarousel = useCallback(() => {
        const carousel = featuredCarouselRef.current;

        if (!carousel) {
            return;
        }

        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

        if (maxScrollLeft <= 1) {
            return;
        }

        const firstSlide = carousel.querySelector<HTMLElement>('[data-featured-slide="true"]');
        const slideWidth = firstSlide?.offsetWidth ?? 0;
        const gap = 16;
        const fallbackStep = carousel.clientWidth * 0.85;
        const stepSize = slideWidth > 0 ? slideWidth + gap : fallbackStep;
        const isAtEnd = carousel.scrollLeft >= maxScrollLeft - 4;

        if (isAtEnd) {
            carousel.scrollTo({
                left: 0,
                behavior: 'smooth',
            });
            return;
        }

        carousel.scrollBy({
            left: Math.min(stepSize, maxScrollLeft - carousel.scrollLeft),
            behavior: 'smooth',
        });
    }, []);

    const hideSearchInput = useCallback(() => {
        setSearch('');
        setIsSearchInputVisible(false);
    }, []);

    const cartItems = useMemo(() => {
        return Object.entries(cart)
            .map(([id, quantity]) => {
                const item = menuById[Number(id)];

                if (!item || quantity < 1) {
                    return null;
                }

                return {
                    ...item,
                    quantity,
                    lineTotal: item.price * quantity,
                } satisfies CartEntry;
            })
            .filter((entry): entry is CartEntry => Boolean(entry));
    }, [cart, menuById]);

    const cartCount = cartItems.reduce((carry, item) => carry + item.quantity, 0);
    const cartTotal = cartItems.reduce((carry, item) => carry + item.lineTotal, 0);

    useEffect(() => {
        persistCart(cartStorageKey, sanitizeCartPayload(cart, allowedMenuItemIds));
    }, [cart, cartStorageKey, allowedMenuItemIds]);

    useEffect(() => {
        updateFeaturedCarouselState();

        if (typeof window === 'undefined') {
            return;
        }

        const onResize = () => {
            updateFeaturedCarouselState();
        };

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [featuredItems.length, step, updateFeaturedCarouselState]);

    useEffect(() => {
        if (!isSearchInputVisible || step !== 1) {
            return;
        }

        const input = searchInputRef.current;

        if (!input) {
            return;
        }

        input.focus();
        const caretPosition = input.value.length;
        input.setSelectionRange(caretPosition, caretPosition);
    }, [isSearchInputVisible, step]);

    useEffect(() => {
        if (step !== 1 || featuredItems.length <= 1) {
            return;
        }

        if (typeof window === 'undefined') {
            return;
        }

        const intervalId = window.setInterval(() => {
            autoAdvanceFeaturedCarousel();
        }, 3000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [autoAdvanceFeaturedCarousel, featuredItems.length, step]);

    useEffect(() => {
        persistStep(stepStorageKey, step);
    }, [step, stepStorageKey]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        let ticking = false;

        const onScroll = () => {
            if (ticking) {
                return;
            }

            ticking = true;

            window.requestAnimationFrame(() => {
                const currentY = window.scrollY || 0;
                const isDesktop = window.matchMedia('(min-width: 768px)').matches;

                if (isDesktop) {
                    setHideTopChrome(false);
                    setHideBottomActions(false);
                    lastScrollY.current = currentY;
                    ticking = false;
                    return;
                }

                const delta = currentY - lastScrollY.current;
                const hasScrolledEnough = currentY > 96;

                if (delta > 6 && hasScrolledEnough) {
                    if (step === 1) {
                        setHideTopChrome(true);
                        setHideBottomActions(true);
                    }
                } else if (delta < -6 || currentY < 32) {
                    setHideTopChrome(false);
                    setHideBottomActions(false);
                }

                if (step !== 1) {
                    setHideTopChrome(false);
                    setHideBottomActions(false);
                }

                lastScrollY.current = currentY;
                ticking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        onScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [step]);

    useEffect(() => {
        if (channel !== 'telegram') {
            return;
        }

        let isDisposed = false;
        let abortController: AbortController | null = null;
        let injectedScript: HTMLScriptElement | null = null;

        const syncFromInitData = (initData: string) => {
            if (initData === '' || hasSyncedTelegramIdentity.current || isDisposed) {
                return;
            }

            hasSyncedTelegramIdentity.current = true;
            abortController = new AbortController();

            void fetch('/api/telegram/miniapp/identity', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    init_data: initData,
                }),
                signal: abortController.signal,
            })
                .then(async (response) => {
                    if (!response.ok) {
                        return null;
                    }

                    return (await response.json()) as {
                        ok?: boolean;
                        customer?: {
                            customer_token?: string;
                            name?: string | null;
                            phone?: string | null;
                            telegram_id?: number | null;
                            telegram_username?: string | null;
                        };
                    };
                })
                .then((payload) => {
                    if (!payload?.ok || !payload.customer || isDisposed) {
                        return;
                    }

                    form.setData((current) => ({
                        ...current,
                        channel: 'telegram',
                        customer_token:
                            typeof payload.customer?.customer_token === 'string' && payload.customer.customer_token !== ''
                                ? payload.customer.customer_token
                                : current.customer_token,
                        name:
                            typeof payload.customer?.name === 'string' && payload.customer.name.trim() !== ''
                                ? payload.customer.name
                                : current.name,
                        phone:
                            typeof payload.customer?.phone === 'string' && payload.customer.phone.trim() !== ''
                                ? payload.customer.phone
                                : current.phone,
                        telegram_id:
                            typeof payload.customer?.telegram_id === 'number' && payload.customer.telegram_id > 0
                                ? payload.customer.telegram_id
                                : current.telegram_id,
                        telegram_username:
                            typeof payload.customer?.telegram_username === 'string'
                                ? payload.customer.telegram_username
                                : current.telegram_username,
                    }));
                })
                .catch(() => {
                    // Ignore miniapp identity sync failures and allow manual checkout.
                });
        };

        const syncFromWebApp = (webApp: TelegramWebApp) => {
            if (isDisposed) {
                return;
            }

            webApp.ready?.();
            webApp.expand?.();

            const user = webApp.initDataUnsafe?.user;
            const telegramId = normalizeTelegramId(user?.id);
            const telegramUsername = normalizeTelegramUsername(user?.username);
            const displayName = telegramDisplayName(user);

            if (telegramId !== null) {
                form.setData((current) => ({
                    ...current,
                    channel: 'telegram',
                    telegram_id: telegramId,
                    telegram_username: telegramUsername ?? current.telegram_username,
                }));
            }

            if (displayName && form.data.name.trim() === '') {
                form.setData('name', displayName);
            }

            const initDataFromWebApp = typeof webApp.initData === 'string' ? webApp.initData.trim() : '';
            const initData = initDataFromWebApp !== ''
                ? initDataFromWebApp
                : (telegramInitDataFromLocation() ?? '');

            syncFromInitData(initData);
        };

        const existingWebApp = telegramWebApp();
        const locationInitData = telegramInitDataFromLocation();

        if (existingWebApp) {
            syncFromWebApp(existingWebApp);
        } else if (typeof document !== 'undefined') {
            if (locationInitData !== null) {
                syncFromInitData(locationInitData);
            }

            injectedScript = document.createElement('script');
            injectedScript.src = 'https://telegram.org/js/telegram-web-app.js';
            injectedScript.async = true;
            injectedScript.onload = () => {
                const loadedWebApp = telegramWebApp();

                if (loadedWebApp) {
                    syncFromWebApp(loadedWebApp);
                }
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
    }, [channel]);

    const updateItemQuantity = (itemId: number, nextQuantity: number) => {
        setCart((previous) => {
            const next = { ...previous };

            if (nextQuantity <= 0) {
                delete next[itemId];
            } else {
                next[itemId] = nextQuantity;
            }

            return next;
        });
    };

    const canContinueDetails =
        form.data.name.trim() &&
        form.data.phone.trim() &&
        form.data.pickup_date &&
        form.data.pickup_location_id;

    const selectedPickupLocation = useMemo(
        () => pickupLocations.find((location) => location.id === form.data.pickup_location_id) ?? null,
        [pickupLocations, form.data.pickup_location_id],
    );

    const submitOrder = () => {
        const itemsPayload = cartItems.map((item) => ({
            menu_item_id: item.id,
            quantity: item.quantity,
        }));

        const payloadPreview = {
            ...form.data,
            items: itemsPayload,
            receipt: form.data.receipt
                ? {
                    name: form.data.receipt.name,
                    size: form.data.receipt.size,
                    type: form.data.receipt.type,
                }
                : null,
        };

        console.groupCollapsed('[Order Submit] attempt');
        console.log('step', step);
        console.log('cartCount', cartCount);
        console.log('cartTotal', cartTotal);
        console.log('payload', payloadPreview);
        console.groupEnd();

        form.transform((data) => ({
            ...data,
            items: itemsPayload,
        }));

        form.post('/orders', {
            forceFormData: true,
            preserveScroll: true,
            onStart: () => {
                console.log('[Order Submit] request started');
            },
            onProgress: (event) => {
                console.log('[Order Submit] upload progress', event?.percentage ?? 0);
            },
            onSuccess: () => {
                clearPersistedCart(cartStorageKey);
                clearPersistedStep(stepStorageKey);
                setCart({});
                setStep(1);
                console.log('[Order Submit] success');
            },
            onError: (errors) => {
                console.error('[Order Submit] validation or server error', errors);

                if (errors.items) {
                    setStep(2);
                    return;
                }

                if (errors.receipt) {
                    setStep(4);
                    return;
                }

                if (errors.name || errors.phone || errors.pickup_date || errors.pickup_location_id) {
                    setStep(3);
                }
            },
            onFinish: () => {
                console.log('[Order Submit] finished');
            },
        });
    };

    return (
        <>
            <Head title="Cafe Menu" />
            <div className="min-h-screen bg-[#FAFAFA] text-[#212121]">


                {/* Cart Floating Action Button */}
                {step === 1 && cartCount > 0 && (
                    <button
                        onClick={() => {
                            setStep(2);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`fixed bottom-24 right-6 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-[#212121] text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-4 ring-white transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 md:bottom-12 md:right-12 md:translate-y-0 md:opacity-100 md:pointer-events-auto ${hideBottomActions ? 'translate-y-[140%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
                    >
                        <div className="relative">
                            <ShoppingCart className="size-7" />
                            <span className="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#F57C00] text-[11px] font-black text-white shadow-md ring-2 ring-white animate-in zoom-in-50 duration-300">
                                {cartCount}
                            </span>
                        </div>
                    </button>
                )}

                <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 pb-32 md:pb-12">
                    <div className="mb-6 grid gap-3 md:grid-cols-2">
                        <Link
                            href="/cakes"
                            className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm font-bold text-[#212121] shadow-sm transition hover:border-[#F57C00]/40 hover:shadow"
                        >
                            Cake Preordering
                            <p className="mt-1 text-xs font-medium text-zinc-500">Browse cakes and submit customized preorders.</p>
                        </Link>
                        <Link
                            href="/catering"
                            className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm font-bold text-[#212121] shadow-sm transition hover:border-[#F57C00]/40 hover:shadow"
                        >
                            Catering Services
                            <p className="mt-1 text-xs font-medium text-zinc-500">Explore catering packages and request event support.</p>
                        </Link>
                    </div>

                    {/* Material Step Tracker */}
                    <div className={`sticky top-[0px] z-40 mb-6 overflow-hidden rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-zinc-100 transition-all duration-300 md:relative md:top-0 md:bg-white md:p-1 md:shadow-md md:translate-y-0 md:opacity-100 md:pointer-events-auto ${hideTopChrome ? '-translate-y-[130%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
                        <div className="flex flex-row items-center gap-1">
                            {steps.map((label, index) => {
                                const isActive = step === index + 1;
                                const isCompleted = step > index + 1;
                                return (
                                    <div
                                        key={label}
                                        className={`flex flex-1 items-center justify-center rounded-xl px-2 py-2.5 transition-all duration-500 md:px-4 md:py-3 ${isActive
                                            ? 'bg-[#FFF3E0] text-[#F57C00] shadow-sm'
                                            : 'bg-transparent'
                                            }`}
                                    >
                                        <div
                                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-black transition-all duration-500 ${isActive
                                                ? 'bg-[#F57C00] text-white shadow-md shadow-[#F57C00]/20 scale-110'
                                                : isCompleted
                                                    ? 'bg-[#2E7D32] text-white'
                                                    : 'bg-zinc-100 text-zinc-400'
                                                } ${isActive ? 'mr-2' : 'md:mr-3'}`}
                                        >
                                            {isCompleted ? <CheckCircle2 className="size-4" strokeWidth={3} /> : index + 1}
                                        </div>
                                        <span
                                            className={`text-[11px] font-black uppercase tracking-tight md:text-sm md:normal-case md:tracking-normal ${isActive ? 'block' : 'hidden md:block'
                                                } ${isActive ? 'text-[#F57C00]' : 'text-zinc-500'}`}
                                        >
                                            {label.split('. ')[1]}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    <div className={`sticky top-[0px] z-60 mb-10 overflow-hidden rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-zinc-100 transition-all duration-300 md:relative md:top-0 md:bg-white md:p-1 md:shadow-md md:translate-y-0 md:opacity-100 md:pointer-events-auto ${step === 1 ? 'block' : 'hidden'} ${hideTopChrome ? '-translate-y-[160%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>

                        <div className=" flex scrollable gap-3 p-2 transition-all duration-300">
                            <button
                                type="button"
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${activeCategory === 'all'
                                    ? 'bg-[#F57C00] text-white shadow-[#F57C00]/20 scale-105'
                                    : 'bg-white text-[#757575] hover:bg-[#F5F5F5] ring-1 ring-zinc-200'
                                    }`}
                                onClick={() => setActiveCategory('all')}
                            >
                                All 
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm ${activeCategory === category
                                        ? 'bg-[#F57C00] text-white shadow-[#F57C00]/20 scale-105'
                                        : 'bg-white text-[#757575] hover:bg-[#F5F5F5] ring-1 ring-zinc-200'
                                        }`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
                        <section className="min-w-0 space-y-6">
                            {flash?.success && (
                                <div className="animate-in fade-in slide-in-from-top-4 rounded-xl border-l-4 border-[#2E7D32] bg-green-50 px-5 py-4 text-sm font-medium text-[#1B5E20] shadow-sm transition-all duration-500">
                                    {flash.success}
                                </div>
                            )}
                            {flash?.error && (
                                <div className="animate-in fade-in slide-in-from-top-4 rounded-xl border-l-4 border-[#C62828] bg-red-50 px-5 py-4 text-sm font-medium text-[#B71C1C] shadow-sm transition-all duration-500">
                                    {flash.error}
                                </div>
                            )}

                            {step === 1 && (
                                <div className="space-y-8 animate-in fade-in duration-500">
                                    {/* Search & Filters */}
                                    <div className="space-y-6 flex items-center justify-end gap-4">
                                        {isSearchInputVisible ? (
                                            <div className="group relative transition-all duration-300 focus-within:ring-2 focus-within:ring-[#F57C00]/20 rounded-2xl">
                                                <Search className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-[#757575] group-focus-within:text-[#F57C00] transition-colors duration-300" />
                                                <Input
                                                    ref={searchInputRef}
                                                    className="h-14 rounded-2xl border-none pl-14 pr-14 text-base shadow-sm ring-1 ring-zinc-200 transition-all duration-300 focus:ring-2 focus:ring-[#F57C00] placeholder:text-[#9E9E9E]"
                                                    value={search}
                                                    onChange={(event) => setSearch(event.target.value)}
                                                    onBlur={() => {
                                                        if (search.trim() === '') {
                                                            setIsSearchInputVisible(false);
                                                        }
                                                    }}
                                                    onKeyDown={(event) => {
                                                        if (event.key === 'Escape') {
                                                            hideSearchInput();
                                                        }
                                                    }}
                                                    placeholder="Search by item, description, or category"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                                                    onClick={hideSearchInput}
                                                    aria-label="Hide search"
                                                >
                                                    <X className="size-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#757575] shadow-sm ring-1 ring-zinc-200 transition-all duration-300 hover:bg-[#F5F5F5]"
                                                onClick={() => setIsSearchInputVisible(true)}
                                            >
                                                <Search className="size-4" />
                                                Search menu
                                            </button>
                                        )}



                                    </div>

                                    {featuredItems.length > 0 && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <h2 className="animate-gold-shimmer bg-gradient-to-r from-[#D4AF37] via-[#F9D71C] to-[#D4AF37] bg-[length:200%_auto] bg-clip-text text-sm font-black uppercase tracking-widest text-transparent">
                                                    <SparkleIcon className="animate-sparkle inline-block size-8 p-1 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                                                    Top picks
                                                </h2>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-semibold text-[#9E9E9E]">
                                                        Top picks
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
                                                        onClick={() => scrollFeaturedCarousel(-1)}
                                                        disabled={!canScrollFeaturedPrev}
                                                        aria-label="Previous featured items"
                                                    >
                                                        <ChevronLeft className="size-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
                                                        onClick={() => scrollFeaturedCarousel(1)}
                                                        disabled={!canScrollFeaturedNext}
                                                        aria-label="Next featured items"
                                                    >
                                                        <ChevronRight className="size-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                ref={featuredCarouselRef}
                                                onScroll={updateFeaturedCarouselState}
                                                className="scrollable overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory pb-2"
                                            >
                                                <div className="flex min-w-0 gap-4 pr-1">
                                                    {featuredItems.map((item) => (
                                                        <article
                                                            key={`featured-${item.id}`}
                                                            data-featured-slide="true"
                                                            className="group w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200"
                                                        >
                                                            <div className="relative h-36 overflow-hidden">
                                                                {item.image_url ? (
                                                                    <img
                                                                        src={item.image_url}
                                                                        alt={item.name}
                                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                        loading="lazy"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-full w-full flex-col items-center justify-center bg-[#F5F5F5]">
                                                                        <ShoppingCart className="size-5 text-zinc-400 opacity-60" />
                                                                        <span className="mt-2 text-[10px] font-medium text-zinc-400">
                                                                            No image
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <span className="absolute top-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-black text-white backdrop-blur-sm">
                                                                    {currency(item.price)}
                                                                </span>
                                                            </div>
                                                            <div className="space-y-3 p-4">
                                                                <div>
                                                                    <p className="line-clamp-1 text-sm font-black text-[#212121]">
                                                                        {item.name}
                                                                    </p>
                                                                    <p className="mt-1 line-clamp-2 text-xs text-[#757575]">
                                                                        {item.description ?? 'Freshly prepared and ready for pickup.'}
                                                                    </p>
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    className={`h-9 w-full rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 ${(cart[item.id] ?? 0) > 0
                                                                        ? 'bg-[#2E7D32] hover:bg-[#1B5E20]'
                                                                        : 'bg-[#F57C00] hover:bg-[#E65100]'
                                                                        }`}
                                                                    onClick={() => updateItemQuantity(item.id, Math.max(1, (cart[item.id] ?? 0) + 1))}
                                                                >
                                                                    {(cart[item.id] ?? 0) > 0
                                                                        ? `Add more (${cart[item.id] ?? 0})`
                                                                        : 'Add to order'}
                                                                </Button>
                                                            </div>
                                                        </article>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Food Grid (Photo-First) */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        {filteredItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                            >
                                                <div className="relative aspect-[3/2] overflow-hidden">
                                                    {item.image_url ? (
                                                        <img
                                                            src={item.image_url}
                                                            alt={item.name}
                                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full flex-col items-center justify-center bg-[#F5F5F5]">
                                                            <div className="mb-2 h-12 w-12 rounded-full bg-zinc-200/50 flex items-center justify-center">
                                                                <ShoppingCart className="size-6 text-zinc-400 opacity-50" />
                                                            </div>
                                                            <span className="text-xs font-medium text-zinc-400">Preparation in progress</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute top-4 right-4 rounded-full bg-black/40 px-3 py-1.5 text-xs font-black text-white backdrop-blur-md">
                                                        {currency(item.price)}
                                                    </div>
                                                </div>

                                                <div className="flex flex-1 flex-col p-5">
                                                    <div className="mb-1 flex items-start justify-between">
                                                        <div>
                                                            {item.category && (
                                                                <span className="block text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                                                    {item.category}
                                                                </span>
                                                            )}
                                                            <h3 className="text-xl font-bold text-[#212121] leading-tight mt-1 group-hover:text-[#F57C00] transition-colors duration-300">
                                                                {item.name}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-sm leading-relaxed text-[#757575] line-clamp-2">
                                                        {item.description ?? 'A delicious selection crafted with high-quality ingredients just for you.'}
                                                    </p>

                                                    <div className="mt-auto pt-6">
                                                        <div className="flex items-center justify-between gap-4">
                                                            <div className="flex items-center gap-1 rounded-full bg-[#FAFAFA] p-1 shadow-inner ring-1 ring-zinc-200">
                                                                <button
                                                                    type="button"
                                                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-bold text-[#212121] shadow-sm transition-all hover:bg-[#F57C00] hover:text-white disabled:opacity-20 active:scale-95"
                                                                    disabled={(cart[item.id] ?? 0) <= 0}
                                                                    onClick={() => updateItemQuantity(item.id, (cart[item.id] ?? 0) - 1)}
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="w-10 text-center text-[15px] font-black">
                                                                    {cart[item.id] ?? 0}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-bold text-[#212121] shadow-sm transition-all hover:bg-[#F57C00] hover:text-white active:scale-95"
                                                                    onClick={() => updateItemQuantity(item.id, (cart[item.id] ?? 0) + 1)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                className={`h-11 rounded-full px-6 font-bold transition-all duration-300 active:scale-95 ${(cart[item.id] ?? 0) > 0
                                                                    ? 'bg-[#2E7D32] hover:bg-[#1B5E20]'
                                                                    : 'bg-[#F57C00] hover:bg-[#E65100]'
                                                                    }`}
                                                                onClick={() => updateItemQuantity(item.id, Math.max(1, (cart[item.id] ?? 0) + 1))}
                                                            >
                                                                {(cart[item.id] ?? 0) > 0 ? 'Add more' : 'Add to order'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {filteredItems.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="mb-4 h-24 w-24 rounded-full bg-zinc-100 flex items-center justify-center">
                                                <Search className="size-10 text-zinc-300" />
                                            </div>
                                            <h3 className="text-xl font-bold text-[#212121]">No items found</h3>
                                            <p className="mt-2 text-[#757575]">Try adjusting your search or category filters.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
                                        <div className="mb-6">
                                            <h2 className="text-xl font-bold text-[#212121]">Review Your Cart</h2>
                                            <p className="text-sm text-[#757575]">Confirm quantities and totals before we proceed to checkout.</p>
                                        </div>

                                        <div className="space-y-4">
                                            {cartItems.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-50 shadow-inner">
                                                        <ShoppingCart className="size-10 text-zinc-300" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-[#212121]">Your cart is empty</h3>
                                                    <p className="mt-2 text-[#757575]">Look like you haven't added anything to your order yet.</p>
                                                    <Button
                                                        onClick={() => setStep(1)}
                                                        className="mt-8 h-12 rounded-xl bg-[#F57C00] px-8 font-black text-white shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100] active:scale-95 transition-all"
                                                    >
                                                        Browse Our Menu
                                                        <ArrowRight className="ml-2 size-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                cartItems.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex flex-col gap-4 rounded-xl border border-zinc-100 bg-[#FAFAFA] p-4 transition-all hover:shadow-md md:flex-row md:items-center"
                                                    >
                                                        <div className="flex flex-1 items-center gap-4">
                                                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-white shadow-sm">
                                                                {item.image_url ? (
                                                                    <img
                                                                        src={item.image_url}
                                                                        alt={item.name}
                                                                        className="h-full w-full object-cover"
                                                                        loading="lazy"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-[10px] font-bold uppercase tracking-tighter text-zinc-400">
                                                                        No Photo
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="truncate text-lg font-bold text-[#212121]">{item.name}</p>
                                                                <p className="text-sm font-black text-[#F57C00]">
                                                                    {currency(item.price)} <span className="ml-1 text-xs font-medium text-[#9E9E9E]">each</span>
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between border-t border-zinc-100 pt-4 md:border-0 md:pt-0">
                                                            <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-zinc-100">
                                                                <button
                                                                    type="button"
                                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#F57C00] transition-all hover:bg-[#F57C00] hover:text-white active:scale-90"
                                                                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="w-8 text-center text-sm font-black">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#F57C00] transition-all hover:bg-[#F57C00] hover:text-white active:scale-90"
                                                                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <p className="text-right text-lg font-black text-[#212121] md:w-28">
                                                                {currency(item.lineTotal)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        <div className="mt-6">
                                            <InputError message={form.errors.items} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
                                        <div className="mb-8">
                                            <h2 className="text-xl font-bold text-[#212121]">Pickup & Contact</h2>
                                            <p className="text-sm text-[#757575]">Help us coordinate your pickup with accurate details.</p>
                                        </div>

                                        <div className="grid gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">Customer Name</Label>
                                                <Input
                                                    id="name"
                                                    className="h-12 rounded-xl border-zinc-200 focus:ring-[#F57C00] focus:border-[#F57C00]"
                                                    value={form.data.name}
                                                    onChange={(event) => form.setData('name', event.target.value)}
                                                    placeholder="Enter your full name"
                                                />
                                                <InputError message={form.errors.name} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">Phone Number <span className="text-[#F57C00]">*</span></Label>
                                                <Input
                                                    id="phone"
                                                    className="h-12 rounded-xl border-zinc-200 focus:ring-[#F57C00] focus:border-[#F57C00]"
                                                    value={form.data.phone}
                                                    onChange={(event) => form.setData('phone', event.target.value)}
                                                    placeholder="251 9XX XXX XXX"
                                                />
                                                <p className="text-[10px] text-[#9E9E9E]">We'll send a tracking link to this number.</p>
                                                <InputError message={form.errors.phone} />
                                            </div>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="pickup_date" className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">Pickup Date</Label>
                                                    <Input
                                                        id="pickup_date"
                                                        type="date"
                                                        min={todayDate()}
                                                        className="h-12 rounded-xl border-zinc-200 focus:ring-[#F57C00] focus:border-[#F57C00]"
                                                        value={form.data.pickup_date}
                                                        onChange={(event) =>
                                                            form.setData('pickup_date', event.target.value)
                                                        }
                                                    />
                                                    <InputError message={form.errors.pickup_date} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="pickup_location" className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">Branch Location</Label>
                                                    <select
                                                        id="pickup_location"
                                                        className="flex h-12 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F57C00] focus-visible:ring-offset-2"
                                                        value={form.data.pickup_location_id}
                                                        onChange={(event) =>
                                                            form.setData(
                                                                'pickup_location_id',
                                                                Number(event.target.value) || '',
                                                            )
                                                        }
                                                    >
                                                        <option value="">Select a branch</option>
                                                        {pickupLocations.map((location) => (
                                                            <option key={location.id} value={location.id}>
                                                                {location.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <InputError message={form.errors.pickup_location_id} />
                                                </div>
                                            </div>

                                            {selectedPickupLocation && (
                                                <div className="rounded-2xl border border-[#FFF3E0] bg-[#FFF8F1] p-5 transition-all animate-in slide-in-from-top-2">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F57C00] text-white">
                                                            <MapPin className="size-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-[#212121]">{selectedPickupLocation.name}</p>
                                                            <p className="mt-1 text-sm text-[#757575] leading-relaxed">{selectedPickupLocation.address}</p>
                                                            {selectedPickupLocation.google_maps_url && (
                                                                <a
                                                                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#F57C00] hover:underline"
                                                                    href={selectedPickupLocation.google_maps_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    Open in Google Maps
                                                                    <ExternalLink className="size-3" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-100 bg-[#FAFAFA] p-4 transition-all hover:bg-white hover:shadow-sm">
                                                <input
                                                    type="checkbox"
                                                    className="mt-1 h-5 w-5 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]"
                                                    checked={form.data.notify_when_ready}
                                                    onChange={(event) =>
                                                        form.setData('notify_when_ready', event.target.checked)
                                                    }
                                                />
                                                <span className="text-sm font-medium text-[#212121] leading-tight">
                                                    SMS Ready Notification
                                                    <span className="block mt-1 text-xs font-normal text-[#757575]">We'll text you as soon as your order is packaged and ready to go.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
                                        <div className="mb-8">
                                            <h2 className="text-xl font-bold text-[#212121]">Payment Upload</h2>
                                            <p className="text-sm text-[#757575]">Upload your bank transfer receipt to verify your order.</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-[#FAFAFA] p-10 transition-all hover:border-[#F57C00] hover:bg-white">
                                                <div className="mb-4 rounded-full bg-white p-4 shadow-sm ring-1 ring-zinc-100 group-hover:scale-110 group-hover:text-[#F57C00] transition-all duration-300">
                                                    <Upload className="size-8" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-base font-bold text-[#212121]">Click to upload receipt</p>
                                                    <p className="mt-1 text-xs text-[#9E9E9E]">PNG, JPG or WEBP (Max 5MB)</p>
                                                </div>
                                                <input
                                                    id="receipt"
                                                    type="file"
                                                    className="absolute inset-0 cursor-pointer opacity-0"
                                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                                    onChange={(event) =>
                                                        form.setData('receipt', event.target.files?.[0] ?? null)
                                                    }
                                                />
                                            </div>

                                            {form.data.receipt && (
                                                <div className="flex items-center gap-4 rounded-xl bg-[#E8F5E9] p-4 text-[#2E7D32] animate-in slide-in-from-bottom-2">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                                                        <CheckCircle2 className="size-5" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-bold">File selected: {form.data.receipt.name}</p>
                                                        <p className="text-[10px] opacity-80 uppercase font-black">Ready for submission</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="text-xs font-black uppercase tracking-widest hover:underline"
                                                        onClick={() => form.setData('receipt', null)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}

                                            <div className="rounded-xl bg-[#FFF3E0] p-4 text-[#E65100]">
                                                <p className="text-xs font-medium leading-relaxed">
                                                    <span className="font-black uppercase tracking-widest mr-2 underline">Note:</span>
                                                    You can also skip this for now and upload later using the tracking link we'll send via SMS.
                                                </p>
                                            </div>

                                            <InputError message={form.errors.receipt} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Bar (Floating on Mobile, Inline on Desktop) */}
                            <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white/90 p-4 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl ring-1 ring-zinc-200/50 transition-all duration-300 md:relative md:bottom-auto md:left-auto md:right-auto md:z-0 md:w-full md:max-w-none md:translate-x-0 md:translate-y-0 md:opacity-100 md:pointer-events-auto md:bg-transparent md:p-0 md:pt-12 md:shadow-none md:ring-0 md:backdrop-blur-none ${hideBottomActions ? 'translate-y-[120%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
                                <div className="flex w-full items-center justify-between gap-4">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className={`h-14 rounded-2xl px-8 font-bold text-[#757575] transition-all hover:bg-zinc-100 ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                        disabled={step === 1}
                                        onClick={() => {
                                            setStep((value) => Math.max(1, value - 1));
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        Back
                                    </Button>
                                    <div className="flex items-center gap-3">
                                        {step < 4 ? (
                                            <Button
                                                type="button"
                                                className="h-14 rounded-2xl px-12 font-black shadow-lg shadow-[#F57C00]/20 bg-[#F57C00] hover:bg-[#E65100] active:scale-95 transition-all text-white"
                                                disabled={
                                                    (step === 1 && cartItems.length === 0) ||
                                                    (step === 2 && cartItems.length === 0) ||
                                                    (step === 3 && !canContinueDetails)
                                                }
                                                onClick={() => {
                                                    setStep((value) => Math.min(4, value + 1));
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                            >
                                                Continue
                                            </Button>
                                        ) : (
                                            <Button
                                                type="button"
                                                className="h-14 rounded-2xl px-12 font-black shadow-lg shadow-[#2E7D32]/20 bg-[#2E7D32] hover:bg-[#1B5E20] active:scale-95 transition-all text-white"
                                                disabled={form.processing || cartItems.length === 0}
                                                onClick={submitOrder}
                                            >
                                                {form.processing ? 'Submitting...' : 'Confirm Order'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <aside className="hidden lg:block">
                            <div className="sticky top-24 space-y-6">
                                {/* Cart Summary Card */}
                                <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-zinc-200">
                                    <div className="bg-[#212121] px-6 py-5 text-white">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <ShoppingCart className="size-5 text-[#F57C00]" />
                                                <h3 className="font-black uppercase tracking-widest text-sm">Review Order</h3>
                                            </div>
                                            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase">
                                                {cartCount} items
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {cartItems.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-6 text-center" id="empty-cart-summary">
                                                <div className="mb-4 h-16 w-16 rounded-full bg-zinc-50 flex items-center justify-center">
                                                    <ShoppingCart className="size-6 text-zinc-300" />
                                                </div>
                                                <p className="text-sm font-medium text-[#9E9E9E]">Your bag is empty.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {cartItems.slice(0, 5).map((item) => (
                                                    <div key={item.id} className="flex items-center justify-between gap-4">
                                                        <div className="flex min-w-0 items-center gap-3">
                                                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 shadow-sm">
                                                                {item.image_url ? (
                                                                    <img
                                                                        src={item.image_url}
                                                                        alt={item.name}
                                                                        className="h-full w-full object-cover"
                                                                        loading="lazy"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-[8px] font-black uppercase tracking-tighter text-zinc-400">
                                                                        Prep
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="truncate text-sm font-bold text-[#212121]">{item.name}</p>
                                                                <p className="text-xs font-medium text-[#757575]">Qty: {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <span className="text-sm font-black text-[#212121]">{currency(item.lineTotal)}</span>
                                                    </div>
                                                ))}
                                                {cartItems.length > 5 && (
                                                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                                        + {cartItems.length - 5} additional items
                                                    </p>
                                                )}

                                                <div className="mt-6 space-y-3 rounded-xl bg-[#FAFAFA] p-4 text-sm">
                                                    <div className="flex justify-between text-[#757575]">
                                                        <span>Subtotal</span>
                                                        <span className="font-bold">{currency(cartTotal)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-[#757575]">
                                                        <span>Processing Fee</span>
                                                        <span className="font-bold text-[#2E7D32]">FREE</span>
                                                    </div>
                                                    <div className="border-t border-zinc-200 pt-3">
                                                        <div className="flex justify-between text-lg font-black text-[#212121]">
                                                            <span>Total</span>
                                                            <span className="text-[#F57C00]">{currency(cartTotal)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Help Card */}
                                <div className="rounded-2xl bg-[#FFF3E0] p-6 text-[#E65100]">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                                            <Clock3 className="size-4" />
                                        </div>
                                        <h4 className="text-sm font-black uppercase tracking-widest">Help & Info</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F57C00]"></div>
                                            <p className="text-xs leading-relaxed font-medium">Pickup times are estimated and may vary based on demand.</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F57C00]"></div>
                                            <p className="text-xs leading-relaxed font-medium">Please ensure your phone number is correct for tracking updates.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </>
    );
}
