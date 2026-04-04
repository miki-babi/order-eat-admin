import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';

type Room = {
    id: string;
    name: string;
    capacity: number;
    status: 'Available' | 'Occupied' | 'Maintenance' | string;
    image?: string;
    price?: string;
};

const ROOM_IMAGES: Record<string, string> = {
    'room-101': 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
    'room-102': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop',
    'room-201': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
};

export default function RoomsIndex({ rooms }: { rooms: Room[] }) {
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        // Warm up the heavy virtual tour bundle while user is browsing rooms.
        const timer = window.setTimeout(() => {
            void import('@/components/rooms/virtual-tour-viewer');
        }, 350);

        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <Head title="Explore Rooms" />

            <div className="min-h-screen bg-[#FDFDFC] px-6 py-12 text-[#1C1C1C] md:px-12 lg:px-24">
                <main className="mx-auto max-w-7xl">
                    <header className="mb-12">
                        <div className="flex items-center gap-2 text-sm font-medium tracking-wide text-[#646464] uppercase transition-all">
                            <span className="h-px w-8 bg-[#E5E5E5]"></span>
                            Luxury Stay
                        </div>
                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
                            Our Curated <span className="text-[#A1A1A1]">Collection</span>
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#646464]">
                            Discover spaces designed for comfort and refined taste. From standard rooms to grand suites, 
                            each space offers a unique experience.
                        </p>
                    </header>

                    <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {rooms.map((room) => (
                            <Link
                                key={room.id}
                                href={`/room/${room.id}`}
                                prefetch={['hover', 'mount']}
                                className="group block h-full overflow-hidden rounded-[24px] border border-[#E5E5E5] bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#D1D1D1] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={ROOM_IMAGES[room.id] || ROOM_IMAGES['room-101']}
                                        alt={room.name}
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 group-hover:scale-105 transition-transform duration-300">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase backdrop-blur-md ${
                                            room.status === 'Available' 
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                                : 'bg-white/90 text-slate-700 border border-white'
                                        }`}>
                                            {room.status}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-[#111111]">{room.name}</h2>
                                            <p className="mt-1 text-sm font-medium text-[#888888]">
                                                Capacity: {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-lg font-black text-[#111111]">
                                                {room.price || '$240'}
                                            </span>
                                            <span className="text-[10px] font-bold text-[#A1A1A1] uppercase tracking-widest">
                                                / night
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <svg key={s} className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-sm font-bold text-[#111111] group-hover:translate-x-1 transition-transform duration-300">
                                            View Details →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </section>
                </main>
            </div>
        </>
    );
}

