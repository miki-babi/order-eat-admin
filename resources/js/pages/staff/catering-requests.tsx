import { Head, Link, router, useForm } from '@inertiajs/react';
import { Clock3, Edit3, ImagePlus, Search, Trash2, Users, UtensilsCrossed } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    const [editingPackage, setEditingPackage] = useState<CateringPackageRow | null>(null);

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

    const createPackage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createPackageForm.post('/staff/catering-packages', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                createPackageForm.reset();
                createPackageForm.setData('is_active', true);
                createPackageForm.setData('min_guests', '20');
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
            <div className="space-y-6 bg-zinc-50/50 p-6">
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Catering Packages</p>
                            <h3 className="mt-2 text-2xl font-black text-zinc-900">{summary.total_packages}</h3>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Active Packages</p>
                            <h3 className="mt-2 text-2xl font-black text-zinc-900">{summary.active_packages}</h3>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Total Requests</p>
                            <h3 className="mt-2 text-2xl font-black text-zinc-900">{summary.total_requests}</h3>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Pending</p>
                            <h3 className="mt-2 text-2xl font-black text-zinc-900">{summary.pending_requests}</h3>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-700">Search Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4 md:grid-cols-4" onSubmit={applyFilters}>
                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="search">Search</Label>
                                <Input
                                    id="search"
                                    value={filterForm.data.search}
                                    onChange={(event) => filterForm.setData('search', event.target.value)}
                                    placeholder="Request ID, customer, package, venue"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    value={filterForm.data.status}
                                    onChange={(event) => filterForm.setData('status', event.target.value)}
                                    className="h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm"
                                >
                                    <option value="">All</option>
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end gap-2">
                                <Button type="submit" className="h-10 flex-1 rounded-xl bg-[#F57C00] text-white hover:bg-[#E65100]">
                                    <Search className="mr-2 size-4" />
                                    Apply
                                </Button>
                                <Button type="button" variant="outline" className="h-10 rounded-xl" onClick={() => router.get('/staff/catering-requests')}>
                                    Clear
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {canManagePackages && (
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-700">
                                <UtensilsCrossed className="size-4 text-[#F57C00]" />
                                Create Catering Package
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-4 md:grid-cols-6" onSubmit={createPackage}>
                                <div className="grid gap-2">
                                    <Label htmlFor="new-name">Name</Label>
                                    <Input
                                        id="new-name"
                                        value={createPackageForm.data.name}
                                        onChange={(event) => createPackageForm.setData('name', event.target.value)}
                                    />
                                    <InputError message={createPackageForm.errors.name} />
                                </div>
                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="new-description">Description</Label>
                                    <Input
                                        id="new-description"
                                        value={createPackageForm.data.description}
                                        onChange={(event) => createPackageForm.setData('description', event.target.value)}
                                    />
                                    <InputError message={createPackageForm.errors.description} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="new-image">Image</Label>
                                    <Input
                                        id="new-image"
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        className="h-10"
                                        onChange={(event) => createPackageForm.setData('image', event.target.files?.[0] ?? null)}
                                    />
                                    <InputError message={createPackageForm.errors.image} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="new-price">Price/Person (ETB)</Label>
                                    <Input
                                        id="new-price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={createPackageForm.data.price_per_person}
                                        onChange={(event) => createPackageForm.setData('price_per_person', event.target.value)}
                                    />
                                    <InputError message={createPackageForm.errors.price_per_person} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="new-min">Min Guests</Label>
                                    <Input
                                        id="new-min"
                                        type="number"
                                        min="1"
                                        value={createPackageForm.data.min_guests}
                                        onChange={(event) => createPackageForm.setData('min_guests', event.target.value)}
                                    />
                                    <InputError message={createPackageForm.errors.min_guests} />
                                </div>
                                <div className="md:col-span-6 flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                                    <label className="text-sm font-semibold text-zinc-700">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={createPackageForm.data.is_active}
                                            onChange={(event) => createPackageForm.setData('is_active', event.target.checked)}
                                        />
                                        Active package
                                    </label>
                                    <Button type="submit" className="rounded-xl bg-[#F57C00] text-white hover:bg-[#E65100]" disabled={createPackageForm.processing}>
                                        Add Package
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {editingPackage && canManagePackages && (
                    <Card className="border-none shadow-sm ring-2 ring-[#212121]">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-700">Edit Package: {editingPackage.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-4 md:grid-cols-6" onSubmit={updatePackage}>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-name">Name</Label>
                                    <Input
                                        id="edit-name"
                                        value={editPackageForm.data.name}
                                        onChange={(event) => editPackageForm.setData('name', event.target.value)}
                                    />
                                    <InputError message={editPackageForm.errors.name} />
                                </div>
                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="edit-description">Description</Label>
                                    <Input
                                        id="edit-description"
                                        value={editPackageForm.data.description}
                                        onChange={(event) => editPackageForm.setData('description', event.target.value)}
                                    />
                                    <InputError message={editPackageForm.errors.description} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-image">Replacement Image</Label>
                                    <Input
                                        id="edit-image"
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        className="h-10"
                                        onChange={(event) => editPackageForm.setData('image', event.target.files?.[0] ?? null)}
                                    />
                                    <InputError message={editPackageForm.errors.image} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-price">Price/Person (ETB)</Label>
                                    <Input
                                        id="edit-price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={editPackageForm.data.price_per_person}
                                        onChange={(event) => editPackageForm.setData('price_per_person', event.target.value)}
                                    />
                                    <InputError message={editPackageForm.errors.price_per_person} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-min">Min Guests</Label>
                                    <Input
                                        id="edit-min"
                                        type="number"
                                        min="1"
                                        value={editPackageForm.data.min_guests}
                                        onChange={(event) => editPackageForm.setData('min_guests', event.target.value)}
                                    />
                                    <InputError message={editPackageForm.errors.min_guests} />
                                </div>
                                <div className="md:col-span-6 flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                                    <label className="text-sm font-semibold text-zinc-700">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={editPackageForm.data.is_active}
                                            onChange={(event) => editPackageForm.setData('is_active', event.target.checked)}
                                        />
                                        Active package
                                    </label>
                                    <div className="flex gap-2">
                                        <Button type="button" variant="outline" className="rounded-xl" onClick={() => setEditingPackage(null)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="rounded-xl bg-[#212121] text-white hover:bg-black" disabled={editPackageForm.processing}>
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between text-sm font-black uppercase tracking-widest text-zinc-700">
                            <span className="flex items-center gap-2"><Users className="size-4 text-[#F57C00]" /> Catering Packages</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            {packages.map((pkg) => (
                                <article key={pkg.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                                    <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                                        {pkg.image_url ? (
                                            <img src={pkg.image_url} alt={pkg.name} className="h-full w-full object-cover" loading="lazy" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-zinc-400">
                                                <ImagePlus className="size-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <p className="text-base font-black text-zinc-900">{pkg.name}</p>
                                                {pkg.description && <p className="mt-1 text-sm text-zinc-600">{pkg.description}</p>}
                                                <p className="mt-2 text-sm font-semibold text-zinc-500">Used in {pkg.service_requests_count} requests</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className={pkg.is_active ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-zinc-200 bg-zinc-100 text-zinc-600'}>
                                                    {pkg.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                                <span className="text-sm font-black text-zinc-900">{currency(pkg.price_per_person)}/guest</span>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-sm text-zinc-600">Minimum guests: {pkg.min_guests}</div>
                                        {canManagePackages && (
                                            <div className="mt-4 flex justify-end gap-2">
                                                <Button type="button" variant="outline" className="h-9 rounded-xl" onClick={() => startEditPackage(pkg)}>
                                                    <Edit3 className="mr-2 size-4" />
                                                    Edit
                                                </Button>
                                                <Button type="button" variant="outline" className="h-9 rounded-xl border-red-200 text-red-600 hover:bg-red-50" onClick={() => deletePackage(pkg)}>
                                                    <Trash2 className="mr-2 size-4" />
                                                    Delete
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-700">
                            <Clock3 className="size-4 text-[#F57C00]" />
                            Catering Service Requests
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {requests.data.map((serviceRequest) => (
                            <article key={serviceRequest.id} className="rounded-2xl border border-zinc-200 p-4">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-black text-zinc-900">Request #{serviceRequest.id}</p>
                                        <p className="mt-1 text-sm text-zinc-600">{serviceRequest.customer_name} - {serviceRequest.customer_phone}</p>
                                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">Event: {serviceRequest.event_date ?? 'N/A'} | Guests: {serviceRequest.guest_count}</p>
                                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                            Packages: {serviceRequest.package_names.length > 0 ? serviceRequest.package_names.join(', ') : (serviceRequest.package_name ?? 'N/A')}
                                        </p>
                                        {serviceRequest.venue && (
                                            <p className="mt-1 text-sm text-zinc-600">Venue: {serviceRequest.venue}</p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="outline" className="mt-1 border-zinc-200 bg-zinc-100 text-zinc-700">{serviceRequest.status}</Badge>
                                    </div>
                                </div>

                                {serviceRequest.special_instructions && (
                                    <p className="mt-3 rounded-xl bg-zinc-50 p-3 text-sm text-zinc-700">
                                        {serviceRequest.special_instructions}
                                    </p>
                                )}

                                {canUpdateRequests && (
                                    <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
                                        <select
                                            defaultValue={serviceRequest.status}
                                            className="h-9 rounded-xl border border-zinc-200 bg-white px-3 text-sm"
                                            onChange={(event) => updateRequestStatus(serviceRequest.id, event.target.value)}
                                        >
                                            {statusOptions.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </article>
                        ))}

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
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button asChild variant="outline" className="rounded-xl border-zinc-200">
                        <Link href="/staff/cake-preorders">Go to Cake Preorders</Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
