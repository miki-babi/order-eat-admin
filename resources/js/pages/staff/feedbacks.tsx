import { Head,  router } from '@inertiajs/react';
import { format } from 'date-fns';
import { MessageSquare,  User, Calendar,  History } from 'lucide-react';
import { CustomerHistoryModal, type SelectedCustomer } from '@/components/staff/customer-history-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type PaginationData<T> = {
    data: T[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
};

type Feedback = {
    id: number;
    rating: 'satisfied' | 'unsatisfied';
    comment: string | null;
    customer_id: number | null;
    order_id: number | null;
    created_at: string;
    customer?: {
        name: string;
        phone: string;
    };
    order?: {
        tracking_token: string;
    };
};

// function currency(value: number): string {
//     return new Intl.NumberFormat('en-ET', {
//         style: 'currency',
//         currency: 'ETB',
//         maximumFractionDigits: 2,
//     }).format(value);
// }

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Feedback Box',
        href: '/staff/feedbacks',
    },
];

export default function Feedbacks({
    feedbacks,
    selectedCustomer,
}: {
    feedbacks: PaginationData<Feedback>;
    selectedCustomer: SelectedCustomer | null;
}) {
    const closeHistoryModal = () => {
        if (typeof window === 'undefined') {
            router.get('/staff/feedbacks', {}, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
            return;
        }

        const params = new URLSearchParams(window.location.search);
        params.delete('customer_id');
        const nextQuery = params.toString();
        const nextUrl = nextQuery.length > 0 ? `/staff/feedbacks?${nextQuery}` : '/staff/feedbacks';

        router.get(nextUrl, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer Feedback" />
            <div className="space-y-6 bg-zinc-50/50 p-6 min-h-screen">
                <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-700">
                            <MessageSquare className="size-4 text-[#F57C00]" />
                            Guest Feedback box
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-zinc-600">
                            Review internal feedback and complaints from your customers.
                        </p>
                    </CardContent>
                </Card>

                <div className="grid gap-4">
                    {feedbacks.data.length === 0 ? (
                        <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-zinc-500">
                                <MessageSquare className="size-12 mb-4 opacity-20" />
                                <p>No feedback received yet.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        feedbacks.data.map((feedback: Feedback) => {
                            
                            return (
                            <Card key={feedback.id} className="border-none shadow-sm ring-1 ring-zinc-200 transition-all hover:ring-zinc-300">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                        <div className="space-y-3 flex-1">
                                            <div className="flex items-center gap-3">
                                                <Badge 
                                                    variant={feedback.rating === 'satisfied' ? 'default' : 'destructive'}
                                                    className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                                        feedback.rating === 'satisfied' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100' : ''
                                                    }`}
                                                >
                                                    {feedback.rating === 'satisfied' ? 'Satisfied' : 'Complaint'}
                                                </Badge>
                                                <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                                                    <Calendar className="size-3" />
                                                    {format(new Date(feedback.created_at), 'PPP p')}
                                                </span>
                                            </div>

                                            {feedback.comment ? (
                                                <p className="text-zinc-800 text-sm leading-relaxed font-medium">
                                                    "{feedback.comment}"
                                                </p>
                                            ) : (
                                                <p className="text-zinc-400 text-sm italic">
                                                    No comment provided.
                                                </p>
                                            )}

                                            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-100 mt-4">
                                                <div className="flex flex-wrap gap-4">
                                                    {feedback.customer && (
                                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                            <div className="size-6 rounded-full bg-zinc-100 flex items-center justify-center">
                                                                <User className="size-3 text-zinc-400" />
                                                            </div>
                                                            <span className="font-medium text-zinc-700">{feedback.customer.name}</span>
                                                        </div>
                                                    )}
                                                    {feedback.order && (
                                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                            <span className="px-2 py-1 bg-zinc-100 rounded-md text-[10px] font-mono text-zinc-600">
                                                                Order: {feedback.order.tracking_token.substring(0, 8)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {feedback.customer_id && (
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="text-xs h-8 text-[#F57C00] hover:text-white gap-1 rounded-xl hover:bg-[#F57C00]"
                                                        onClick={() => {
                                                            router.get('/staff/feedbacks', { customer_id: feedback.customer_id }, {
                                                                preserveState: true,
                                                                preserveScroll: true,
                                                                replace: true,
                                                            });
                                                        }}
                                                    >
                                                        <History className="size-3.5" />
                                                        View Customer Profile
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            );
                        })
                    )}
                </div>

                {feedbacks.links && feedbacks.links.length > 3 && (
                    <div className="flex justify-center pt-6">
                        {/* Simple pagination or use a Pagination component if available */}
                        <div className="flex gap-2">
                            {feedbacks.links.map((link: any, i: number) => (
                                <Button
                                    key={i}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    className={`rounded-lg h-8 ${link.active ? 'bg-[#F57C00] hover:bg-[#E65100]' : ''}`}
                                    disabled={!link.url}
                                    onClick={() => link.url && (window.location.href = link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* 📌 Customer History Modal */}
                <CustomerHistoryModal
                    customer={selectedCustomer}
                    onClose={closeHistoryModal}
                />
            </div>
        </AppLayout>
    );
}
