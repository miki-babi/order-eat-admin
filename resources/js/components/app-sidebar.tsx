import { Link, usePage } from '@inertiajs/react';
import { BarChart3, ClipboardList, Coffee, ConciergeBell, KeyRound, MapPin, MessageSquareText, MonitorSmartphone, QrCode, Shield, Store, Users, UtensilsCrossed, Wallet } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavGroup, NavItem } from '@/types';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Customer Experience',
        href: '/',
        icon: Store,
    },

];

export function AppSidebar() {
    const { auth } = usePage<{
        auth?: {
            user?: {
                permission_slugs?: string[];
                is_admin?: boolean;
                is_system_admin?: boolean;
            } | null;
        };
    }>().props;

    const permissionSlugs = auth?.user?.permission_slugs ?? [];
    const isAdmin = Boolean(auth?.user?.is_admin);
    const isSystemAdmin = Boolean(auth?.user?.is_system_admin);
    const can = (permissionSlug: string): boolean => isAdmin || permissionSlugs.includes(permissionSlug);

    const mainNavGroups: NavGroup[] = [
        {
            label: 'Orders',
            items: [
                ...(can('orders.view')
                    ? [{ title: 'Order Queue', href: '/staff/orders', icon: ClipboardList }]
                    : []),
                ...(can('orders.view')
                    ? [{ title: 'Waiter Board', href: '/staff/waiter-board', icon: ConciergeBell }]
                    : []),
                ...(can('orders.view')
                    ? [{ title: 'Kitchen Board', href: '/staff/kitchen-board', icon: UtensilsCrossed }]
                    : []),
                ...(can('orders.view')
                    ? [{ title: 'Cashier Board', href: '/staff/cashier-board', icon: Wallet }]
                    : []),
                ...(can('orders.view')
                    ? [{ title: 'Cake Preorders', href: '/staff/cake-preorders', icon: Coffee }]
                    : []),
                ...(can('orders.view')
                    ? [{ title: 'Catering Requests', href: '/staff/catering-requests', icon: UtensilsCrossed }]
                    : []),
            ],
        },
        {
            label: 'Management',
            items: [
                ...(can('menu_items.manage')
                    ? [{ title: 'Catalog', href: '/staff/menu-items', icon: Coffee }]
                    : []),
                ...(can('customers.view')
                    ? [{ title: 'Customers', href: '/staff/customers', icon: Users }]
                    : []),
                ...(can('sms_templates.manage')
                    ? [{ title: 'Outreach', href: '/staff/sms-templates', icon: MessageSquareText }]
                    : []),
            ],
        },
        {
            label: 'Reports',
            items: [
                ...(can('reports.view')
                    ? [{ title: 'Insights', href: '/staff/reports', icon: BarChart3 }]
                    : []),
            ],
        },
        {
            label: 'Settings',
            items: [
                ...(can('menu_items.manage')
                    ? [{ title: 'Business', href: '/staff/business-settings', icon: Store }]
                    : []),
                ...(can('pickup_locations.manage')
                    ? [{ title: 'Branches', href: '/staff/pickup-locations', icon: MapPin }]
                    : []),
                ...(can('pickup_locations.manage')
                    ? [{ title: 'Tables', href: '/staff/table-qr', icon: QrCode }]
                    : []),
                ...(can('branches.assign')
                    ? [{ title: 'Screens', href: '/staff/screens', icon: MonitorSmartphone }]
                    : []),
                ...(can('users.manage') || can('roles.manage') || can('permissions.manage')
                    ? [{ title: 'Access Control', href: '/staff/access-control', icon: KeyRound }]
                    : []),
                ...(isSystemAdmin
                    ? [{ title: 'System Admin', href: '/__system-admin/dashboard', icon: Shield }]
                    : []),
            ],
        },
    ];
    const mainNavItems = mainNavGroups.flatMap((group) => group.items);

    const homeHref = isSystemAdmin
        ? '/__system-admin/dashboard'
        : mainNavItems[0]?.href ?? '/';

    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-white/50 backdrop-blur-xl border-r border-zinc-100">
            <SidebarHeader className="py-8">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href={homeHref} prefetch className="block transition-all hover:opacity-80">
                            <AppLogo />
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="flex-1">
                <NavMain groups={mainNavGroups} />
            </SidebarContent>

            <SidebarFooter className="p-4 space-y-4 border-t border-zinc-100/50">
                <NavFooter items={footerNavItems} />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
