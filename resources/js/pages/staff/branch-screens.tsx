import { Head, useForm } from '@inertiajs/react';
import { MonitorSmartphone, PlusCircle, Settings2, UserRound, UtensilsCrossed } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type ScreenType = 'waiter' | 'kitchen' | 'cashier';

type PickupLocation = {
    id: number;
    name: string;
};

type StaffUser = {
    id: number;
    name: string;
    email: string;
    pickup_location_ids: number[];
};

type MenuItem = {
    id: number;
    name: string;
    category: string | null;
};

type ScreenRow = {
    id: number;
    pickup_location_id: number;
    pickup_location_name: string | null;
    name: string;
    screen_type: ScreenType;
    is_active: boolean;
    user_ids: number[];
    users: {
        id: number;
        name: string;
        email: string;
    }[];
    menu_item_ids: number[];
    menu_items: {
        id: number;
        name: string;
        category: string | null;
    }[];
    updated_at: string | null;
};

type Summary = {
    total_screens: number;
    waiter_screens: number;
    kitchen_screens: number;
    cashier_screens: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Screen Routing',
        href: '/staff/screens',
    },
];

const screenTypeLabels: Record<ScreenType, string> = {
    waiter: 'Waiter',
    kitchen: 'Kitchen',
    cashier: 'Cashier',
};

const screenTypeBadgeClass: Record<ScreenType, string> = {
    waiter: 'bg-amber-100 text-amber-700',
    kitchen: 'bg-indigo-100 text-indigo-700',
    cashier: 'bg-emerald-100 text-emerald-700',
};

type ScreenForm = {
    pickup_location_id: string;
    name: string;
    screen_type: ScreenType;
    is_active: boolean;
    user_ids: number[];
    menu_item_ids: number[];
};

function toggleSelection(values: number[], id: number): number[] {
    return values.includes(id) ? values.filter((value) => value !== id) : [...values, id];
}

export default function BranchScreens({
    screens,
    pickupLocations,
    users,
    menuItems,
    screenTypes,
    summary,
}: {
    screens: ScreenRow[];
    pickupLocations: PickupLocation[];
    users: StaffUser[];
    menuItems: MenuItem[];
    screenTypes: ScreenType[];
    summary: Summary;
}) {
    const [editing, setEditing] = useState<ScreenRow | null>(null);

    const createForm = useForm<ScreenForm>({
        pickup_location_id: pickupLocations[0] ? String(pickupLocations[0].id) : '',
        name: '',
        screen_type: 'waiter',
        is_active: true,
        user_ids: [],
        menu_item_ids: [],
    });

    const editForm = useForm<ScreenForm>({
        pickup_location_id: '',
        name: '',
        screen_type: 'waiter',
        is_active: true,
        user_ids: [],
        menu_item_ids: [],
    });

    const createScreen = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createForm.post('/staff/screens', {
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
                createForm.setData('pickup_location_id', pickupLocations[0] ? String(pickupLocations[0].id) : '');
                createForm.setData('screen_type', 'waiter');
                createForm.setData('is_active', true);
            },
        });
    };

    const openEdit = (screen: ScreenRow) => {
        setEditing(screen);
        editForm.setData({
            pickup_location_id: String(screen.pickup_location_id),
            name: screen.name,
            screen_type: screen.screen_type,
            is_active: screen.is_active,
            user_ids: [...screen.user_ids],
            menu_item_ids: [...screen.menu_item_ids],
        });
    };

    const updateScreen = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editing) {
            return;
        }

        editForm.transform((data) => ({
            ...data,
            _method: 'put',
        }));

        editForm.post(`/staff/screens/${editing.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditing(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Screen Routing" />
            <div className="min-h-screen space-y-6 bg-zinc-50/60 p-6">
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Total Screens</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.total_screens}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Waiter</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.waiter_screens}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Kitchen</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.kitchen_screens}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Cashier</p>
                            <p className="mt-2 text-3xl font-black text-zinc-900">{summary.cashier_screens}</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                            <PlusCircle className="size-4 text-[#F57C00]" />
                            Create Screen
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5">
                        <form className="space-y-5" onSubmit={createScreen}>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="create-branch">Branch</Label>
                                    <select
                                        id="create-branch"
                                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm"
                                        value={createForm.data.pickup_location_id}
                                        onChange={(event) => createForm.setData('pickup_location_id', event.target.value)}
                                    >
                                        <option value="">Select branch</option>
                                        {pickupLocations.map((location) => (
                                            <option key={location.id} value={location.id}>
                                                {location.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={createForm.errors.pickup_location_id} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="create-name">Screen Name</Label>
                                    <Input
                                        id="create-name"
                                        className="h-11 rounded-xl"
                                        value={createForm.data.name}
                                        onChange={(event) => createForm.setData('name', event.target.value)}
                                        placeholder="Bar 1 / Waiter Main / Cash Desk 2"
                                    />
                                    <InputError message={createForm.errors.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="create-type">Screen Type</Label>
                                    <select
                                        id="create-type"
                                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm"
                                        value={createForm.data.screen_type}
                                        onChange={(event) => createForm.setData('screen_type', event.target.value as ScreenType)}
                                    >
                                        {screenTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {screenTypeLabels[type]}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={createForm.errors.screen_type} />
                                </div>
                            </div>

                            <label className="flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 ring-1 ring-zinc-100">
                                <input
                                    type="checkbox"
                                    checked={createForm.data.is_active}
                                    onChange={(event) => createForm.setData('is_active', event.target.checked)}
                                />
                                <span className="text-sm font-semibold text-zinc-700">Active screen</span>
                            </label>

                            <div className="grid gap-4 lg:grid-cols-2">
                                <div className="space-y-2 rounded-xl border border-zinc-200 p-3">
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Assign Users</p>
                                    <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
                                        {users.map((user) => (
                                            <label key={user.id} className="flex items-start gap-2 rounded-lg bg-zinc-50 px-3 py-2 ring-1 ring-zinc-100">
                                                <input
                                                    type="checkbox"
                                                    checked={createForm.data.user_ids.includes(user.id)}
                                                    onChange={() => createForm.setData('user_ids', toggleSelection(createForm.data.user_ids, user.id))}
                                                />
                                                <span className="text-xs">
                                                    <span className="font-bold text-zinc-800">{user.name}</span>
                                                    <span className="block text-zinc-500">{user.email}</span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={createForm.errors.user_ids} />
                                </div>

                                <div className="space-y-2 rounded-xl border border-zinc-200 p-3">
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                                        Kitchen Item Routing
                                    </p>
                                    <p className="text-[11px] text-zinc-500">Used only when screen type is Kitchen.</p>
                                    <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
                                        {menuItems.map((item) => (
                                            <label key={item.id} className="flex items-start gap-2 rounded-lg bg-zinc-50 px-3 py-2 ring-1 ring-zinc-100">
                                                <input
                                                    type="checkbox"
                                                    checked={createForm.data.menu_item_ids.includes(item.id)}
                                                    disabled={createForm.data.screen_type !== 'kitchen'}
                                                    onChange={() =>
                                                        createForm.setData('menu_item_ids', toggleSelection(createForm.data.menu_item_ids, item.id))
                                                    }
                                                />
                                                <span className="text-xs">
                                                    <span className="font-bold text-zinc-800">{item.name}</span>
                                                    <span className="block text-zinc-500">{item.category ?? 'Uncategorized'}</span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={createForm.errors.menu_item_ids} />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="h-11 rounded-xl bg-[#F57C00] font-black hover:bg-[#E65100]"
                                disabled={createForm.processing}
                            >
                                {createForm.processing ? 'Saving...' : 'Create Screen'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <section className="space-y-3">
                    <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                        <MonitorSmartphone className="size-4 text-[#F57C00]" />
                        Configured Screens
                    </h2>

                    {screens.length === 0 ? (
                        <Card className="border-dashed border-zinc-300">
                            <CardContent className="py-10 text-center text-sm font-medium text-zinc-500">
                                No screens configured yet.
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {screens.map((screen) => (
                                <Card key={screen.id} className="border-none shadow-sm ring-1 ring-zinc-200">
                                    <CardContent className="space-y-4 p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-black text-zinc-900">{screen.name}</p>
                                                <p className="text-xs font-medium text-zinc-500">{screen.pickup_location_name}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className={screenTypeBadgeClass[screen.screen_type]}>
                                                    {screenTypeLabels[screen.screen_type]}
                                                </Badge>
                                                <Badge className={screen.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'}>
                                                    {screen.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="space-y-2 rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                                            <p className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                                <UserRound className="size-3" />
                                                Assigned Users ({screen.users.length})
                                            </p>
                                            <p className="text-xs text-zinc-700">
                                                {screen.users.length === 0
                                                    ? 'No users assigned'
                                                    : screen.users.map((user) => user.name).join(', ')}
                                            </p>
                                        </div>

                                        {screen.screen_type === 'kitchen' ? (
                                            <div className="space-y-2 rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                                                <p className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                                    <UtensilsCrossed className="size-3" />
                                                    Routed Items ({screen.menu_items.length})
                                                </p>
                                                <p className="text-xs text-zinc-700">
                                                    {screen.menu_items.length === 0
                                                        ? 'No routed items yet'
                                                        : screen.menu_items.map((item) => item.name).join(', ')}
                                                </p>
                                            </div>
                                        ) : null}

                                        <Button
                                            type="button"
                                            size="sm"
                                            className="h-9 rounded-xl bg-[#212121] hover:bg-black"
                                            onClick={() => openEdit(screen)}
                                        >
                                            <Settings2 className="mr-1 size-3" />
                                            Edit
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <Dialog
                open={editing !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditing(null);
                    }
                }}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Edit Screen</DialogTitle>
                        <DialogDescription>
                            {editing ? `Update configuration for ${editing.name}.` : 'Update screen.'}
                        </DialogDescription>
                    </DialogHeader>

                    <form className="space-y-5" onSubmit={updateScreen}>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="edit-branch">Branch</Label>
                                <select
                                    id="edit-branch"
                                    className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm"
                                    value={editForm.data.pickup_location_id}
                                    onChange={(event) => editForm.setData('pickup_location_id', event.target.value)}
                                >
                                    <option value="">Select branch</option>
                                    {pickupLocations.map((location) => (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={editForm.errors.pickup_location_id} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Screen Name</Label>
                                <Input
                                    id="edit-name"
                                    className="h-11 rounded-xl"
                                    value={editForm.data.name}
                                    onChange={(event) => editForm.setData('name', event.target.value)}
                                />
                                <InputError message={editForm.errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-type">Screen Type</Label>
                                <select
                                    id="edit-type"
                                    className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm"
                                    value={editForm.data.screen_type}
                                    onChange={(event) => editForm.setData('screen_type', event.target.value as ScreenType)}
                                >
                                    {screenTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {screenTypeLabels[type]}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={editForm.errors.screen_type} />
                            </div>
                        </div>

                        <label className="flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 ring-1 ring-zinc-100">
                            <input
                                type="checkbox"
                                checked={editForm.data.is_active}
                                onChange={(event) => editForm.setData('is_active', event.target.checked)}
                            />
                            <span className="text-sm font-semibold text-zinc-700">Active screen</span>
                        </label>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="space-y-2 rounded-xl border border-zinc-200 p-3">
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Assign Users</p>
                                <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
                                    {users.map((user) => (
                                        <label key={user.id} className="flex items-start gap-2 rounded-lg bg-zinc-50 px-3 py-2 ring-1 ring-zinc-100">
                                            <input
                                                type="checkbox"
                                                checked={editForm.data.user_ids.includes(user.id)}
                                                onChange={() => editForm.setData('user_ids', toggleSelection(editForm.data.user_ids, user.id))}
                                            />
                                            <span className="text-xs">
                                                <span className="font-bold text-zinc-800">{user.name}</span>
                                                <span className="block text-zinc-500">{user.email}</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <InputError message={editForm.errors.user_ids} />
                            </div>

                            <div className="space-y-2 rounded-xl border border-zinc-200 p-3">
                                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Kitchen Item Routing</p>
                                <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
                                    {menuItems.map((item) => (
                                        <label key={item.id} className="flex items-start gap-2 rounded-lg bg-zinc-50 px-3 py-2 ring-1 ring-zinc-100">
                                            <input
                                                type="checkbox"
                                                checked={editForm.data.menu_item_ids.includes(item.id)}
                                                disabled={editForm.data.screen_type !== 'kitchen'}
                                                onChange={() => editForm.setData('menu_item_ids', toggleSelection(editForm.data.menu_item_ids, item.id))}
                                            />
                                            <span className="text-xs">
                                                <span className="font-bold text-zinc-800">{item.name}</span>
                                                <span className="block text-zinc-500">{item.category ?? 'Uncategorized'}</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <InputError message={editForm.errors.menu_item_ids} />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={editForm.processing}>
                                {editForm.processing ? 'Updating...' : 'Update Screen'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
