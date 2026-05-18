import { Head, useForm, usePage } from '@inertiajs/react';
import { Activity, Bot, KeyRound, Link2, Save, ToggleLeft } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { update as updateTelegramSettings } from '@/routes/staff/telegram-settings';
import type { BreadcrumbItem } from '@/types';

type SharedProps = {
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

type TelegramSettings = {
    has_bot_token: boolean;
    bot_username: string | null;
    bot_id: string | null;
    webhook_url: string | null;
    has_webhook_secret_token: boolean;
    webhook_status: 'active' | 'inactive' | 'failed';
    webhook_last_set_at: string | null;
    webhook_last_checked_at: string | null;
    webhook_last_error: string | null;
    webhook_error_count: number;
    is_active: boolean;
    is_paused: boolean;
    maintenance_message: string | null;
    last_seen_at: string | null;
    last_webhook_event_at: string | null;
    last_successful_update_id: number | null;
    failed_update_count: number;
    updated_at: string | null;
};

type TelegramSettingsForm = {
    bot_token: string;
    bot_username: string;
    bot_id: string;
    webhook_url: string;
    webhook_secret_token: string;
    webhook_status: 'active' | 'inactive' | 'failed';
    webhook_last_set_at: string;
    webhook_last_checked_at: string;
    webhook_last_error: string;
    webhook_error_count: string;
    is_active: boolean;
    is_paused: boolean;
    maintenance_message: string;
    last_seen_at: string;
    last_webhook_event_at: string;
    last_successful_update_id: string;
    failed_update_count: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Telegram Settings',
        href: '/staff/telegram-settings',
    },
];

function dateTimeInputValue(value: string | null): string {
    if (!value) {
        return '';
    }

    return value.replace(' ', 'T').slice(0, 16);
}

function numberValue(value: number | null | undefined, fallback = ''): string {
    return value === null || value === undefined ? fallback : String(value);
}

function nullableString(value: string): string | null {
    const trimmed = value.trim();

    return trimmed === '' ? null : trimmed;
}

function Section({
    title,
    icon,
    children,
}: {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}) {
    return (
        <Card className="border-none shadow-sm ring-1 ring-zinc-200">
            <CardHeader className="border-b border-zinc-100">
                <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-800">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-5 md:grid-cols-2">{children}</CardContent>
        </Card>
    );
}

function Field({
    label,
    htmlFor,
    children,
    error,
    className = '',
}: {
    label: string;
    htmlFor: string;
    children: ReactNode;
    error?: string;
    className?: string;
}) {
    return (
        <div className={`grid gap-2 ${className}`}>
            <Label htmlFor={htmlFor}>{label}</Label>
            {children}
            <InputError message={error} />
        </div>
    );
}

function ToggleRow({
    label,
    checked,
    onCheckedChange,
    error,
}: {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    error?: string;
}) {
    return (
        <div className="grid gap-2">
            <label className="flex min-h-10 items-center gap-3 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700">
                <Checkbox checked={checked} onCheckedChange={(value) => onCheckedChange(value === true)} />
                <span>{label}</span>
            </label>
            <InputError message={error} />
        </div>
    );
}

export default function TelegramSettings({
    settings,
    canManageSettings,
}: {
    settings: TelegramSettings;
    canManageSettings: boolean;
}) {
    const { flash } = usePage<SharedProps>().props;

    const form = useForm<TelegramSettingsForm>({
        bot_token: '',
        bot_username: settings.bot_username ?? '',
        bot_id: settings.bot_id ?? '',
        webhook_url: settings.webhook_url ?? '',
        webhook_secret_token: '',
        webhook_status: settings.webhook_status ?? 'inactive',
        webhook_last_set_at: dateTimeInputValue(settings.webhook_last_set_at),
        webhook_last_checked_at: dateTimeInputValue(settings.webhook_last_checked_at),
        webhook_last_error: settings.webhook_last_error ?? '',
        webhook_error_count: numberValue(settings.webhook_error_count, '0'),
        is_active: Boolean(settings.is_active),
        is_paused: Boolean(settings.is_paused),
        maintenance_message: settings.maintenance_message ?? '',
        last_seen_at: dateTimeInputValue(settings.last_seen_at),
        last_webhook_event_at: dateTimeInputValue(settings.last_webhook_event_at),
        last_successful_update_id: numberValue(settings.last_successful_update_id),
        failed_update_count: numberValue(settings.failed_update_count, '0'),
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.transform((data) => ({
            ...data,
            bot_token: nullableString(data.bot_token),
            bot_username: nullableString(data.bot_username),
            bot_id: nullableString(data.bot_id),
            webhook_url: nullableString(data.webhook_url),
            webhook_secret_token: nullableString(data.webhook_secret_token),
            webhook_last_error: nullableString(data.webhook_last_error),
            webhook_error_count: data.webhook_error_count === '' ? '0' : data.webhook_error_count,
            maintenance_message: nullableString(data.maintenance_message),
            last_successful_update_id: data.last_successful_update_id === '' ? null : data.last_successful_update_id,
            failed_update_count: data.failed_update_count === '' ? '0' : data.failed_update_count,
        }));

        form.patch(updateTelegramSettings.url(), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Telegram Settings" />

            <div className="space-y-6 bg-zinc-50/50 p-6">
                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-800">
                            <Bot className="size-4 text-[#F57C00]" />
                            Telegram Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3 text-sm text-zinc-600 md:grid-cols-3">
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Bot Token</p>
                            <p className="font-semibold text-zinc-800">{settings.has_bot_token ? 'Configured' : 'Not configured'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Webhook</p>
                            <p className="font-semibold text-zinc-800">{settings.webhook_status}</p>
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Updated</p>
                            <p className="font-semibold text-zinc-800">{settings.updated_at ?? 'Not saved yet'}</p>
                        </div>
                    </CardContent>
                </Card>

                {flash?.success && (
                    <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                        {flash.success}
                    </div>
                )}

                {flash?.error && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                        {flash.error}
                    </div>
                )}

                {!canManageSettings && (
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-sm font-semibold text-zinc-700">You do not have permission to manage Telegram settings.</p>
                        </CardContent>
                    </Card>
                )}

                {canManageSettings && (
                    <form className="space-y-6" onSubmit={submit}>
                        <Section title="Bot Credentials" icon={<KeyRound className="size-4 text-[#F57C00]" />}>
                            <Field label="Bot Username" htmlFor="bot_username" error={form.errors.bot_username}>
                                <Input
                                    id="bot_username"
                                    value={form.data.bot_username}
                                    onChange={(event) => form.setData('bot_username', event.target.value)}
                                    placeholder="@my_shop_bot"
                                />
                            </Field>

                            <Field label="Bot ID" htmlFor="bot_id" error={form.errors.bot_id}>
                                <Input
                                    id="bot_id"
                                    value={form.data.bot_id}
                                    onChange={(event) => form.setData('bot_id', event.target.value)}
                                />
                            </Field>

                            <Field label="Bot Token" htmlFor="bot_token" error={form.errors.bot_token} className="md:col-span-2">
                                <Input
                                    id="bot_token"
                                    type="password"
                                    value={form.data.bot_token}
                                    onChange={(event) => form.setData('bot_token', event.target.value)}
                                    placeholder={settings.has_bot_token ? 'Token already configured' : '123456:ABC-DEF'}
                                />
                            </Field>
                        </Section>

                        <Section title="Webhook" icon={<Link2 className="size-4 text-[#F57C00]" />}>
                            <Field label="Webhook URL" htmlFor="webhook_url" error={form.errors.webhook_url} className="md:col-span-2">
                                <Input
                                    id="webhook_url"
                                    value={form.data.webhook_url}
                                    onChange={(event) => form.setData('webhook_url', event.target.value)}
                                />
                            </Field>

                            <Field label="Webhook Secret Token" htmlFor="webhook_secret_token" error={form.errors.webhook_secret_token}>
                                <Input
                                    id="webhook_secret_token"
                                    type="password"
                                    value={form.data.webhook_secret_token}
                                    onChange={(event) => form.setData('webhook_secret_token', event.target.value)}
                                    placeholder={settings.has_webhook_secret_token ? 'Secret already configured' : 'Secret token'}
                                />
                            </Field>

                            <Field label="Webhook Status" htmlFor="webhook_status" error={form.errors.webhook_status}>
                                <Select value={form.data.webhook_status} onValueChange={(value: 'active' | 'inactive' | 'failed') => form.setData('webhook_status', value)}>
                                    <SelectTrigger id="webhook_status">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="failed">Failed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field label="Webhook Last Set At" htmlFor="webhook_last_set_at" error={form.errors.webhook_last_set_at}>
                                <Input
                                    id="webhook_last_set_at"
                                    type="datetime-local"
                                    value={form.data.webhook_last_set_at}
                                    onChange={(event) => form.setData('webhook_last_set_at', event.target.value)}
                                />
                            </Field>

                            <Field label="Webhook Last Checked At" htmlFor="webhook_last_checked_at" error={form.errors.webhook_last_checked_at}>
                                <Input
                                    id="webhook_last_checked_at"
                                    type="datetime-local"
                                    value={form.data.webhook_last_checked_at}
                                    onChange={(event) => form.setData('webhook_last_checked_at', event.target.value)}
                                />
                            </Field>

                            <Field label="Webhook Error Count" htmlFor="webhook_error_count" error={form.errors.webhook_error_count}>
                                <Input
                                    id="webhook_error_count"
                                    type="number"
                                    min="0"
                                    value={form.data.webhook_error_count}
                                    onChange={(event) => form.setData('webhook_error_count', event.target.value)}
                                />
                            </Field>

                            <Field label="Webhook Last Error" htmlFor="webhook_last_error" error={form.errors.webhook_last_error} className="md:col-span-2">
                                <Textarea
                                    id="webhook_last_error"
                                    rows={3}
                                    value={form.data.webhook_last_error}
                                    onChange={(event) => form.setData('webhook_last_error', event.target.value)}
                                />
                            </Field>
                        </Section>

                        <Section title="Bot Status" icon={<ToggleLeft className="size-4 text-[#F57C00]" />}>
                            <ToggleRow
                                label="Active"
                                checked={form.data.is_active}
                                onCheckedChange={(checked) => form.setData('is_active', checked)}
                                error={form.errors.is_active}
                            />
                            <ToggleRow
                                label="Paused"
                                checked={form.data.is_paused}
                                onCheckedChange={(checked) => form.setData('is_paused', checked)}
                                error={form.errors.is_paused}
                            />
                            <Field label="Last Seen At" htmlFor="last_seen_at" error={form.errors.last_seen_at}>
                                <Input
                                    id="last_seen_at"
                                    type="datetime-local"
                                    value={form.data.last_seen_at}
                                    onChange={(event) => form.setData('last_seen_at', event.target.value)}
                                />
                            </Field>
                            <Field label="Maintenance Message" htmlFor="maintenance_message" error={form.errors.maintenance_message} className="md:col-span-2">
                                <Textarea
                                    id="maintenance_message"
                                    rows={3}
                                    value={form.data.maintenance_message}
                                    onChange={(event) => form.setData('maintenance_message', event.target.value)}
                                />
                            </Field>
                        </Section>

                        <Section title="Monitoring" icon={<Activity className="size-4 text-[#F57C00]" />}>
                            <Field label="Last Webhook Event At" htmlFor="last_webhook_event_at" error={form.errors.last_webhook_event_at}>
                                <Input
                                    id="last_webhook_event_at"
                                    type="datetime-local"
                                    value={form.data.last_webhook_event_at}
                                    onChange={(event) => form.setData('last_webhook_event_at', event.target.value)}
                                />
                            </Field>

                            <Field label="Last Successful Update ID" htmlFor="last_successful_update_id" error={form.errors.last_successful_update_id}>
                                <Input
                                    id="last_successful_update_id"
                                    type="number"
                                    min="0"
                                    value={form.data.last_successful_update_id}
                                    onChange={(event) => form.setData('last_successful_update_id', event.target.value)}
                                />
                            </Field>

                            <Field label="Failed Update Count" htmlFor="failed_update_count" error={form.errors.failed_update_count}>
                                <Input
                                    id="failed_update_count"
                                    type="number"
                                    min="0"
                                    value={form.data.failed_update_count}
                                    onChange={(event) => form.setData('failed_update_count', event.target.value)}
                                />
                            </Field>
                        </Section>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={form.processing} className="gap-2">
                                <Save className="size-4" />
                                {form.processing ? 'Saving...' : 'Save Telegram Settings'}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </AppLayout>
    );
}
