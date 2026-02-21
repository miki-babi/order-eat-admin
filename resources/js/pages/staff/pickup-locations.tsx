import { Head, router, useForm } from '@inertiajs/react';
import { MapPin, MapPinPlus, Trash2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type PickupLocation = {
    id: number;
    name: string;
    address: string;
    google_maps_url: string | null;
    is_active: boolean;
    orders_count: number;
    updated_at: string | null;
};

type Summary = {
    total_locations: number;
    active_locations: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pickup Locations',
        href: '/staff/pickup-locations',
    },
];

export default function PickupLocations({
    locations,
    summary,
}: {
    locations: PickupLocation[];
    summary: Summary;
}) {
    const [editing, setEditing] = useState<PickupLocation | null>(null);

    const createForm = useForm({
        name: '',
        address: '',
        google_maps_url: '',
        is_active: true,
    });

    const editForm = useForm({
        name: '',
        address: '',
        google_maps_url: '',
        is_active: true,
    });

    const startEdit = (location: PickupLocation) => {
        setEditing(location);
        editForm.setData({
            name: location.name,
            address: location.address,
            google_maps_url: location.google_maps_url ?? '',
            is_active: location.is_active,
        });
    };

    const createLocation = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createForm.post('/staff/pickup-locations', {
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
                createForm.setData('google_maps_url', '');
                createForm.setData('is_active', true);
            },
        });
    };

    const updateLocation = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editing) {
            return;
        }

        editForm.put(`/staff/pickup-locations/${editing.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditing(null);
            },
        });
    };

    const deleteLocation = (location: PickupLocation) => {
        if (!window.confirm(`Delete or deactivate "${location.name}"?`)) {
            return;
        }

        router.delete(`/staff/pickup-locations/${location.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pickup Locations" />
            <div className="space-y-8 bg-zinc-50/50 p-6 min-h-screen">
                {/* 📌 Summary Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-[#9E9E9E]">Total Locations</p>
                                    <h3 className="mt-2 text-3xl font-black text-[#212121]">{summary.total_locations}</h3>
                                </div>
                                <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-500">
                                    <MapPin className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-[#F57C00]">Active Distribution</p>
                                    <h3 className="mt-2 text-3xl font-black text-[#212121]">{summary.active_locations}</h3>
                                </div>
                                <div className="rounded-2xl bg-[#F57C00]/10 p-3 text-[#F57C00]">
                                    <MapPinPlus className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>


                {/* 📌 Registered Locations List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-black uppercase tracking-widest text-[#212121]">
                            <MapPin className="size-5 text-[#F57C00]" />
                            Location Directory
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {locations.map((location) => (
                            <Card key={location.id} className="relative overflow-hidden border-none shadow-md ring-1 ring-zinc-200 transition-all hover:ring-[2px] hover:ring-[#F57C00]/20">
                                <div className={`absolute top-0 right-0 h-1.5 w-full ${location.is_active ? 'bg-emerald-500' : 'bg-zinc-300'}`} />
                                <CardContent className="pt-6">
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-xl font-black text-[#212121]">{location.name}</p>
                                                <Badge className={`mt-1.5 rounded-lg px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${location.is_active ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200' : 'bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200'} shadow-none`}>
                                                    {location.is_active ? 'Distribution Active' : 'Distribution Inactive'}
                                                </Badge>
                                            </div>
                                            <div className="rounded-xl bg-zinc-50 p-2 text-zinc-400">
                                                <MapPin className="size-5" />
                                            </div>
                                        </div>

                                        <div className="mt-6 flex-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Main Hub</p>
                                            <p className="mt-1 line-clamp-2 text-xs font-bold leading-relaxed text-zinc-600">{location.address}</p>
                                            {location.google_maps_url && (
                                                <a
                                                    href={location.google_maps_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-black text-[#F57C00] hover:underline"
                                                >
                                                    <MapPin className="size-3" />
                                                    Pin on Digital Maps
                                                </a>
                                            )}
                                        </div>

                                        <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-5">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400">Total Serviced</span>
                                                <span className="text-sm font-black text-[#212121]">{location.orders_count} Orders</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-9 rounded-xl font-bold transition-all hover:bg-[#F57C00]/10 hover:text-[#F57C00]"
                                                    onClick={() => startEdit(location)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-9 rounded-xl font-bold text-rose-500 transition-all hover:bg-rose-50 hover:text-rose-600"
                                                    onClick={() => deleteLocation(location)}
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* 📌 Add Location Card */}
                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <MapPinPlus className="size-4 text-[#F57C00]" />
                            Register New Pickup Point
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form className="grid gap-6 md:grid-cols-3" onSubmit={createLocation}>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="name">Branch Name</Label>
                                <Input
                                    id="name"
                                    className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                    value={createForm.data.name}
                                    onChange={(event) => createForm.setData('name', event.target.value)}
                                    placeholder="e.g. Bole Branch"
                                />
                                <InputError message={createForm.errors.name} />
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="address">Physical Address</Label>
                                <Input
                                    id="address"
                                    className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                    value={createForm.data.address}
                                    onChange={(event) => createForm.setData('address', event.target.value)}
                                    placeholder="Street, Building, Flat number..."
                                />
                                <InputError message={createForm.errors.address} />
                            </div>
                            <div className="grid gap-2 md:col-span-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="google_maps_url">Google Maps URL (Optional)</Label>
                                <Input
                                    id="google_maps_url"
                                    className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                    value={createForm.data.google_maps_url}
                                    onChange={(event) =>
                                        createForm.setData('google_maps_url', event.target.value)
                                    }
                                    placeholder="https://maps.google.com/..."
                                />
                                <InputError message={createForm.errors.google_maps_url} />
                            </div>

                            <div className="flex items-center gap-2 md:col-span-3">
                                <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-2 ring-1 ring-zinc-200">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                        checked={createForm.data.is_active}
                                        onChange={(event) =>
                                            createForm.setData('is_active', event.target.checked)
                                        }
                                    />
                                    <Label htmlFor="is_active" className="cursor-pointer text-xs font-bold text-zinc-600">Active Location</Label>
                                </div>
                                <Button type="submit" className="h-11 px-8 ml-auto rounded-xl bg-[#F57C00] font-black shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100]" disabled={createForm.processing}>
                                    {createForm.processing ? 'Saving...' : 'Create Location'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* 📌 Edit Modal (Inline Card) */}
                {editing ? (
                    <Card className="border-none shadow-xl ring-2 ring-[#212121]">
                        <CardHeader className="border-b border-zinc-100 bg-[#212121] py-4 text-white">
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                                <MapPinPlus className="size-4 text-[#F57C00]" />
                                Modify Branch: {editing.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form className="grid gap-6 md:grid-cols-3" onSubmit={updateLocation}>
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="edit-name">Branch Name</Label>
                                    <Input
                                        id="edit-name"
                                        className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                        value={editForm.data.name}
                                        onChange={(event) => editForm.setData('name', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.name} />
                                </div>
                                <div className="grid gap-2 md:col-span-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="edit-address">Physical Address</Label>
                                    <Input
                                        id="edit-address"
                                        className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                        value={editForm.data.address}
                                        onChange={(event) => editForm.setData('address', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.address} />
                                </div>
                                <div className="grid gap-2 md:col-span-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="edit-google-maps-url">Google Maps URL</Label>
                                    <Input
                                        id="edit-google-maps-url"
                                        className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00] transition-all"
                                        value={editForm.data.google_maps_url}
                                        onChange={(event) =>
                                            editForm.setData('google_maps_url', event.target.value)
                                        }
                                    />
                                    <InputError message={editForm.errors.google_maps_url} />
                                </div>

                                <div className="flex items-center gap-2 md:col-span-3">
                                    <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-2 ring-1 ring-zinc-200">
                                        <input
                                            type="checkbox"
                                            id="edit_is_active"
                                            className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                            checked={editForm.data.is_active}
                                            onChange={(event) =>
                                                editForm.setData('is_active', event.target.checked)
                                            }
                                        />
                                        <Label htmlFor="edit_is_active" className="cursor-pointer text-xs font-bold text-zinc-600">Active Location</Label>
                                    </div>
                                    <div className="flex items-center gap-3 ml-auto">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-11 rounded-xl font-bold"
                                            onClick={() => setEditing(null)}
                                        >
                                            Discard Changes
                                        </Button>
                                        <Button type="submit" className="h-11 px-8 rounded-xl bg-[#F57C00] font-black shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100]" disabled={editForm.processing}>
                                            Save Modifications
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                ) : null}

            </div>
        </AppLayout>
    );
}
