import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Search,
    ShoppingCart,
    Store,
    Table2,
    X,
    Plus,
    Minus,
    CheckCircle2,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FeedbackModal } from '@/components/customer/feedback-modal';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type MenuItem = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    category: string | null;
    image_url: string | null;
    is_featured?: boolean;
};

type TableInfo = {
    id: number;
    name: string;
    qr_code: string;
    pickup_location: {
        id: number | null;
        name: string | null;
        address: string | null;
    };
};

type TableSessionInfo = {
    token: string;
    started_at: string | null;
    last_seen_at: string | null;
    verified_at: string | null;
    is_verified: boolean;
};

type PageProps = {
    menuItems: MenuItem[];
    categories: string[];
    customerToken: string;
    table: TableInfo;
    tableSession: TableSessionInfo;
    filters: {
        search?: string | null;
        category?: string | null;
    };
    staffRoute?: string | null;
};

type CartEntry = MenuItem & {
    quantity: number;
    lineTotal: number;
};

type QrOrderForm = {
    customer_token: string;
    table_session_token: string;
    items: {
        menu_item_id: number;
        quantity: number;
    }[];
};

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

function sanitizeCartPayload(
    raw: unknown,
    allowedMenuItemIds: Set<number>,
): Record<number, number> {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        return {};
    }

    const sanitized: Record<number, number> = {};

    Object.entries(raw).forEach(([rawItemId, rawQuantity]) => {
        const itemId = Number(rawItemId);
        const quantity =
            typeof rawQuantity === 'number' ? rawQuantity : Number(rawQuantity);

        if (
            !Number.isInteger(itemId) ||
            itemId < 1 ||
            !allowedMenuItemIds.has(itemId)
        ) {
            return;
        }

        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
            return;
        }

        sanitized[itemId] = quantity;
    });

    return sanitized;
}

function loadPersistedCart(
    storageKey: string,
    allowedMenuItemIds: Set<number>,
): Record<number, number> {
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

export default function QrMenu({
    menuItems,
    categories,
    customerToken,
    table,
    tableSession,
    filters,
    staffRoute,
}: PageProps) {
    const cartStorageKey = `kds:customer:qr-cart:${table.qr_code}:${customerToken}`;
    const allowedMenuItemIds = useMemo(
        () => new Set(menuItems.map((item) => item.id)),
        [menuItems],
    );
    const [search, setSearch] = useState(filters.search ?? '');
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(
        () => (filters.search ?? '').trim() !== '',
    );
    const [activeCategory, setActiveCategory] = useState(
        filters.category ?? 'all',
    );
    const [hideTopChrome, setHideTopChrome] = useState(false);
    const [hideBottomActions, setHideBottomActions] = useState(false);
    const [orderJustPlaced, setOrderJustPlaced] = useState(false);
    const lastScrollY = useRef(0);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const featuredCarouselRef = useRef<HTMLDivElement | null>(null);
    const [cart, setCart] = useState<Record<number, number>>(() =>
        loadPersistedCart(cartStorageKey, allowedMenuItemIds),
    );
    const [canScrollFeaturedPrev, setCanScrollFeaturedPrev] = useState(false);
    const [canScrollFeaturedNext, setCanScrollFeaturedNext] = useState(false);

    const form = useForm<QrOrderForm>({
        customer_token: customerToken,
        table_session_token: tableSession.token,
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
                    activeCategory === 'all' ||
                    (item.category ?? 'Uncategorized') === activeCategory;
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

    const scrollFeaturedCarousel = (direction: -1 | 1) => {
        const carousel = featuredCarouselRef.current;

        if (!carousel) {
            return;
        }

        carousel.scrollBy({
            left: carousel.clientWidth * 0.85 * direction,
            behavior: 'smooth',
        });
    };

    const autoAdvanceFeaturedCarousel = useCallback(() => {
        const carousel = featuredCarouselRef.current;

        if (!carousel) {
            return;
        }

        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

        if (maxScrollLeft <= 1) {
            return;
        }

        const firstSlide = carousel.querySelector<HTMLElement>(
            '[data-featured-slide="true"]',
        );
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

    const hideSearchInput = () => {
        setSearch('');
        setIsSearchInputVisible(false);
    };

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

    const cartCount = cartItems.reduce(
        (carry, item) => carry + item.quantity,
        0,
    );
    const cartTotal = cartItems.reduce(
        (carry, item) => carry + item.lineTotal,
        0,
    );

    useEffect(() => {
        persistCart(
            cartStorageKey,
            sanitizeCartPayload(cart, allowedMenuItemIds),
        );
    }, [cart, cartStorageKey, allowedMenuItemIds]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const onResize = () => {
            updateFeaturedCarouselState();
        };

        const timeoutId = window.setTimeout(onResize, 0);

        window.addEventListener('resize', onResize);

        return () => {
            window.clearTimeout(timeoutId);
            window.removeEventListener('resize', onResize);
        };
    }, [featuredItems.length, updateFeaturedCarouselState]);

    useEffect(() => {
        if (!isSearchInputVisible) {
            return;
        }

        const input = searchInputRef.current;

        if (!input) {
            return;
        }

        input.focus();
        const caretPosition = input.value.length;
        input.setSelectionRange(caretPosition, caretPosition);
    }, [isSearchInputVisible]);

    useEffect(() => {
        if (featuredItems.length <= 1) {
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
    }, [autoAdvanceFeaturedCarousel, featuredItems.length]);

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
                const isDesktop =
                    window.matchMedia('(min-width: 768px)').matches;

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
                    setHideTopChrome(true);
                    setHideBottomActions(true);
                } else if (delta < -6 || currentY < 32) {
                    setHideTopChrome(false);
                    setHideBottomActions(false);
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

    const updateItemQuantity = (itemId: number, nextQuantity: number) => {
        if (orderJustPlaced) {
            setOrderJustPlaced(false);
        }

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

    const submitOrder = () => {
        const itemsPayload = cartItems.map((item) => ({
            menu_item_id: item.id,
            quantity: item.quantity,
        }));

        form.transform((data) => ({
            ...data,
            items: itemsPayload,
        }));

        form.post(
            `/qr-menu/${table.qr_code}/orders?session=${encodeURIComponent(tableSession.token)}`,
            {
                preserveScroll: true,
                onSuccess: () => {
                    clearPersistedCart(cartStorageKey);
                    setCart({});
                    setOrderJustPlaced(true);
                },
                onError: (errors) => {
                    if (errors.table_session_token) {
                        window.location.reload();
                    }
                },
            },
        );
    };

    return (
        <>
            <Head title={`QR Menu • ${table.name}`} />
            <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
                {/* Cart Floating Action Button */}
                {cartCount > 0 && (
                    <button
                        onClick={() => {
                            const aside = document.querySelector('aside');
                            aside?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`fixed right-6 bottom-8 z-[60] flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-zinc-900 text-zinc-50 shadow-xl ring-4 ring-white transition-all duration-300 hover:scale-110 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:ring-zinc-800 ${hideBottomActions ? 'pointer-events-none translate-y-[140%] opacity-0' : 'translate-y-0 opacity-100'}`}
                    >
                        <div className="relative">
                            <ShoppingCart
                                className="size-6"
                                strokeWidth={2.5}
                            />
                            <span className="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-[11px] font-bold text-white shadow-md ring-2 ring-white transition-colors dark:bg-orange-500 dark:ring-zinc-900">
                                {cartCount}
                            </span>
                        </div>
                    </button>
                )}

                <main className="mx-auto w-full max-w-7xl px-4 py-8 pb-32 md:px-8 md:pb-12">
                    {/* Header/Chrome */}
                    <div
                        className={`sticky top-0 z-50 mb-8 overflow-hidden bg-white/80 py-2 backdrop-blur-xl transition-all duration-300 md:relative md:top-0 dark:bg-zinc-950/80 ${hideTopChrome ? 'pointer-events-none -translate-y-[160%] opacity-0' : 'translate-y-0 opacity-100'}`}
                    >
                        <div className="scrollable flex gap-3 px-1 transition-all duration-300">
                            <button
                                type="button"
                                className={`rounded-2xl px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                                    activeCategory === 'all'
                                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                        : 'bg-white text-zinc-500 ring-1 ring-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-zinc-800 dark:hover:bg-zinc-800'
                                }`}
                                onClick={() => setActiveCategory('all')}
                            >
                                All
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    className={`whitespace-nowrap rounded-2xl px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                                        activeCategory === category
                                            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                            : 'bg-white text-zinc-500 ring-1 ring-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-zinc-800 dark:hover:bg-zinc-800'
                                    }`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
                        <section className="animate-in space-y-8 duration-500 fade-in">
                            {/* Table Info & Search */}
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Table2 className="size-5 text-orange-600 dark:text-orange-500" />
                                        <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                                            {table.name}
                                        </h1>
                                        <Badge
                                            variant="outline"
                                            className={`ml-2 ${tableSession.is_verified ? 'border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'border-amber-500/20 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'}`}
                                        >
                                            {tableSession.is_verified
                                                ? 'Verified'
                                                : 'Pending'}
                                        </Badge>
                                    </div>
                                    <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                        {table.pickup_location.name} •{' '}
                                        {table.pickup_location.address}
                                    </p>
                                    <div className="mt-3 hidden">
                                       <FeedbackModal 
                                            customerToken={customerToken}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    {isSearchInputVisible ? (
                                        <div className="group relative w-full max-w-md rounded-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-orange-500/20">
                                            <Search className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-zinc-400 transition-colors duration-300 group-focus-within:text-orange-500" />
                                            <Input
                                                ref={searchInputRef}
                                                className="h-14 rounded-2xl border-none bg-white pr-14 pl-14 text-base shadow-sm ring-1 ring-zinc-200 transition-all duration-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-orange-500 dark:bg-zinc-900 dark:ring-zinc-800 dark:focus:ring-orange-500/50"
                                                value={search}
                                                onChange={(event) =>
                                                    setSearch(
                                                        event.target.value,
                                                    )
                                                }
                                                onBlur={() => {
                                                    if (search.trim() === '') {
                                                        setIsSearchInputVisible(
                                                            false,
                                                        );
                                                    }
                                                }}
                                                onKeyDown={(event) => {
                                                    if (
                                                        event.key === 'Escape'
                                                    ) {
                                                        hideSearchInput();
                                                    }
                                                }}
                                                placeholder="Search menu items"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                                                onClick={hideSearchInput}
                                                aria-label="Hide search"
                                            >
                                                <X className="size-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-zinc-500 shadow-sm ring-1 ring-zinc-200 transition-all duration-300 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-zinc-800 dark:hover:bg-zinc-800"
                                            onClick={() =>
                                                setIsSearchInputVisible(true)
                                            }
                                        >
                                            <Search className="size-4" />
                                            Search menu
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Featured Carousel */}
                            {featuredItems.length > 0 && !search && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                                            Popular
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                                onClick={() => scrollFeaturedCarousel(-1)}
                                                disabled={!canScrollFeaturedPrev}
                                            >
                                                <ChevronLeft className="size-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                                onClick={() => scrollFeaturedCarousel(1)}
                                                disabled={!canScrollFeaturedNext}
                                            >
                                                <ChevronRight className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        ref={featuredCarouselRef}
                                        onScroll={updateFeaturedCarouselState}
                                        className="scrollable snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth pb-4"
                                    >
                                        <div className="flex min-w-0 gap-4 pr-1">
                                            {featuredItems.map((item) => (
                                                <article
                                                    key={`featured-${item.id}`}
                                                    data-featured-slide="true"
                                                    className="group w-[160px] shrink-0 snap-start space-y-3 md:w-[200px]"
                                                >
                                                    <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800">
                                                        {item.image_url ? (
                                                            <img
                                                                src={item.image_url}
                                                                alt={item.name}
                                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full flex-col items-center justify-center text-zinc-300 dark:text-zinc-600">
                                                                <ShoppingCart className="size-8 opacity-50" />
                                                            </div>
                                                        )}
                                                        <div className="absolute bottom-2 right-2">
                                                            {(cart[item.id] ?? 0) > 0 ? (
                                                                <div className="flex h-8 items-center gap-2 rounded-full bg-white px-1 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
                                                                    <button
                                                                        type="button"
                                                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            updateItemQuantity(item.id, (cart[item.id] ?? 0) - 1);
                                                                        }}
                                                                    >
                                                                        <Minus className="size-3" />
                                                                    </button>
                                                                    <span className="text-xs font-bold w-3 text-center text-zinc-900 dark:text-zinc-100">
                                                                        {cart[item.id]}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            updateItemQuantity(item.id, (cart[item.id] ?? 0) + 1);
                                                                        }}
                                                                    >
                                                                        <Plus className="size-3" />
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-900 shadow-sm transition-transform hover:scale-105 active:scale-95 dark:bg-zinc-800 dark:text-zinc-100"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        updateItemQuantity(item.id, 1);
                                                                    }}
                                                                >
                                                                    <Plus className="size-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="line-clamp-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                                            {item.name}
                                                        </h3>
                                                        <p className="mt-0.5 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                                                            {currency(item.price)}
                                                        </p>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Food Grid */}
                            <div className="grid gap-6">
                                {filteredItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group flex gap-4 border-b border-zinc-100 pb-6 transition-all duration-300 last:border-0 dark:border-zinc-800"
                                    >
                                        <div className="flex flex-1 flex-col justify-center">
                                            <h3 className="text-base font-bold leading-tight text-zinc-900 transition-colors duration-300 dark:text-zinc-100">
                                                {item.name}
                                            </h3>
                                            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                                                {item.description ?? 'Freshly prepared for your table.'}
                                            </p>
                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                                    {currency(item.price)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 md:h-32 md:w-32">
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-600">
                                                    <ShoppingCart className="size-6 opacity-50" />
                                                </div>
                                            )}
                                            
                                            <div className="absolute bottom-2 right-2">
                                                {(cart[item.id] ?? 0) > 0 ? (
                                                    <div className="flex h-8 items-center gap-2 rounded-full bg-white px-1 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
                                                        <button
                                                            type="button"
                                                            className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                updateItemQuantity(item.id, (cart[item.id] ?? 0) - 1);
                                                            }}
                                                        >
                                                            <Minus className="size-3" />
                                                        </button>
                                                        <span className="text-xs font-bold w-3 text-center text-zinc-900 dark:text-zinc-100">
                                                            {cart[item.id]}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                updateItemQuantity(item.id, (cart[item.id] ?? 0) + 1);
                                                            }}
                                                        >
                                                            <Plus className="size-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-900 shadow-sm transition-transform hover:scale-105 active:scale-95 dark:bg-zinc-800 dark:text-zinc-100"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            updateItemQuantity(item.id, 1);
                                                        }}
                                                    >
                                                        <Plus className="size-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredItems.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <Search className="size-16 text-zinc-200 dark:text-zinc-800" />
                                    <h3 className="mt-4 text-xl font-bold dark:text-zinc-100">
                                        No items found
                                    </h3>
                                    <p className="mt-2 text-zinc-500">
                                        Try adjusting your search or filters.
                                    </p>
                                </div>
                            )}
                        </section>

                        <aside>
                            <div className="sticky top-6 space-y-6">
                                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-800">
                                    <div className="mb-6">
                                        <h3 className="text-sm font-black tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
                                            Your Table Order
                                        </h3>
                                        <div className="mt-4 flex items-end justify-between">
                                            <div>
                                                <p className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
                                                    {currency(cartTotal)}
                                                </p>
                                                <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                                    {cartCount} items selected
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <p className="font-mono text-[10px] text-zinc-400">
                                                    {tableSession.token.slice(
                                                        0,
                                                        8,
                                                    )}
                                                </p>
                                                {staffRoute && (
                                                    <Link
                                                        href={staffRoute}
                                                        className="text-xs font-bold text-orange-600 hover:underline dark:text-orange-500"
                                                    >
                                                        Staff Panel
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {cartItems.length === 0 ? (
                                            <div className="rounded-xl bg-zinc-50 px-4 py-8 text-center dark:bg-zinc-800/50">
                                                <ShoppingCart className="mx-auto size-8 text-zinc-200 dark:text-zinc-700" />
                                                <p className="mt-2 text-sm font-medium text-zinc-400">
                                                    Empty cart
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="scrollable max-h-[320px] space-y-2 overflow-y-auto pr-2">
                                                {cartItems.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center justify-between rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50"
                                                    >
                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                                {item.quantity}{' '}
                                                                x{' '}
                                                                {currency(
                                                                    item.price,
                                                                )}
                                                            </p>
                                                        </div>
                                                        <p className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                                                            {currency(
                                                                item.lineTotal,
                                                            )}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 space-y-4">
                                        <div className="rounded-xl bg-orange-50/50 p-4 dark:bg-orange-950/10">
                                            <div className="flex items-center gap-2">
                                                <Store className="size-4 text-orange-600 dark:text-orange-500" />
                                                <p className="text-xs font-bold text-orange-900 dark:text-orange-400">
                                                    Direct Table Order
                                                </p>
                                            </div>
                                            <p className="mt-1 text-[11px] leading-relaxed text-orange-700/70 dark:text-orange-400/60">
                                                Placed directly to the kitchen.
                                                No payment required upfront.
                                            </p>
                                        </div>

                                        {orderJustPlaced && (
                                            <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-200">
                                                <div className="flex items-start gap-2">
                                                    <CheckCircle2 className="mt-0.5 size-4 text-emerald-600 dark:text-emerald-400" />
                                                    <div>
                                                        <p className="font-semibold">
                                                            Order placed successfully
                                                        </p>
                                                        <p className="mt-0.5 text-xs opacity-80">
                                                            Your table order has been sent to the kitchen. A staff member will attend to you shortly.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <InputError
                                            message={form.errors.items}
                                        />
                                        <InputError
                                            message={
                                                form.errors.table_session_token
                                            }
                                        />

                                        <Button
                                            type="button"
                                            className="h-14 w-full rounded-2xl bg-zinc-900 text-base font-black text-white transition-all hover:bg-black active:scale-[0.98] disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                                            disabled={
                                                form.processing ||
                                                cartItems.length === 0
                                            }
                                            onClick={submitOrder}
                                        >
                                            {form.processing
                                                ? 'Placing Order...'
                                                : 'Confirm Table Order'}
                                        </Button>
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
