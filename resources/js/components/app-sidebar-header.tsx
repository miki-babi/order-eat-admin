import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-zinc-100/50 bg-white/60 px-4 backdrop-blur-xl transition-all md:h-16 md:px-8">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1 size-9 rounded-xl text-zinc-400 transition-all hover:bg-[#F57C00]/5 hover:text-[#F57C00] active:scale-95" />
                <div className="h-4 w-px bg-zinc-200" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden items-center gap-2 lg:flex">
                    <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-1 px-4">
                        <div className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">System Live</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
