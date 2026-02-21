import { Head, Link, useForm } from '@inertiajs/react';
import { CheckCircle2, QrCode, Search, ShoppingCart, Store, Table2 } from 'lucide-react';
import { useMemo, useState } from 'react';
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
    table_session_token: string;
};

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

export default function QrMenu({
    menuItems,
    categories,
    table,
    tableSession,
    filters,
    staffRoute,
}: PageProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [activeCategory, setActiveCategory] = useState(filters.category ?? 'all');
    const [cart, setCart] = useState<Record<number, number>>({});

    const form = useForm<QrOrderForm>({
        table_session_token: tableSession.token,
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

    const submitOrder = () => {
        const itemsPayload = cartItems.map((item) => ({
            menu_item_id: item.id,
            quantity: item.quantity,
        }));

        form.transform((data) => ({
            ...data,
            items: itemsPayload,
        }));

        form.post(`/qr-menu/${table.qr_code}/orders?session=${encodeURIComponent(tableSession.token)}`, {
            preserveScroll: true,
            onError: (errors) => {
                if (errors.table_session_token) {
                    window.location.reload();
                }
            },
        });
    };

    return (
        <>
            <Head title={`QR Menu • ${table.name}`} />
            <div className="min-h-screen bg-[#FAFAFA] text-[#212121]">
                <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
                    <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Table QR Order</p>
                                <h1 className="mt-2 flex items-center gap-2 text-2xl font-black text-[#212121]">
                                    <Table2 className="size-6 text-[#F57C00]" />
                                    {table.name}
                                </h1>
                                <p className="mt-1 text-sm font-medium text-zinc-500">
                                    {table.pickup_location.name} • {table.pickup_location.address}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <Badge className={tableSession.is_verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}>
                                    {tableSession.is_verified ? (
                                        <>
                                            <CheckCircle2 className="mr-1 size-3" />
                                            Session Verified
                                        </>
                                    ) : (
                                        <>
                                            <QrCode className="mr-1 size-3" />
                                            Session Pending Verify
                                        </>
                                    )}
                                </Badge>
                                <p className="text-[11px] font-mono text-zinc-400">{tableSession.token.slice(0, 16)}...</p>
                                {staffRoute ? (
                                    <Link href={staffRoute} className="text-xs font-bold text-[#F57C00] hover:underline">
                                        Staff Dashboard
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
                        <section className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-zinc-400" />
                                    <Input
                                        className="h-12 rounded-2xl border-zinc-200 pl-10 focus:ring-[#F57C00]"
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search menu items"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        type="button"
                                        size="sm"
                                        className={activeCategory === 'all' ? 'bg-[#F57C00] hover:bg-[#E65100]' : ''}
                                        variant={activeCategory === 'all' ? 'default' : 'outline'}
                                        onClick={() => setActiveCategory('all')}
                                    >
                                        All
                                    </Button>
                                    {categories.map((category) => (
                                        <Button
                                            key={category}
                                            type="button"
                                            size="sm"
                                            className={activeCategory === category ? 'bg-[#F57C00] hover:bg-[#E65100]' : ''}
                                            variant={activeCategory === category ? 'default' : 'outline'}
                                            onClick={() => setActiveCategory(category)}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {filteredItems.length === 0 ? (
                                <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-zinc-200">
                                    <p className="text-sm font-bold text-zinc-500">No items found for this search.</p>
                                </div>
                            ) : (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {filteredItems.map((item) => (
                                        <div key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
                                            <div className="aspect-[4/3] bg-zinc-100">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-zinc-400">
                                                        <ShoppingCart className="size-8" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-3 p-4">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="text-lg font-black text-zinc-900">{item.name}</p>
                                                        <p className="text-sm text-zinc-500">{item.description ?? 'Freshly prepared for your table.'}</p>
                                                    </div>
                                                    <p className="text-sm font-black text-[#F57C00]">{currency(item.price)}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1 rounded-full bg-zinc-50 p-1 ring-1 ring-zinc-200">
                                                        <button
                                                            type="button"
                                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-black text-zinc-700 hover:bg-[#F57C00] hover:text-white"
                                                            onClick={() => updateItemQuantity(item.id, (cart[item.id] ?? 0) - 1)}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-black">{cart[item.id] ?? 0}</span>
                                                        <button
                                                            type="button"
                                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-black text-zinc-700 hover:bg-[#F57C00] hover:text-white"
                                                            onClick={() => updateItemQuantity(item.id, (cart[item.id] ?? 0) + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        className={(cart[item.id] ?? 0) > 0 ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#F57C00] hover:bg-[#E65100]'}
                                                        onClick={() => updateItemQuantity(item.id, Math.max(1, (cart[item.id] ?? 0) + 1))}
                                                    >
                                                        {(cart[item.id] ?? 0) > 0 ? 'Add more' : 'Add'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <aside>
                            <div className="sticky top-6 space-y-6">
                                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">Your Table Order</h3>
                                    <p className="mt-1 text-2xl font-black text-zinc-900">{currency(cartTotal)}</p>
                                    <p className="mt-1 text-sm font-medium text-zinc-500">{cartCount} item(s)</p>

                                    <div className="mt-4 space-y-2">
                                        {cartItems.length === 0 ? (
                                            <p className="rounded-xl bg-zinc-50 p-3 text-sm font-medium text-zinc-500">No items selected yet.</p>
                                        ) : (
                                            cartItems.map((item) => (
                                                <div key={item.id} className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2">
                                                    <span className="truncate text-sm font-bold text-zinc-800">{item.name} x{item.quantity}</span>
                                                    <span className="text-sm font-black text-zinc-900">{currency(item.lineTotal)}</span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <InputError message={form.errors.items} />
                                </div>

                                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
                                    <div className="mb-4 flex items-center gap-2">
                                        <Store className="size-4 text-[#F57C00]" />
                                        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">Place Order</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="rounded-xl bg-zinc-50 px-3 py-3 text-xs font-medium text-zinc-600 ring-1 ring-zinc-200">
                                            No contact details required for table QR orders.
                                        </p>
                                        <InputError message={form.errors.table_session_token} />
                                        <Button
                                            type="button"
                                            className="h-11 w-full rounded-xl bg-[#212121] font-black text-white hover:bg-black"
                                            disabled={form.processing || cartItems.length === 0}
                                            onClick={submitOrder}
                                        >
                                            {form.processing ? 'Placing Order...' : 'Place Table Order'}
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
