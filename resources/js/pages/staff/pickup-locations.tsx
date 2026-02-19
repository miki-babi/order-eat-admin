import { Head, router, useForm } from '@inertiajs/react';
import { MapPinPlus } from 'lucide-react';
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
        is_active: true,
    });

    const editForm = useForm({
        name: '',
        address: '',
        is_active: true,
    });

    const startEdit = (location: PickupLocation) => {
        setEditing(location);
        editForm.setData({
            name: location.name,
            address: location.address,
            is_active: location.is_active,
        });
    };

    const createLocation = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createForm.post('/staff/pickup-locations', {
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
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
            <div className="space-y-5 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Total Locations</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.total_locations}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Active Locations</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.active_locations}</CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <MapPinPlus className="size-4" />
                            Add Pickup Location
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-3 md:grid-cols-3" onSubmit={createLocation}>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={createForm.data.name}
                                    onChange={(event) => createForm.setData('name', event.target.value)}
                                    placeholder="Bole Branch"
                                />
                                <InputError message={createForm.errors.name} />
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={createForm.data.address}
                                    onChange={(event) => createForm.setData('address', event.target.value)}
                                    placeholder="Street and area"
                                />
                                <InputError message={createForm.errors.address} />
                            </div>
                            <label className="flex items-center gap-2 text-sm">
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
                                    {createForm.processing ? 'Creating...' : 'Create Location'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {editing ? (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Edit Location: {editing.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-3 md:grid-cols-3" onSubmit={updateLocation}>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-name">Name</Label>
                                    <Input
                                        id="edit-name"
                                        value={editForm.data.name}
                                        onChange={(event) => editForm.setData('name', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.name} />
                                </div>
                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="edit-address">Address</Label>
                                    <Input
                                        id="edit-address"
                                        value={editForm.data.address}
                                        onChange={(event) => editForm.setData('address', event.target.value)}
                                    />
                                    <InputError message={editForm.errors.address} />
                                </div>
                                <label className="flex items-center gap-2 text-sm">
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
                        <CardTitle>Location List</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {locations.map((location) => (
                            <div key={location.id} className="rounded-lg border p-3">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <div>
                                        <p className="font-medium">{location.name}</p>
                                        <p className="text-sm text-zinc-600">{location.address}</p>
                                        <p className="text-xs text-zinc-500">
                                            Orders: {location.orders_count}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge variant={location.is_active ? 'default' : 'outline'}>
                                            {location.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            onClick={() => startEdit(location)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => deleteLocation(location)}
                                        >
                                            Delete
                                        </Button>
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
