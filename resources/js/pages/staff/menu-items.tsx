import { Head, router, useForm } from '@inertiajs/react';
import { ImagePlus, Search } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type MenuItemRow = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    category: string | null;
    is_active: boolean;
    image_url: string | null;
    order_items_count: number;
    updated_at: string | null;
};

type Summary = {
    total_items: number;
    active_items: number;
};

type Filters = {
    search?: string | null;
    category?: string | null;
    status?: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Menu Items',
        href: '/staff/menu-items',
    },
];

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

export default function MenuItems({
    items,
    categories,
    filters,
    summary,
}: {
    items: MenuItemRow[];
    categories: string[];
    filters: Filters;
    summary: Summary;
}) {
    const [editing, setEditing] = useState<MenuItemRow | null>(null);

    const filterForm = useForm({
        search: filters.search ?? '',
        category: filters.category ?? '',
        status: filters.status ?? 'all',
    });

    const createForm = useForm({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null as File | null,
        is_active: true,
    });

    const editForm = useForm({
        _method: 'put',
        name: '',
        description: '',
        price: '',
        category: '',
        image: null as File | null,
        is_active: true,
    });

    const applyFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get('/staff/menu-items', filterForm.data, {
            preserveState: true,
            replace: true,
        });
    };

    const createItem = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createForm.post('/staff/menu-items', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
                createForm.setData('is_active', true);
            },
        });
    };

    const startEdit = (item: MenuItemRow) => {
        setEditing(item);
        editForm.setData({
            _method: 'put',
            name: item.name,
            description: item.description ?? '',
            price: String(item.price),
            category: item.category ?? '',
            image: null,
            is_active: item.is_active,
        });
    };

    const updateItem = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editing) {
            return;
        }

        editForm.post(`/staff/menu-items/${editing.id}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setEditing(null);
            },
        });
    };

    const deleteItem = (item: MenuItemRow) => {
        if (!window.confirm(`Delete or deactivate "${item.name}"?`)) {
            return;
        }

        router.delete(`/staff/menu-items/${item.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Items" />
            <div className="space-y-5 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Total Menu Items</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.total_items}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Active Menu Items</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.active_items}</CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Search className="size-4" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-3 md:grid-cols-4" onSubmit={applyFilters}>
                            <div>
                                <Label htmlFor="search">Search</Label>
                                <Input
                                    id="search"
                                    value={filterForm.data.search}
                                    onChange={(event) => filterForm.setData('search', event.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                                    value={filterForm.data.category}
                                    onChange={(event) => filterForm.setData('category', event.target.value)}
                                >
                                    <option value="">All</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                                    value={filterForm.data.status}
                                    onChange={(event) => filterForm.setData('status', event.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex items-end gap-2">
                                <Button type="submit">Apply</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.get('/staff/menu-items')}
                                >
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <ImagePlus className="size-4" />
                            Add Menu Item
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-3 md:grid-cols-3" onSubmit={createItem}>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={createForm.data.name}
                                    onChange={(event) => createForm.setData('name', event.target.value)}
                                />
                                <InputError message={createForm.errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={createForm.data.price}
                                    onChange={(event) => createForm.setData('price', event.target.value)}
                                />
                                <InputError message={createForm.errors.price} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={createForm.data.category}
                                    onChange={(event) => createForm.setData('category', event.target.value)}
                                />
                                <InputError message={createForm.errors.category} />
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={createForm.data.description}
                                    onChange={(event) =>
                                        createForm.setData('description', event.target.value)
                                    }
                                />
                                <InputError message={createForm.errors.description} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={(event) =>
                                        createForm.setData('image', event.target.files?.[0] ?? null)
                                    }
                                />
                                <InputError message={createForm.errors.image} />
                            </div>
                            <label className="md:col-span-3 flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={createForm.data.is_active}
                                    onChange={(event) =>
                                        createForm.setData('is_active', event.target.checked)
                                    }
                                />
                                Active
                            </label>
                            <div className="md:col-span-3">
                                <Button type="submit" disabled={createForm.processing}>
                                    {createForm.processing ? 'Creating...' : 'Create Item'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {editing ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Menu Item: {editing.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-3 md:grid-cols-3" onSubmit={updateItem}>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-name">Name</Label>
                                    <Input
                                        id="edit-name"
                                        value={editForm.data.name}
                                        onChange={(event) => editForm.setData('name', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-price">Price</Label>
                                    <Input
                                        id="edit-price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={editForm.data.price}
                                        onChange={(event) => editForm.setData('price', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.price} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-category">Category</Label>
                                    <Input
                                        id="edit-category"
                                        value={editForm.data.category}
                                        onChange={(event) => editForm.setData('category', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.category} />
                                </div>
                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="edit-description">Description</Label>
                                    <Input
                                        id="edit-description"
                                        value={editForm.data.description}
                                        onChange={(event) =>
                                            editForm.setData('description', event.target.value)
                                        }
                                    />
                                    <InputError message={editForm.errors.description} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-image">Replace Image</Label>
                                    <Input
                                        id="edit-image"
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        onChange={(event) =>
                                            editForm.setData('image', event.target.files?.[0] ?? null)
                                        }
                                    />
                                    <InputError message={editForm.errors.image} />
                                </div>
                                <label className="md:col-span-3 flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={editForm.data.is_active}
                                        onChange={(event) =>
                                            editForm.setData('is_active', event.target.checked)
                                        }
                                    />
                                    Active
                                </label>
                                <div className="md:col-span-3 flex gap-2">
                                    <Button type="submit" disabled={editForm.processing}>
                                        Save Changes
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setEditing(null)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                ) : null}

                <Card>
                    <CardHeader>
                        <CardTitle>Items</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {items.map((item) => (
                            <div key={item.id} className="rounded-lg border p-3">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="space-y-1">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-zinc-600">
                                            {item.description ?? 'No description'}
                                        </p>
                                        <p className="text-sm">
                                            {currency(item.price)} | {item.category ?? 'Uncategorized'}
                                        </p>
                                        <p className="text-xs text-zinc-500">
                                            Ordered {item.order_items_count} time(s)
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex gap-2">
                                            <Badge variant={item.is_active ? 'default' : 'outline'}>
                                                {item.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                onClick={() => startEdit(item)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => deleteItem(item)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="h-16 w-16 rounded-md border object-cover"
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
