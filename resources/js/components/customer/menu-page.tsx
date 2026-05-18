import { Head, usePage } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Clock3Icon,
    ImageOff,
    Search,
    Utensils,
    X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { FeedbackModal } from './feedback-modal';

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
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

function itemCategory(item: MenuItem): string {
    return item.category?.trim() || 'Uncategorized';
}

export default function CustomerMenuPage({
    menuItems,
    categories,
    filters,
    customerToken,

}: CustomerMenuPageProps) {
    const { flash } = usePage<SharedProps>().props;
    const [search, setSearch] = useState(filters.search ?? '');
    const [activeCategory, setActiveCategory] = useState(
        filters.category ?? 'all',
    );
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(
        () => (filters.search ?? '').trim() !== '',
    );
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const featuredCarouselRef = useRef<HTMLDivElement | null>(null);
    const [canScrollFeaturedPrev, setCanScrollFeaturedPrev] = useState(false);
    const [canScrollFeaturedNext, setCanScrollFeaturedNext] = useState(false);

    const categoryOptions = useMemo(() => {
        const normalized = new Set(
            categories
                .map((category) => category.trim())
                .filter((category) => category !== ''),
        );

        if (menuItems.some((item) => itemCategory(item) === 'Uncategorized')) {
            normalized.add('Uncategorized');
        }

        return Array.from(normalized);
    }, [categories, menuItems]);

    const filteredItems = useMemo(() => {
        const lowerSearch = search.trim().toLowerCase();

        return menuItems.filter((item) => {
            const category = itemCategory(item);
            const matchesCategory =
                activeCategory === 'all' || category === activeCategory;
            const matchesSearch =
                lowerSearch === '' ||
                item.name.toLowerCase().includes(lowerSearch) ||
                (item.description ?? '').toLowerCase().includes(lowerSearch) ||
                category.toLowerCase().includes(lowerSearch);

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, menuItems, search]);

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

        setCanScrollFeaturedPrev(maxScrollLeft > 1 && carousel.scrollLeft > 4);
        setCanScrollFeaturedNext(
            maxScrollLeft > 1 && carousel.scrollLeft < maxScrollLeft - 4,
        );
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

    const hideSearchInput = useCallback(() => {
        setSearch('');
        setIsSearchInputVisible(false);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        window.requestAnimationFrame(updateFeaturedCarouselState);
    }, [featuredItems.length, updateFeaturedCarouselState]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const onResize = () => {
            window.requestAnimationFrame(updateFeaturedCarouselState);
        };

        window.addEventListener('resize', onResize, { passive: true });

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [updateFeaturedCarouselState]);

    useEffect(() => {
        if (!isSearchInputVisible) {
            return;
        }

        const input = searchInputRef.current;

        if (!input) {
            return;
        }

        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
    }, [isSearchInputVisible]);

    return (
        <>
            <Head title="Cafe Menu" />
            <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
                <main className="mx-auto w-full max-w-5xl px-4 py-8 pb-16 md:px-8">
                    <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
                                <Utensils className="size-5" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                                Menu
                            </h1>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                                Browse available items by category or search for
                                a favorite.
                            </p>
                        </div>

                        {isSearchInputVisible ? (
                            <div className="group relative w-full max-w-md rounded-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-orange-500/20">
                                <Search className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-zinc-400 transition-colors duration-300 group-focus-within:text-orange-500" />
                                <Input
                                    ref={searchInputRef}
                                    className="h-14 rounded-2xl border-none bg-white pr-14 pl-14 text-base shadow-sm ring-1 ring-zinc-200 transition-all duration-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-orange-500 dark:bg-zinc-900 dark:ring-zinc-800 dark:focus:ring-orange-500/50"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
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
                                    placeholder="Search menu"
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
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-zinc-600 shadow-sm ring-1 ring-zinc-200 transition-all duration-300 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800 dark:hover:bg-zinc-800"
                                onClick={() => setIsSearchInputVisible(true)}
                            >
                                <Search className="size-4" />
                                Search menu
                            </button>
                        )}
                    </header>

                    <div className="sticky top-0 z-40 mb-8 bg-zinc-50/85 py-2 backdrop-blur-xl dark:bg-zinc-950/85">
                        <div className="scrollable flex gap-3 overflow-x-auto px-1 pb-1">
                            <button
                                type="button"
                                className={`whitespace-nowrap rounded-2xl px-6 py-2.5 text-sm font-bold transition-all duration-300 ${activeCategory === 'all'
                                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                    : 'bg-white text-zinc-500 ring-1 ring-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-zinc-800 dark:hover:bg-zinc-800'
                                    }`}
                                onClick={() => setActiveCategory('all')}
                            >
                                All
                            </button>
                            {categoryOptions.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    className={`whitespace-nowrap rounded-2xl px-6 py-2.5 text-sm font-bold transition-all duration-300 ${activeCategory === category
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

                    <section className="space-y-8">
                        {flash?.success && (
                            <div className="animate-in rounded-xl border-l-4 border-[#2E7D32] bg-green-50 px-5 py-4 text-sm font-medium text-[#1B5E20] shadow-sm transition-all duration-500 fade-in slide-in-from-top-4">
                                {flash.success}
                            </div>
                        )}
                        {flash?.error && (
                            <div className="animate-in rounded-xl border-l-4 border-[#C62828] bg-red-50 px-5 py-4 text-sm font-medium text-[#B71C1C] shadow-sm transition-all duration-500 fade-in slide-in-from-top-4">
                                {flash.error}
                            </div>
                        )}

                        {featuredItems.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                                        Popular
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                            onClick={() =>
                                                scrollFeaturedCarousel(-1)
                                            }
                                            disabled={!canScrollFeaturedPrev}
                                            aria-label="Previous featured items"
                                        >
                                            <ChevronLeft className="size-4" />
                                        </button>
                                        <button
                                            type="button"
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                            onClick={() =>
                                                scrollFeaturedCarousel(1)
                                            }
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
                                    className="scrollable snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth pb-4"
                                >
                                    <div className="flex min-w-0 gap-4 pr-1">
                                        {featuredItems.map((item) => (
                                            <article
                                                key={`featured-${item.id}`}
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
                                                            <ImageOff className="size-8 opacity-60" />
                                                        </div>
                                                    )}
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

                        <div className="grid gap-6">
                            {filteredItems.map((item) => (
                                <article
                                    key={item.id}
                                    className="group flex gap-4 border-b border-zinc-100 pb-6 transition-all duration-300 last:border-0 dark:border-zinc-800"
                                >
                                    <div className="flex flex-1 flex-col justify-center">
                                        <div className="mb-2 text-xs font-semibold uppercase text-orange-600 dark:text-orange-400">
                                            {itemCategory(item)}
                                        </div>
                                        <h3 className="text-base font-bold leading-tight text-zinc-900 transition-colors duration-300 dark:text-zinc-100">
                                            {item.name}
                                        </h3>
                                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                                            {item.description ??
                                                'A delicious selection crafted with high-quality ingredients just for you.'}
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
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-zinc-300 dark:text-zinc-600">
                                                <ImageOff className="size-6 opacity-60" />
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>

                        {filteredItems.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
                                    <Search className="size-10 text-zinc-300 dark:text-zinc-600" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                    No items found
                                </h3>
                                <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                                    Try adjusting your search or category
                                    filter.
                                </p>
                            </div>
                        )}
                    </section>
                      {/* Help Card */}
                <div className="animate-in rounded-2xl border border-orange-100 bg-orange-50/30 p-6 text-orange-700 duration-500 slide-in-from-bottom-4 dark:border-orange-900/40 dark:bg-orange-950/20 dark:text-orange-400">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-orange-100 dark:bg-zinc-800 dark:ring-orange-900/50">
                            <Clock3Icon className="size-4" />
                        </div>
                        <h4 className="text-xs font-bold tracking-widest uppercase">
                            Help & Info
                        </h4>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600 dark:bg-orange-500"></div>
                            <p className="text-xs leading-relaxed font-medium">
                                Pickup times are estimated and
                                may vary based on demand.
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600 dark:bg-orange-500"></div>
                            <p className="text-xs leading-relaxed font-medium">
                                Please ensure your phone number
                                is correct for tracking updates.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <FeedbackModal
                            customerId={
                                customerToken
                                    ? Number(customerToken)
                                    : undefined
                            }
                        />
                    </div>
                </div>
                </main>
              
            </div>
        </>
    );
}
