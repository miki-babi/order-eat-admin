import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Search, ShoppingCart } from 'lucide-react';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type MenuItem = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    category: string | null;
    image_url: string | null;
};

type PickupLocation = {
    id: number;
    name: string;
    address: string;
};

type CartEntry = MenuItem & {
    quantity: number;
    lineTotal: number;
};

type PageProps = {
    menuItems: MenuItem[];
    categories: string[];
    pickupLocations: PickupLocation[];
    filters: {
        search?: string | null;
        category?: string | null;
    };
    staffRoute?: string | null;
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
    name: string;
    phone: string;
    pickup_date: string;
    pickup_location_id: number | '';
    notify_when_ready: boolean;
    receipt: File | null;
};

const steps = [
    '1. Browse Menu',
    '2. Review Cart',
    '3. Pickup Details',
    '4. Receipt Upload',
];

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

export default function Menu({
    menuItems,
    categories,
    pickupLocations,
    filters,
    staffRoute,
}: PageProps) {
    const { auth, flash } = usePage<SharedProps>().props;
    const [step, setStep] = useState(1);
    const [search, setSearch] = useState(filters.search ?? '');
    const [activeCategory, setActiveCategory] = useState(filters.category ?? 'all');
    const [cart, setCart] = useState<Record<number, number>>({});

    const form = useForm<OrderForm>({
        name: auth?.user?.name ?? '',
        phone: '',
        pickup_date: todayDate(),
        pickup_location_id: pickupLocations[0]?.id ?? '',
        notify_when_ready: false,
        receipt: null,
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

    const canContinueDetails =
        form.data.name.trim() &&
        form.data.phone.trim() &&
        form.data.pickup_date &&
        form.data.pickup_location_id;

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
            <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-white">
                <header className="border-b bg-white/70 backdrop-blur">
                    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
                        <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-orange-700">Cafe Ordering</p>
                            <h1 className="text-2xl font-semibold">Order for Pickup</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            {staffRoute ? (
                                <Link href={staffRoute}>
                                    <Button variant="outline">Staff Dashboard</Button>
                                </Link>
                            ) : null}
                            <Link href="/login">
                                <Button variant="ghost">Staff Login</Button>
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 md:grid-cols-[1fr_320px] md:px-6">
                    <section className="space-y-4">
                        {flash?.success ? (
                            <div className="rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
                                {flash.success}
                            </div>
                        ) : null}
                        {flash?.error ? (
                            <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                                {flash.error}
                            </div>
                        ) : null}

                        <div className="rounded-xl border bg-white p-4">
                            <div className="grid gap-2 md:grid-cols-4">
                                {steps.map((label, index) => (
                                    <div
                                        key={label}
                                        className={`rounded-md border px-3 py-2 text-sm ${
                                            step >= index + 1
                                                ? 'border-orange-400 bg-orange-50 text-orange-900'
                                                : 'border-zinc-200 text-zinc-500'
                                        }`}
                                    >
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {step === 1 ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Browse Menu</CardTitle>
                                    <CardDescription>
                                        Pick your items. Cart updates instantly while you browse.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="relative">
                                        <Search className="text-muted-foreground absolute top-2.5 left-3 size-4" />
                                        <Input
                                            className="pl-9"
                                            value={search}
                                            onChange={(event) => setSearch(event.target.value)}
                                            placeholder="Search by item, description, or category"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            type="button"
                                            variant={activeCategory === 'all' ? 'default' : 'outline'}
                                            onClick={() => setActiveCategory('all')}
                                        >
                                            All
                                        </Button>
                                        {categories.map((category) => (
                                            <Button
                                                key={category}
                                                type="button"
                                                variant={activeCategory === category ? 'default' : 'outline'}
                                                onClick={() => setActiveCategory(category)}
                                            >
                                                {category}
                                            </Button>
                                        ))}
                                    </div>

                                    <div className="grid gap-3 md:grid-cols-2">
                                        {filteredItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                                            >
                                                <div className="mb-2 flex items-center justify-between gap-2">
                                                    <h3 className="font-medium">{item.name}</h3>
                                                    <Badge variant="secondary">{currency(item.price)}</Badge>
                                                </div>
                                                {item.category ? (
                                                    <p className="mb-2 text-xs uppercase tracking-wide text-zinc-500">
                                                        {item.category}
                                                    </p>
                                                ) : null}
                                                <p className="mb-4 text-sm text-zinc-600">
                                                    {item.description ?? 'No description available.'}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            updateItemQuantity(item.id, (cart[item.id] ?? 0) - 1)
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="w-10 text-center text-sm">
                                                        {cart[item.id] ?? 0}
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            updateItemQuantity(item.id, (cart[item.id] ?? 0) + 1)
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        className="ml-auto"
                                                        size="sm"
                                                        onClick={() =>
                                                            updateItemQuantity(item.id, Math.max(1, cart[item.id] ?? 0))
                                                        }
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ) : null}

                        {step === 2 ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Cart Review</CardTitle>
                                    <CardDescription>Confirm quantities and totals before checkout.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {cartItems.length === 0 ? (
                                        <p className="text-muted-foreground text-sm">Your cart is empty.</p>
                                    ) : (
                                        cartItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-3 rounded-md border p-3"
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-medium">{item.name}</p>
                                                    <p className="text-sm text-zinc-500">
                                                        {currency(item.price)} each
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            updateItemQuantity(item.id, item.quantity - 1)
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="w-10 text-center text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            updateItemQuantity(item.id, item.quantity + 1)
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                <p className="w-24 text-right text-sm font-medium">
                                                    {currency(item.lineTotal)}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                    <InputError message={form.errors.items} />
                                </CardContent>
                            </Card>
                        ) : null}

                        {step === 3 ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pickup and Contact Details</CardTitle>
                                    <CardDescription>
                                        Enter your phone and pickup preferences for SMS updates.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={form.data.name}
                                            onChange={(event) => form.setData('name', event.target.value)}
                                            placeholder="Full name"
                                        />
                                        <InputError message={form.errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            value={form.data.phone}
                                            onChange={(event) => form.setData('phone', event.target.value)}
                                            placeholder="2519XXXXXXXX"
                                        />
                                        <InputError message={form.errors.phone} />
                                    </div>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="pickup_date">Pickup Date</Label>
                                            <Input
                                                id="pickup_date"
                                                type="date"
                                                min={todayDate()}
                                                value={form.data.pickup_date}
                                                onChange={(event) =>
                                                    form.setData('pickup_date', event.target.value)
                                                }
                                            />
                                            <InputError message={form.errors.pickup_date} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="pickup_location">Pickup Location</Label>
                                            <select
                                                id="pickup_location"
                                                className="border-input h-9 rounded-md border bg-transparent px-3 text-sm"
                                                value={form.data.pickup_location_id}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'pickup_location_id',
                                                        Number(event.target.value) || '',
                                                    )
                                                }
                                            >
                                                <option value="">Select location</option>
                                                {pickupLocations.map((location) => (
                                                    <option key={location.id} value={location.id}>
                                                        {location.name} - {location.address}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError message={form.errors.pickup_location_id} />
                                        </div>
                                    </div>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={form.data.notify_when_ready}
                                            onChange={(event) =>
                                                form.setData('notify_when_ready', event.target.checked)
                                            }
                                        />
                                        Notify me by SMS when my order is ready for pickup.
                                    </label>
                                </CardContent>
                            </Card>
                        ) : null}

                        {step === 4 ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Verification</CardTitle>
                                    <CardDescription>
                                        Upload your receipt now, or skip and upload later from the SMS tracking link.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="receipt">Receipt Screenshot (optional)</Label>
                                        <Input
                                            id="receipt"
                                            type="file"
                                            accept="image/png,image/jpeg,image/jpg,image/webp"
                                            onChange={(event) =>
                                                form.setData('receipt', event.target.files?.[0] ?? null)
                                            }
                                        />
                                        <p className="text-muted-foreground text-xs">
                                            Accepted formats: PNG, JPG, JPEG, WEBP. Max size 5 MB.
                                        </p>
                                        <InputError message={form.errors.receipt} />
                                    </div>
                                </CardContent>
                            </Card>
                        ) : null}

                        <div className="flex items-center justify-between gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={step === 1}
                                onClick={() => setStep((value) => Math.max(1, value - 1))}
                            >
                                Back
                            </Button>
                            <div className="flex items-center gap-2">
                                {step < 4 ? (
                                    <Button
                                        type="button"
                                        disabled={
                                            (step === 1 && cartItems.length === 0) ||
                                            (step === 2 && cartItems.length === 0) ||
                                            (step === 3 && !canContinueDetails)
                                        }
                                        onClick={() => setStep((value) => Math.min(4, value + 1))}
                                    >
                                        Continue
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        disabled={form.processing || cartItems.length === 0}
                                        onClick={submitOrder}
                                    >
                                        {form.processing ? 'Submitting...' : 'Submit Order'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </section>

                    <aside className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingCart className="size-5" />
                                    Cart Summary
                                </CardTitle>
                                <CardDescription>
                                    {cartCount} item{cartCount === 1 ? '' : 's'} selected
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {cartItems.length === 0 ? (
                                    <p className="text-muted-foreground text-sm">No items yet.</p>
                                ) : (
                                    <>
                                        {cartItems.slice(0, 4).map((item) => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <span className="max-w-[180px] truncate">
                                                    {item.name} x {item.quantity}
                                                </span>
                                                <span>{currency(item.lineTotal)}</span>
                                            </div>
                                        ))}
                                        {cartItems.length > 4 ? (
                                            <p className="text-muted-foreground text-xs">
                                                + {cartItems.length - 4} more item(s)
                                            </p>
                                        ) : null}
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between font-semibold">
                                                <span>Total</span>
                                                <span>{currency(cartTotal)}</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Customer Journey</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-zinc-600">
                                <p>1. Browse menu and add items</p>
                                <p>2. Review cart and quantities</p>
                                <p>3. Select pickup date and location</p>
                                <p>4. Upload receipt now or later</p>
                                <p>5. Receive SMS tracking link after order</p>
                            </CardContent>
                        </Card>
                    </aside>
                </main>
            </div>
        </>
    );
}
