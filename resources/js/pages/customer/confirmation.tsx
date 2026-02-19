import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, Clock3, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type OrderItem = {
    id: number;
    name: string | null;
    quantity: number;
    price: number;
    line_total: number;
};

type Order = {
    id: number;
    tracking_token: string;
    pickup_date: string;
    pickup_location: {
        id: number | null;
        name: string | null;
        address: string | null;
    };
    customer: {
        name: string | null;
        phone: string | null;
    };
    receipt_status: 'pending' | 'approved' | 'disapproved';
    order_status: 'pending' | 'preparing' | 'ready' | 'completed';
    total_amount: number;
    items: OrderItem[];
};

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

export default function Confirmation({ order }: { order: Order }) {
    return (
        <>
            <Head title={`Order #${order.id} Confirmed`} />
            <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-white px-4 py-8">
                <div className="mx-auto w-full max-w-4xl space-y-5">
                    <Card className="border-green-200 bg-green-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-800">
                                <BadgeCheck className="size-5" />
                                Order Placed Successfully
                            </CardTitle>
                            <CardDescription className="text-green-700">
                                Your pickup order is confirmed. We sent an SMS tracking link to {order.customer.phone}.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-3 md:grid-cols-3">
                                <div className="rounded-md border p-3">
                                    <p className="text-muted-foreground text-xs uppercase">Order</p>
                                    <p className="font-medium">#{order.id}</p>
                                </div>
                                <div className="rounded-md border p-3">
                                    <p className="text-muted-foreground text-xs uppercase">Status</p>
                                    <Badge>{order.order_status}</Badge>
                                </div>
                                <div className="rounded-md border p-3">
                                    <p className="text-muted-foreground text-xs uppercase">Receipt</p>
                                    <Badge variant="secondary">{order.receipt_status}</Badge>
                                </div>
                            </div>

                            <div className="rounded-md border p-3">
                                <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                                    <Clock3 className="size-4" />
                                    Pickup
                                </p>
                                <p className="text-sm">Date: {order.pickup_date}</p>
                                <p className="text-sm">
                                    Location: {order.pickup_location.name} ({order.pickup_location.address})
                                </p>
                            </div>

                            <div className="space-y-2 rounded-md border p-3">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span>
                                            {item.name ?? 'Item'} x {item.quantity}
                                        </span>
                                        <span>{currency(item.line_total)}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between border-t pt-2 text-sm font-semibold">
                                    <span>Total</span>
                                    <span>{currency(order.total_amount)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-wrap gap-3">
                        <Link href={`/orders/${order.tracking_token}/track`}>
                            <Button className="gap-2">
                                <MapPin className="size-4" />
                                Track This Order
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline">Place Another Order</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
