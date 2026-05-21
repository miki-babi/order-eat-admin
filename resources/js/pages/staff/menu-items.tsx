import { Head, router, useForm } from '@inertiajs/react';
import { Coffee, ImagePlus, Trash2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import MenuCatalog from '@/components/staff/menu-catalog';

export type MenuItemRow = {
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

    // const filterForm = useForm({
    //     search: filters.search ?? '',
    //     category: filters.category ?? '',
    //     status: filters.status ?? 'all',
    // });

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

    // const applyFilters = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     router.get('/staff/menu-items', filterForm.data, {
    //         preserveState: true,
    //         replace: true,
    //     });
    // };

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
                                            cancel
                                        </Button>
                                        <Button type="submit" className="h-11 px-8 rounded-xl bg-[#F57C00] font-black shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100]" disabled={editForm.processing}>
                                            save changes
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
                    <MenuCatalog
                        items={items}
                        startEdit={startEdit}
                        deleteItem={deleteItem}
                        visibilityChannelLabel={visibilityChannelLabel}
                    />
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
                                <Button type="submit" className="h-11 px-8 ml-auto rounded-xl bg-primary font-black shadow-lg shadow-zinc-200 hover:bg-[#00402d]" disabled={createForm.processing}>
                                    {createForm.processing ? 'Publishing...' : 'Add to menu'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}
