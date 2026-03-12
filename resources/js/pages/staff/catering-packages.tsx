import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Clock3,
    Edit3,
    Trash2,
    Package,
    Plus,
    ArrowLeft,
    UtensilsCrossed,
    Users
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type CateringPackageRow = {
    id: number;
    name: string;
    description: string | null;
    image_url: string | null;
    price_per_person: number;
    min_guests: number;
    is_active: boolean;
    service_requests_count: number;
    updated_at: string | null;
};

type Summary = {
    total_packages: number;
    active_packages: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Catering Requests',
        href: '/staff/catering-requests',
    },
    {
        title: 'Catering Packages',
        href: '/staff/catering-packages',
    },
];

function currency(value: number | null | undefined): string {
    if (value === null || value === undefined) return 'Price TBD';
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

export default function CateringPackages({
    packages,
    canManagePackages,
    summary,
}: {
    packages: CateringPackageRow[];
    canManagePackages: boolean;
    summary: Summary;
}) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<CateringPackageRow | null>(null);

    const createPackageForm = useForm({
        name: '',
        description: '',
        image: null as File | null,
        price_per_person: '',
        min_guests: '1',
        is_active: true,
    });

    const editPackageForm = useForm({
        _method: 'put',
        name: '',
        description: '',
        image: null as File | null,
        price_per_person: '',
        min_guests: '1',
        is_active: true,
    });

    const createPackage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createPackageForm.post('/staff/catering-packages', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                createPackageForm.reset();
                createPackageForm.setData('is_active', true);
                setIsCreateModalOpen(false);
            },
        });
    };

    const startEditPackage = (pkg: CateringPackageRow) => {
        setEditingPackage(pkg);
        editPackageForm.setData({
            _method: 'put',
            name: pkg.name,
            description: pkg.description ?? '',
            image: null,
            price_per_person: String(pkg.price_per_person),
            min_guests: String(pkg.min_guests),
            is_active: pkg.is_active,
        });
    };

    const updatePackage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editingPackage) {
            return;
        }

        editPackageForm.post(`/staff/catering-packages/${editingPackage.id}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setEditingPackage(null);
            },
        });
    };

    const deletePackage = (pkg: CateringPackageRow) => {
        if (!window.confirm(`Delete or deactivate "${pkg.name}"?`)) {
            return;
        }

        router.delete(`/staff/catering-packages/${pkg.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Catering Packages" />
            <div className="min-h-screen bg-[#FAFAFA] p-4 sm:p-6 lg:p-8 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link
                            href="/staff/catering-requests"
                            className="group flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-[#F57C00] transition-colors mb-2"
                        >
                            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                            Back to Requests
                        </Link>
                        <h1 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
                            <UtensilsCrossed className="size-8 text-[#F57C00]" />
                            Catering Packages
                        </h1>
                        <p className="text-sm font-medium text-zinc-500">Manage your catering service levels and menu packages.</p>
                    </div>

                    {canManagePackages && (
                        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                            <DialogTrigger asChild>
                                <Button className="h-12 rounded-xl bg-[#212121] text-white hover:bg-black font-bold px-6 shadow-lg shadow-zinc-200 gap-2">
                                    <Plus className="size-4" />
                                    Add New Package
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] rounded-3xl border-none p-0 overflow-hidden bg-white shadow-2xl">
                                <DialogHeader className="p-6 bg-zinc-50 border-b border-zinc-100">
                                    <DialogTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                                        <UtensilsCrossed className="size-4 text-[#F57C00]" />
                                        Create Catering Package
                                    </DialogTitle>
                                    <DialogDescription className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
                                        Fill in the details to create a new catering package.
                                    </DialogDescription>
                                </DialogHeader>
                                <form className="p-6 space-y-6" onSubmit={createPackage}>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="new-name" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Name</Label>
                                            <Input
                                                id="new-name"
                                                value={createPackageForm.data.name}
                                                onChange={(event) => createPackageForm.setData('name', event.target.value)}
                                                className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950"
                                            />
                                            <InputError message={createPackageForm.errors.name} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-price" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Price/Person (ETB)</Label>
                                            <Input
                                                id="new-price"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={createPackageForm.data.price_per_person}
                                                onChange={(event) => createPackageForm.setData('price_per_person', event.target.value)}
                                                className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950"
                                            />
                                            <InputError message={createPackageForm.errors.price_per_person} />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="new-description" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Description</Label>
                                            <Input
                                                id="new-description"
                                                value={createPackageForm.data.description}
                                                onChange={(event) => createPackageForm.setData('description', event.target.value)}
                                                className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950"
                                            />
                                            <InputError message={createPackageForm.errors.description} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-image" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Image</Label>
                                            <Input
                                                id="new-image"
                                                type="file"
                                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                                className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-[#F57C00]/10 file:text-[#F57C00] hover:file:bg-[#F57C00]/20"
                                                onChange={(event) => createPackageForm.setData('image', event.target.files?.[0] ?? null)}
                                            />
                                            <InputError message={createPackageForm.errors.image} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-min" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Min Guests</Label>
                                            <Input
                                                id="new-min"
                                                type="number"
                                                min="1"
                                                value={createPackageForm.data.min_guests}
                                                onChange={(event) => createPackageForm.setData('min_guests', event.target.value)}
                                                className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950"
                                            />
                                            <InputError message={createPackageForm.errors.min_guests} />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50/50 px-5 py-4">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer size-5 rounded-lg border-zinc-200 text-[#F57C00] focus:ring-[#F57C00]/20 transition-all cursor-pointer"
                                                    checked={createPackageForm.data.is_active}
                                                    onChange={(event) => createPackageForm.setData('is_active', event.target.checked)}
                                                />
                                            </div>
                                            <span className="text-sm font-black text-[#212121] group-hover:text-black transition-colors">Active package</span>
                                        </label>
                                        <div className="flex gap-3">
                                            <Button type="button" variant="ghost" className="rounded-xl font-bold text-zinc-500 hover:bg-zinc-100" onClick={() => setIsCreateModalOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" className="rounded-xl bg-[#F57C00] text-white hover:bg-[#E65100] font-bold px-6 shadow-lg shadow-[#F57C00]/20" disabled={createPackageForm.processing}>
                                                Add Package
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {/* Stats Section */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200 overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-zinc-50 text-zinc-400">
                                    <Package className="size-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Total Packages</p>
                                    <h3 className="text-2xl font-black text-zinc-900">{summary.total_packages}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200 overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-500">
                                    <UtensilsCrossed className="size-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Packages</p>
                                    <h3 className="text-2xl font-black text-zinc-900">{summary.active_packages}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Dialog open={!!editingPackage} onOpenChange={(open) => !open && setEditingPackage(null)}>
                    <DialogContent className="sm:max-w-[600px] rounded-3xl border-none p-0 overflow-hidden bg-white shadow-2xl">
                        <DialogHeader className="p-6 bg-zinc-50 border-b border-zinc-100">
                            <DialogTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                                <Edit3 className="size-4 text-[#F57C00]" />
                                Edit Package: {editingPackage?.name}
                            </DialogTitle>
                            <DialogDescription className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
                                Modify the details of the catering package.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="p-6 space-y-6" onSubmit={updatePackage}>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-name" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Name</Label>
                                    <Input
                                        id="edit-name"
                                        value={editPackageForm.data.name}
                                        onChange={(event) => editPackageForm.setData('name', event.target.value)}
                                        className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950"
                                    />
                                    <InputError message={editPackageForm.errors.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-price" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Price/Person (ETB)</Label>
                                    <Input
                                        id="edit-price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={editPackageForm.data.price_per_person}
                                        onChange={(event) => editPackageForm.setData('price_per_person', event.target.value)}
                                        className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950"
                                    />
                                    <InputError message={editPackageForm.errors.price_per_person} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="edit-description" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Description</Label>
                                    <Input
                                        id="edit-description"
                                        value={editPackageForm.data.description}
                                        onChange={(event) => editPackageForm.setData('description', event.target.value)}
                                        className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950"
                                    />
                                    <InputError message={editPackageForm.errors.description} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-image" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Replacement Image</Label>
                                    <Input
                                        id="edit-image"
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-[#F57C00]/10 file:text-[#F57C00] hover:file:bg-[#F57C00]/20"
                                        onChange={(event) => editPackageForm.setData('image', event.target.files?.[0] ?? null)}
                                    />
                                    <InputError message={editPackageForm.errors.image} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-min" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Min Guests</Label>
                                    <Input
                                        id="edit-min"
                                        type="number"
                                        min="1"
                                        value={editPackageForm.data.min_guests}
                                        onChange={(event) => editPackageForm.setData('min_guests', event.target.value)}
                                        className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950"
                                    />
                                    <InputError message={editPackageForm.errors.min_guests} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50/50 px-5 py-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer size-5 rounded-lg border-zinc-200 text-[#F57C00] focus:ring-[#F57C00]/20 transition-all cursor-pointer"
                                            checked={editPackageForm.data.is_active}
                                            onChange={(event) => editPackageForm.setData('is_active', event.target.checked)}
                                        />
                                    </div>
                                    <span className="text-sm font-black text-[#212121] group-hover:text-black transition-colors">Active package</span>
                                </label>
                                <div className="flex gap-3">
                                    <Button type="button" variant="ghost" className="rounded-xl font-bold text-zinc-500 hover:bg-zinc-100" onClick={() => setEditingPackage(null)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="rounded-xl bg-[#212121] text-white hover:bg-black font-bold px-6 shadow-lg shadow-black/20" disabled={editPackageForm.processing}>
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {packages.map((pkg) => (
                        <article key={pkg.id} className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all hover:shadow-md">
                            <div className="aspect-[16/10] overflow-hidden bg-zinc-100 relative">
                                {pkg.image_url ? (
                                    <img src={pkg.image_url} alt={pkg.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-zinc-300">
                                        <Package className="size-12 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <Badge className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-tight shadow-none border-none ${pkg.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-600'}`}>
                                        {pkg.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <h4 className="truncate text-base font-black text-[#212121]">{pkg.name}</h4>
                                        <p className="mt-1 line-clamp-2 text-xs font-medium text-zinc-500">{pkg.description || 'No description provided'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-[#F57C00]">{currency(pkg.price_per_person)}</p>
                                        <p className="text-[10px] font-bold text-zinc-400">per guest</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-4 border-t border-zinc-50 pt-4">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <Users className="size-3.5 text-zinc-400 shrink-0" />
                                        <span className="truncate text-[10px] font-bold text-zinc-600">Min {pkg.min_guests} guests</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <Clock3 className="size-3.5 text-zinc-400 shrink-0" />
                                        <span className="truncate text-[10px] font-bold text-zinc-600">{pkg.service_requests_count} Requests</span>
                                    </div>
                                </div>

                                {canManagePackages && (
                                    <div className="mt-4 flex gap-2 transition-opacity">
                                        <Button type="button" variant="outline" className="h-9 flex-1 rounded-xl text-xs font-bold border-zinc-200" onClick={() => startEditPackage(pkg)}>
                                            <Edit3 className="mr-2 size-3.5" />
                                            Edit
                                        </Button>
                                        <Button type="button" variant="outline" className="h-9 w-9 p-0 rounded-xl border-rose-100 text-rose-600 hover:bg-rose-50" onClick={() => deletePackage(pkg)}>
                                            <Trash2 className="size-3.5" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
