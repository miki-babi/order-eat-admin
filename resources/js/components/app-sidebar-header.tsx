import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-zinc-100 bg-white/80 px-6 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14 md:px-8">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-[#F57C00] transition-colors" />
                <div className="h-4 w-px bg-zinc-200 hidden md:block" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden items-center gap-2 md:flex">
                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 ring-1 ring-emerald-100">
                        <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">System Live</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
