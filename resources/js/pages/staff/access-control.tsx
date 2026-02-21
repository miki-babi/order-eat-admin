import { Head, useForm } from '@inertiajs/react';
import { KeyRound, Shield, ShieldCheck, UserCog, Users } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type PermissionRow = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
};

type RoleRow = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_system: boolean;
    permission_slugs: string[];
};

type UserRow = {
    id: number;
    name: string;
    email: string;
    role: string;
    role_slugs: string[];
    permission_slugs: string[];
    pickup_location_ids: number[];
    pickup_locations: string[];
    created_at: string | null;
    updated_at: string | null;
};

type PickupLocation = {
    id: number;
    name: string;
};

type Summary = {
    total_users: number;
    total_roles: number;
    total_permissions: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Security & Access',
        href: '/staff/access-control',
    },
];

function toggleString(values: string[], value: string): string[] {
    return values.includes(value)
        ? values.filter((current) => current !== value)
        : [...values, value];
}

function toggleNumber(values: number[], value: number): number[] {
    return values.includes(value)
        ? values.filter((current) => current !== value)
        : [...values, value];
}

export default function AccessControl({
    users,
    roles,
    permissions,
    pickupLocations,
    summary,
}: {
    users: UserRow[];
    roles: RoleRow[];
    permissions: PermissionRow[];
    pickupLocations: PickupLocation[];
    summary: Summary;
}) {
    const [editingRole, setEditingRole] = useState<RoleRow | null>(null);
    const [editingUser, setEditingUser] = useState<UserRow | null>(null);

    const permissionForm = useForm({
        name: '',
        slug: '',
        description: '',
    });

    const createRoleForm = useForm({
        name: '',
        description: '',
        permission_slugs: [] as string[],
    });

    const editRoleForm = useForm({
        name: '',
        description: '',
        permission_slugs: [] as string[],
    });

    const createUserForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_slugs: [] as string[],
        pickup_location_ids: [] as number[],
    });

    const editUserForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_slugs: [] as string[],
        pickup_location_ids: [] as number[],
    });

    const submitPermission = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        permissionForm.post('/staff/access-control/permissions', {
            preserveScroll: true,
            onSuccess: () => {
                permissionForm.reset();
            },
        });
    };

    const submitCreateRole = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createRoleForm.post('/staff/access-control/roles', {
            preserveScroll: true,
            onSuccess: () => {
                createRoleForm.reset();
                createRoleForm.setData('permission_slugs', []);
            },
        });
    };

    const startEditRole = (role: RoleRow) => {
        setEditingRole(role);
        editRoleForm.setData({
            name: role.name,
            description: role.description ?? '',
            permission_slugs: [...role.permission_slugs],
        });
        editRoleForm.clearErrors();
    };

    const submitEditRole = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editingRole) {
            return;
        }

        editRoleForm.put(`/staff/access-control/roles/${editingRole.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingRole(null);
            },
        });
    };

    const submitCreateUser = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createUserForm.post('/staff/access-control/users', {
            preserveScroll: true,
            onSuccess: () => {
                createUserForm.reset();
                createUserForm.setData('role_slugs', []);
                createUserForm.setData('pickup_location_ids', []);
            },
        });
    };

    const startEditUser = (user: UserRow) => {
        setEditingUser(user);
        editUserForm.setData({
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
            role_slugs: [...user.role_slugs],
            pickup_location_ids: [...user.pickup_location_ids],
        });
        editUserForm.clearErrors();
    };

    const submitEditUser = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editingUser) {
            return;
        }

        editUserForm.put(`/staff/access-control/users/${editingUser.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingUser(null);
                editUserForm.reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Security & Access Control" />
            <div className="space-y-8 bg-zinc-50/50 p-6 min-h-screen">
                {/* 📌 Security Overview */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Operator Network</p>
                                    <h3 className="mt-1 text-2xl font-black text-[#212121]">{summary.total_users} Users</h3>
                                </div>
                                <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-500">
                                    <Users className="size-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#F57C00]">Authorization Tiers</p>
                                    <h3 className="mt-1 text-2xl font-black text-[#212121]">{summary.total_roles} Levels</h3>
                                </div>
                                <div className="rounded-2xl bg-[#F57C00]/10 p-3 text-[#F57C00]">
                                    <ShieldCheck className="size-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Protocol Constraints</p>
                                    <h3 className="mt-1 text-2xl font-black text-[#212121]">{summary.total_permissions} Gates</h3>
                                </div>
                                <div className="rounded-2xl bg-[#212121] p-3 text-white">
                                    <KeyRound className="size-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 📌 New Permission Protocol */}
                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#212121]">
                            <KeyRound className="size-4 text-[#F57C00]" />
                            Declare new permission
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form className="grid gap-6 md:grid-cols-4" onSubmit={submitPermission}>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="permission-name">Protocol Name</Label>
                                <Input
                                    id="permission-name"
                                    className="h-10 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                    value={permissionForm.data.name}
                                    onChange={(event) => permissionForm.setData('name', event.target.value)}
                                    placeholder="e.g. Audit Logs"
                                />
                                <InputError message={permissionForm.errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="permission-slug">System slug</Label>
                                <Input
                                    id="permission-slug"
                                    className="h-10 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                    value={permissionForm.data.slug}
                                    onChange={(event) => permissionForm.setData('slug', event.target.value)}
                                    placeholder="system_audit"
                                />
                                <InputError message={permissionForm.errors.slug} />
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="permission-description">Contextual description</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="permission-description"
                                        className="h-10 flex-1 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                        value={permissionForm.data.description}
                                        onChange={(event) =>
                                            permissionForm.setData('description', event.target.value)
                                        }
                                        placeholder="Briefly define scope of this access level..."
                                    />
                                    <Button type="submit" className="h-10 px-6 rounded-xl bg-[#212121] font-black hover:bg-[#F57C00]" disabled={permissionForm.processing}>
                                        Deploy
                                    </Button>
                                </div>
                                <InputError message={permissionForm.errors.description} />
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* 📌 Tier Management */}
                    <div className="space-y-4">
                        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <Shield className="size-4 text-[#F57C00]" />
                            Authorization Tiers
                        </h2>

                        <Card className="border-none shadow-md ring-1 ring-zinc-200">
                            <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9E9E9E]">Configure role-based access</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form className="space-y-6" onSubmit={submitCreateRole}>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="role-name">Tier Label</Label>
                                            <Input
                                                id="role-name"
                                                className="h-10 rounded-xl border-zinc-200"
                                                value={createRoleForm.data.name}
                                                onChange={(event) => createRoleForm.setData('name', event.target.value)}
                                                placeholder="Executive"
                                            />
                                            <InputError message={createRoleForm.errors.name} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="role-description">Access Profile</Label>
                                            <Input
                                                id="role-description"
                                                className="h-10 rounded-xl border-zinc-200"
                                                value={createRoleForm.data.description}
                                                onChange={(event) =>
                                                    createRoleForm.setData('description', event.target.value)
                                                }
                                                placeholder="Full infra access"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Inherited Protocol Slugs</Label>
                                        <div className="grid gap-2 max-h-[220px] overflow-y-auto rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 ring-1 ring-zinc-100">
                                            {permissions.map((permission) => (
                                                <label
                                                    key={permission.id}
                                                    className="flex items-center justify-between group cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                            checked={createRoleForm.data.permission_slugs.includes(permission.slug)}
                                                            onChange={() =>
                                                                createRoleForm.setData(
                                                                    'permission_slugs',
                                                                    toggleString(
                                                                        createRoleForm.data.permission_slugs,
                                                                        permission.slug,
                                                                    ),
                                                                )
                                                            }
                                                        />
                                                        <div>
                                                            <p className="text-xs font-black text-[#212121] group-hover:text-[#F57C00] transition-colors">{permission.name}</p>
                                                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">{permission.slug}</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <Button type="submit" className="h-11 w-full rounded-xl bg-[#212121] font-black hover:bg-[#F57C00]" disabled={createRoleForm.processing}>
                                        Register Tier
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Roles Inventory */}
                        <div className="space-y-3 pt-4">
                            {roles.map((role) => (
                                <Card key={role.id} className={`border-none shadow-sm ring-1 transition-all ${editingRole?.id === role.id ? 'ring-2 ring-[#212121] shadow-lg' : 'ring-zinc-200 group'}`}>
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-black text-[#212121] uppercase tracking-wide">{role.name}</p>
                                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{role.slug}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 rounded-lg text-[#F57C00] font-black uppercase text-[10px] hover:bg-[#F57C00]/10"
                                                onClick={() => startEditRole(role)}
                                            >
                                                Adjust
                                            </Button>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {role.permission_slugs.map((slug) => (
                                                <Badge key={slug} className="rounded-md border-none bg-zinc-100 px-2 py-0.5 text-[9px] font-black uppercase text-zinc-500">
                                                    {slug}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 📌 Identity Management */}
                    <div className="space-y-4">
                        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <UserCog className="size-4 text-[#F57C00]" />
                            Identity Console
                        </h2>

                        <Card className="border-none shadow-md ring-1 ring-zinc-200">
                            <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9E9E9E]">Provision new operator</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form className="space-y-4" onSubmit={submitCreateUser}>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="user-name">Legal Name</Label>
                                            <Input
                                                id="user-name"
                                                className="h-10 rounded-xl border-zinc-200"
                                                value={createUserForm.data.name}
                                                onChange={(event) =>
                                                    createUserForm.setData('name', event.target.value)
                                                }
                                            />
                                            <InputError message={createUserForm.errors.name} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="user-email">Comms Channel (Email)</Label>
                                            <Input
                                                id="user-email"
                                                className="h-10 rounded-xl border-zinc-200"
                                                value={createUserForm.data.email}
                                                onChange={(event) =>
                                                    createUserForm.setData('email', event.target.value)
                                                }
                                            />
                                            <InputError message={createUserForm.errors.email} />
                                        </div>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="user-password">Secure Secret</Label>
                                            <Input
                                                id="user-password"
                                                type="password"
                                                className="h-10 rounded-xl border-zinc-200"
                                                value={createUserForm.data.password}
                                                onChange={(event) =>
                                                    createUserForm.setData('password', event.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="user-password-confirmation">Verify Secret</Label>
                                            <Input
                                                id="user-password-confirmation"
                                                type="password"
                                                className="h-10 rounded-xl border-zinc-200"
                                                value={createUserForm.data.password_confirmation}
                                                onChange={(event) =>
                                                    createUserForm.setData('password_confirmation', event.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Tier Assignments</Label>
                                            <div className="grid gap-2 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 ring-1 ring-zinc-100">
                                                {roles.map((role) => (
                                                    <label key={role.id} className="flex items-center gap-3 group cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                            checked={createUserForm.data.role_slugs.includes(role.slug)}
                                                            onChange={() =>
                                                                createUserForm.setData(
                                                                    'role_slugs',
                                                                    toggleString(createUserForm.data.role_slugs, role.slug),
                                                                )
                                                            }
                                                        />
                                                        <span className="text-xs font-black text-zinc-600 transition-colors group-hover:text-[#212121]">{role.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Branch Sovereignty</Label>
                                            <div className="grid gap-2 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 ring-1 ring-zinc-100">
                                                {pickupLocations.map((location) => (
                                                    <label key={location.id} className="flex items-center gap-3 group cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                            checked={createUserForm.data.pickup_location_ids.includes(location.id)}
                                                            onChange={() =>
                                                                createUserForm.setData(
                                                                    'pickup_location_ids',
                                                                    toggleNumber(
                                                                        createUserForm.data.pickup_location_ids,
                                                                        location.id,
                                                                    ),
                                                                )
                                                            }
                                                        />
                                                        <span className="text-xs font-black text-zinc-600 transition-colors group-hover:text-[#212121]">{location.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <Button type="submit" className="h-11 w-full rounded-xl bg-[#212121] font-black hover:bg-[#F57C00]" disabled={createUserForm.processing}>
                                        Inaugurate User
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Users Inventory */}
                        <div className="space-y-3 pt-4">
                            {users.map((user) => (
                                <Card key={user.id} className={`border-none shadow-sm ring-1 transition-all ${editingUser?.id === user.id ? 'ring-2 ring-[#212121] shadow-lg' : 'ring-zinc-200 group'}`}>
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#212121] text-xs font-black text-white">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-[#212121] uppercase tracking-wide">{user.name}</p>
                                                    <p className="text-[10px] font-bold text-zinc-400">{user.email}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 rounded-lg text-[#F57C00] font-black uppercase text-[10px] hover:bg-[#F57C00]/10"
                                                onClick={() => startEditUser(user)}
                                            >
                                                Protocol
                                            </Button>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {user.role_slugs.map((slug) => (
                                                <Badge key={slug} className="rounded-full bg-[#F57C00] px-3 text-[8px] font-black uppercase tracking-widest text-white shadow-sm ring-2 ring-white">
                                                    {slug}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="mt-3 flex items-center gap-2">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Managed Branches:</span>
                                            <span className="text-[9px] font-bold text-zinc-500">{user.pickup_locations.length > 0 ? user.pickup_locations.join(', ') : 'Global Ops'}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 📌 Floating Modals for Adjustments */}
                {(editingRole || editingUser) && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 p-6 backdrop-blur-md">
                        {editingRole && (
                            <Card className="max-w-xl w-full border-none shadow-2xl ring-1 ring-zinc-800 animate-in fade-in zoom-in duration-300">
                                <CardHeader className="border-b border-zinc-100 bg-[#212121] text-white py-6">
                                    <CardTitle className="text-sm font-black uppercase tracking-widest">Ajust Proto-Tier: {editingRole.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-8 space-y-6">
                                    <form className="space-y-6" onSubmit={submitEditRole}>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="grid gap-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Protocol Label</Label>
                                                <Input
                                                    className="h-11 rounded-xl"
                                                    value={editRoleForm.data.name}
                                                    onChange={(event) => editRoleForm.setData('name', event.target.value)}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Protocol Description</Label>
                                                <Input
                                                    className="h-11 rounded-xl"
                                                    value={editRoleForm.data.description}
                                                    onChange={(event) => editRoleForm.setData('description', event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-2 max-h-[300px] overflow-y-auto rounded-2xl border bg-zinc-50/50 p-5 ring-1 ring-zinc-100">
                                            {permissions.map((permission) => (
                                                <label key={permission.id} className="flex items-center gap-3 cursor-pointer py-1">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                        checked={editRoleForm.data.permission_slugs.includes(permission.slug)}
                                                        onChange={() =>
                                                            editRoleForm.setData(
                                                                'permission_slugs',
                                                                toggleString(editRoleForm.data.permission_slugs, permission.slug),
                                                            )
                                                        }
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black text-zinc-700">{permission.name}</span>
                                                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">{permission.slug}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            <Button type="submit" className="flex-1 h-12 rounded-xl bg-[#F57C00] font-black shadow-lg shadow-[#F57C00]/20">Commit Updates</Button>
                                            <Button type="button" variant="outline" className="h-12 rounded-xl font-bold border-zinc-200" onClick={() => setEditingRole(null)}>Abort</Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        )}

                        {editingUser && (
                            <Card className="max-w-2xl w-full border-none shadow-2xl ring-1 ring-zinc-800 animate-in fade-in zoom-in duration-300">
                                <CardHeader className="border-b border-zinc-100 bg-[#212121] text-white py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center font-black text-xl text-[#F57C00] ring-1 ring-white/20">
                                            {editingUser.name.charAt(0)}
                                        </div>
                                        <CardTitle className="text-sm font-black uppercase tracking-widest">Adjust user credentials: {editingUser.name}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-8">
                                    <form className="space-y-6" onSubmit={submitEditUser}>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="grid gap-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Operator Name</Label>
                                                <Input
                                                    className="h-11 rounded-xl"
                                                    value={editUserForm.data.name}
                                                    onChange={(event) => editUserForm.setData('name', event.target.value)}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Identity (Email)</Label>
                                                <Input
                                                    className="h-11 rounded-xl"
                                                    value={editUserForm.data.email}
                                                    onChange={(event) => editUserForm.setData('email', event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="grid gap-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Override Secret (Optional)</Label>
                                                <Input
                                                    type="password"
                                                    className="h-11 rounded-xl"
                                                    value={editUserForm.data.password}
                                                    onChange={(event) => editUserForm.setData('password', event.target.value)}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Verify Secret</Label>
                                                <Input
                                                    type="password"
                                                    className="h-11 rounded-xl"
                                                    value={editUserForm.data.password_confirmation}
                                                    onChange={(event) => editUserForm.setData('password_confirmation', event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Tier Assignment</Label>
                                                <div className="grid gap-2 rounded-2xl border bg-zinc-50/50 p-4 ring-1 ring-zinc-100">
                                                    {roles.map((role) => (
                                                        <label key={role.id} className="flex items-center gap-3 cursor-pointer py-1">
                                                            <input
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                                checked={editUserForm.data.role_slugs.includes(role.slug)}
                                                                onChange={() =>
                                                                    editUserForm.setData(
                                                                        'role_slugs',
                                                                        toggleString(editUserForm.data.role_slugs, role.slug),
                                                                    )
                                                                }
                                                            />
                                                            <span className="text-xs font-black text-zinc-700">{role.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Sovereign Control</Label>
                                                <div className="grid gap-2 rounded-2xl border bg-zinc-50/50 p-4 ring-1 ring-zinc-100">
                                                    {pickupLocations.map((location) => (
                                                        <label key={location.id} className="flex items-center gap-3 cursor-pointer py-1">
                                                            <input
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                                checked={editUserForm.data.pickup_location_ids.includes(location.id)}
                                                                onChange={() =>
                                                                    editUserForm.setData(
                                                                        'pickup_location_ids',
                                                                        toggleNumber(
                                                                            editUserForm.data.pickup_location_ids,
                                                                            location.id,
                                                                        ),
                                                                    )
                                                                }
                                                            />
                                                            <span className="text-xs font-black text-zinc-700">{location.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Button type="submit" className="flex-1 h-12 rounded-xl bg-[#212121] font-black text-white hover:bg-[#F57C00]">Sync Profile</Button>
                                            <Button type="button" variant="outline" className="h-12 rounded-xl font-bold border-zinc-200" onClick={() => setEditingUser(null)}>Abort</Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
