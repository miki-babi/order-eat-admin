import { Head, useForm } from '@inertiajs/react';
import { KeyRound, Shield, UserCog, Users } from 'lucide-react';
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
        title: 'Access Control',
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
            <Head title="Access Control" />
            <div className="space-y-5 p-4">
                <div className="grid gap-3 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Users</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.total_users}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Roles</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.total_roles}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Permissions</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.total_permissions}</CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <KeyRound className="size-4" />
                            Create Permission
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-3 md:grid-cols-4" onSubmit={submitPermission}>
                            <div className="grid gap-2">
                                <Label htmlFor="permission-name">Name</Label>
                                <Input
                                    id="permission-name"
                                    value={permissionForm.data.name}
                                    onChange={(event) => permissionForm.setData('name', event.target.value)}
                                />
                                <InputError message={permissionForm.errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="permission-slug">Slug (optional)</Label>
                                <Input
                                    id="permission-slug"
                                    value={permissionForm.data.slug}
                                    onChange={(event) => permissionForm.setData('slug', event.target.value)}
                                    placeholder="customers_sms"
                                />
                                <InputError message={permissionForm.errors.slug} />
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="permission-description">Description</Label>
                                <Input
                                    id="permission-description"
                                    value={permissionForm.data.description}
                                    onChange={(event) =>
                                        permissionForm.setData('description', event.target.value)
                                    }
                                />
                                <InputError message={permissionForm.errors.description} />
                            </div>
                            <div className="md:col-span-4">
                                <Button type="submit" disabled={permissionForm.processing}>
                                    Add Permission
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Shield className="size-4" />
                                Create Role
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-3" onSubmit={submitCreateRole}>
                                <div className="grid gap-2">
                                    <Label htmlFor="role-name">Role Name</Label>
                                    <Input
                                        id="role-name"
                                        value={createRoleForm.data.name}
                                        onChange={(event) => createRoleForm.setData('name', event.target.value)}
                                        placeholder="Promo Staff"
                                    />
                                    <InputError message={createRoleForm.errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="role-description">Description</Label>
                                    <Input
                                        id="role-description"
                                        value={createRoleForm.data.description}
                                        onChange={(event) =>
                                            createRoleForm.setData('description', event.target.value)
                                        }
                                    />
                                    <InputError message={createRoleForm.errors.description} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Permissions</Label>
                                    <div className="grid gap-2 rounded-md border p-3">
                                        {permissions.map((permission) => (
                                            <label
                                                key={permission.id}
                                                className="flex items-start gap-2 text-sm"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={createRoleForm.data.permission_slugs.includes(
                                                        permission.slug,
                                                    )}
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
                                                <span>
                                                    <span className="font-medium">{permission.name}</span>{' '}
                                                    <span className="text-zinc-500">({permission.slug})</span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={createRoleForm.errors.permission_slugs} />
                                </div>
                                <Button type="submit" disabled={createRoleForm.processing}>
                                    Create Role
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Roles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    type="button"
                                    className={`w-full rounded-md border p-3 text-left ${
                                        editingRole?.id === role.id ? 'border-zinc-900 bg-zinc-50' : ''
                                    }`}
                                    onClick={() => startEditRole(role)}
                                >
                                    <p className="font-medium">{role.name}</p>
                                    <p className="text-xs text-zinc-500">{role.slug}</p>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {role.permission_slugs.map((slug) => (
                                            <Badge key={slug} variant="outline">
                                                {slug}
                                            </Badge>
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {editingRole ? (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Edit Role: {editingRole.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-3" onSubmit={submitEditRole}>
                                <div className="grid gap-2 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-role-name">Role Name</Label>
                                        <Input
                                            id="edit-role-name"
                                            value={editRoleForm.data.name}
                                            onChange={(event) =>
                                                editRoleForm.setData('name', event.target.value)
                                            }
                                        />
                                        <InputError message={editRoleForm.errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-role-description">Description</Label>
                                        <Input
                                            id="edit-role-description"
                                            value={editRoleForm.data.description}
                                            onChange={(event) =>
                                                editRoleForm.setData('description', event.target.value)
                                            }
                                        />
                                        <InputError message={editRoleForm.errors.description} />
                                    </div>
                                </div>
                                <div className="grid gap-2 rounded-md border p-3">
                                    {permissions.map((permission) => (
                                        <label key={permission.id} className="flex items-start gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={editRoleForm.data.permission_slugs.includes(permission.slug)}
                                                onChange={() =>
                                                    editRoleForm.setData(
                                                        'permission_slugs',
                                                        toggleString(
                                                            editRoleForm.data.permission_slugs,
                                                            permission.slug,
                                                        ),
                                                    )
                                                }
                                            />
                                            <span>
                                                <span className="font-medium">{permission.name}</span>{' '}
                                                <span className="text-zinc-500">({permission.slug})</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Button type="submit" disabled={editRoleForm.processing}>
                                        Save Role
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setEditingRole(null)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                ) : null}

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <UserCog className="size-4" />
                                Create User
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-3" onSubmit={submitCreateUser}>
                                <div className="grid gap-3 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="user-name">Name</Label>
                                        <Input
                                            id="user-name"
                                            value={createUserForm.data.name}
                                            onChange={(event) =>
                                                createUserForm.setData('name', event.target.value)
                                            }
                                        />
                                        <InputError message={createUserForm.errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="user-email">Email</Label>
                                        <Input
                                            id="user-email"
                                            type="email"
                                            value={createUserForm.data.email}
                                            onChange={(event) =>
                                                createUserForm.setData('email', event.target.value)
                                            }
                                        />
                                        <InputError message={createUserForm.errors.email} />
                                    </div>
                                </div>
                                <div className="grid gap-3 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="user-password">Password</Label>
                                        <Input
                                            id="user-password"
                                            type="password"
                                            value={createUserForm.data.password}
                                            onChange={(event) =>
                                                createUserForm.setData('password', event.target.value)
                                            }
                                        />
                                        <InputError message={createUserForm.errors.password} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="user-password-confirmation">Confirm Password</Label>
                                        <Input
                                            id="user-password-confirmation"
                                            type="password"
                                            value={createUserForm.data.password_confirmation}
                                            onChange={(event) =>
                                                createUserForm.setData('password_confirmation', event.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Roles</Label>
                                    <div className="grid gap-2 rounded-md border p-3">
                                        {roles.map((role) => (
                                            <label key={role.id} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={createUserForm.data.role_slugs.includes(role.slug)}
                                                    onChange={() =>
                                                        createUserForm.setData(
                                                            'role_slugs',
                                                            toggleString(createUserForm.data.role_slugs, role.slug),
                                                        )
                                                    }
                                                />
                                                <span>
                                                    {role.name}{' '}
                                                    <span className="text-zinc-500">({role.slug})</span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={createUserForm.errors.role_slugs} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Branch Assignment</Label>
                                    <div className="grid gap-2 rounded-md border p-3">
                                        {pickupLocations.map((location) => (
                                            <label key={location.id} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={createUserForm.data.pickup_location_ids.includes(
                                                        location.id,
                                                    )}
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
                                                <span>{location.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={createUserForm.errors.pickup_location_ids} />
                                </div>
                                <Button type="submit" disabled={createUserForm.processing}>
                                    Create User
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Users className="size-4" />
                                Users
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {users.map((user) => (
                                <button
                                    key={user.id}
                                    type="button"
                                    className={`w-full rounded-md border p-3 text-left ${
                                        editingUser?.id === user.id ? 'border-zinc-900 bg-zinc-50' : ''
                                    }`}
                                    onClick={() => startEditUser(user)}
                                >
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-xs text-zinc-500">{user.email}</p>
                                    <p className="text-xs text-zinc-500">Primary Role: {user.role}</p>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {user.role_slugs.map((slug) => (
                                            <Badge key={slug} variant="outline">
                                                {slug}
                                            </Badge>
                                        ))}
                                    </div>
                                    <p className="mt-1 text-xs text-zinc-500">
                                        Branches:{' '}
                                        {user.pickup_locations.length > 0
                                            ? user.pickup_locations.join(', ')
                                            : 'None'}
                                    </p>
                                </button>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {editingUser ? (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Edit User: {editingUser.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-3" onSubmit={submitEditUser}>
                                <div className="grid gap-3 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-user-name">Name</Label>
                                        <Input
                                            id="edit-user-name"
                                            value={editUserForm.data.name}
                                            onChange={(event) =>
                                                editUserForm.setData('name', event.target.value)
                                            }
                                        />
                                        <InputError message={editUserForm.errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-user-email">Email</Label>
                                        <Input
                                            id="edit-user-email"
                                            type="email"
                                            value={editUserForm.data.email}
                                            onChange={(event) =>
                                                editUserForm.setData('email', event.target.value)
                                            }
                                        />
                                        <InputError message={editUserForm.errors.email} />
                                    </div>
                                </div>
                                <div className="grid gap-3 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-user-password">New Password (optional)</Label>
                                        <Input
                                            id="edit-user-password"
                                            type="password"
                                            value={editUserForm.data.password}
                                            onChange={(event) =>
                                                editUserForm.setData('password', event.target.value)
                                            }
                                        />
                                        <InputError message={editUserForm.errors.password} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-user-password-confirmation">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="edit-user-password-confirmation"
                                            type="password"
                                            value={editUserForm.data.password_confirmation}
                                            onChange={(event) =>
                                                editUserForm.setData(
                                                    'password_confirmation',
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Roles</Label>
                                    <div className="grid gap-2 rounded-md border p-3">
                                        {roles.map((role) => (
                                            <label key={role.id} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={editUserForm.data.role_slugs.includes(role.slug)}
                                                    onChange={() =>
                                                        editUserForm.setData(
                                                            'role_slugs',
                                                            toggleString(editUserForm.data.role_slugs, role.slug),
                                                        )
                                                    }
                                                />
                                                <span>
                                                    {role.name}{' '}
                                                    <span className="text-zinc-500">({role.slug})</span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={editUserForm.errors.role_slugs} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Branch Assignment</Label>
                                    <div className="grid gap-2 rounded-md border p-3">
                                        {pickupLocations.map((location) => (
                                            <label key={location.id} className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={editUserForm.data.pickup_location_ids.includes(
                                                        location.id,
                                                    )}
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
                                                <span>{location.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={editUserForm.errors.pickup_location_ids} />
                                </div>
                                <div className="flex gap-2">
                                    <Button type="submit" disabled={editUserForm.processing}>
                                        Save User
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setEditingUser(null)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                ) : null}
            </div>
        </AppLayout>
    );
}

