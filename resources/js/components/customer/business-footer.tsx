import { CalendarDays, Phone, User } from 'lucide-react';

type SocialKey = 'facebook' | 'instagram' | 'tiktok' | 'telegram' | 'x';

type BusinessInfo = {
    business_name: string;
    description: string | null;
    contact_phone: string | null;
    contact_email: string | null;
    contact_address: string | null;
    socials: {
        facebook: string | null;
        instagram: string | null;
        tiktok: string | null;
        telegram: string | null;
        x: string | null;
    };
};

function normalizePhoneHref(value: string): string | null {
    const trimmed = value.trim();

    if (trimmed === '') {
        return null;
    }

    const normalized = trimmed.replace(/[^+\d]/g, '');

    return normalized === '' ? null : `tel:${normalized}`;
}

function normalizeEmailHref(value: string): string | null {
    const trimmed = value.trim();

    if (trimmed === '' || !trimmed.includes('@')) {
        return null;
    }

    return `mailto:${trimmed}`;
}

function normalizeAddressHref(value: string): string | null {
    const trimmed = value.trim();

    if (trimmed === '') {
        return null;
    }

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trimmed)}`;
}

function normalizeSocialHref(kind: SocialKey, value: string): string | null {
    const trimmed = value.trim();

    if (trimmed === '') {
        return null;
    }

    if (/^https?:\/\//i.test(trimmed)) {
        return trimmed;
    }

    if (trimmed.startsWith('www.')) {
        return `https://${trimmed}`;
    }

    if (
        trimmed.startsWith('facebook.com/') ||
        trimmed.startsWith('instagram.com/') ||
        trimmed.startsWith('tiktok.com/') ||
        trimmed.startsWith('t.me/') ||
        trimmed.startsWith('x.com/')
    ) {
        return `https://${trimmed}`;
    }

    if (trimmed.startsWith('@')) {
        const handle = trimmed.slice(1);

        if (handle === '') {
            return null;
        }

        if (kind === 'telegram') {
            return `https://t.me/${handle}`;
        }

        if (kind === 'facebook') {
            return `https://facebook.com/${handle}`;
        }

        if (kind === 'instagram') {
            return `https://instagram.com/${handle}`;
        }

        if (kind === 'tiktok') {
            return `https://tiktok.com/@${handle}`;
        }

        return `https://x.com/${handle}`;
    }

    if (!trimmed.includes('.') && !trimmed.includes(' ')) {
        if (kind === 'telegram') {
            return `https://t.me/${trimmed}`;
        }

        if (kind === 'facebook') {
            return `https://facebook.com/${trimmed}`;
        }

        if (kind === 'instagram') {
            return `https://instagram.com/${trimmed}`;
        }

        if (kind === 'tiktok') {
            return `https://tiktok.com/@${trimmed}`;
        }

        return `https://x.com/${trimmed}`;
    }

    return null;
}

export default function BusinessFooter({ business }: { business: BusinessInfo }) {
    const socialRows: Array<{ key: SocialKey; label: string; value: string | null }> = ([
        { key: 'facebook', label: 'Facebook', value: business.socials.facebook },
        { key: 'instagram', label: 'Instagram', value: business.socials.instagram },
        { key: 'tiktok', label: 'TikTok', value: business.socials.tiktok },
        { key: 'telegram', label: 'Telegram', value: business.socials.telegram },
        { key: 'x', label: 'X', value: business.socials.x },
    ] as const).filter((entry) => entry.value && entry.value.trim() !== '');

    const hasDescription = (business.description ?? '').replace(/<[^>]*>/g, '').trim() !== '';
    const phoneHref = business.contact_phone ? normalizePhoneHref(business.contact_phone) : null;
    const emailHref = business.contact_email ? normalizeEmailHref(business.contact_email) : null;
    const addressHref = business.contact_address ? normalizeAddressHref(business.contact_address) : null;

    return (
        <footer className="mt-16 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-500 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="p-8 sm:p-12 space-y-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-1 w-8 rounded-full bg-orange-600 dark:bg-orange-500" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">Our Story</p>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{business.business_name}</h2>
                    {hasDescription ? (
                        <div
                            className="prose prose-sm max-w-none text-zinc-500 leading-relaxed dark:text-zinc-400"
                            dangerouslySetInnerHTML={{ __html: business.description ?? '' }}
                        />
                    ) : (
                        <p className="text-sm text-zinc-500 leading-relaxed italic dark:text-zinc-400">
                            Experience the finest flavors and dedicated service at {business.business_name}.
                        </p>
                    )}
                </div>

                <div className="grid gap-12 sm:grid-cols-2">
                    <div className="space-y-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">Get in Touch</p>
                        <div className="space-y-4 text-sm">
                            {business.contact_phone && (
                                <div className="flex items-center gap-4">
                                    <div className="size-10 flex items-center justify-center rounded-xl bg-zinc-50 text-zinc-400 ring-1 ring-zinc-200/50 dark:bg-zinc-800 dark:text-zinc-500 dark:ring-zinc-700/50">
                                        <Phone className="size-4" />
                                    </div>
                                    <a href={phoneHref || '#'} className="font-bold text-zinc-800 hover:text-orange-600 dark:text-zinc-200 dark:hover:text-orange-400 transition-colors">
                                        {business.contact_phone}
                                    </a>
                                </div>
                            )}
                            {business.contact_email && (
                                <div className="flex items-center gap-4">
                                    <div className="size-10 flex items-center justify-center rounded-xl bg-zinc-50 text-zinc-400 ring-1 ring-zinc-200/50 dark:bg-zinc-800 dark:text-zinc-500 dark:ring-zinc-700/50">
                                        <User className="size-4" />
                                    </div>
                                    <a href={emailHref || '#'} className="font-bold text-zinc-800 hover:text-orange-600 dark:text-zinc-200 dark:hover:text-orange-400 transition-colors">
                                        {business.contact_email}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">Social Media</p>
                        <div className="flex flex-wrap gap-3">
                            {socialRows.length === 0 && <p className="text-sm text-zinc-400 italic dark:text-zinc-500">Following our journey soon.</p>}
                            {socialRows.map((social) => {
                                const rawValue = social.value ?? '';
                                const href = normalizeSocialHref(social.key, rawValue);

                                if (href) {
                                    return (
                                        <a
                                            key={social.label}
                                            href={href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50/50 px-5 py-2.5 text-xs font-bold text-zinc-600 transition-all hover:bg-white hover:shadow-sm hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                                        >
                                            {social.label}
                                        </a>
                                    );
                                }

                                return (
                                    <span key={social.label} className="inline-flex rounded-xl bg-zinc-50 px-5 py-2.5 text-xs font-bold text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
                                        {social.label}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {business.contact_address && (
                    <div className="pt-10 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-start gap-5">
                            <div className="size-10 shrink-0 flex items-center justify-center rounded-xl bg-zinc-50 text-zinc-400 ring-1 ring-zinc-200/50 dark:bg-zinc-800 dark:text-zinc-500 dark:ring-zinc-700/50">
                                <CalendarDays className="size-4" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">Location</p>
                                <a href={addressHref || '#'} target="_blank" rel="noreferrer" className="text-sm font-bold text-zinc-800 hover:text-orange-600 dark:text-zinc-200 dark:hover:text-orange-400 transition-colors leading-relaxed">
                                    {business.contact_address}
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-zinc-950 px-8 py-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 dark:bg-black/40">
                &copy; {new Date().getFullYear()} {business.business_name} &bull; Powered by resto.et
            </div>
        </footer>
    );
}
