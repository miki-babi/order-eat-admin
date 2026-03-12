import { useForm } from '@inertiajs/react';
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Send, X, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface FeedbackModalProps {
    orderId?: number;
    customerId?: number;
    customerToken?: string;
    trigger?: React.ReactNode;
}

export function FeedbackModal({ orderId, customerId, customerToken, trigger }: FeedbackModalProps) {
    const [step, setStep] = useState<'initial' | 'complaint' | 'success'>('initial');
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        rating: '' as 'satisfied' | 'unsatisfied' | '',
        comment: '',
        order_id: orderId,
        customer_id: customerId,
    });

    const handleRating = (rating: 'satisfied' | 'unsatisfied') => {
        if (rating === 'satisfied') {
            submitFeedback('satisfied');
        } else {
            setStep('complaint');
            setData('rating', 'unsatisfied');
        }
    };

    const submitFeedback = (rating: 'satisfied' | 'unsatisfied', comment?: string) => {
        const payload = {
            rating,
            comment: comment || data.comment,
            order_id: orderId,
            customer_id: customerId,
            customer_token: customerToken,
        };

        // We use a regular fetch or axios to avoid Inertia's page reload if we just want to redirect or show success
        fetch('/feedbacks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
            },
            body: JSON.stringify(payload),
        })
            .then(async (res) => {
                const result = await res.json();
                if (rating === 'satisfied' && result.redirect_url) {
                    toast.success(result.message);
                    setTimeout(() => {
                        window.location.href = result.redirect_url;
                    }, 1500);
                } else {
                    setStep('success');
                }
            })
            .catch(() => {
                toast.error('Something went wrong. Please try again.');
            });
    };

    const handleComplaintSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.comment.trim()) {
            toast.error('Please enter your feedback.');
            return;
        }
        submitFeedback('unsatisfied');
    };

    const closeAndReset = () => {
        setOpen(false);
        setTimeout(() => {
            setStep('initial');
            reset();
        }, 300);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" className="rounded-2xl gap-2 font-bold text-zinc-600 border-zinc-200">
                        <MessageSquare className="size-4" />
                        Feedback
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl border-none ring-1 ring-zinc-200 shadow-2xl">
                {step === 'initial' && (
                    <div className="py-6 flex flex-col items-center text-center space-y-6">
                        <div className="size-16 rounded-3xl bg-orange-50 flex items-center justify-center">
                            <Star className="size-8 text-[#F57C00] fill-[#F57C00]" />
                        </div>
                        <div className="space-y-2">
                            <DialogTitle className="text-xl font-black text-zinc-800">How was your experience?</DialogTitle>
                            <DialogDescription className="text-zinc-500 font-medium">
                                We'd love to hear your thoughts on our service.
                            </DialogDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full pt-4">
                            <Button
                                variant="outline"
                                className="h-24 flex-col gap-2 rounded-3xl border-zinc-100 bg-zinc-50/50 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all group"
                                onClick={() => handleRating('satisfied')}
                            >
                                <ThumbsUp className="size-6 text-zinc-400 group-hover:text-emerald-500" />
                                <span className="font-bold">Satisfied</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-24 flex-col gap-2 rounded-3xl border-zinc-100 bg-zinc-50/50 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all group"
                                onClick={() => handleRating('unsatisfied')}
                            >
                                <ThumbsDown className="size-6 text-zinc-400 group-hover:text-red-500" />
                                <span className="font-bold">Complaint</span>
                            </Button>
                        </div>
                    </div>
                )}

                {step === 'complaint' && (
                    <form onSubmit={handleComplaintSubmit} className="py-2 space-y-6">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-black text-zinc-800">We're sorry to hear that</DialogTitle>
                            <DialogDescription className="text-zinc-500 font-medium">
                                Please let us know what went wrong so we can improve.
                            </DialogDescription>
                        </DialogHeader>
                        <Textarea
                            placeholder="Type your feedback here..."
                            className="min-h-32 rounded-2xl border-zinc-200 focus-visible:ring-[#F57C00]/20 focus-visible:border-[#F57C00]"
                            value={data.comment}
                            onChange={(e) => setData('comment', e.target.value)}
                        />
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                className="flex-1 rounded-2xl font-bold h-12"
                                onClick={() => setStep('initial')}
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="flex-2 rounded-2xl bg-[#F57C00] hover:bg-[#E65100] text-white font-black h-12 gap-2"
                                disabled={processing}
                            >
                                <Send className="size-4" />
                                Submit Feedback
                            </Button>
                        </div>
                    </form>
                )}

                {step === 'success' && (
                    <div className="py-12 flex flex-col items-center text-center space-y-6">
                        <div className="size-20 rounded-full bg-emerald-50 flex items-center justify-center animate-in zoom-in duration-300">
                            <CheckCircle2 className="size-10 text-emerald-500" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-zinc-800">Thank You!</h3>
                            <p className="text-zinc-500 font-medium max-w-[240px]">
                                Your feedback has been received and will help us improve our service.
                            </p>
                        </div>
                        <Button
                            className="w-full rounded-2xl h-12 font-black bg-zinc-900 hover:bg-black text-white"
                            onClick={closeAndReset}
                        >
                            Close
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
