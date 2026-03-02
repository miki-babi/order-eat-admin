import { Head, useForm, usePage } from '@inertiajs/react';
import { Bold, Building2, Italic, Link2, List, ListOrdered, Mail, MapPin, Phone, Underline } from 'lucide-react';
import { useEffect, useRef, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type SharedProps = {
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

type BusinessSettingsPayload = {
    _method: 'patch';
    business_name: string;
    description: string;
    contact_phone: string;
    contact_email: string;
    contact_address: string;
    social_facebook: string;
    social_instagram: string;
    social_tiktok: string;
    social_telegram: string;
    social_x: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Business Settings',
        href: '/staff/business-settings',
    },
];

export default function BusinessSettings({
    settings,
    canManageSettings,
}: {
    settings: {
        business_name: string;
        description: string | null;
        contact_phone: string | null;
        contact_email: string | null;
        contact_address: string | null;
        social_facebook: string | null;
        social_instagram: string | null;
        social_tiktok: string | null;
        social_telegram: string | null;
        social_x: string | null;
    };
    canManageSettings: boolean;
}) {
    const { flash } = usePage<SharedProps>().props;
    const editorRef = useRef<HTMLDivElement | null>(null);

    const form = useForm<BusinessSettingsPayload>({
        _method: 'patch',
        business_name: settings.business_name ?? '',
        description: settings.description ?? '',
        contact_phone: settings.contact_phone ?? '',
        contact_email: settings.contact_email ?? '',
        contact_address: settings.contact_address ?? '',
        social_facebook: settings.social_facebook ?? '',
        social_instagram: settings.social_instagram ?? '',
        social_tiktok: settings.social_tiktok ?? '',
        social_telegram: settings.social_telegram ?? '',
        social_x: settings.social_x ?? '',
    });

    useEffect(() => {
        if (!editorRef.current) {
            return;
        }

        editorRef.current.innerHTML = settings.description ?? '';
    }, [settings.description]);

    const syncDescription = () => {
        form.setData('description', editorRef.current?.innerHTML ?? '');
    };

    const applyCommand = (command: string) => {
        editorRef.current?.focus();
        document.execCommand(command, false);
        syncDescription();
    };

    const createLink = () => {
        const url = window.prompt('Enter URL (https://...)');

        if (!url || url.trim() === '') {
            return;
        }

        editorRef.current?.focus();
        document.execCommand('createLink', false, url.trim());
        syncDescription();
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.transform((data) => ({
            ...data,
            description: editorRef.current?.innerHTML ?? data.description,
        }));

        form.post('/staff/business-settings', {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Business Settings" />
            <div className="space-y-6 bg-zinc-50/50 p-6">
                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-700">
                            <Building2 className="size-4 text-[#F57C00]" />
                            Admin Business Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-zinc-600">
                            Configure your business identity for customer-facing experiences.
                        </p>
                    </CardContent>
                </Card>

                {flash?.success && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                        {flash.success}
                    </div>
                )}

                {flash?.error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                        {flash.error}
                    </div>
                )}

                {!canManageSettings && (
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-sm font-semibold text-zinc-700">You do not have permission to manage business settings.</p>
                        </CardContent>
                    </Card>
                )}

                {canManageSettings && (
                    <form className="space-y-6" onSubmit={submit}>
                        <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                            <CardHeader>
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-700">Brand</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="business_name">Business Name</Label>
                                    <Input
                                        id="business_name"
                                        value={form.data.business_name}
                                        onChange={(event) => form.setData('business_name', event.target.value)}
                                        placeholder="Your business name"
                                    />
                                    <InputError message={form.errors.business_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Business Description (Rich Text)</Label>
                                    <div className="rounded-xl border border-zinc-200 bg-white">
                                        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2">
                                            <Button type="button" variant="outline" className="h-8 rounded-lg px-2" onClick={() => applyCommand('bold')}>
                                                <Bold className="size-4" />
                                            </Button>
                                            <Button type="button" variant="outline" className="h-8 rounded-lg px-2" onClick={() => applyCommand('italic')}>
                                                <Italic className="size-4" />
                                            </Button>
                                            <Button type="button" variant="outline" className="h-8 rounded-lg px-2" onClick={() => applyCommand('underline')}>
                                                <Underline className="size-4" />
                                            </Button>
                                            <Button type="button" variant="outline" className="h-8 rounded-lg px-2" onClick={() => applyCommand('insertUnorderedList')}>
                                                <List className="size-4" />
                                            </Button>
                                            <Button type="button" variant="outline" className="h-8 rounded-lg px-2" onClick={() => applyCommand('insertOrderedList')}>
                                                <ListOrdered className="size-4" />
                                            </Button>
                                            <Button type="button" variant="outline" className="h-8 rounded-lg px-2" onClick={createLink}>
                                                <Link2 className="size-4" />
                                            </Button>
                                        </div>
                                        <div
                                            ref={editorRef}
                                            contentEditable
                                            onInput={syncDescription}
                                            className="min-h-44 rounded-b-xl px-3 py-3 text-sm text-zinc-800 focus:outline-none"
                                            data-placeholder="Write your business story, specialties, and highlights..."
                                            suppressContentEditableWarning
                                        />
                                    </div>
                                    <p className="text-xs text-zinc-500">Use bold, italic, underline, lists, and links for a better customer-facing description.</p>
                                    <InputError message={form.errors.description} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                            <CardHeader>
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-700">Social Media</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="social_facebook">Facebook</Label>
                                    <Input
                                        id="social_facebook"
                                        value={form.data.social_facebook}
                                        onChange={(event) => form.setData('social_facebook', event.target.value)}
                                        placeholder="facebook.com/your-page or @your-page"
                                    />
                                    <InputError message={form.errors.social_facebook} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="social_instagram">Instagram</Label>
                                    <Input
                                        id="social_instagram"
                                        value={form.data.social_instagram}
                                        onChange={(event) => form.setData('social_instagram', event.target.value)}
                                        placeholder="instagram.com/your-handle or @your-handle"
                                    />
                                    <InputError message={form.errors.social_instagram} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="social_tiktok">TikTok</Label>
                                    <Input
                                        id="social_tiktok"
                                        value={form.data.social_tiktok}
                                        onChange={(event) => form.setData('social_tiktok', event.target.value)}
                                        placeholder="tiktok.com/@your-handle"
                                    />
                                    <InputError message={form.errors.social_tiktok} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="social_telegram">Telegram</Label>
                                    <Input
                                        id="social_telegram"
                                        value={form.data.social_telegram}
                                        onChange={(event) => form.setData('social_telegram', event.target.value)}
                                        placeholder="t.me/your-channel or @your-channel"
                                    />
                                    <InputError message={form.errors.social_telegram} />
                                </div>

                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="social_x">X (Twitter)</Label>
                                    <Input
                                        id="social_x"
                                        value={form.data.social_x}
                                        onChange={(event) => form.setData('social_x', event.target.value)}
                                        placeholder="x.com/your-handle or @your-handle"
                                    />
                                    <InputError message={form.errors.social_x} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                            <CardHeader>
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-700">Contact Details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact_phone" className="flex items-center gap-2">
                                            <Phone className="size-4 text-zinc-500" />
                                            Phone
                                        </Label>
                                        <Input
                                            id="contact_phone"
                                            value={form.data.contact_phone}
                                            onChange={(event) => form.setData('contact_phone', event.target.value)}
                                            placeholder="+2519XXXXXXXX"
                                        />
                                        <InputError message={form.errors.contact_phone} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="contact_email" className="flex items-center gap-2">
                                            <Mail className="size-4 text-zinc-500" />
                                            Email
                                        </Label>
                                        <Input
                                            id="contact_email"
                                            type="email"
                                            value={form.data.contact_email}
                                            onChange={(event) => form.setData('contact_email', event.target.value)}
                                            placeholder="hello@business.com"
                                        />
                                        <InputError message={form.errors.contact_email} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="contact_address" className="flex items-center gap-2">
                                        <MapPin className="size-4 text-zinc-500" />
                                        Address
                                    </Label>
                                    <textarea
                                        id="contact_address"
                                        rows={4}
                                        value={form.data.contact_address}
                                        onChange={(event) => form.setData('contact_address', event.target.value)}
                                        className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm focus:border-[#F57C00] focus:outline-none focus:ring-2 focus:ring-[#F57C00]/15"
                                        placeholder="Branch or business address"
                                    />
                                    <InputError message={form.errors.contact_address} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button type="submit" className="rounded-xl bg-[#F57C00] text-white hover:bg-[#E65100]" disabled={form.processing}>
                                {form.processing ? 'Saving...' : 'Save Settings'}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </AppLayout>
    );
}
