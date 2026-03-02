import { Link } from '@inertiajs/react';
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

    const renderItems = (items: NavItem[]) => (
        <SidebarMenu className="gap-2">
            {items.map((item) => {
                const active = isCurrentUrl(item.href);

                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={active}
                            tooltip={{ children: item.title }}
                            className={`h-11 rounded-xl px-4 transition-all duration-200 group/nav-item ${
                                active
                                    ? 'bg-[#212121] text-white shadow-lg shadow-[#212121]/10'
                                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-[#F57C00]'
                            }`}
                        >
                            <Link href={item.href} prefetch className="flex items-center gap-3">
                                {item.icon && (
                                    <item.icon
                                        className={`size-4.5 transition-transform duration-200 ${
                                            active ? 'text-[#F57C00]' : 'group-hover/nav-item:scale-110'
                                        }`}
                                    />
                                )}
                                <span
                                    className={`text-xs font-black uppercase tracking-widest ${
                                        active ? 'text-[#F57C00]' : 'text-zinc-600 group-hover/nav-item:text-[#F57C00]'
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
        <div className="space-y-1 px-1 py-2">
            {visibleGroups.map((group) => (
                <SidebarGroup key={group.label} className="px-2 py-2">
                    <SidebarGroupLabel className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                        {group.label}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>{renderItems(group.items)}</SidebarGroupContent>
                </SidebarGroup>
            ))}
        </div>
    );
}
