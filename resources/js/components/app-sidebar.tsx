import { Link, usePage } from '@inertiajs/react';
import { BarChart3, ClipboardList, Coffee, ConciergeBell, KeyRound, MapPin, MessageSquareText, MonitorSmartphone, Package, QrCode, Search, Shield, Store, Users, UtensilsCrossed, Wallet } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem
    
} from '@/components/ui/sidebar';
import { toUrl } from '@/lib/utils';
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
                    ? [{
                        title: 'Kitchen Display',
                        icon: MonitorSmartphone,
                        items: [
                            { title: 'Order', href: '/staff/orders', icon: ClipboardList },
                            { title: 'Kitchen Board', href: '/staff/kitchen-board', icon: UtensilsCrossed },
                            { title: 'Waiter Board', href: '/staff/waiter-board', icon: ConciergeBell },
                            { title: 'Cashier Board', href: '/staff/cashier-board', icon: Wallet },
                        ]
                    }]
                    : []),
                // ...(can('orders.view')
                //     ? [{
                //         title: 'Cake Preorders',
                //         icon: Coffee,
                //         items: [
                //             { title: 'Preorder List', href: '/staff/cake-preorders', icon: ClipboardList },
                //             { title: 'Cake Packages', href: '/staff/cake-packages', icon: Package },
                //         ]
                //     }]
                //     : []),
                // ...(can('orders.view')
                //     ? [{
                //         title: 'Catering',
                //         icon: UtensilsCrossed,
                //         items: [
                //             { title: 'Requests', href: '/staff/catering-requests', icon: ClipboardList },
                //             { title: 'Catering Packages', href: '/staff/catering-packages', icon: Package },
                //         ]
                //     }]
                //     : []),
            ],
        },
        {
            label: 'Management',
            items: [
                ...(can('menu_items.manage')
                    ? [{ title: 'Menu', href: '/staff/menu-items', icon: Coffee }]
                    : []),
                ...(can('customers.view')
                    ? [{ title: 'Customers', href: '/staff/customers', icon: Users }]
                    : []),
                // ...(can('orders.view')
                //     ? [{ title: 'Feedback', href: '/staff/feedbacks', icon: MessageSquareText }]
                //     : []),
                ...(can('sms_templates.manage')
                    ? [{ title: 'Marketing', href: '/staff/sms-templates', icon: MessageSquareText }]
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

    const findFirstHref = (items: NavItem[]): string => {
        for (const item of items) {
            if (item.href) return toUrl(item.href);
            if (item.items && item.items.length > 0) {
                const nestedHref = findFirstHref(item.items);
                if (nestedHref !== '/') return nestedHref;
            }
        }
        return '/';
    };

    const homeHref = isSystemAdmin
        ? '/__system-admin/dashboard'
        : findFirstHref(mainNavItems);

    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r-0 bg-zinc-50/50 selection:bg-[#F57C00]/10">
            <SidebarHeader className="bg-white/40 backdrop-blur-md">
                <div className="flex flex-col gap-6 py-4">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Link href={homeHref} prefetch className="block transition-all hover:opacity-80 active:scale-95">
                                <AppLogo />
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    {/* Quick Search */}
                    <div className=" hidden px-4 group-data-[collapsible=icon]:hidden">
                        <div className="group relative flex items-center">
                            <Search className="absolute left-3 size-3.5 text-zinc-400 group-focus-within:text-[#F57C00] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search Intel..."
                                className="h-9 w-full rounded-xl border border-zinc-100 bg-white/50 pl-9 pr-3 text-[11px] font-bold tracking-tight placeholder:text-zinc-400 focus:border-[#F57C00]/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#F57C00]/5 transition-all"
                            />
                            <div className="absolute right-2 flex items-center gap-0.5 rounded-md border border-zinc-200 bg-zinc-50 px-1 py-0.5 text-[9px] font-black text-zinc-400">
                                <span>⌘</span>
                                <span>K</span>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="scrollbar-none bg-transparent">
                <NavMain groups={mainNavGroups} />
            </SidebarContent>

            <SidebarFooter className="border-t border-zinc-100/80 bg-white/40 p-4 backdrop-blur-md">
                <NavFooter items={footerNavItems} />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-100 to-transparent my-1 group-data-[collapsible=icon]:hidden" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
