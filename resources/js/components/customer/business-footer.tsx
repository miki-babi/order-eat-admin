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
    const socialRows: Array<{ key: SocialKey; label: string; value: string | null }> = [
        { key: 'facebook', label: 'Facebook', value: business.socials.facebook },
        { key: 'instagram', label: 'Instagram', value: business.socials.instagram },
        { key: 'tiktok', label: 'TikTok', value: business.socials.tiktok },
        { key: 'telegram', label: 'Telegram', value: business.socials.telegram },
        { key: 'x', label: 'X', value: business.socials.x },
    ].filter((entry) => entry.value && entry.value.trim() !== '');

    const hasDescription = (business.description ?? '').replace(/<[^>]*>/g, '').trim() !== '';
    const phoneHref = business.contact_phone ? normalizePhoneHref(business.contact_phone) : null;
    const emailHref = business.contact_email ? normalizeEmailHref(business.contact_email) : null;
    const addressHref = business.contact_address ? normalizeAddressHref(business.contact_address) : null;

    return (
        <footer className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 md:p-8">
            <div className="space-y-6">
                <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#F57C00]">Business</p>
                    <h2 className="mt-2 text-xl font-black text-zinc-900">{business.business_name}</h2>
                    {hasDescription ? (
                        <div
                            className="prose prose-sm mt-3 max-w-none text-zinc-700"
                            dangerouslySetInnerHTML={{ __html: business.description ?? '' }}
                        />
                    ) : (
                        <p className="mt-3 text-sm text-zinc-600">Business description will be shared soon.</p>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Contact</p>
                        <div className="mt-2 space-y-1 text-sm text-zinc-700">
                            {business.contact_phone && (
                                <p>
                                    Phone:{' '}
                                    {phoneHref ? (
                                        <a href={phoneHref} className="font-semibold text-[#F57C00] hover:underline">
                                            {business.contact_phone}
                                        </a>
                                    ) : (
                                        business.contact_phone
                                    )}
                                </p>
                            )}
                            {business.contact_email && (
                                <p>
                                    Email:{' '}
                                    {emailHref ? (
                                        <a href={emailHref} className="font-semibold text-[#F57C00] hover:underline">
                                            {business.contact_email}
                                        </a>
                                    ) : (
                                        business.contact_email
                                    )}
                                </p>
                            )}
                            {business.contact_address && (
                                <p>
                                    Address:{' '}
                                    {addressHref ? (
                                        <a href={addressHref} target="_blank" rel="noreferrer" className="font-semibold text-[#F57C00] hover:underline">
                                            {business.contact_address}
                                        </a>
                                    ) : (
                                        business.contact_address
                                    )}
                                </p>
                            )}
                            {!business.contact_phone && !business.contact_email && !business.contact_address && (
                                <p>Contact details will be shared soon.</p>
                            )}
                        </div>
                    </article>

                    <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Social Media</p>
                        <div className="mt-2 space-y-1 text-sm text-zinc-700">
                            {socialRows.length === 0 && <p>Social links will be shared soon.</p>}
                            {socialRows.map((social) => {
                                const rawValue = social.value ?? '';
                                const href = normalizeSocialHref(social.key, rawValue);

                                if (href) {
                                    return (
                                        <p key={social.label}>
                                            {social.label}:{' '}
                                            <a href={href} target="_blank" rel="noreferrer" className="font-semibold text-[#F57C00] hover:underline">
                                                {rawValue}
                                            </a>
                                        </p>
                                    );
                                }

                                return (
                                    <p key={social.label}>
                                        {social.label}: {rawValue}
                                    </p>
                                );
                            })}
                        </div>
                    </article>
                </div>
            </div>
        </footer>
    );
}
