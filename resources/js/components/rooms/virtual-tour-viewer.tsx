import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/virtual-tour-plugin/index.css';

export type TourNodeId = 'lobby' | 'hallway' | 'suite';

type TourNode = {
    id: TourNodeId;
    panorama: string;
    name: string;
    links: Array<{
        nodeId: TourNodeId;
        position: {
            yaw: number;
            pitch: number;
        };
    }>;
    defaultYaw: number;
};

const TOUR_NODES: TourNode[] = [
    {
        id: 'lobby',
        panorama: '/virtual-tour/lobby.jpg',
        name: 'Luxury Living Area',
        links: [{ nodeId: 'hallway', position: { yaw: 0.5, pitch: 0 } }],
        defaultYaw: 0,
    },
    {
        id: 'hallway',
        panorama: '/virtual-tour/hallway.jpg',
        name: 'Luxury Bathroom',
        links: [
            { nodeId: 'lobby', position: { yaw: Math.PI, pitch: 0 } },
            { nodeId: 'suite', position: { yaw: 0, pitch: 0 } },
        ],
        defaultYaw: 0,
    },
    {
        id: 'suite',
        panorama: '/virtual-tour/suite-interior.jpg',
        name: 'Imperial Bedroom',
        links: [{ nodeId: 'hallway', position: { yaw: Math.PI, pitch: 0 } }],
        defaultYaw: Math.PI,
    },
];

type VirtualTourViewerProps = {
    initialNodeId: TourNodeId;
};

export default function VirtualTourViewer({ initialNodeId }: VirtualTourViewerProps) {
    const startNode = TOUR_NODES.find((node) => node.id === initialNodeId) ?? TOUR_NODES[0];

    return (
        <div className="relative h-[58vh] min-h-[420px] w-full overflow-hidden rounded-2xl border border-slate-300 bg-slate-950 shadow-sm">
            <ReactPhotoSphereViewer
                src={startNode.panorama}
                height="100%"
                width="100%"
                defaultZoomLvl={30}
                loadingTxt="Loading room..."
                navbar={['zoom', 'fullscreen']}
                plugins={[
                    [
                        VirtualTourPlugin,
                        {
                            positionMode: 'manual',
                            renderMode: '3d',
                            startNodeId: startNode.id,
                            // Load only the current node first; other rooms load when user navigates.
                            preload: false,
                            nodes: TOUR_NODES,
                        },
                    ],
                ]}
            />

            <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-slate-900/75 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                Click and drag to look around. Use 3D arrows to move between rooms.
            </div>
        </div>
    );
}
