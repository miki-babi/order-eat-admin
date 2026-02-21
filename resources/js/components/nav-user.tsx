import { usePage } from '@inertiajs/react';
import { ChevronsUpDown, ShieldCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { useIsMobile } from '@/hooks/use-mobile';

export function NavUser() {
    const { auth } = usePage().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();
    const getInitials = useInitials();

    const user = auth.user;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="h-14 w-full rounded-2xl bg-[#212121] text-white shadow-xl ring-1 ring-white/10 transition-all hover:bg-[#212121] hover:scale-[0.98] data-[state=open]:bg-[#212121]"
                            data-test="sidebar-menu-button"
                        >
                            <div className="flex w-full items-center gap-3">
                                <Avatar className="size-9 border-2 border-[#F57C00] shadow-sm">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="bg-zinc-800 text-[10px] font-black uppercase text-white">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-1 flex-col text-left">
                                    <span className="truncate text-[11px] font-black uppercase tracking-wider text-white">
                                        {user.name}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <ShieldCheck className="size-2.5 text-[#F57C00]" />
                                        <span className="truncate text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">
                                            Operator Level
                                        </span>
                                    </div>
                                </div>
                                <ChevronsUpDown className="ml-auto size-3.5 text-zinc-500" />
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-2xl border-none shadow-2xl ring-1 ring-zinc-200"
                        align="end"
                        side={
                            isMobile
                                ? 'bottom'
                                : state === 'collapsed'
                                    ? 'left'
                                    : 'bottom'
                        }
                    >
                        <UserMenuContent user={user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
