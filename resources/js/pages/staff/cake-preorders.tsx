import {
    CakeSlice,
    Clock3,
    Edit3,
    ImagePlus,
    PackageCheck,
    Search,
    Trash2,
    ChevronDown,
    ChevronUp,
    Filter,
    MoreHorizontal,
    Calendar,
    Phone,
    User,
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

type CakePackageRow = {
    id: number;
    name: string;
    description: string | null;
    image_url: string | null;
    price: number;
    is_active: boolean;
    preorder_items_count: number;
    updated_at: string | null;
};

type CakePreorderRow = {
    id: number;
    customer_name: string | null;
    customer_phone: string | null;
    needed_date: string | null;
    status: string;
    special_instructions: string | null;
    total_amount: number;
    created_at: string | null;
    items: Array<{
        id: number;
        package_name: string | null;
        quantity: number;
        size: string | null;
        servings: number | null;
        unit_price: number;
        line_total: number;
        specification: string | null;
    }>;
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
    total_preorders: number;
    pending_preorders: number;
};

type Filters = {
    search?: string | null;
    status?: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cake Preorders',
        href: '/staff/cake-preorders',
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
    if (['cancelled', 'rejected'].includes(s)) return 'bg-rose-100 text-rose-700 ring-rose-600/20';
    return 'bg-zinc-100 text-zinc-700 ring-zinc-600/20';
}

export default function CakePreorders({
    packages,
    preorders,
    filters,
    statusOptions,
    canManagePackages,
    canUpdateRequests,
    summary,
}: {
    packages: CakePackageRow[];
    preorders: Paginated<CakePreorderRow>;
    filters: Filters;
    statusOptions: string[];
    canManagePackages: boolean;
    canUpdateRequests: boolean;
    summary: Summary;
}) {
    const [expandedCards, setExpandedCards] = useState<number[]>([]);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<CakePackageRow | null>(null);

    const toggleCard = (preorderId: number) => {
        setExpandedCards(prev =>
            prev.includes(preorderId) ? prev.filter(id => id !== preorderId) : [...prev, preorderId]
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
        price: '',
        is_active: true,
    });

    const editPackageForm = useForm({
        _method: 'put',
        name: '',
        description: '',
        image: null as File | null,
        price: '',
        is_active: true,
    });

    const applyFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get('/staff/cake-preorders', filterForm.data, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        filterForm.setData({
            search: '',
            status: '',
        });
        router.get('/staff/cake-preorders', {}, {
            preserveState: true,
            replace: true,
        });
    };

    const createPackage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createPackageForm.post('/staff/cake-packages', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                createPackageForm.reset();
                createPackageForm.setData('is_active', true);
                setIsCreateModalOpen(false);
            },
        });
    };

    const startEditPackage = (pkg: CakePackageRow) => {
        setEditingPackage(pkg);
        editPackageForm.setData({
            _method: 'put',
            name: pkg.name,
            description: pkg.description ?? '',
            image: null,
            price: String(pkg.price),
            is_active: pkg.is_active,
        });
    };

    const updatePackage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editingPackage) {
            return;
        }

        editPackageForm.post(`/staff/cake-packages/${editingPackage.id}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setEditingPackage(null);
            },
        });
    };

    const deletePackage = (pkg: CakePackageRow) => {
        if (!window.confirm(`Delete or deactivate "${pkg.name}"?`)) {
            return;
        }

        router.delete(`/staff/cake-packages/${pkg.id}`, {
            preserveScroll: true,
        });
    };

    const updatePreorderStatus = (preorderId: number, status: string) => {
        router.patch(`/staff/cake-preorders/${preorderId}/status`, {
            status,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cake Preorders" />
            <div className="min-h-screen bg-[#FAFAFA] p-4 sm:p-6 lg:p-8 space-y-8">
                {/* 📌 Section 1 — Status Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200 overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-zinc-50 text-zinc-400">
                                    <PackageCheck className="size-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Cake Packages</p>
                                    <h3 className="text-2xl font-black text-zinc-900">{summary.total_packages}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200 overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-500">
                                    <CakeSlice className="size-6" />
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
                                    <Clock3 className="size-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Total Preorders</p>
                                    <h3 className="text-2xl font-black text-zinc-900">{summary.total_preorders}</h3>
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
                                    <h3 className="text-2xl font-black text-zinc-900">{summary.pending_preorders}</h3>
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
                                            router.get('/staff/cake-preorders', { ...filterForm.data, status: tab.value }, { preserveState: true, replace: true });
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
                                                    placeholder="Order ID, customer, phone..."
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
                                Modify the details of the cake package.
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
                                    <Label htmlFor="edit-price" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Price (ETB)</Label>
                                    <Input
                                        id="edit-price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={editPackageForm.data.price}
                                        onChange={(event) => editPackageForm.setData('price', event.target.value)}
                                        className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950"
                                    />
                                    <InputError message={editPackageForm.errors.price} />
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
                                <div className="space-y-2 md:col-span-2">
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
                            <Clock3 className="size-4 text-[#F57C00]" />
                            Cake Preorders
                        </h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Total: {preorders.total}</span>
                    </div>

                    <div className="grid gap-4">
                        {preorders.data.map((preorder) => {
                            const isExpanded = expandedCards.includes(preorder.id);
                            return (
                                <Card key={preorder.id} className="group overflow-hidden border-none shadow-sm ring-1 ring-zinc-200 transition-all hover:ring-zinc-300 bg-white rounded-3xl">
                                    <div className="p-4 sm:p-5">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 group-hover:bg-[#F57C00]/10 group-hover:text-[#F57C00] transition-colors">
                                                    <CakeSlice className="size-6" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h4 className="text-base font-black text-[#212121]">#{preorder.id} — {preorder.customer_name}</h4>
                                                        <Badge className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-tight shadow-none border-none ${badgeStyle(preorder.status)}`}>
                                                            {preorder.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-zinc-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar className="size-3.5" />
                                                            <span>Needed: {preorder.needed_date ?? 'N/A'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Phone className="size-3.5" />
                                                            <span>{preorder.customer_phone}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Package className="size-3.5" />
                                                            <span>{preorder.items.length} items</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 self-end sm:self-start">
                                                <div className="text-right mr-2 hidden sm:block">
                                                    <p className="text-sm font-black text-[#212121]">{currency(preorder.total_amount)}</p>
                                                    <p className="text-[10px] font-bold text-zinc-400">Total Amount</p>
                                                </div>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-10 w-10 rounded-xl hover:bg-zinc-100">
                                                            <MoreHorizontal className="size-5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 shadow-xl ring-1 ring-black/5 border-none">
                                                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-3 py-2">Update Status</DropdownMenuLabel>
                                                        {statusOptions.map((status) => (
                                                            <DropdownMenuItem
                                                                key={status}
                                                                className="rounded-lg font-bold text-sm px-3 py-2 cursor-pointer capitalize"
                                                                onClick={() => updatePreorderStatus(preorder.id, status)}
                                                            >
                                                                {status}
                                                            </DropdownMenuItem>
                                                        ))}
                                                        <DropdownMenuSeparator className="my-1 bg-zinc-100" />
                                                        <DropdownMenuItem
                                                            className="rounded-lg font-bold text-sm px-3 py-2 text-rose-600 focus:text-rose-600 focus:bg-rose-50 cursor-pointer"
                                                            onClick={() => updatePreorderStatus(preorder.id, 'cancelled')}
                                                        >
                                                            Cancel Preorder
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toggleCard(preorder.id)}
                                                    className="h-10 rounded-xl gap-2 font-bold bg-white text-zinc-600 border-zinc-200"
                                                >
                                                    {isExpanded ? 'Hide Details' : 'View Details'}
                                                    {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                                                </Button>
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div className="mt-6 space-y-4 border-t border-zinc-50 pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                    {preorder.items.map((item) => (
                                                        <div key={item.id} className="relative overflow-hidden rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-100">
                                                            <div className="flex items-start justify-between gap-3">
                                                                <div className="min-w-0 flex-1">
                                                                    <p className="truncate text-sm font-black text-zinc-900">{item.package_name ?? 'Package'} x {item.quantity}</p>
                                                                    <p className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-zinc-500">
                                                                        <span>Size: {item.size ?? 'N/A'}</span>
                                                                        <span className="size-1 rounded-full bg-zinc-300" />
                                                                        <span>Servings: {item.servings ?? 'N/A'}</span>
                                                                    </p>
                                                                    {item.specification && (
                                                                        <div className="mt-2 rounded-lg bg-white/50 p-2 text-xs text-zinc-600 ring-1 ring-zinc-200/50">
                                                                            <p className="font-bold text-[9px] uppercase tracking-widest text-zinc-400 mb-1">Specifications</p>
                                                                            {item.specification}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <span className="text-xs font-black text-zinc-900">{currency(item.line_total)}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {preorder.special_instructions && (
                                                    <div className="rounded-2xl bg-amber-50/50 p-4 ring-1 ring-amber-100/50">
                                                        <div className="flex items-center gap-2 text-amber-700 mb-2">
                                                            <Edit3 className="size-4" />
                                                            <p className="text-[10px] font-black uppercase tracking-widest">Special Instructions</p>
                                                        </div>
                                                        <p className="text-sm text-zinc-700 leading-relaxed font-medium">
                                                            {preorder.special_instructions}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 pt-6">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                            Showing {preorders.from ?? 0}-{preorders.to ?? 0} of {preorders.total}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {preorders.links.map((link) => (
                                <Button
                                    key={link.label}
                                    type="button"
                                    variant={link.active ? 'default' : 'outline'}
                                    className={`h-9 rounded-xl px-4 text-xs font-bold transition-all ${link.active ? 'bg-[#212121] text-white' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'}`}
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

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <PackageCheck className="size-4 text-[#F57C00]" />
                            Cake Packages
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
                                            <CakeSlice className="size-4 text-[#F57C00]" />
                                            Create Cake Package
                                        </DialogTitle>
                                        <DialogDescription className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
                                            Fill in the details to create a new cake package.
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
                                                <Label htmlFor="new-price" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Price (ETB)</Label>
                                                <Input
                                                    id="new-price"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={createPackageForm.data.price}
                                                    onChange={(event) => createPackageForm.setData('price', event.target.value)}
                                                    className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950"
                                                />
                                                <InputError message={createPackageForm.errors.price} />
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
                                            <div className="space-y-2 md:col-span-2">
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
                                            <p className="text-sm font-black text-[#F57C00]">{currency(pkg.price)}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-4 border-t border-zinc-50 pt-4">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <Clock3 className="size-3.5 text-zinc-400 shrink-0" />
                                            <span className="truncate text-[10px] font-bold text-zinc-600">{pkg.preorder_items_count} Preorders</span>
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

                <div className="flex justify-end">
                    <Button asChild variant="outline" className="rounded-xl border-zinc-200">
                        <Link href="/staff/catering-requests">Go to Catering Requests</Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
