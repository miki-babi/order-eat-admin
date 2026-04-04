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

const HDR_IMAGE = '/virtual-tour/lobby.hdr';

export default function RoomShow({ roomId }: { roomId: string }) {
    const [VirtualTourViewer, setVirtualTourViewer] = useState<ComponentType<VirtualTourViewerProps> | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);

    const initialNodeId = useMemo<TourNodeId>(() => {
        if (roomId === 'room-102') {
            return 'hallway';
        }

        if (roomId === 'room-201') {
            return 'suite';
        }

        return 'lobby';
    }, [roomId]);

    const initialPanorama = useMemo(() => {
        if (initialNodeId === 'hallway') {
            return '/virtual-tour/hallway.jpg';
        }

        if (initialNodeId === 'suite') {
            return '/virtual-tour/suite-interior.jpg';
        }

        return '/virtual-tour/lobby.jpg';
    }, [initialNodeId]);

    useEffect(() => {
        let active = true;

        if (typeof window === 'undefined') {
            return;
        }

        void import('@/components/rooms/virtual-tour-viewer')
            .then((module: VirtualTourViewerModule) => {
                if (active) {
                    setVirtualTourViewer(() => module.default);
                }
            })
            .catch(() => {
                if (active) {
                    setLoadError('Virtual tour dependencies are missing. Install packages and reload.');
                }
            });

        return () => {
            active = false;
        };
    }, []);

    return (
        <>
            <Head title={`Room ${roomId}`}>
                <link rel="preload" as="image" href={initialPanorama} />
            </Head>

            <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 md:px-10">
                <main className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Room Demo</p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight">Room ID: {roomId}</h1>
                    <p className="mt-4 text-sm text-slate-600">
                        This room uses images from <code>nilenest-ai/public</code> (excluding <code>suite.jpg</code>).
                    </p>

                    <div className="mt-6">
                        {VirtualTourViewer ? (
                            <VirtualTourViewer initialNodeId={initialNodeId} />
                        ) : (
                            <div className="flex h-[58vh] min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center text-sm font-semibold text-slate-600">
                                {loadError ?? 'Loading virtual room...'}
                            </div>
                        )}
                    </div>

                    <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Image Set In Use</p>
                        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {TOUR_IMAGE_SET.map((imagePath) => (
                                <a
                                    key={imagePath}
                                    href={imagePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block overflow-hidden rounded-lg border border-slate-200 bg-white"
                                >
                                    <img
                                        src={imagePath}
                                        alt={imagePath.split('/').pop() ?? 'tour-image'}
                                        loading="lazy"
                                        className="h-24 w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                    />
                                    <p className="truncate px-2 py-1 text-[10px] font-semibold text-slate-600">
                                        {imagePath.split('/').pop() ?? imagePath}
                                    </p>
                                </a>
                            ))}
                        </div>
                        <a
                            href={HDR_IMAGE}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block text-xs font-semibold text-slate-700 underline underline-offset-2"
                        >
                            Open HDR source: lobby.hdr
                        </a>
                    </section>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        <Link
                            href="/rooms"
                            className="rounded-xl bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-slate-700"
                        >
                            Back to rooms
                        </Link>
                        <Link
                            href="/room/room-101"
                            className="rounded-xl border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Open sample room
                        </Link>
                        <Link
                            href="/room/room-201"
                            className="rounded-xl border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Open suite room
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
}
