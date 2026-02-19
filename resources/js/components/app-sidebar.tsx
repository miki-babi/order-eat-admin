import { Link, usePage } from '@inertiajs/react';
import { BarChart3, ClipboardList, Coffee, KeyRound, MapPin, MessageSquareText, Store, Users } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Customer Menu',
        href: '/',
        icon: Store,
    },
    {
        title: 'Welcome Page',
        href: '/welcome',
        icon: BarChart3,
    },
];

export function AppSidebar() {
    const { auth } = usePage<{
        auth?: {
            user?: {
                permission_slugs?: string[];
                is_admin?: boolean;
            } | null;
        };
    }>().props;

    const permissionSlugs = auth?.user?.permission_slugs ?? [];
    const isAdmin = Boolean(auth?.user?.is_admin);
    const can = (permissionSlug: string): boolean => isAdmin || permissionSlugs.includes(permissionSlug);

    const mainNavItems: NavItem[] = [
        ...(can('orders.view')
            ? [{ title: 'Orders', href: '/staff/orders', icon: ClipboardList }]
            : []),
        ...(can('customers.view')
            ? [{ title: 'Customers', href: '/staff/customers', icon: Users }]
            : []),
        ...(can('pickup_locations.manage')
            ? [{ title: 'Pickup Locations', href: '/staff/pickup-locations', icon: MapPin }]
            : []),
        ...(can('menu_items.manage')
            ? [{ title: 'Menu Items', href: '/staff/menu-items', icon: Coffee }]
            : []),
        ...(can('reports.view')
            ? [{ title: 'Reports', href: '/staff/reports', icon: BarChart3 }]
            : []),
        ...(can('sms_templates.manage')
            ? [{ title: 'SMS Templates', href: '/staff/sms-templates', icon: MessageSquareText }]
            : []),
        ...(can('users.manage') || can('roles.manage') || can('permissions.manage')
            ? [{ title: 'Access Control', href: '/staff/access-control', icon: KeyRound }]
            : []),
    ];

    const homeHref = mainNavItems[0]?.href ?? '/';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={homeHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
