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
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavGroup, NavItem } from '@/types';

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const { isCurrentUrl } = useCurrentUrl();
    const visibleGroups = groups.filter((group) => group.items.length > 0);

    // Default to the first group being open
    const [openGroup, setOpenGroup] = useState<string | null>(visibleGroups[0]?.label ?? null);

    const renderItems = (items: NavItem[]) => (
        <SidebarMenu className="gap-1">
            {items.map((item) => {
                const active = isCurrentUrl(item.href);

                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={active}
                            tooltip={{ children: item.title }}
                            className={`h-11 rounded-xl px-4 transition-all duration-200 group/nav-item ${active
                                    ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/10'
                                    : 'text-zinc-500 hover:bg-zinc-100/80 hover:text-[#F57C00]'
                                }`}
                        >
                            <Link href={item.href} prefetch className="flex items-center gap-3">
                                {item.icon && (
                                    <item.icon
                                        className={`size-4.5 transition-transform duration-200 ${active ? 'text-[#F57C00]' : 'group-hover/nav-item:scale-110'
                                            }`}
                                    />
                                )}
                                <span
                                    className={`text-[11px] font-bold uppercase tracking-wider ${active ? 'text-[#F57C00]' : 'text-zinc-600 group-hover/nav-item:text-[#F57C00]'
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
        <div className="space-y-1 px-3 py-2">
            {visibleGroups.map((group) => {
                const isOpen = openGroup === group.label;

                return (
                    <Collapsible
                        key={group.label}
                        open={isOpen}
                        onOpenChange={() => setOpenGroup(isOpen ? null : group.label)}
                        className="group/collapsible"
                    >
                        <SidebarGroup className="p-0">
                            <CollapsibleTrigger asChild>
                                <SidebarGroupLabel
                                    className="flex w-full cursor-pointer items-center justify-between py-6 hover:bg-zinc-50 rounded-lg transition-colors px-3 h-10"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover/collapsible:text-zinc-600">
                                        {group.label}
                                    </span>
                                    <ChevronRight className={`size-3.5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                                </SidebarGroupLabel>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarGroupContent className="mt-1 pb-4">
                                    {renderItems(group.items)}
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                );
            })}
        </div>
    );
}
