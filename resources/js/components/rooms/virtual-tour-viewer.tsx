import { Viewer } from '@photo-sphere-viewer/core';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import { useEffect, useRef, useState } from 'react';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/virtual-tour-plugin/index.css';

export type TourNodeId = 'lobby' | 'hallway' | 'suite';

const TOUR_NODES = [
    {
        id: 'lobby',
        panorama: '/virtual-tour/pano.jpg',
        name: 'Luxury Living Area',
        links: [{ nodeId: 'hallway', position: { yaw: 0.5, pitch: 0 } }],
    },
    {
        id: 'hallway',
        panorama: '/virtual-tour/hallway.jpg',
        name: 'Luxury Bathroom',
        links: [
            { nodeId: 'lobby', position: { yaw: Math.PI, pitch: 0 } },
            { nodeId: 'suite', position: { yaw: 0, pitch: 0 } },
        ],
    },
    {
        id: 'suite',
        panorama: '/virtual-tour/suite-interior.jpg',
        name: 'Imperial Bedroom',
        links: [{ nodeId: 'hallway', position: { yaw: Math.PI, pitch: 0 } }],
    },
];

type VirtualTourViewerProps = {
    initialNodeId: TourNodeId;
};

export default function VirtualTourViewer({ initialNodeId }: VirtualTourViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<Viewer | null>(null);
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [currentRoom, setCurrentRoom] = useState<string>('');

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Destroy any previous instance on re-mount (e.g. key change)
        if (viewerRef.current) {
            viewerRef.current.destroy();
            viewerRef.current = null;
        }

        let destroyed = false;

        try {
            const startNode = TOUR_NODES.find((n) => n.id === initialNodeId) ?? TOUR_NODES[0];

            const viewer = new Viewer({
                container,
                panorama: startNode.panorama,
                defaultZoomLvl: 30,
                navbar: ['zoom', 'fullscreen'],
                loadingTxt: 'Loading room...',
                plugins: [
                    [
                        VirtualTourPlugin,
                        {
                            positionMode: 'manual',
                            renderMode: '3d',
                            startNodeId: startNode.id,
                            preload: false,
                            nodes: TOUR_NODES,
                        },
                    ],
                ],
            });

            viewerRef.current = viewer;

            viewer.addEventListener('ready', () => {
                if (destroyed) return;
                setStatus('ready');
                setCurrentRoom(startNode.name);

                const plugin = viewer.getPlugin(VirtualTourPlugin) as {
                    addEventListener: (event: string, cb: (e: { node: { name: string } }) => void) => void;
                } | null;

                plugin?.addEventListener('node-changed', (e) => {
                    if (!destroyed) setCurrentRoom(e.node.name);
                });
            });

            viewer.addEventListener('panorama-error', () => {
                if (!destroyed) setStatus('error');
            });
        } catch (err) {
            console.error('[VirtualTourViewer] failed to create viewer', err);
            if (!destroyed) setStatus('error');
        }

        return () => {
            destroyed = true;
            if (viewerRef.current) {
                viewerRef.current.destroy();
                viewerRef.current = null;
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialNodeId]);

    return (
        <div className="relative h-[58vh] min-h-[420px] w-full overflow-hidden rounded-2xl">
            {/* PSV mounts here */}
            <div ref={containerRef} className="h-full w-full" />

            {/* Loading overlay */}
            {status === 'loading' && (
                <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-2xl bg-slate-950">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-white/70" />
                    <span className="text-sm font-semibold text-white/60">Loading virtual tour…</span>
                </div>
            )}

            {/* Error state */}
            {status === 'error' && (
                <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-2xl bg-slate-950">
                    <span className="text-2xl">⚠️</span>
                    <span className="text-sm font-semibold text-white/60">Failed to load panorama</span>
                </div>
            )}

            {/* Room label */}
            {status === 'ready' && currentRoom && (
                <div className="pointer-events-none absolute left-4 top-4 z-30 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {currentRoom}
                </div>
            )}

            {/* Instruction hint */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-slate-900/75 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                Click and drag to look around · Use arrows to move between rooms
            </div>
        </div>
    );
}
