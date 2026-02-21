import type { ComponentPropsWithoutRef } from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    return (
        <SidebarGroup
            {...props}
            className={`group-data-[collapsible=icon]:p-0 ${className || ''} py-4`}
        >
            <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                className="h-9 px-3 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-[#F57C00] group/footer-item"
                            >
                                <a
                                    href={toUrl(item.href)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3"
                                >
                                    {item.icon && (
                                        <item.icon className="size-4 opacity-70 transition-opacity group-hover/footer-item:opacity-100" />
                                    )}
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                                        {item.title}
                                    </span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
