import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Circle, Clock3, Upload } from 'lucide-react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Order = {
    id: number;
    tracking_token: string;
    pickup_date: string;
    pickup_location: {
        name: string | null;
        address: string | null;
    };
    customer: {
        name: string | null;
        phone: string | null;
    };
    receipt_url: string | null;
    receipt_status: 'pending' | 'approved' | 'disapproved';
    order_status: 'pending' | 'preparing' | 'ready' | 'completed';
    disapproval_reason: string | null;
    total_amount: number;
    created_at: string | null;
    items: Array<{
        id: number;
        name: string | null;
        quantity: number;
        line_total: number;
    }>;
};

type SharedProps = {
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

const orderStages = ['pending', 'preparing', 'ready', 'completed'] as const;

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

export default function Tracking({ order }: { order: Order }) {
    const { flash } = usePage<SharedProps>().props;
    const form = useForm<{ receipt: File | null }>({
        receipt: null,
    });

    const activeStageIndex = orderStages.indexOf(order.order_status);
    const showReceiptUploadSection = order.receipt_status !== 'approved';

    const uploadReceipt = () => {
        form.post(`/orders/${order.tracking_token}/receipt`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title={`Track Order #${order.id}`} />
            <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-white to-blue-50 px-4 py-8">
                <div className="mx-auto w-full max-w-4xl space-y-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Track Order #{order.id}</CardTitle>
                            <CardDescription>
                                Use this page to check status and upload payment receipt when needed.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1 text-sm">
                                <p>
                                    <span className="text-muted-foreground">Customer:</span> {order.customer.name}
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Phone:</span> {order.customer.phone}
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Pickup Date:</span> {order.pickup_date}
                                </p>
                                <p>
                                    <span className="text-muted-foreground">Pickup Location:</span>{' '}
                                    {order.pickup_location.name} ({order.pickup_location.address})
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-zinc-600">Order Status</span>
                                    <Badge>{order.order_status}</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-zinc-600">Receipt Status</span>
                                    <Badge variant="secondary">{order.receipt_status}</Badge>
                                </div>
                                <p className="text-sm font-semibold">Total: {currency(order.total_amount)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {flash?.success ? (
                        <div className="rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
                            {flash.success}
                        </div>
                    ) : null}
                    {flash?.error ? (
                        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                            {flash.error}
                        </div>
                    ) : null}

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Timeline</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {orderStages.map((stage, index) => (
                                <div key={stage} className="flex items-center gap-3">
                                    {index <= activeStageIndex ? (
                                        <CheckCircle2 className="size-5 text-green-600" />
                                    ) : (
                                        <Circle className="size-5 text-zinc-300" />
                                    )}
                                    <p
                                        className={`text-sm ${
                                            index <= activeStageIndex ? 'font-medium text-zinc-900' : 'text-zinc-500'
                                        }`}
                                    >
                                        {stage}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {order.receipt_status === 'disapproved' && order.disapproval_reason ? (
                        <Card className="border-red-200 bg-red-50">
                            <CardHeader>
                                <CardTitle className="text-red-800">Receipt Needs Re-upload</CardTitle>
                                <CardDescription className="text-red-700">
                                    Reason: {order.disapproval_reason}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ) : null}

                    {showReceiptUploadSection ? (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Upload className="size-5" />
                                    Receipt Upload
                                </CardTitle>
                                <CardDescription>
                                    Upload receipt if pending, missing, or disapproved.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {order.receipt_url ? (
                                    <p className="text-sm">
                                        Current receipt:{' '}
                                        <a
                                            className="text-blue-600 underline"
                                            href={order.receipt_url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View uploaded file
                                        </a>
                                    </p>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No receipt uploaded yet.</p>
                                )}
                                <div className="grid gap-2">
                                    <Label htmlFor="receipt">New Receipt Image</Label>
                                    <Input
                                        id="receipt"
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        onChange={(event) =>
                                            form.setData('receipt', event.target.files?.[0] ?? null)
                                        }
                                    />
                                    <InputError message={form.errors.receipt} />
                                </div>
                                <Button
                                    type="button"
                                    disabled={form.processing || !form.data.receipt}
                                    onClick={uploadReceipt}
                                >
                                    {form.processing ? 'Uploading...' : 'Upload Receipt'}
                                </Button>
                            </CardContent>
                        </Card>
                    ) : null}

                    <div className="flex flex-wrap gap-3">
                        <Link href="/">
                            <Button variant="outline">Back to Menu</Button>
                        </Link>
                        <Link href={`/orders/${order.tracking_token}/confirmation`}>
                            <Button variant="ghost" className="gap-2">
                                <Clock3 className="size-4" />
                                View Confirmation
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
