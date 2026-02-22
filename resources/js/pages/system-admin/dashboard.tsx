import { Head, router, usePage } from '@inertiajs/react';
import { Activity, Clock3, ExternalLink, Lock, ShieldCheck, Smartphone, Unlock } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
type FeatureRow = {
    id: number;
    feature_key: string;
    group_key: string;
    name: string;
    description: string | null;
    is_enabled: boolean;
    lock_message: string | null;
    help_url: string | null;
    last_toggled_at: string | null;
    last_toggled_by: {
        id: number;
        name: string;
        email: string;
    } | null;
};

type FeatureGroup = {
    key: string;
    name: string;
    description: string;
    features: FeatureRow[];
};

type ActivityRow = {
    type: string;
    title: string;
    description: string;
    occurred_at: string;
};

type Summary = {
    orders_last_24h: number;
    customers_last_24h: number;
    sms_last_24h: number;
    table_sessions_last_24h: number;
};

type SharedProps = {
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'System Admin',
        href: '/__system-admin/dashboard',
    },
];

export default function SystemAdminDashboard({
    featureGroups,
    summary,
    activity,
    logLines,
}: {
    featureGroups: FeatureGroup[];
    summary: Summary;
    activity: ActivityRow[];
    logLines: string[];
}) {
    const { flash } = usePage<SharedProps>().props;
    const [updatingFeatureId, setUpdatingFeatureId] = useState<number | null>(null);
    const [draftMessages, setDraftMessages] = useState<Record<number, string>>({});
    const [draftHelpUrls, setDraftHelpUrls] = useState<Record<number, string>>({});

    const draftMessageFor = (feature: FeatureRow): string => draftMessages[feature.id] ?? feature.lock_message ?? '';

    const draftHelpUrlFor = (feature: FeatureRow): string => draftHelpUrls[feature.id] ?? feature.help_url ?? '';

    const submitFeatureUpdate = (feature: FeatureRow, isEnabled: boolean): void => {
        setUpdatingFeatureId(feature.id);

        router.put(
            `/__system-admin/features/${feature.id}`,
            {
                is_enabled: isEnabled,
                lock_message: draftMessageFor(feature),
                help_url: draftHelpUrlFor(feature),
            },
            {
                preserveScroll: true,
                onFinish: () => {
                    setUpdatingFeatureId((current) => (current === feature.id ? null : current));
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Admin Dashboard" />
            <div className="min-h-screen space-y-8 bg-zinc-50/40 p-6">
                <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">Hidden Control Plane</p>
                    <h1 className="mt-2 text-2xl font-black tracking-tight text-[#212121]">System Admin Dashboard</h1>
                    <p className="mt-2 text-sm text-zinc-600">
                        Lock or unlock granular features by group, inspect recent runtime activity, and review logs.
                    </p>
                </div>

                {(flash?.success || flash?.error) && (
                    <div className="space-y-2">
                        {flash?.success && (
                            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                                {flash.success}
                            </div>
                        )}
                        {flash?.error && (
                            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                                {flash.error}
                            </div>
                        )}
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Orders 24h</p>
                            <p className="mt-1 text-2xl font-black text-[#212121]">{summary.orders_last_24h}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Customers 24h</p>
                            <p className="mt-1 text-2xl font-black text-[#212121]">{summary.customers_last_24h}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">SMS 24h</p>
                            <p className="mt-1 text-2xl font-black text-[#212121]">{summary.sms_last_24h}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Table Sessions 24h</p>
                            <p className="mt-1 text-2xl font-black text-[#212121]">{summary.table_sessions_last_24h}</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/60">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <ShieldCheck className="size-4 text-[#F57C00]" />
                            Feature Locks
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-7 pt-6">
                        {featureGroups.map((group) => (
                            <section key={group.key} className="space-y-4 rounded-2xl border border-zinc-200 bg-white/80 p-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Major Feature</p>
                                    <h3 className="mt-1 text-lg font-black text-[#212121]">{group.name}</h3>
                                    {group.description && (
                                        <p className="mt-1 text-sm text-zinc-600">{group.description}</p>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {group.features.map((feature) => {
                                        const isUpdating = updatingFeatureId === feature.id;
                                        const isEnabled = feature.is_enabled;

                                        return (
                                            <div
                                                key={feature.id}
                                                className={`rounded-2xl border p-4 shadow-sm transition-all ${isEnabled
                                                    ? 'border-emerald-100 bg-emerald-50/40'
                                                    : 'border-amber-200 bg-amber-50/70'
                                                    }`}
                                            >
                                                <div className="flex flex-wrap items-start justify-between gap-3">
                                                    <div>
                                                        <p className="text-[11px] font-black uppercase tracking-widest text-zinc-500">
                                                            {feature.feature_key}
                                                        </p>
                                                        <h4 className="mt-1 text-base font-black text-[#212121]">{feature.name}</h4>
                                                        {feature.description && (
                                                            <p className="mt-1 text-sm text-zinc-600">{feature.description}</p>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="h-9 rounded-lg px-4 text-[10px] font-black uppercase tracking-widest"
                                                            disabled={isUpdating}
                                                            onClick={() => submitFeatureUpdate(feature, !isEnabled)}
                                                        >
                                                            {isEnabled ? (
                                                                <>
                                                                    <Lock className="mr-1 size-3.5" />
                                                                    Lock
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Unlock className="mr-1 size-3.5" />
                                                                    Unlock
                                                                </>
                                                            )}
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            className="h-9 rounded-lg bg-[#212121] px-4 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#F57C00]"
                                                            disabled={isUpdating}
                                                            onClick={() => submitFeatureUpdate(feature, isEnabled)}
                                                        >
                                                            Save Settings
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="mt-4 grid gap-3">
                                                    <Input
                                                        value={draftMessageFor(feature)}
                                                        onChange={(event) => {
                                                            const value = event.target.value;
                                                            setDraftMessages((current) => ({
                                                                ...current,
                                                                [feature.id]: value,
                                                            }));
                                                        }}
                                                        placeholder="This feature is locked. Contact us to unlock."
                                                        className="h-10 rounded-xl border-zinc-200"
                                                    />

                                                    <Input
                                                        value={draftHelpUrlFor(feature)}
                                                        onChange={(event) => {
                                                            const value = event.target.value;
                                                            setDraftHelpUrls((current) => ({
                                                                ...current,
                                                                [feature.id]: value,
                                                            }));
                                                        }}
                                                        placeholder="https://youtube.com/... (What does this feature do?)"
                                                        className="h-10 rounded-xl border-zinc-200"
                                                    />

                                                    {draftHelpUrlFor(feature).trim() !== '' && (
                                                        <a
                                                            href={draftHelpUrlFor(feature)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex w-fit items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#F57C00] underline"
                                                        >
                                                            Preview "What does this feature do?" link
                                                            <ExternalLink className="size-3" />
                                                        </a>
                                                    )}

                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                                            {isEnabled ? (
                                                                <>
                                                                    <ShieldCheck className="size-3.5 text-emerald-600" />
                                                                    Enabled
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Lock className="size-3.5 text-amber-700" />
                                                                    Locked
                                                                </>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                                            Last changed: {feature.last_toggled_at ?? 'Never'}
                                                            {feature.last_toggled_by ? ` by ${feature.last_toggled_by.name}` : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </CardContent>
                </Card>

                <div className="grid gap-6 xl:grid-cols-2">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardHeader className="border-b border-zinc-100 bg-zinc-50/60">
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                                <Activity className="size-4 text-[#F57C00]" />
                                App Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="max-h-[520px] space-y-3 overflow-y-auto pt-6">
                            {activity.length === 0 && (
                                <p className="text-sm font-bold text-zinc-500">No recent activity recorded.</p>
                            )}
                            {activity.map((event, index) => (
                                <div key={`${event.type}-${event.occurred_at}-${index}`} className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-xs font-black uppercase tracking-wider text-[#212121]">{event.title}</p>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[9px] font-black uppercase tracking-widest text-zinc-500 ring-1 ring-zinc-200">
                                            <Clock3 className="size-3" />
                                            {event.occurred_at}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm text-zinc-600">{event.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardHeader className="border-b border-zinc-100 bg-zinc-50/60">
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                                <Smartphone className="size-4 text-[#F57C00]" />
                                Application Logs
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="max-h-[520px] overflow-auto rounded-xl border border-zinc-200 bg-[#151515] p-4 font-mono text-[11px] leading-relaxed text-zinc-100">
                                {logLines.length === 0 ? (
                                    <p className="text-zinc-400">No log lines available.</p>
                                ) : (
                                    logLines.map((line, index) => (
                                        <p key={`${index}-${line.slice(0, 24)}`} className="whitespace-pre-wrap break-words">
                                            {line}
                                        </p>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
