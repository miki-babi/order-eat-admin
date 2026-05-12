import { Head, Link } from '@inertiajs/react';
import { useEffect,  useState } from 'react';
import { FeedbackModal } from '@/components/customer/feedback-modal';

/* ─── Static data ───────────────────────────────────────────────── */

const NAV_LINKS = [
    { label: 'Menu', href: '/menu' },
    { label: 'Cakes', href: '/cakes' },
    { label: 'Catering', href: '/catering' },
    { label: 'Feedback', href: '/feedback' },
];

const FEATURES = [
    {
        emoji: '🍽️',
        title: 'Our Menu',
        subtitle: 'Crafted with love',
        description:
            'From hearty breakfasts to indulgent dinners, every dish is prepared fresh to order. Browse our full menu and place your order in seconds.',
        cta: 'View Menu',
        href: '/menu',
        accent: '#C9814A',
    },
    {
        emoji: '🎂',
        title: 'Cakes & Sweets',
        subtitle: 'Custom baked for you',
        description:
            'Order a custom cake for any occasion — birthdays, anniversaries, or just because. Pre-order online and collect at your convenience.',
        cta: 'Order a Cake',
        href: '/cakes',
        accent: '#C94A8F',
    },
    {
        emoji: '🎊',
        title: 'Catering',
        subtitle: 'Events done right',
        description:
            'Planning a corporate lunch, wedding, or special gathering? Our catering team brings restaurant-quality flavours to your venue.',
        cta: 'Request Catering',
        href: '/catering',
        accent: '#5A9E6F',
    },
    {
        emoji: '💬',
        title: 'Share Feedback',
        subtitle: 'Your voice matters',
        description:
            'Loved your experience? Have a suggestion? We read every review and use your feedback to make every visit better than the last.',
        cta: 'Leave Feedback',
        href: '/feedback',
        accent: '#6E7EC9',
    },
];






/* ─── Main page ─────────────────────────────────────────────────── */
export default function Landing({ customerToken }: { customerToken?: string }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const feedbackCustomerId = customerToken
        ? Number(customerToken)
        : undefined;

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <>
            <Head title="Welcome — Fine Dining & Bakery">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-serif:400,400i|inter:400,500,600,700" rel="stylesheet" />
                <style>{`
                    :root { font-family: 'Inter', sans-serif; }
                    .serif { font-family: 'Instrument Serif', Georgia, serif; }
                    @keyframes fadeUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                    .fade-up { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }
                    .fade-up-1 { animation-delay: 0.1s; }
                    .fade-up-2 { animation-delay: 0.25s; }
                    .fade-up-3 { animation-delay: 0.4s; }
                    .fade-up-4 { animation-delay: 0.55s; }
                    @keyframes shimmer {
                        0%   { background-position: -200% center; }
                        100% { background-position: 200% center; }
                    }
                    .shimmer-text {
                        background: linear-gradient(90deg, #D4A76A 0%, #F5E6C8 40%, #D4A76A 60%, #A0784A 100%);
                        background-size: 200% auto;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: shimmer 4s linear infinite;
                    }
                `}</style>
            </Head>

            <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1A]">

                {/* ── Navbar ───────────────────────────────── */}
                <nav
                    className="fixed top-0 z-50 w-full transition-all duration-300"
                    style={{
                        background: scrolled ? 'rgba(250,250,248,0.88)' : 'transparent',
                        backdropFilter: scrolled ? 'blur(16px)' : 'none',
                        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
                    }}
                >
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
                        <span className="serif text-xl font-normal tracking-wide text-[#1C1C1A]">
                            Kaldi<span className="opacity-40">&nbsp;·&nbsp;</span>Eats
                        </span>

                        {/* Desktop links */}
                        <div className="hidden gap-8 md:flex">
                            {NAV_LINKS.map((l) => {
                                if (l.label === 'Feedback') {
                                    return (
                                        <FeedbackModal
                                            key={l.label}
                                            customerId={feedbackCustomerId}
                                            customerToken={customerToken}
                                            trigger={
                                                <button
                                                    type="button"
                                                    className="text-sm font-medium text-[#5C5C58] transition-colors hover:text-[#1C1C1A]"
                                                >
                                                    {l.label}
                                                </button>
                                            }
                                        />
                                    );
                                }

                                return (
                                    <Link
                                        key={l.label}
                                        href={l.href}
                                        className="text-sm font-medium text-[#5C5C58] transition-colors hover:text-[#1C1C1A]"
                                    >
                                        {l.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <Link
                            href="/menu"
                            className="hidden rounded-full bg-[#1C1C1A] px-5 py-2 text-sm font-semibold text-[#FAFAF8] transition hover:bg-[#3C3C38] md:inline-block"
                        >
                            Order Now
                        </Link>

                        {/* Mobile burger */}
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
                            aria-label="Toggle menu"
                        >
                            <span className={`block h-0.5 w-5 rounded bg-[#1C1C1A] transition-all ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                            <span className={`block h-0.5 w-5 rounded bg-[#1C1C1A] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                            <span className={`block h-0.5 w-5 rounded bg-[#1C1C1A] transition-all ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                        </button>
                    </div>

                    {/* Mobile dropdown */}
                    {menuOpen && (
                        <div className="border-t border-[#E8E8E4] bg-[#FAFAF8] px-6 pb-6 pt-4 md:hidden">
                            {NAV_LINKS.map((l) => {
                                if (l.label === 'Feedback') {
                                    return (
                                        <FeedbackModal
                                            key={l.label}
                                            customerId={feedbackCustomerId}
                                            customerToken={customerToken}
                                            trigger={
                                                <button
                                                    type="button"
                                                    onClick={() => setMenuOpen(false)}
                                                    className="block py-3 text-sm font-medium text-[#3C3C38]"
                                                >
                                                    {l.label}
                                                </button>
                                            }
                                        />
                                    );
                                }

                                return (
                                    <Link
                                        key={l.label}
                                        href={l.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block py-3 text-sm font-medium text-[#3C3C38]"
                                    >
                                        {l.label}
                                    </Link>
                                );
                            })}
                            <Link
                                href="/menu"
                                className="mt-4 block rounded-full bg-[#1C1C1A] px-5 py-3 text-center text-sm font-semibold text-[#FAFAF8]"
                            >
                                Order Now
                            </Link>
                        </div>
                    )}
                </nav>


                {/* ── Feature cards ────────────────────────── */}
                <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#A0A09A]">
                        Everything in one place
                    </p>
                    <h2 className="serif text-3xl text-[#1C1C1A] md:text-4xl">
                        What we offer
                    </h2>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2">
                        {FEATURES.map((feat) => {
                            const cardContent = (
                                <>
                                    <div
                                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        style={{
                                            background: `radial-gradient(ellipse 60% 50% at 10% 10%, ${feat.accent}14 0%, transparent 70%)`,
                                        }}
                                    />

                                    <div className="relative">
                                        <div
                                            className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
                                            style={{ background: `${feat.accent}18` }}
                                        >
                                            {feat.emoji}
                                        </div>

                                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: `${feat.accent}CC` }}>
                                            {feat.subtitle}
                                        </p>
                                        <h3 className="serif text-2xl text-[#1C1C1A]">{feat.title}</h3>
                                        <p className="mt-3 text-sm leading-relaxed text-[#6C6C68]">{feat.description}</p>

                                        <div className="mt-8 flex items-center gap-2 text-sm font-semibold" style={{ color: feat.accent }}>
                                            {feat.cta}
                                            <svg
                                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </>
                            );

                            if (feat.title === 'Share Feedback') {
                                return (
                                    <FeedbackModal
                                        key={feat.title}
                                        customerId={feedbackCustomerId}
                                        customerToken={customerToken}
                                        trigger={
                                            <button
                                                type="button"
                                                className="group relative overflow-hidden rounded-3xl border border-[#E8E8E4] bg-white p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#D8D8D4] hover:shadow-xl hover:shadow-black/5"
                                            >
                                                {cardContent}
                                            </button>
                                        }
                                    />
                                );
                            }

                            return (
                                <Link
                                    key={feat.title}
                                    href={feat.href}
                                    className="group relative overflow-hidden rounded-3xl border border-[#E8E8E4] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#D8D8D4] hover:shadow-xl hover:shadow-black/5"
                                >
                                    {cardContent}
                                </Link>
                            );
                        })}
                    </div>
                </section>


            </div>
        </>
    );
}
