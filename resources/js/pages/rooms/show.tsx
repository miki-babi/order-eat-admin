import { Head, Link } from '@inertiajs/react';
import { type ComponentType, useEffect, useMemo, useState } from 'react';

type TourNodeId = 'lobby' | 'hallway' | 'suite';

type VirtualTourViewerProps = {
    initialNodeId: TourNodeId;
};

type VirtualTourViewerModule = {
    default: ComponentType<VirtualTourViewerProps>;
};

const TOUR_IMAGE_SET = [
    '/virtual-tour/lobby.jpg',
    '/virtual-tour/hallway.jpg',
    '/virtual-tour/suite-interior.jpg',
    '/virtual-tour/pano.jpg',
    '/virtual-tour/suite-bedroom.png',
    '/virtual-tour/suite-hallway.png',
    '/virtual-tour/suite-living.png',
] as const;

const ROOM_MAIN_IMAGES: Record<string, string> = {
    'room-101': 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
    'room-102': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop',
    'room-201': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
};

const AMENITIES = [
    { name: 'Ultra-fast WiFi', icon: '📶' },
    { name: '4K Smart TV', icon: '📺' },
    { name: 'Climate Control', icon: '🌡️' },
    { name: 'Mini Bar', icon: '🍸' },
    { name: 'Nespresso Machine', icon: '☕' },
    { name: 'Luxury Bathrobe', icon: '🧥' },
    { name: 'Safe Box', icon: '🔓' },
    { name: '24/7 Room Service', icon: '🛎️' },
];

export default function RoomShow({ roomId }: { roomId: string }) {
    const [VirtualTourViewer, setVirtualTourViewer] = useState<ComponentType<VirtualTourViewerProps> | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);

    const initialNodeId = useMemo<TourNodeId>(() => {
        if (roomId === 'room-102') return 'hallway';
        if (roomId === 'room-201') return 'suite';
        return 'lobby';
    }, [roomId]);

    const initialPanorama = useMemo(() => {
        if (initialNodeId === 'hallway') return '/virtual-tour/hallway.jpg';
        if (initialNodeId === 'suite') return '/virtual-tour/suite-interior.jpg';
        return '/virtual-tour/lobby.jpg';
    }, [initialNodeId]);

    useEffect(() => {
        let active = true;
        if (typeof window === 'undefined') return;

        void import('@/components/rooms/virtual-tour-viewer')
            .then((module: VirtualTourViewerModule) => {
                if (active) setVirtualTourViewer(() => module.default);
            })
            .catch(() => {
                if (active) setLoadError('Virtual tour dependencies are missing.');
            });

        return () => { active = false; };
    }, []);

    return (
        <>
            <Head title={`Room ${roomId} Details`}>
                <link rel="preload" as="image" href={initialPanorama} />
            </Head>

            <div className="min-h-screen bg-[#FDFDFC] text-[#1C1C1C]">
                {/* Hero Section */}
                <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                    <img 
                        src={ROOM_MAIN_IMAGES[roomId] || ROOM_MAIN_IMAGES['room-101']} 
                        alt="Room Hero"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24">
                        <div className="mx-auto max-w-7xl">
                            <Link 
                                href="/rooms" 
                                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
                            >
                                ← Back to Collection
                            </Link>
                            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
                                {roomId === 'room-201' ? 'The Grand Suite' : roomId === 'room-102' ? 'Deluxe Skyline' : 'Classic Comfort'}
                            </h1>
                            <div className="mt-6 flex flex-wrap gap-4">
                                <span className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-md">
                                    Room ID: {roomId}
                                </span>
                                <span className="rounded-full bg-emerald-500/80 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-md">
                                    Available Now
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-24">
                    <div className="grid gap-16 lg:grid-cols-[1fr_350px]">
                        <div>
                            {/* Description */}
                            <section>
                                <h2 className="text-2xl font-bold text-[#111111]">An Elevated Sanctuary</h2>
                                <p className="mt-6 text-lg leading-relaxed text-[#646464]">
                                    Experience the pinnacle of luxury in our meticulously designed {roomId}. 
                                    Every detail has been crafted to provide an atmosphere of serenity and sophistication, 
                                    from the hand-selected furnishings to the curated art pieces. 
                                    Whether you're here for business or leisure, this room offers the perfect balance 
                                    of functionality and aesthetic excellence.
                                </p>
                            </section>

                            {/* Virtual Tour */}
                            <section className="mt-16">
                                <header className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-[#111111]">360° Virtual Experience</h2>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1A1]">Immersive View</span>
                                </header>
                                <div className="mt-8 overflow-hidden rounded-[32px] border border-[#E5E5E5] bg-[#F8F8F8] shadow-2xl shadow-black/5">
                                    {VirtualTourViewer ? (
                                        <div className="aspect-video w-full">
                                            <VirtualTourViewer initialNodeId={initialNodeId} />
                                        </div>
                                    ) : (
                                        <div className="flex h-[500px] flex-col items-center justify-center gap-4 text-center">
                                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E5E5E5] border-t-[#111111]" />
                                            <p className="text-sm font-bold text-[#646464]">{loadError ?? 'Preparing your virtual tour...'}</p>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Image Grid */}
                            <section className="mt-16">
                                <h2 className="text-2xl font-bold text-[#111111]">Interior Gallery</h2>
                                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {TOUR_IMAGE_SET.map((imagePath, idx) => (
                                        <a
                                            key={imagePath}
                                            href={imagePath}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`group relative block overflow-hidden rounded-2xl border border-[#F0F0F0] ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                                        >
                                            <img
                                                src={imagePath}
                                                alt="Tour Detail"
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                                        </a>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-12">
                            <div className="rounded-[32px] border border-[#E5E5E5] bg-white p-8">
                                <h3 className="text-lg font-bold text-[#111111]">Premium Amenities</h3>
                                <div className="mt-6 grid gap-4">
                                    {AMENITIES.map((amenity) => (
                                        <div key={amenity.name} className="flex items-center gap-3">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F8F8] text-lg">
                                                {amenity.icon}
                                            </span>
                                            <span className="text-sm font-medium text-[#646464]">{amenity.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-10 w-full rounded-2xl bg-[#111111] py-4 text-sm font-bold text-white transition-all hover:bg-[#333333] hover:shadow-xl hover:shadow-black/10 active:scale-[0.98]">
                                    Book This Room
                                </button>
                                <p className="mt-4 text-center text-xs font-medium text-[#A1A1A1]">
                                    Best price guaranteed on our website.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="px-2 text-sm font-bold uppercase tracking-widest text-[#A1A1A1]">Other Rooms</h3>
                                <div className="grid gap-3">
                                    <Link href="/room/room-101" className="flex items-center gap-4 rounded-2xl border border-transparent p-2 transition-all hover:bg-white hover:border-[#E5E5E5]">
                                        <img src={ROOM_MAIN_IMAGES['room-101']} className="h-16 w-16 rounded-xl object-cover" alt="" />
                                        <div>
                                            <p className="text-sm font-bold">Classic Comfort</p>
                                            <p className="text-xs font-bold text-[#A1A1A1]">$240 / night</p>
                                        </div>
                                    </Link>
                                    <Link href="/room/room-201" className="flex items-center gap-4 rounded-2xl border border-transparent p-2 transition-all hover:bg-white hover:border-[#E5E5E5]">
                                        <img src={ROOM_MAIN_IMAGES['room-201']} className="h-16 w-16 rounded-xl object-cover" alt="" />
                                        <div>
                                            <p className="text-sm font-bold">The Grand Suite</p>
                                            <p className="text-xs font-bold text-[#A1A1A1]">$850 / night</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </>
    );
}

