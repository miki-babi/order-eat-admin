import { Head, useForm } from '@inertiajs/react';
import { CheckCircle2, ClipboardCheck, Copy, QrCode, Scan, ShieldCheck, Store, Table2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type TableRow = {
    id: number;
    name: string;
    qr_code: string;
    qr_url: string;
    pickup_location_id: number;
    pickup_location_name: string | null;
    is_active: boolean;
    orders_count: number;
    sessions_count: number;
    verified_sessions_count: number;
    updated_at: string | null;
};

type SessionRow = {
    id: number;
    session_token: string;
    session_token_short: string;
    table_id: number;
    table_name: string | null;
    table_qr_code: string | null;
    pickup_location_name: string | null;
    started_at: string | null;
    last_seen_at: string | null;
    verified_at: string | null;
    verified_by: string | null;
    verified_note: string | null;
    is_verified: boolean;
    initial_ip: string | null;
};

type PickupLocation = {
    id: number;
    name: string;
};

type Summary = {
    total_tables: number;
    active_tables: number;
    unverified_sessions: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Table QR',
        href: '/staff/table-qr',
    },
];

export default function TableQr({
    tables,
    sessions,
    pickupLocations,
    summary,
}: {
    tables: TableRow[];
    sessions: SessionRow[];
    pickupLocations: PickupLocation[];
    summary: Summary;
}) {
    const [editing, setEditing] = useState<TableRow | null>(null);
    const [verifyingSession, setVerifyingSession] = useState<SessionRow | null>(null);
    const [copiedTableId, setCopiedTableId] = useState<number | null>(null);

    const createForm = useForm({
        pickup_location_id: pickupLocations[0]?.id ?? '',
        name: '',
        qr_code: '',
        is_active: true,
    });

    const editForm = useForm({
        _method: 'put',
        pickup_location_id: '',
        name: '',
        qr_code: '',
        is_active: true,
    });

    const verifyForm = useForm({
        verified_note: '',
    });

    const createTable = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createForm.post('/staff/table-qr', {
            preserveScroll: true,
            onSuccess: () => {
                createForm.reset();
                createForm.setData('pickup_location_id', pickupLocations[0]?.id ?? '');
                createForm.setData('is_active', true);
            },
        });
    };

    const startEdit = (table: TableRow) => {
        setEditing(table);
        editForm.setData({
            _method: 'put',
            pickup_location_id: String(table.pickup_location_id),
            name: table.name,
            qr_code: table.qr_code,
            is_active: table.is_active,
        });
    };

    const updateTable = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editing) {
            return;
        }

        editForm.post(`/staff/table-qr/${editing.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditing(null);
            },
        });
    };

    const startVerifySession = (session: SessionRow) => {
        setVerifyingSession(session);
        verifyForm.setData('verified_note', session.verified_note ?? '');
    };

    const verifySession = () => {
        if (!verifyingSession) {
            return;
        }

        verifyForm.patch(`/staff/table-sessions/${verifyingSession.id}/verify`, {
            preserveScroll: true,
            onSuccess: () => {
                setVerifyingSession(null);
                verifyForm.reset();
            },
        });
    };

    const copyQrUrl = async (table: TableRow) => {
        try {
            await navigator.clipboard.writeText(table.qr_url);
            setCopiedTableId(table.id);
            window.setTimeout(() => {
                setCopiedTableId((current) => (current === table.id ? null : current));
            }, 1800);
        } catch {
            window.prompt('Copy this QR URL:', table.qr_url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Table QR" />
            <div className="space-y-8 bg-zinc-50/50 p-6 min-h-screen">
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Total Tables</p>
                                    <h3 className="mt-2 text-3xl font-black text-zinc-900">{summary.total_tables}</h3>
                                </div>
                                <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-500">
                                    <Table2 className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-emerald-500">Active Tables</p>
                                    <h3 className="mt-2 text-3xl font-black text-zinc-900">{summary.active_tables}</h3>
                                </div>
                                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-500">
                                    <Store className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-amber-500">Unverified Sessions</p>
                                    <h3 className="mt-2 text-3xl font-black text-zinc-900">{summary.unverified_sessions}</h3>
                                </div>
                                <div className="rounded-2xl bg-amber-50 p-3 text-amber-500">
                                    <Scan className="size-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="border-none shadow-md ring-1 ring-zinc-200">
                        <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                                <QrCode className="size-4 text-[#F57C00]" />
                                Assign Table QR
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form className="grid gap-4" onSubmit={createTable}>
                                <div className="grid gap-2">
                                    <Label htmlFor="create-pickup-location" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Branch</Label>
                                    <select
                                        id="create-pickup-location"
                                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20"
                                        value={createForm.data.pickup_location_id}
                                        onChange={(event) => createForm.setData('pickup_location_id', Number(event.target.value) || '')}
                                    >
                                        <option value="">Select branch</option>
                                        {pickupLocations.map((location) => (
                                            <option key={location.id} value={location.id}>{location.name}</option>
                                        ))}
                                    </select>
                                    <InputError message={createForm.errors.pickup_location_id} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="create-name" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Table Name</Label>
                                    <Input
                                        id="create-name"
                                        className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                        value={createForm.data.name}
                                        onChange={(event) => createForm.setData('name', event.target.value)}
                                        placeholder="Table 1"
                                    />
                                    <InputError message={createForm.errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="create-qr-code" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">QR Code Slug</Label>
                                    <Input
                                        id="create-qr-code"
                                        className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                        value={createForm.data.qr_code}
                                        onChange={(event) => createForm.setData('qr_code', event.target.value)}
                                        placeholder="bole-table-01"
                                    />
                                    <InputError message={createForm.errors.qr_code} />
                                </div>
                                <label className="flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-3 ring-1 ring-zinc-200">
                                    <input
                                        type="checkbox"
                                        checked={createForm.data.is_active}
                                        onChange={(event) => createForm.setData('is_active', event.target.checked)}
                                    />
                                    <span className="text-sm font-bold text-zinc-700">Active table</span>
                                </label>
                                <Button type="submit" className="h-11 rounded-xl bg-[#F57C00] font-black hover:bg-[#E65100]" disabled={createForm.processing}>
                                    {createForm.processing ? 'Saving...' : 'Create Table QR'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {editing ? (
                        <Card className="border-none shadow-md ring-1 ring-zinc-200">
                            <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                                <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-900">
                                    <ClipboardCheck className="size-4 text-[#F57C00]" />
                                    Edit Table: {editing.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form className="grid gap-4" onSubmit={updateTable}>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-pickup-location" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Branch</Label>
                                        <select
                                            id="edit-pickup-location"
                                            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20"
                                            value={editForm.data.pickup_location_id}
                                            onChange={(event) => editForm.setData('pickup_location_id', event.target.value)}
                                        >
                                            <option value="">Select branch</option>
                                            {pickupLocations.map((location) => (
                                                <option key={location.id} value={location.id}>{location.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={editForm.errors.pickup_location_id} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-name" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Table Name</Label>
                                        <Input
                                            id="edit-name"
                                            className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                            value={editForm.data.name}
                                            onChange={(event) => editForm.setData('name', event.target.value)}
                                        />
                                        <InputError message={editForm.errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-qr-code" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">QR Code Slug</Label>
                                        <Input
                                            id="edit-qr-code"
                                            className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                            value={editForm.data.qr_code}
                                            onChange={(event) => editForm.setData('qr_code', event.target.value)}
                                        />
                                        <InputError message={editForm.errors.qr_code} />
                                    </div>
                                    <label className="flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-3 ring-1 ring-zinc-200">
                                        <input
                                            type="checkbox"
                                            checked={editForm.data.is_active}
                                            onChange={(event) => editForm.setData('is_active', event.target.checked)}
                                        />
                                        <span className="text-sm font-bold text-zinc-700">Active table</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Button type="button" variant="outline" className="h-11 rounded-xl" onClick={() => setEditing(null)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="h-11 rounded-xl bg-[#F57C00] font-black hover:bg-[#E65100]" disabled={editForm.processing}>
                                            {editForm.processing ? 'Updating...' : 'Update Table QR'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    ) : null}
                </div>

                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-900">Assigned Tables</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {tables.length === 0 ? (
                            <p className="py-8 text-center text-sm font-bold text-zinc-500">No tables assigned yet.</p>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {tables.map((table) => (
                                    <Card key={table.id} className="border-none shadow-sm ring-1 ring-zinc-200">
                                        <CardContent className="p-5 space-y-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h4 className="text-lg font-black text-zinc-900">{table.name}</h4>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">{table.pickup_location_name}</p>
                                                </div>
                                                <Badge className={table.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'}>
                                                    {table.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </div>
                                            <div className="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">QR Slug</p>
                                                <p className="mt-1 font-mono text-sm font-bold text-zinc-800">{table.qr_code}</p>
                                            </div>
                                            <div className="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Print URL</p>
                                                <p className="mt-1 truncate text-xs font-bold text-zinc-700">{table.qr_url}</p>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                <div className="rounded-lg bg-zinc-50 px-2 py-2 ring-1 ring-zinc-100">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Orders</p>
                                                    <p className="text-sm font-black text-zinc-800">{table.orders_count}</p>
                                                </div>
                                                <div className="rounded-lg bg-zinc-50 px-2 py-2 ring-1 ring-zinc-100">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Sessions</p>
                                                    <p className="text-sm font-black text-zinc-800">{table.sessions_count}</p>
                                                </div>
                                                <div className="rounded-lg bg-zinc-50 px-2 py-2 ring-1 ring-zinc-100">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Verified</p>
                                                    <p className="text-sm font-black text-zinc-800">{table.verified_sessions_count}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button type="button" size="sm" className="h-9 rounded-xl bg-[#F57C00] hover:bg-[#E65100]" onClick={() => startEdit(table)}>
                                                    Edit
                                                </Button>
                                                <Button type="button" size="sm" variant="outline" className="h-9 rounded-xl" onClick={() => copyQrUrl(table)}>
                                                    <Copy className="mr-1 size-3" />
                                                    {copiedTableId === table.id ? 'Copied' : 'Copy URL'}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-900">Recent QR Sessions</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {sessions.length === 0 ? (
                            <p className="py-8 text-center text-sm font-bold text-zinc-500">No QR sessions yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {sessions.map((session) => (
                                    <div key={session.id} className="rounded-xl bg-white p-4 ring-1 ring-zinc-200">
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <p className="text-sm font-black text-zinc-900">
                                                    {session.table_name ?? 'Unknown Table'}
                                                    <span className="ml-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                                        {session.pickup_location_name}
                                                    </span>
                                                </p>
                                                <p className="mt-1 text-xs font-bold text-zinc-500">
                                                    Session: <span className="font-mono text-zinc-700">{session.session_token_short}...</span>
                                                    {session.initial_ip ? ` • IP ${session.initial_ip}` : ''}
                                                </p>
                                                <p className="mt-1 text-xs font-medium text-zinc-500">
                                                    Started: {session.started_at ?? '-'} • Last Seen: {session.last_seen_at ?? '-'}
                                                </p>
                                                {session.verified_note ? (
                                                    <p className="mt-1 text-xs font-medium text-zinc-600">Note: {session.verified_note}</p>
                                                ) : null}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {session.is_verified ? (
                                                    <Badge className="bg-emerald-100 text-emerald-700">
                                                        <CheckCircle2 className="mr-1 size-3" />
                                                        Verified {session.verified_by ? `by ${session.verified_by}` : ''}
                                                    </Badge>
                                                ) : (
                                                    <>
                                                        <Badge className="bg-amber-100 text-amber-700">Unverified</Badge>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            className="h-8 rounded-lg bg-[#212121] text-white hover:bg-black"
                                                            onClick={() => startVerifySession(session)}
                                                        >
                                                            <ShieldCheck className="mr-1 size-3" />
                                                            Verify
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Dialog
                open={verifyingSession !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setVerifyingSession(null);
                        verifyForm.reset();
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Verify Table Session</DialogTitle>
                        <DialogDescription>
                            {verifyingSession
                                ? `Confirm this QR session belongs to ${verifyingSession.table_name}.`
                                : 'Confirm session verification.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="verified-note">Verification Note (optional)</Label>
                        <textarea
                            id="verified-note"
                            className="border-input min-h-24 w-full rounded-md border px-3 py-2 text-sm"
                            value={verifyForm.data.verified_note}
                            onChange={(event) => verifyForm.setData('verified_note', event.target.value)}
                            placeholder="e.g. Confirmed with waiter at the table."
                        />
                        <InputError message={verifyForm.errors.verified_note} />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setVerifyingSession(null)}>
                            Cancel
                        </Button>
                        <Button type="button" onClick={verifySession} disabled={verifyForm.processing}>
                            {verifyForm.processing ? 'Verifying...' : 'Verify Session'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
