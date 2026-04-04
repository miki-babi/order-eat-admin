import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';

type Room = {
    id: string;
    name: string;
    capacity: number;
    status: string;
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
            <Head title="Rooms" />

            <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 md:px-10">
                <main className="mx-auto w-full max-w-4xl">
                    <h1 className="text-3xl font-black tracking-tight">Rooms Demo</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Demo route for <code>/rooms</code>. Click a room to open <code>/room/{"{roomId}"}</code>.
                    </p>

                    <section className="mt-8 grid gap-4 md:grid-cols-2">
                        {rooms.map((room) => (
                            <article
                                key={room.id}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold">{room.name}</h2>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                        {room.status}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-slate-600">Capacity: {room.capacity} guests</p>
                                <Link
                                    href={`/room/${room.id}`}
                                    prefetch={['hover', 'mount']}
                                    className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                                >
                                    Open room
                                </Link>
                            </article>
                        ))}
                    </section>
                </main>
            </div>
        </>
    );
}
