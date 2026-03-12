import {
    Clock3,
    Search,
    Users,
    UtensilsCrossed,
    ChevronDown,
    ChevronUp,
    MoreHorizontal,
    Filter,
    Calendar,
    MapPin,
    Package,
    Phone,
    Edit3,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
} from '@/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

type CateringRequestRow = {
    id: number;
    customer_name: string | null;
    customer_phone: string | null;
    package_name: string | null;
    package_names: string[];
    event_date: string | null;
    guest_count: number;
    venue: string | null;
    status: string;
    special_instructions: string | null;
    created_at: string | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Paginated<T> = {
    data: T[];
    links: PaginationLink[];
    total: number;
    from: number | null;
    to: number | null;
};

type Summary = {
    total_packages: number;
    active_packages: number;
    total_requests: number;
    pending_requests: number;
    status_counts: Record<string, number>;
};

type Filters = {
    search?: string | null;
    status?: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Catering Requests',
        href: '/staff/catering-requests',
    },
];

function currency(value: number | null | undefined): string {
    if (value === null || value === undefined) return 'Price TBD';
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

function badgeStyle(status: string | null): string {
    const s = status?.toLowerCase() || '';
    if (s === 'pending') return 'bg-amber-100 text-amber-700 ring-amber-600/20';
    if (['preparing', 'approved', 'ready'].includes(s)) return 'bg-emerald-100 text-emerald-700 ring-emerald-600/20';
    if (s === 'completed') return 'bg-zinc-100 text-zinc-700 ring-zinc-600/20';
    if (['cancelled', 'rejected', 'disapproved'].includes(s)) return 'bg-rose-100 text-rose-700 ring-rose-600/20';
    return 'bg-zinc-100 text-zinc-700 ring-zinc-600/20';
}

export default function CateringRequests({
    requests,
    filters,
    statusOptions,
    canManagePackages,
    canUpdateRequests,
    summary,
}: {
    requests: Paginated<CateringRequestRow>;
    filters: Filters;
    statusOptions: string[];
    canManagePackages: boolean;
    canUpdateRequests: boolean;
    summary: Summary;
}) {
    const [expandedCards, setExpandedCards] = useState<number[]>([]);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const toggleCard = (requestId: number) => {
        setExpandedCards(prev =>
            prev.includes(requestId) ? prev.filter(id => id !== requestId) : [...prev, requestId]
        );
    };

    const filterForm = useForm({
        search: filters.search ?? '',
        status: filters.status ?? '',
    });

    const applyFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get('/staff/catering-requests', filterForm.data, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        filterForm.setData({
            search: '',
            status: '',
        });
        router.get('/staff/catering-requests', {}, {
            preserveState: true,
            replace: true,
        });
    };

    const updateRequestStatus = (requestId: number, status: string) => {
        router.patch(`/staff/catering-requests/${requestId}/status`, {
            status,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Catering Requests" />

            <div className="min-h-screen bg-[#FAFAFA] p-4 sm:p-6 lg:p-8 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
                            <UtensilsCrossed className="size-8 text-[#F57C00]" />
                            Catering Requests
                        </h1>
                        <p className="text-sm font-medium text-zinc-500">Manage institutional and event catering service requests.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button asChild className="h-12 rounded-xl bg-[#212121] text-white hover:bg-black font-bold px-6 shadow-lg shadow-zinc-200">
                            <Link href="/staff/catering-packages">
                                <Package className="mr-2 size-4" />
                                Manage Packages
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 hidden">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200 overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-zinc-50 text-zinc-400">
                                    <Clock3 className="size-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Pending Requests</p>
                                    <h3 className="text-2xl font-black text-zinc-900">{summary.pending_requests}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200 overflow-hidden bg-white hover:ring-[#F57C00]/30 transition-all group">
                        <Link href="/staff/catering-packages" className="block h-full">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-[#F57C00]/5 text-[#F57C00] group-hover:bg-[#F57C00]/10 transition-colors">
                                        <Package className="size-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Packages</p>
                                        <h3 className="text-2xl font-black text-zinc-900">{summary.active_packages}</h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200 overflow-hidden bg-white lg:col-span-2">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-zinc-50 text-zinc-400">
                                        <Users className="size-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Total Requests</p>
                                        <h3 className="text-2xl font-black text-zinc-900">{summary.total_requests}</h3>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <Badge variant="outline" className="rounded-full bg-emerald-50 text-emerald-700 border-none font-black text-[10px] px-3 py-1">
                                        HEALTHY VOLUME
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex bg-white p-1 gap-2 rounded-lg ring-1 ring-zinc-200 w-fit overflow-x-auto no-scrollbar">
                        {[
                            { label: 'All', value: '', count: summary.total_requests },
                            ...statusOptions.map(st => ({
                                label: st.charAt(0).toUpperCase() + st.slice(1),
                                value: st,
                                count: summary.status_counts[st] || 0
                            }))
                        ].map((tab) => {
                            const isActive = filterForm.data.status === tab.value;
                            return (
                                <Button
                                    key={tab.label}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        filterForm.setData('status', tab.value);
                                        router.get('/staff/catering-requests', { ...filterForm.data, status: tab.value }, { preserveState: true, replace: true });
                                    }}
                                    className={`relative rounded-lg px-6 h-9 text-xs font-bold transition-all shrink-0 ${isActive
                                        ? 'bg-[#F57C00] text-white shadow-md hover:bg-[#E65100] hover:text-white'
                                        : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                                        }`}
                                >
                                    {tab.label}
                                    {tab.count > 0 && (
                                        <span className={`absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-[10px] text-[10px] ring-1 ${isActive ? 'bg-white text-[#F57C00] ring-[#F57C00]' : 'bg-[#F57C00] text-white ring-white'}`}>
                                            {tab.count}
                                        </span>
                                    )}
                                </Button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                            className={`h-11 rounded-xl gap-2 font-bold transition-all ${isFiltersOpen ? 'bg-zinc-100 border-zinc-300 text-zinc-900' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'}`}
                        >
                            <Filter className="size-4" />
                            Filters
                            {isFiltersOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearFilters}
                            className="h-11 w-11 p-0 rounded-xl font-bold bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                        >
                            <Filter className="size-4 rotate-180 opacity-50" />
                        </Button>
                    </div>
                </div>

                {/* Filters Section */}
                <Collapsible open={isFiltersOpen}>
                    <CollapsibleContent className="animate-in slide-in-from-top-4 duration-300">
                        <Card className="border-none shadow-md ring-1 ring-zinc-200 overflow-hidden bg-white">
                            <form onSubmit={applyFilters} className="p-6">
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-2 lg:col-span-2">
                                        <Label htmlFor="search" className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Search Customer or Venue</Label>
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                                            <Input
                                                id="search"
                                                placeholder="Name, phone, or venue..."
                                                value={filterForm.data.search}
                                                onChange={(e) => filterForm.setData('search', e.target.value)}
                                                className="h-12 rounded-xl border border-zinc-100 bg-zinc-50/50 pl-11 pr-4 text-sm font-bold focus:bg-white transition-all outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-zinc-950"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-end">
                                        <Button type="submit" className="h-12 w-auto px-6 text-lg font-bold rounded-[1rem] bg-[#F57C00] text-white hover:bg-[#E65100] shadow-lg shadow-zinc-200">
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Card>
                    </CollapsibleContent>
                </Collapsible>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Clock3 className="size-4 text-[#F57C00]" />
                            Catering Service Requests
                        </h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Total: {requests.total}</span>
                    </div>

                    <div className="grid gap-4">
                        {requests.data.map((serviceRequest) => {
                            const isExpanded = expandedCards.includes(serviceRequest.id);
                            return (
                                <Card key={serviceRequest.id} className="group overflow-hidden border-none shadow-sm ring-1 ring-zinc-200 transition-all hover:ring-zinc-300 bg-white rounded-3xl"
                                    onClick={() => toggleCard(serviceRequest.id)}

                                >
                                    <div className="p-4 sm:p-5">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 group-hover:bg-[#F57C00]/10 group-hover:text-[#F57C00] transition-colors">
                                                    <UtensilsCrossed className="size-6" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h4 className="text-base font-black text-[#212121]">#{serviceRequest.id} — {serviceRequest.customer_name}</h4>
                                                        <Badge className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-tight shadow-none border-none ${badgeStyle(serviceRequest.status)}`}>
                                                            {serviceRequest.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-zinc-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar className="size-3.5" />
                                                            <span>Event: {serviceRequest.event_date ?? 'N/A'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Phone className="size-3.5" />
                                                            <span>{serviceRequest.customer_phone}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Users className="size-3.5" />
                                                            <span>{serviceRequest.guest_count} Guests</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 self-end sm:self-start">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-10 w-10 rounded-xl hover:bg-zinc-100">
                                                            <MoreHorizontal className="size-5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 shadow-xl ring-1 ring-black/5 border-none">
                                                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-3 py-2">Update Status</DropdownMenuLabel>
                                                        {statusOptions.map((status) => (
                                                            <DropdownMenuItem
                                                                key={status}
                                                                className="rounded-lg font-bold text-sm px-3 py-2 cursor-pointer capitalize"
                                                                onClick={() => updateRequestStatus(serviceRequest.id, status)}
                                                            >
                                                                {status}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toggleCard(serviceRequest.id)}
                                                    className="h-10 rounded-xl gap-2 font-bold bg-white text-zinc-600 border-zinc-200"
                                                >
                                                    {isExpanded ? 'Hide Details' : 'View Details'}
                                                    {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                                                </Button>
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <div className="mt-6 space-y-6 border-t border-zinc-50 pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div className="grid gap-6 md:grid-cols-2">
                                                    <div className="space-y-4">
                                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Catering Infrastructure</h4>
                                                        <div className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-100 space-y-4">
                                                            <div className="flex items-start gap-3">
                                                                <div className="p-2 rounded-lg bg-white shadow-sm">
                                                                    <MapPin className="size-4 text-[#F57C00]" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-black uppercase tracking-tight text-zinc-400">Venue Location</p>
                                                                    <p className="text-sm font-bold text-zinc-700 mt-0.5">{serviceRequest.venue ?? 'Not Specified'}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-start gap-3">
                                                                <div className="p-2 rounded-lg bg-white shadow-sm">
                                                                    <Package className="size-4 text-[#F57C00]" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-black uppercase tracking-tight text-zinc-400">Selected Tiers</p>
                                                                    <div className="flex flex-wrap gap-2 mt-1.5">
                                                                        {(serviceRequest.package_names.length > 0 ? serviceRequest.package_names : [serviceRequest.package_name]).filter(Boolean).map((pkg, idx) => (
                                                                            <Badge key={idx} variant="outline" className="bg-white border-zinc-200 text-zinc-700 px-3 py-0.5 rounded-lg text-[10px] font-black">
                                                                                {pkg}
                                                                            </Badge>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {serviceRequest.special_instructions && (
                                                        <div className="space-y-4">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Client Directives</h4>
                                                            <div className="rounded-2xl bg-amber-50/50 p-4 ring-1 ring-amber-100/50 h-full">
                                                                <div className="flex items-center gap-2 text-amber-700 mb-2">
                                                                    <Edit3 className="size-4" />
                                                                    <p className="text-[10px] font-black uppercase tracking-widest">Special Instructions</p>
                                                                </div>
                                                                <p className="text-sm text-zinc-700 leading-relaxed font-medium italic">
                                                                    "{serviceRequest.special_instructions}"
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200 pt-4">
                        <p className="text-sm text-zinc-600">
                            Showing {requests.from ?? 0}-{requests.to ?? 0} of {requests.total}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {requests.links.map((link) => (
                                <Button
                                    key={link.label}
                                    type="button"
                                    variant={link.active ? 'default' : 'outline'}
                                    className="h-8 rounded-lg px-3"
                                    disabled={!link.url}
                                    onClick={() => {
                                        if (link.url) {
                                            router.visit(link.url, { preserveScroll: true, preserveState: true });
                                        }
                                    }}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button asChild variant="outline" className="rounded-xl border-zinc-200">
                        <Link href="/staff/cake-preorders">Go to Cake Preorders</Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
