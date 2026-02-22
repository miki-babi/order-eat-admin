import { Head, Link, usePage } from '@inertiajs/react';
import { ExternalLink, Lock, Mail, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, User } from '@/types';

type FeaturePayload = {
    feature_key: string;
    feature_name: string;
    message: string;
    help_url?: string | null;
    support_contact?: string | null;
};

type SharedProps = {
    auth?: {
        user?: User | null;
    };
};

export default function LockedFeature({ feature }: { feature: FeaturePayload }) {
    const { auth } = usePage<SharedProps>().props;
    const isDashboardUser = Boolean(auth?.user);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Feature Locked',
            href: `/locked/${feature.feature_key}`,
        },
    ];

    const shellClassName = isDashboardUser
        ? 'bg-[#FAFAFA] px-2 py-6 text-[#212121] md:px-6'
        : 'min-h-screen bg-[#FAFAFA] px-4 py-10 text-[#212121] md:py-16';

    const content = (
        <div className={shellClassName}>
            <main className="mx-auto w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-200/60 md:p-12">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF3E0] text-[#F57C00]">
                    <Lock className="size-8" />
                </div>

                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#9E9E9E]">Feature Locked</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-[#212121]">{feature.feature_name}</h1>
                <p className="mt-5 rounded-2xl border border-[#FFE0B2] bg-[#FFF8F1] p-4 text-sm font-bold text-[#E65100]">
                    {feature.message}
                </p>

                <div className="mt-8 rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
                    <div className="flex items-start gap-3">
                        <ShieldAlert className="mt-0.5 size-4 text-[#F57C00]" />
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-[#212121]">Need Access?</p>
                            <p className="mt-1 text-sm text-zinc-600">
                                Please contact us to unlock this feature for your account.
                            </p>
                            {feature.support_contact && (
                                <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-wider text-[#F57C00] ring-1 ring-zinc-200">
                                    <Mail className="size-3" />
                                    {feature.support_contact}
                                </p>
                            )}

                            {feature.help_url && (
                                <a
                                    href={feature.help_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#F57C00] underline decoration-2 underline-offset-4 hover:text-[#E65100]"
                                >
                                    What does this feature do?
                                    <ExternalLink className="size-3" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                    <Link href="/">
                        <Button className="h-11 rounded-xl bg-[#212121] px-6 text-xs font-black uppercase tracking-widest text-white hover:bg-[#F57C00]">
                            Back To Home
                        </Button>
                    </Link>
                    <Link href="/welcome">
                        <Button variant="outline" className="h-11 rounded-xl px-6 text-xs font-black uppercase tracking-widest">
                            System Welcome
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );

    if (isDashboardUser) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={`${feature.feature_name} Locked`} />
                {content}
            </AppLayout>
        );
    }

    return (
        <>
            <Head title={`${feature.feature_name} Locked`} />
            {content}
        </>
    );
}
