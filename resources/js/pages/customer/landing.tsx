import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

/* ─── Static data ───────────────────────────────────────────────── */

const NAV_LINKS = [
    { label: 'Menu', href: '/menu' },
    { label: 'Rooms', href: '/rooms' },
    { label: 'Catering', href: '/catering' },
    { label: 'Cakes', href: '/cakes' },
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
        emoji: '🛏️',
        title: 'Our Rooms',
        subtitle: 'Stay in comfort',
        description:
            'Discover our beautifully appointed suites and rooms. Each space is designed for rest, privacy, and a touch of luxury — complete with a 360° virtual tour.',
        cta: 'Explore Rooms',
        href: '/rooms',
        accent: '#4A7EC9',
    },
    {
        emoji: '🎊',
        title: 'Catering',
        subtitle: 'Events done right',
        description:
            'Planning a corporate lunch, wedding, or special gathering? Our catering team brings restaurant-quality flavours to your venue.',
        cta: 'Request Catering',
        href: '/catering',
        accent: '#7EC94A',
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
];

const TESTIMONIALS = [
    { name: 'Hana T.', quote: 'The food is consistently amazing. I come here every week!', rating: 5 },
    { name: 'Samuel G.', quote: 'Stayed in the grand suite — absolute perfection. Virtual tour sold me before I booked.', rating: 5 },
    { name: 'Meron A.', quote: 'Catering for our office event was seamless. Highly recommend.', rating: 5 },
];

/* ─── Animated counter ──────────────────────────────────────────── */
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    let start = 0;
                    const step = Math.ceil(end / 60);
                    const timer = setInterval(() => {
                        start = Math.min(start + step, end);
                        setCount(start);
                        if (start >= end) clearInterval(timer);
                    }, 20);
                }
            },
            { threshold: 0.5 },
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

/* ─── Star rating ───────────────────────────────────────────────── */
function Stars({ count }: { count: number }) {
    return (
        <span className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </span>
    );
}

/* ─── Main page ─────────────────────────────────────────────────── */
export default function Landing() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <>
            <Head title="Welcome — Fine Dining &amp; Boutique Stays">
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
                            {NAV_LINKS.map((l) => (
                                <Link
                                    key={l.label}
                                    href={l.href}
                                    className="text-sm font-medium text-[#5C5C58] transition-colors hover:text-[#1C1C1A]"
                                >
                                    {l.label}
                                </Link>
                            ))}
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
                            {NAV_LINKS.map((l) => (
                                <Link
                                    key={l.label}
                                    href={l.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-3 text-sm font-medium text-[#3C3C38]"
                                >
                                    {l.label}
                                </Link>
                            ))}
                            <Link
                                href="/menu"
                                className="mt-4 block rounded-full bg-[#1C1C1A] px-5 py-3 text-center text-sm font-semibold text-[#FAFAF8]"
                            >
                                Order Now
                            </Link>
                        </div>
                    )}
                </nav>

                {/* ── Hero ─────────────────────────────────── */}
                <section
                    className="relative flex min-h-screen items-center overflow-hidden"
                    style={{
                        background: 'linear-gradient(160deg, #1A1814 0%, #2C2820 60%, #1A1814 100%)',
                    }}
                >
                    {/* Grain texture overlay */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.035]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                            backgroundSize: '200px',
                        }}
                    />

                    {/* Warm radial glow */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(212,167,106,0.10) 0%, transparent 70%)',
                        }}
                    />

                    <div className="relative mx-auto max-w-6xl px-6 py-40 md:px-10">
                        <p className="fade-up fade-up-1 mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9914A]/70">
                            Fine Dining &amp; Boutique Stays
                        </p>

                        <h1 className="serif fade-up fade-up-2 text-5xl leading-tight text-white md:text-7xl lg:text-8xl">
                            Where every meal <br />
                            tells a{' '}
                            <em className="shimmer-text not-italic">story.</em>
                        </h1>

                        <p className="fade-up fade-up-3 mt-8 max-w-xl text-base leading-relaxed text-white/50 md:text-lg">
                            Fresh ingredients, warm hospitality, and a space that feels like home —
                            whether you're dining in, ordering ahead, or staying the night.
                        </p>

                        <div className="fade-up fade-up-4 mt-12 flex flex-wrap gap-4">
                            <Link
                                href="/menu"
                                className="rounded-full bg-[#D4A76A] px-8 py-3.5 text-sm font-bold text-[#1A1814] transition hover:brightness-110"
                            >
                                View Our Menu
                            </Link>
                            <Link
                                href="/rooms"
                                className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/80 backdrop-blur transition hover:border-white/30 hover:text-white"
                            >
                                Explore Rooms
                            </Link>
                        </div>

                        {/* Scroll hint */}
                        <div className="fade-up fade-up-4 absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-white">Scroll</span>
                            <div className="h-8 w-px animate-bounce bg-white/40" />
                        </div>
                    </div>
                </section>

                {/* ── Stats bar ────────────────────────────── */}
                <section className="border-b border-[#E8E8E4] bg-white">
                    <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[#E8E8E4] px-6 md:grid-cols-4">
                        {[
                            { value: 120, suffix: '+', label: 'Menu items' },
                            { value: 3, suffix: '', label: 'Boutique rooms' },
                            { value: 500, suffix: '+', label: 'Happy guests' },
                            { value: 5, suffix: '★', label: 'Average rating' },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center gap-1 px-6 py-8">
                                <span className="text-3xl font-bold text-[#1C1C1A]">
                                    <Counter end={stat.value} suffix={stat.suffix} />
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-widest text-[#A0A09A]">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Feature cards ────────────────────────── */}
                <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#A0A09A]">
                        Everything in one place
                    </p>
                    <h2 className="serif text-3xl text-[#1C1C1A] md:text-4xl">
                        What we offer
                    </h2>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2">
                        {FEATURES.map((feat) => (
                            <Link
                                key={feat.title}
                                href={feat.href}
                                className="group relative overflow-hidden rounded-3xl border border-[#E8E8E4] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#D8D8D4] hover:shadow-xl hover:shadow-black/5"
                            >
                                {/* Accent glow on hover */}
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
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ── Full-bleed split ─────────────────────── */}
                <section className="bg-[#1C1C1A]">
                    <div className="mx-auto grid max-w-6xl px-6 py-20 md:grid-cols-2 md:items-center md:gap-16 md:px-10">
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A76A]/60">Virtual rooms</p>
                            <h2 className="serif text-3xl text-white md:text-4xl">
                                Tour our rooms <br />
                                before you book.
                            </h2>
                            <p className="mt-5 text-sm leading-relaxed text-white/45">
                                Step inside with our interactive 360° viewer. Feel the ambience, check the space,
                                and book with total confidence — right from your phone or desktop.
                            </p>
                            <Link
                                href="/rooms"
                                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
                            >
                                Take a virtual tour
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        {/* Decorative room card */}
                        <div className="relative mt-12 h-72 overflow-hidden rounded-3xl md:mt-0">
                            <img
                                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200&auto=format&fit=crop"
                                alt="Luxury room"
                                className="h-full w-full object-cover brightness-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-5 left-5">
                                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Classic Comfort</p>
                                <p className="mt-1 font-semibold text-white">Room 101 — Available Now</p>
                            </div>
                            {/* 360 badge */}
                            <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                                <span className="text-xs font-bold text-white">360°</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Testimonials ─────────────────────────── */}
                <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#A0A09A]">Reviews</p>
                    <h2 className="serif text-3xl text-[#1C1C1A] md:text-4xl">Guests love us</h2>

                    <div className="mt-10 grid gap-5 sm:grid-cols-3">
                        {TESTIMONIALS.map((t) => (
                            <div
                                key={t.name}
                                className="rounded-3xl border border-[#E8E8E4] bg-white p-7"
                            >
                                <Stars count={t.rating} />
                                <p className="mt-4 text-sm leading-relaxed text-[#5C5C58]">"{t.quote}"</p>
                                <p className="mt-5 text-xs font-bold text-[#1C1C1A]">{t.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Final CTA banner ─────────────────────── */}
                <section className="mx-6 mb-16 overflow-hidden rounded-3xl md:mx-10">
                    <div
                        className="relative px-10 py-16 text-center"
                        style={{ background: 'linear-gradient(135deg, #D4A76A 0%, #B8824A 100%)' }}
                    >
                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.06]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                backgroundSize: '200px',
                            }}
                        />
                        <h2 className="serif relative text-3xl text-white md:text-4xl">
                            Ready to order?
                        </h2>
                        <p className="relative mt-3 text-sm text-white/75">
                            Fresh food, straight to your table or pickup location.
                        </p>
                        <Link
                            href="/menu"
                            className="relative mt-8 inline-block rounded-full bg-[#1C1C1A] px-10 py-3.5 text-sm font-bold text-white transition hover:bg-[#3C3C38]"
                        >
                            Browse the Menu
                        </Link>
                    </div>
                </section>

                {/* ── Footer ───────────────────────────────── */}
                <footer className="border-t border-[#E8E8E4] px-6 py-10 md:px-10">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
                        <span className="serif text-lg text-[#5C5C58]">
                            Kaldi<span className="opacity-40">&nbsp;·&nbsp;</span>Eats
                        </span>
                        <div className="flex gap-6">
                            {NAV_LINKS.map((l) => (
                                <Link key={l.label} href={l.href} className="text-xs font-medium text-[#A0A09A] hover:text-[#1C1C1A]">
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                        <p className="text-xs text-[#C0C0BA]">© {new Date().getFullYear()} All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
