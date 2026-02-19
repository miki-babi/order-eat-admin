import { Head, router, useForm, usePage } from '@inertiajs/react';
import { MessageSquareText, Settings, Shield, UploadCloud, Users } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type SmsTemplate = {
    id: number;
    key: string;
    label: string;
    body: string;
    is_active: boolean;
    updated_at: string | null;
};

type SmsPlaceholder = {
    token: string;
    description: string;
};

type SmsNotificationSetting = {
    id: number;
    event_key: string;
    label: string;
    description: string;
    is_enabled: boolean;
};

type SmsPhoneList = {
    id: number;
    phone: string;
    normalized_phone: string;
    list_type: 'whitelist' | 'blacklist';
    note: string | null;
    created_at: string | null;
};

type Summary = {
    total_templates: number;
    active_templates: number;
    notification_events: number;
    enabled_events: number;
    whitelist_count: number;
    blacklist_count: number;
    customers_count: number;
};

type SharedProps = {
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'SMS Templates',
        href: '/staff/sms-templates',
    },
];

export default function SmsTemplates({
    templates,
    placeholders,
    notificationSettings,
    phoneLists,
    summary,
}: {
    templates: SmsTemplate[];
    placeholders: SmsPlaceholder[];
    notificationSettings: SmsNotificationSetting[];
    phoneLists: SmsPhoneList[];
    summary: Summary;
}) {
    const { flash } = usePage<SharedProps>().props;
    const [editingTemplate, setEditingTemplate] = useState<SmsTemplate | null>(templates[0] ?? null);
    const [updatingSettingId, setUpdatingSettingId] = useState<number | null>(null);
    const [deletingPhoneListId, setDeletingPhoneListId] = useState<number | null>(null);
    const [contactsFileInputKey, setContactsFileInputKey] = useState(0);

    const templateForm = useForm({
        label: templates[0]?.label ?? '',
        body: templates[0]?.body ?? '',
        is_active: templates[0]?.is_active ?? true,
    });

    const phoneListForm = useForm({
        phone: '',
        list_type: 'whitelist',
        note: '',
    });

    const contactsForm = useForm<{ contacts_file: File | null }>({
        contacts_file: null,
    });

    const whitelistEntries = phoneLists.filter((entry) => entry.list_type === 'whitelist');
    const blacklistEntries = phoneLists.filter((entry) => entry.list_type === 'blacklist');

    const selectTemplate = (template: SmsTemplate) => {
        setEditingTemplate(template);
        templateForm.setData({
            label: template.label,
            body: template.body,
            is_active: template.is_active,
        });
        templateForm.clearErrors();
    };

    const saveTemplate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editingTemplate) {
            return;
        }

        templateForm.put(`/staff/sms-templates/${editingTemplate.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                templateForm.clearErrors();
            },
        });
    };

    const toggleNotificationSetting = (setting: SmsNotificationSetting) => {
        setUpdatingSettingId(setting.id);
        router.put(
            `/staff/sms-notification-settings/${setting.id}`,
            {
                is_enabled: !setting.is_enabled,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => {
                    setUpdatingSettingId((current) => (current === setting.id ? null : current));
                },
            },
        );
    };

    const savePhoneListEntry = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        phoneListForm.post('/staff/sms-phone-lists', {
            preserveScroll: true,
            onSuccess: () => {
                phoneListForm.reset('phone', 'note');
            },
        });
    };

    const removePhoneListEntry = (entryId: number) => {
        setDeletingPhoneListId(entryId);
        router.delete(`/staff/sms-phone-lists/${entryId}`, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                setDeletingPhoneListId((current) => (current === entryId ? null : current));
            },
        });
    };

    const uploadContacts = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        contactsForm.post('/staff/sms-contacts/import', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                contactsForm.reset('contacts_file');
                setContactsFileInputKey((key) => key + 1);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="SMS Templates" />
            <div className="space-y-5 p-4">
                {flash?.success ? (
                    <div className="rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
                        {flash.success}
                    </div>
                ) : null}
                {flash?.error ? (
                    <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                        {flash.error}
                    </div>
                ) : null}

                <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Total Templates</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.total_templates}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Active Templates</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.active_templates}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Notification Events</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.notification_events}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Enabled Events</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.enabled_events}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Whitelist / Blacklist</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">
                            {summary.whitelist_count} / {summary.blacklist_count}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-zinc-500">Customer Contacts</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-semibold">{summary.customers_count}</CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <MessageSquareText className="size-4" />
                            Placeholder Reference
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {placeholders.map((placeholder) => (
                            <Badge key={placeholder.token} variant="outline">
                                {`{${placeholder.token}}`} - {placeholder.description}
                            </Badge>
                        ))}
                    </CardContent>
                </Card>

                <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Templates</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {templates.map((template) => {
                                const isSelected = editingTemplate?.id === template.id;

                                return (
                                    <button
                                        key={template.id}
                                        type="button"
                                        className={`w-full rounded-md border p-3 text-left ${
                                            isSelected
                                                ? 'border-orange-400 bg-orange-50'
                                                : 'border-zinc-200 hover:bg-zinc-50'
                                        }`}
                                        onClick={() => selectTemplate(template)}
                                    >
                                        <div className="mb-1 flex items-center justify-between gap-2">
                                            <p className="font-medium">{template.label}</p>
                                            <Badge variant={template.is_active ? 'default' : 'outline'}>
                                                {template.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-zinc-500">Key: {template.key}</p>
                                    </button>
                                );
                            })}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                {editingTemplate ? `Edit: ${editingTemplate.key}` : 'Select a template'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {editingTemplate ? (
                                <form className="space-y-3" onSubmit={saveTemplate}>
                                    <div className="grid gap-2">
                                        <Label htmlFor="template-label">Label</Label>
                                        <Input
                                            id="template-label"
                                            value={templateForm.data.label}
                                            onChange={(event) =>
                                                templateForm.setData('label', event.target.value)
                                            }
                                        />
                                        <InputError message={templateForm.errors.label} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="template-body">Body</Label>
                                        <textarea
                                            id="template-body"
                                            className="border-input min-h-40 rounded-md border px-3 py-2 text-sm"
                                            value={templateForm.data.body}
                                            onChange={(event) =>
                                                templateForm.setData('body', event.target.value)
                                            }
                                        />
                                        <InputError message={templateForm.errors.body} />
                                    </div>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={templateForm.data.is_active}
                                            onChange={(event) =>
                                                templateForm.setData('is_active', event.target.checked)
                                            }
                                        />
                                        Active
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Button type="submit" disabled={templateForm.processing}>
                                            {templateForm.processing ? 'Saving...' : 'Save Template'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => selectTemplate(editingTemplate)}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <p className="text-muted-foreground text-sm">Choose a template from the left.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Settings className="size-4" />
                            SMS Notification Manager
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-muted-foreground text-sm">
                            Event toggles control when SMS can be sent. For receipt approve/disapprove, staff
                            must still choose to notify from the action dialog.
                        </p>
                        <div className="space-y-2">
                            {notificationSettings.map((setting) => (
                                <div
                                    key={setting.id}
                                    className="flex flex-wrap items-start justify-between gap-3 rounded-md border p-3"
                                >
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">{setting.label}</p>
                                        <p className="text-xs text-zinc-500">{setting.description}</p>
                                        <p className="text-xs text-zinc-500">Key: {setting.event_key}</p>
                                    </div>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant={setting.is_enabled ? 'default' : 'outline'}
                                        disabled={updatingSettingId === setting.id}
                                        onClick={() => toggleNotificationSetting(setting)}
                                    >
                                        {setting.is_enabled ? 'Enabled' : 'Disabled'}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Shield className="size-4" />
                                Whitelist / Blacklist
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-muted-foreground text-sm">
                                {summary.whitelist_count > 0
                                    ? 'Whitelist mode is active. Only whitelisted numbers receive SMS, and blacklisted numbers are blocked.'
                                    : 'Whitelist mode is inactive. Any number can receive SMS except blacklisted numbers.'}
                            </p>
                            <form className="space-y-3" onSubmit={savePhoneListEntry}>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={phoneListForm.data.phone}
                                        onChange={(event) =>
                                            phoneListForm.setData('phone', event.target.value)
                                        }
                                        placeholder="2519XXXXXXXX or 09XXXXXXXX"
                                    />
                                    <InputError message={phoneListForm.errors.phone} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="list_type">List Type</Label>
                                    <select
                                        id="list_type"
                                        className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                                        value={phoneListForm.data.list_type}
                                        onChange={(event) =>
                                            phoneListForm.setData(
                                                'list_type',
                                                event.target.value as 'whitelist' | 'blacklist',
                                            )
                                        }
                                    >
                                        <option value="whitelist">Whitelist</option>
                                        <option value="blacklist">Blacklist</option>
                                    </select>
                                    <InputError message={phoneListForm.errors.list_type} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="note">Note (optional)</Label>
                                    <Input
                                        id="note"
                                        value={phoneListForm.data.note}
                                        onChange={(event) =>
                                            phoneListForm.setData('note', event.target.value)
                                        }
                                        placeholder="VIP customer, do not send, test number..."
                                    />
                                    <InputError message={phoneListForm.errors.note} />
                                </div>
                                <Button type="submit" disabled={phoneListForm.processing}>
                                    {phoneListForm.processing ? 'Saving...' : 'Save Number'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <UploadCloud className="size-4" />
                                Import Customer Contacts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-muted-foreground text-sm">
                                Upload a CSV with columns: <strong>name,phone</strong>.
                            </p>
                            <form className="space-y-3" onSubmit={uploadContacts}>
                                <div className="grid gap-2">
                                    <Label htmlFor="contacts_file">CSV File</Label>
                                    <Input
                                        key={contactsFileInputKey}
                                        id="contacts_file"
                                        type="file"
                                        accept=".csv,text/csv,.txt,text/plain"
                                        onChange={(event) =>
                                            contactsForm.setData(
                                                'contacts_file',
                                                event.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                    <InputError message={contactsForm.errors.contacts_file} />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={contactsForm.processing || !contactsForm.data.contacts_file}
                                >
                                    {contactsForm.processing ? 'Uploading...' : 'Import Contacts'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Users className="size-4" />
                            Phone List Entries
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium">Whitelist ({whitelistEntries.length})</p>
                            {whitelistEntries.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No whitelist numbers yet.</p>
                            ) : (
                                whitelistEntries.map((entry) => (
                                    <div
                                        key={entry.id}
                                        className="flex flex-wrap items-start justify-between gap-2 rounded-md border p-3"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">{entry.phone}</p>
                                            <p className="text-xs text-zinc-500">
                                                Normalized: {entry.normalized_phone}
                                            </p>
                                            {entry.note ? (
                                                <p className="text-xs text-zinc-500">Note: {entry.note}</p>
                                            ) : null}
                                        </div>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            disabled={deletingPhoneListId === entry.id}
                                            onClick={() => removePhoneListEntry(entry.id)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">Blacklist ({blacklistEntries.length})</p>
                            {blacklistEntries.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No blacklist numbers yet.</p>
                            ) : (
                                blacklistEntries.map((entry) => (
                                    <div
                                        key={entry.id}
                                        className="flex flex-wrap items-start justify-between gap-2 rounded-md border p-3"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">{entry.phone}</p>
                                            <p className="text-xs text-zinc-500">
                                                Normalized: {entry.normalized_phone}
                                            </p>
                                            {entry.note ? (
                                                <p className="text-xs text-zinc-500">Note: {entry.note}</p>
                                            ) : null}
                                        </div>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            disabled={deletingPhoneListId === entry.id}
                                            onClick={() => removePhoneListEntry(entry.id)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
