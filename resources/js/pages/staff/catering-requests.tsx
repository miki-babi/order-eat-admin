import {
    Clock3,
    Edit3,
    ImagePlus,
    Search,
    Trash2,
    Users,
    UtensilsCrossed,
    ChevronDown,
    ChevronUp,
    MoreHorizontal,
    Filter,
    Calendar,
    MapPin,
    Package
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
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

type CateringRequestRow = {
    id: number;
    customer_name: string | null;
    customer_phone: string | null;
    package_name: string | null;
    package_names: string[];
    event_date: string | null;
    guest_count: number;
    venue: string | null;
    status: string;
    special_instructions: string | null;
    created_at: string | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Paginated<T> = {
    data: T[];
    links: PaginationLink[];
    total: number;
    from: number | null;
    to: number | null;
};

type Summary = {
    total_packages: number;
    active_packages: number;
    total_requests: number;
    pending_requests: number;
};

type Filters = {
    search?: string | null;
    status?: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Catering Requests',
        href: '/staff/catering-requests',
    },
];

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

function badgeStyle(status: string | null): string {
    const s = status?.toLowerCase() || '';
    if (s === 'pending') return 'bg-amber-100 text-amber-700 ring-amber-600/20';
    if (['preparing', 'approved', 'ready'].includes(s)) return 'bg-emerald-100 text-emerald-700 ring-emerald-600/20';
    if (s === 'completed') return 'bg-zinc-100 text-zinc-700 ring-zinc-600/20';
    if (['cancelled', 'rejected', 'disapproved'].includes(s)) return 'bg-rose-100 text-rose-700 ring-rose-600/20';
    return 'bg-zinc-100 text-zinc-700 ring-zinc-600/20';
}

export default function CateringRequests({
    packages,
    requests,
    filters,
    statusOptions,
    canManagePackages,
    canUpdateRequests,
    summary,
}: {
    packages: CateringPackageRow[];
    requests: Paginated<CateringRequestRow>;
    filters: Filters;
    statusOptions: string[];
    canManagePackages: boolean;
    canUpdateRequests: boolean;
    summary: Summary;
}) {
    const [expandedCards, setExpandedCards] = useState<number[]>([]);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<CateringPackageRow | null>(null);

    const toggleCard = (requestId: number) => {
        setExpandedCards(prev =>
            prev.includes(requestId) ? prev.filter(id => id !== requestId) : [...prev, requestId]
        );
    };

    const filterForm = useForm({
        search: filters.search ?? '',
        status: filters.status ?? '',
    });

    const createPackageForm = useForm({
        name: '',
        description: '',
        image: null as File | null,
        price_per_person: '',
        min_guests: '20',
        is_active: true,
    });

    const createPackage = (event: FormEvent) => {
        event.preventDefault();
        createPackageForm.post('/staff/catering-packages', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                createPackageForm.reset();
                setIsCreateModalOpen(false);
            },
        });
    };

    const editPackageForm = useForm({
        _method: 'put',
        name: '',
        description: '',
        image: null as File | null,
        price_per_person: '',
        min_guests: '20',
        is_active: true,
    });

    const applyFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get('/staff/catering-requests', filterForm.data, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        filterForm.setData({
            search: '',
            status: '',
        });
        router.get('/staff/catering-requests', {}, {
            preserveState: true,
            replace: true,
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

    const updateRequestStatus = (requestId: number, status: string) => {
        router.patch(`/staff/catering-requests/${requestId}/status`, {
            status,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Catering Requests" />
            <div className="min-h-screen bg-[#FAFAFA] p-4 sm:p-6 lg:p-8 space-y-8">
                {/* 📌 Section 1 — Status Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200 overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-zinc-50 text-zinc-400">
                                    <Package className="size-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Catering Packages</p>
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
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200 overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-sky-50 text-sky-500">
                                    <Users className="size-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Total Requests</p>
                                    <h3 className="text-2xl font-black text-zinc-900">{summary.total_requests}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200 overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-amber-50 text-amber-500">
                                    <Clock3 className="size-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Pending</p>
                                    <h3 className="text-2xl font-black text-zinc-900">{summary.pending_requests}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 📌 Section 2 — Filters & Tabs */}
                <div className="space-y-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex bg-white p-1 rounded-xl ring-1 ring-zinc-200 w-fit overflow-x-auto no-scrollbar">
                            {[
                                { label: 'All', value: '' },
                                ...statusOptions.map(st => ({ label: st.charAt(0).toUpperCase() + st.slice(1), value: st }))
                            ].map((tab) => {
                                const isActive = filterForm.data.status === tab.value;
                                return (
                                    <Button
                                        key={tab.label}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            filterForm.setData('status', tab.value);
                                            router.get('/staff/catering-requests', { ...filterForm.data, status: tab.value }, { preserveState: true, replace: true });
                                        }}
                                        className={`rounded-lg px-6 h-9 text-xs font-bold transition-all shrink-0 ${isActive
                                            ? 'bg-[#F57C00] text-white shadow-md hover:bg-[#E65100] hover:text-white'
                                            : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                                            }`}
                                    >
                                        {tab.label}
                                    </Button>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                                className={`h-11 rounded-xl gap-2 font-bold transition-all ${isFiltersOpen ? 'bg-zinc-100 border-zinc-300 text-zinc-900' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'}`}
                            >
                                <Filter className="size-4" />
                                Filters
                                {isFiltersOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearFilters}
                                className="h-11 w-11 p-0 rounded-xl font-bold bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                            >
                                <Filter className="size-4 rotate-180 opacity-50" />
                            </Button>
                        </div>
                    </div>

                    <Collapsible open={isFiltersOpen}>
                        <CollapsibleContent>
                            <Card className="border-none shadow-md ring-1 ring-zinc-200 overflow-hidden bg-white">
                                <CardContent className="p-6">
                                    <form className="grid gap-6 md:grid-cols-3" onSubmit={applyFilters}>
                                        <div className="grid gap-2">
                                            <Label htmlFor="search" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Search Details</Label>
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                                                <Input
                                                    id="search"
                                                    className="pl-10 h-11 rounded-xl bg-zinc-50/50 border-zinc-100 focus:bg-white transition-all font-bold text-sm"
                                                    value={filterForm.data.search}
                                                    onChange={(event) => filterForm.setData('search', event.target.value)}
                                                    placeholder="Name, phone, venue..."
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="status" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Status</Label>
                                            <select
                                                id="status"
                                                value={filterForm.data.status}
                                                onChange={(event) => filterForm.setData('status', event.target.value)}
                                                className="h-11 rounded-xl border border-zinc-100 bg-zinc-50/50 px-3 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950"
                                            >
                                                <option value="">All Statuses</option>
                                                {statusOptions.map((status) => (
                                                    <option key={status} value={status} className="capitalize">{status}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex items-end gap-2">
                                            <Button type="submit" className="h-11 flex-1 rounded-xl bg-[#212121] text-white hover:bg-black font-bold shadow-lg shadow-zinc-200">
                                                Apply Filters
                                            </Button>
                                            <Button type="button" variant="outline" className="h-11 rounded-xl px-6 font-bold border-zinc-200" onClick={clearFilters}>
                                                Reset
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </CollapsibleContent>
                    </Collapsible>
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

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <UtensilsCrossed className="size-4 text-[#F57C00]" />
                            Catering Packages
                        </h3>
                        {canManagePackages && (
                            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold border-zinc-200">
                                        Add New
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

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Clock3 className="size-4 text-[#F57C00]" />
                            Catering Service Requests
                        </h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Total: {requests.total}</span>
                    </div>

                    <div className="grid gap-4">
                        {requests.data.map((serviceRequest) => {
                            const isExpanded = expandedCards.includes(serviceRequest.id);
                            return (
                                <div key={serviceRequest.id} className="group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all hover:shadow-md">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-4">
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F57C00]/10 text-[#F57C00] shrink-0">
                                                <span className="text-sm font-black">#{serviceRequest.id}</span>
                                            </div>
                                            <div className="truncate">
                                                <h3 className="text-base font-black text-[#212121] truncate">{serviceRequest.customer_name}</h3>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-xs font-bold text-zinc-500">{serviceRequest.customer_phone}</span>
                                                    <span className="text-zinc-300">•</span>
                                                    <span className="text-[10px] font-bold text-[#F57C00] uppercase tracking-tight">{serviceRequest.event_date ?? 'No Date'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <div className="hidden sm:flex items-center gap-2">
                                                <Badge className={`rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-tight shadow-none border-none ${badgeStyle(serviceRequest.status)}`}>
                                                    {serviceRequest.status}
                                                </Badge>
                                            </div>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-zinc-100">
                                                        <MoreHorizontal className="size-5 text-zinc-500" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 shadow-xl border-zinc-100">
                                                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Update Status</DropdownMenuLabel>
                                                    {statusOptions.map((status) => (
                                                        <DropdownMenuItem
                                                            key={status}
                                                            disabled={serviceRequest.status === status}
                                                            onClick={() => updateRequestStatus(serviceRequest.id, status)}
                                                            className="rounded-lg font-bold text-sm capitalize"
                                                        >
                                                            Mark as {status}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={`h-9 w-9 rounded-xl transition-all ${isExpanded ? 'bg-[#F57C00]/10 text-[#F57C00]' : 'hover:bg-zinc-100 text-zinc-400'}`}
                                                onClick={() => toggleCard(serviceRequest.id)}
                                            >
                                                {isExpanded ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                                            </Button>
                                        </div>
                                    </div>

                                    <Collapsible open={isExpanded}>
                                        <CollapsibleContent>
                                            <div className="border-t border-zinc-50 bg-zinc-50/30 p-4 sm:p-6 space-y-6">
                                                <div className="grid gap-6 md:grid-cols-2">
                                                    <div className="space-y-4">
                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Event Details</h4>
                                                        <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-100 shadow-sm space-y-4">
                                                            <div className="flex items-start gap-3">
                                                                <div className="p-2 rounded-lg bg-zinc-50">
                                                                    <Calendar className="size-4 text-zinc-400" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-black uppercase tracking-tight text-zinc-400">Date & Guests</p>
                                                                    <p className="text-xs font-bold text-zinc-700 mt-0.5">{serviceRequest.event_date ?? 'N/A'} • {serviceRequest.guest_count} Guests</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-start gap-3">
                                                                <div className="p-2 rounded-lg bg-zinc-50">
                                                                    <MapPin className="size-4 text-zinc-400" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-black uppercase tracking-tight text-zinc-400">Venue</p>
                                                                    <p className="text-xs font-bold text-zinc-700 mt-0.5">{serviceRequest.venue ?? 'Not Specified'}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Packages Selected</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {(serviceRequest.package_names.length > 0 ? serviceRequest.package_names : [serviceRequest.package_name]).filter(Boolean).map((pkg, idx) => (
                                                                <Badge key={idx} variant="outline" className="bg-white border-zinc-200 text-zinc-700 px-3 py-1 rounded-lg text-xs font-bold">
                                                                    {pkg}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                        {serviceRequest.special_instructions && (
                                                            <div className="mt-4 p-4 rounded-2xl bg-zinc-100 text-sm text-zinc-700 italic border-l-4 border-zinc-200">
                                                                "{serviceRequest.special_instructions}"
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200 pt-4">
                        <p className="text-sm text-zinc-600">
                            Showing {requests.from ?? 0}-{requests.to ?? 0} of {requests.total}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {requests.links.map((link) => (
                                <Button
                                    key={link.label}
                                    type="button"
                                    variant={link.active ? 'default' : 'outline'}
                                    className="h-8 rounded-lg px-3"
                                    disabled={!link.url}
                                    onClick={() => {
                                        if (link.url) {
                                            router.visit(link.url, { preserveScroll: true, preserveState: true });
                                        }
                                    }}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button asChild variant="outline" className="rounded-xl border-zinc-200">
                        <Link href="/staff/cake-preorders">Go to Cake Preorders</Link>
                    </Button>
                </div>
            </div>
        </AppLayout >
    );
}
