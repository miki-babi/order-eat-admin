import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavGroup, NavItem } from '@/types';

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const { isCurrentUrl } = useCurrentUrl();
    const visibleGroups = groups.filter((group) => group.items.length > 0);

    // Default to the first group being open
    const [openGroup, setOpenGroup] = useState<string | null>(visibleGroups[0]?.label ?? null);

    const renderItems = (items: NavItem[]) => (
        <SidebarMenu className="gap-0.5">
            {items.map((item) => {
                const hasChildren = item.items && item.items.length > 0;
                const active = item.href ? isCurrentUrl(item.href) : false;
                const anyChildActive = hasChildren ? item.items!.some(child => child.href && isCurrentUrl(child.href)) : false;

                if (hasChildren) {
                    return (
                        <SidebarMenuItem key={item.title}>
                            <Collapsible asChild defaultOpen={anyChildActive} className="group/submenu">
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={{ children: item.title }}
                                            className="h-10 rounded-xl px-3 transition-all duration-300 group/nav-item text-zinc-500 hover:bg-zinc-100/50 hover:text-zinc-900 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center"
                                        >
                                            <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                                                {item.icon && (
                                                    <div className={`flex size-7 items-center justify-center rounded-lg transition-colors duration-300 ${anyChildActive ? 'bg-[#F57C00]/10 text-[#F57C00]' : 'bg-zinc-100/50 text-zinc-400 group-hover/nav-item:bg-white group-hover/nav-item:text-zinc-900 group-hover/nav-item:shadow-sm'}`}>
                                                        <item.icon className="size-4 shrink-0" />
                                                    </div>
                                                )}
                                                <span className={`text-[11px] font-bold uppercase tracking-wider flex-1 text-left group-data-[collapsible=icon]:hidden ${anyChildActive ? 'text-zinc-900' : 'text-zinc-500 group-hover/nav-item:text-zinc-900'}`}>
                                                    {item.title}
                                                </span>
                                                <ChevronRight className="size-3 ml-auto transition-transform duration-300 group-data-[state=open]/submenu:rotate-90 text-zinc-300 group-data-[collapsible=icon]:hidden" />
                                            </div>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="animate-in slide-in-from-left-2 duration-300">
                                        <SidebarMenuSub className="ml-6.5 mt-0.5 border-l border-zinc-100 pl-4 py-1 space-y-0.5">
                                            {item.items?.map((subItem) => {
                                                const subActive = subItem.href ? isCurrentUrl(subItem.href) : false;
                                                return (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={subActive}
                                                            className={`group/sub h-9 rounded-lg px-3 transition-all duration-300 ${subActive
                                                                ? 'bg-white text-[#F57C00] font-bold shadow-sm ring-1 ring-zinc-200/50'
                                                                : 'text-zinc-400 hover:bg-white hover:text-zinc-900 hover:shadow-sm'
                                                                }`}
                                                        >
                                                            <Link href={subItem.href || '#'} prefetch className="flex items-center gap-3">
                                                                <span className={`text-[10px] uppercase tracking-wide transition-colors ${subActive ? 'text-[#F57C00]' : 'group-hover/sub:text-zinc-900'}`}>
                                                                    {subItem.title}
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            </Collapsible>
                        </SidebarMenuItem>
                    );
                }

                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={active}
                            tooltip={{ children: item.title }}
                            className={`h-10 rounded-xl px-3 transition-all duration-300 group/nav-item group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center ${active
                                ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/50'
                                : 'text-zinc-500 hover:bg-zinc-100/50 hover:text-zinc-900'
                                }`}
                        >
                            <Link href={item.href || '#'} prefetch className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                                {item.icon && (
                                    <div className={`flex size-7 items-center justify-center rounded-lg transition-all duration-300 ${active ? 'bg-[#F57C00] text-white shadow-lg shadow-[#F57C00]/20' : 'bg-zinc-100/50 text-zinc-400 group-hover/nav-item:bg-white group-hover/nav-item:text-zinc-900 group-hover/nav-item:shadow-sm'}`}>
                                        <item.icon className="size-4 shrink-0 transition-transform group-hover/nav-item:scale-110" />
                                    </div>
                                )}
                                <span
                                    className={`text-[11px] font-bold uppercase tracking-wider group-data-[collapsible=icon]:hidden ${active ? 'text-zinc-900' : 'text-zinc-500 group-hover/nav-item:text-zinc-900'
                                        }`}
                                >
                                    {item.title}
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    );

    return (
        <div className="space-y-4 px-4 py-6 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-4">
            {visibleGroups.map((group) => {
                const isOpen = openGroup === group.label;

                return (
                    <div key={group.label} className="space-y-2">
                         <div className="px-3 group-data-[collapsible=icon]:hidden">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400/80">
                                {group.label}
                            </span>
                        </div>
                        <div className="group-data-[collapsible=icon]:mt-0">
                            {renderItems(group.items)}
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-100 to-transparent my-4 group-data-[collapsible=icon]:hidden opacity-50" />
                    </div>
                );
            })}
        </div>
    );
}
