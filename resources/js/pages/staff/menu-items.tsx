import { Head, router, useForm } from '@inertiajs/react';
import { Coffee, Filter, ImagePlus, Search, Trash2 } from 'lucide-react';
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
    is_featured: boolean;
    visibility_channels: string[];
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

const defaultVisibilityChannels = ['telegram', 'web', 'qr_menu'];
const visibilityChannelLabels: Record<string, string> = {
    telegram: 'Telegram',
    web: 'Web',
    qr_menu: 'QR Menu',
};

function visibilityChannelLabel(channel: string): string {
    return visibilityChannelLabels[channel] ?? channel;
}

export default function MenuItems({
    items,
    categories,
    filters,
    summary,
    visibilityChannels,
}: {
    items: MenuItemRow[];
    categories: string[];
    filters: Filters;
    summary: Summary;
    visibilityChannels: string[];
}) {
    const channelOptions = visibilityChannels.length > 0 ? visibilityChannels : defaultVisibilityChannels;
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
        is_featured: false,
        visibility_channels: [...channelOptions],
    });

    const editForm = useForm({
        _method: 'put',
        name: '',
        description: '',
        price: '',
        category: '',
        image: null as File | null,
        is_active: true,
        is_featured: false,
        visibility_channels: [...channelOptions],
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
                createForm.setData('is_featured', false);
                createForm.setData('visibility_channels', [...channelOptions]);
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
            is_featured: item.is_featured,
            visibility_channels: [...item.visibility_channels],
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

    const nextVisibilityChannels = (current: string[], channel: string, checked: boolean): string[] => {
        const selected = new Set(current);

        if (checked) {
            selected.add(channel);
        } else {
            selected.delete(channel);
        }

        return channelOptions.filter((value) => selected.has(value));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Items" />
            <div className="space-y-8 bg-zinc-50/50 p-6 min-h-screen">
                {/* 📌 Summary Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">Catalog Size</p>
                                    <h3 className="mt-2 text-3xl font-black text-[#212121]">{summary.total_items} Products</h3>
                                </div>
                                <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-500">
                                    <Search className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-[#F57C00]">Active Listings</p>
                                    <h3 className="mt-2 text-3xl font-black text-[#212121]">{summary.active_items} Live</h3>
                                </div>
                                <div className="rounded-2xl bg-[#F57C00]/10 p-3 text-[#F57C00]">
                                    <Coffee className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 📌 Filter Control Panel */}
                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <Filter className="size-4 text-[#F57C00]" />
                            Product Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form className="grid gap-6 md:grid-cols-4" onSubmit={applyFilters}>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="search">Search Keywords</Label>
                                <Input
                                    id="search"
                                    className="h-10 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                    value={filterForm.data.search}
                                    onChange={(event) => filterForm.setData('search', event.target.value)}
                                    placeholder="Name or description..."
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="category">Sort Category</Label>
                                <select
                                    id="category"
                                    className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20"
                                    value={filterForm.data.category}
                                    onChange={(event) => filterForm.setData('category', event.target.value)}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="status">Listing Status</Label>
                                <select
                                    id="status"
                                    className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20"
                                    value={filterForm.data.status}
                                    onChange={(event) => filterForm.setData('status', event.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Live Only</option>
                                    <option value="inactive">Drafts Only</option>
                                </select>
                            </div>
                            <div className="flex items-end gap-2">
                                <Button type="submit" className="h-10 flex-1 rounded-xl bg-[#F57C00] font-black shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100]">Apply</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-10 rounded-xl font-bold border-zinc-200"
                                    onClick={() => router.get('/staff/menu-items')}
                                >
                                    Clear
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>


                {/* 📌 Edit Control Card */}
                {editing ? (
                    <Card className="border-none shadow-2xl ring-2 ring-[#212121]">
                        <CardHeader className="border-b border-zinc-100 bg-[#212121] py-4 text-white">
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <ImagePlus className="size-4 text-[#F57C00]" />
                                Edit Product: {editing.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form className="grid gap-6 md:grid-cols-3" onSubmit={updateItem}>
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="edit-name">Product Name</Label>
                                    <Input
                                        id="edit-name"
                                        className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                        value={editForm.data.name}
                                        onChange={(event) => editForm.setData('name', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="edit-price">Retail Price (ETB)</Label>
                                    <Input
                                        id="edit-price"
                                        type="number"
                                        className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                        value={editForm.data.price}
                                        onChange={(event) => editForm.setData('price', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.price} />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="edit-category">Category Label</Label>
                                    <Input
                                        id="edit-category"
                                        className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                        value={editForm.data.category}
                                        onChange={(event) => editForm.setData('category', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.category} />
                                </div>
                                <div className="grid gap-2 md:col-span-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="edit-description">Short Description</Label>
                                    <Input
                                        id="edit-description"
                                        className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                        value={editForm.data.description}
                                        onChange={(event) =>
                                            editForm.setData('description', event.target.value)
                                        }
                                    />
                                    <InputError message={editForm.errors.description} />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="edit-image">Replacement Media</Label>
                                    <Input
                                        id="edit-image"
                                        type="file"
                                        className="h-11 rounded-xl border-zinc-200 file:mr-4 file:h-11 file:border-0 file:bg-zinc-100 file:px-4 file:text-xs file:font-black file:uppercase file:text-zinc-600 hover:file:bg-zinc-200"
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        onChange={(event) =>
                                            editForm.setData('image', event.target.files?.[0] ?? null)
                                        }
                                    />
                                    <InputError message={editForm.errors.image} />
                                </div>

                                <div className="grid gap-2 md:col-span-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Visible On</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {channelOptions.map((channel) => (
                                            <label key={`edit-${channel}`} className="flex cursor-pointer items-center gap-2 rounded-xl bg-zinc-50 px-4 py-2 ring-1 ring-zinc-200">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                    checked={editForm.data.visibility_channels.includes(channel)}
                                                    onChange={(event) =>
                                                        editForm.setData(
                                                            'visibility_channels',
                                                            nextVisibilityChannels(
                                                                editForm.data.visibility_channels,
                                                                channel,
                                                                event.target.checked,
                                                            ),
                                                        )
                                                    }
                                                />
                                                <span className="text-xs font-bold text-zinc-600">{visibilityChannelLabel(channel)}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={editForm.errors.visibility_channels} />
                                </div>

                                <div className="flex items-center gap-2 md:col-span-3">
                                    <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-2 ring-1 ring-zinc-200">
                                        <input
                                            type="checkbox"
                                            id="is_active_edit"
                                            className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                            checked={editForm.data.is_active}
                                            onChange={(event) =>
                                                editForm.setData('is_active', event.target.checked)
                                            }
                                        />
                                        <Label htmlFor="is_active_edit" className="cursor-pointer text-xs font-bold text-zinc-600">Active Listing</Label>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-2 ring-1 ring-zinc-200">
                                        <input
                                            type="checkbox"
                                            id="is_featured_edit"
                                            className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                            checked={editForm.data.is_featured}
                                            onChange={(event) =>
                                                editForm.setData('is_featured', event.target.checked)
                                            }
                                        />
                                        <Label htmlFor="is_featured_edit" className="cursor-pointer text-xs font-bold text-zinc-600">Featured Item</Label>
                                    </div>
                                    <div className="flex items-center gap-3 ml-auto">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-11 rounded-xl font-bold"
                                            onClick={() => setEditing(null)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="h-11 px-8 rounded-xl bg-[#F57C00] font-black shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100]" disabled={editForm.processing}>
                                            Commit Updates
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                ) : null}

                {/* 📌 Catalog List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-black uppercase tracking-widest text-[#212121]">
                            <Coffee className="size-5 text-[#F57C00]" />
                            Product Catalog
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {items.length === 0 ? (
                            <div className="md:col-span-3 py-20 text-center">
                                <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No products found matching your search</p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <Card key={item.id} className="group relative overflow-hidden border-none shadow-md ring-1 ring-zinc-200 transition-all hover:ring-[2px] hover:ring-[#212121]">
                                    <CardContent className="p-0">
                                        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-zinc-300">
                                                    <ImagePlus className="size-12" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                                                <Badge className="w-fit bg-[#212121] text-white font-black uppercase tracking-widest text-[9px] shadow-xl">
                                                    {item.category ?? 'General'}
                                                </Badge>
                                                <Badge className={`w-fit font-black uppercase tracking-widest text-[9px] shadow-xl ${item.is_active ? 'bg-[#F57C00] text-white' : 'bg-white text-zinc-500 ring-1 ring-zinc-200'}`}>
                                                    {item.is_active ? 'Live' : 'Draft'}
                                                </Badge>
                                                {item.is_featured ? (
                                                    <Badge className="w-fit bg-[#FFF3E0] text-[#E65100] font-black uppercase tracking-widest text-[9px] shadow-xl ring-1 ring-[#F57C00]/20">
                                                        Featured
                                                    </Badge>
                                                ) : null}
                                                <div className="flex flex-wrap gap-1">
                                                    {item.visibility_channels.map((channel) => (
                                                        <Badge key={`${item.id}-${channel}`} className="w-fit bg-white/90 text-zinc-700 font-black uppercase tracking-widest text-[9px] ring-1 ring-zinc-200/80">
                                                            {visibilityChannelLabel(channel)}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <p className="text-lg font-black leading-tight text-[#212121]">{item.name}</p>
                                                    <p className="mt-1 line-clamp-2 text-xs font-medium text-zinc-500 leading-relaxed">
                                                        {item.description || "No description provided for this catalog item."}
                                                    </p>
                                                </div>
                                                <p className="text-lg font-black text-[#F57C00]">{currency(item.price)}</p>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-5">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400">Lifetime Demand</span>
                                                    <span className="text-sm font-black text-[#212121]">{item.order_items_count} units sold</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-9 rounded-xl font-bold transition-all hover:bg-[#F57C00]/10 hover:text-[#F57C00]"
                                                        onClick={() => startEdit(item)}
                                                    >
                                                        Details
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-9 rounded-xl font-bold text-rose-500 transition-all hover:bg-rose-50 hover:text-rose-600"
                                                        onClick={() => deleteItem(item)}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                {/* 📌 Create Content Card */}
                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <ImagePlus className="size-4 text-[#F57C00]" />
                            Add New Product
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form className="grid gap-6 md:grid-cols-3" onSubmit={createItem}>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                    value={createForm.data.name}
                                    onChange={(event) => createForm.setData('name', event.target.value)}
                                    placeholder="e.g. Signature Blend"
                                />
                                <InputError message={createForm.errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="price">Retail Price (ETB)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                    value={createForm.data.price}
                                    onChange={(event) => createForm.setData('price', event.target.value)}
                                    placeholder="0.00"
                                />
                                <InputError message={createForm.errors.price} />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="category">Category Label</Label>
                                <Input
                                    id="category"
                                    className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                    value={createForm.data.category}
                                    onChange={(event) => createForm.setData('category', event.target.value)}
                                    placeholder="e.g. Beverages"
                                />
                                <InputError message={createForm.errors.category} />
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="description">Short Description</Label>
                                <Input
                                    id="description"
                                    className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                    value={createForm.data.description}
                                    onChange={(event) =>
                                        createForm.setData('description', event.target.value)
                                    }
                                    placeholder="Brief flavor profile or details..."
                                />
                                <InputError message={createForm.errors.description} />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="image">Media Assets</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    className="h-11 rounded-xl border-zinc-200 file:mr-4 file:h-11 file:border-0 file:bg-zinc-100 file:px-4 file:text-xs file:font-black file:uppercase file:text-zinc-600 hover:file:bg-zinc-200"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={(event) =>
                                        createForm.setData('image', event.target.files?.[0] ?? null)
                                    }
                                />
                                <InputError message={createForm.errors.image} />
                            </div>

                            <div className="grid gap-2 md:col-span-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Visible On</Label>
                                <div className="flex flex-wrap gap-2">
                                    {channelOptions.map((channel) => (
                                        <label key={`new-${channel}`} className="flex cursor-pointer items-center gap-2 rounded-xl bg-zinc-50 px-4 py-2 ring-1 ring-zinc-200">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                checked={createForm.data.visibility_channels.includes(channel)}
                                                onChange={(event) =>
                                                    createForm.setData(
                                                        'visibility_channels',
                                                        nextVisibilityChannels(
                                                            createForm.data.visibility_channels,
                                                            channel,
                                                            event.target.checked,
                                                        ),
                                                    )
                                                }
                                            />
                                            <span className="text-xs font-bold text-zinc-600">{visibilityChannelLabel(channel)}</span>
                                        </label>
                                    ))}
                                </div>
                                <InputError message={createForm.errors.visibility_channels} />
                            </div>

                            <div className="flex items-center gap-2 md:col-span-3">
                                <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-2 ring-1 ring-zinc-200">
                                    <input
                                        type="checkbox"
                                        id="is_active_new"
                                        className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                        checked={createForm.data.is_active}
                                        onChange={(event) =>
                                            createForm.setData('is_active', event.target.checked)
                                        }
                                    />
                                    <Label htmlFor="is_active_new" className="cursor-pointer text-xs font-bold text-zinc-600">Active Listing</Label>
                                </div>
                                <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-2 ring-1 ring-zinc-200">
                                    <input
                                        type="checkbox"
                                        id="is_featured_new"
                                        className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                        checked={createForm.data.is_featured}
                                        onChange={(event) =>
                                            createForm.setData('is_featured', event.target.checked)
                                        }
                                    />
                                    <Label htmlFor="is_featured_new" className="cursor-pointer text-xs font-bold text-zinc-600">Featured Item</Label>
                                </div>
                                <Button type="submit" className="h-11 px-8 ml-auto rounded-xl bg-[#212121] font-black shadow-lg shadow-zinc-200 hover:bg-[#F57C00]" disabled={createForm.processing}>
                                    {createForm.processing ? 'Publishing...' : 'Add to Catalog'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}
