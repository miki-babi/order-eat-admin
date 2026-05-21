import { ArrowRight, BikeIcon, DownloadIcon, FilterIcon, PrinterIcon, ShoppingBagIcon, XIcon } from "lucide-react";
import { useState } from "react";
import type { OrderRow } from "@/pages/staff/customer-orders";

export function OrderTable({ orders }: { orders: OrderRow[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null);

    const handleViewDetails = (order: OrderRow) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };

    return (
        <>
            <section className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm">
                <div className="px-8 py-6 border-b border-surface-container-low flex items-center justify-between">
                    <h3 className="font-headline font-bold text-lg">Order Ledger</h3>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                            <FilterIcon className="text-on-surface-variant" size={18} />
                        </button>
                        <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                            <DownloadIcon className="text-on-surface-variant" size={18} />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low/50">
                                <th className="px-8 py-4 font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Order ID</th>
                                <th className="px-6 py-4 font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Customer</th>
                                <th className="px-6 py-4 font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Type</th>
                                <th className="px-6 py-4 font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Items</th>
                                <th className="px-6 py-4 font-label text-[10px] tracking-widest text-on-surface-variant uppercase">Total</th>
                                <th className="px-6 py-4 font-label text-[10px] tracking-widest text-on-surface-variant uppercase text-center">Status</th>
                                <th className="px-8 py-4 font-label text-[10px] tracking-widest text-on-surface-variant uppercase text-right">Quick Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container-low">
                            {orders.map((order) => (
                                <tr key={order.id} className="order-ledger-row hover:bg-surface-container-low/30 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-label font-bold text-primary">#{order.id}</span>
                                            <span className="text-[10px] text-on-surface-variant font-medium">
                                                {order.created_at ? new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-headline font-bold text-on-surface">{order.customer_name || 'Guest'}</td>
                                    <td className="px-6 py-6">
                                        <span className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                                            {order.type === 'delivery' ? <BikeIcon className="text-sm" /> : <ShoppingBagIcon className="text-sm" />}
                                            {order.type === 'delivery' ? 'Delivery' : 'Pickup'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-sm text-on-surface-variant truncate max-w-[180px]" title={order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}>
                                            {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                        </p>
                                    </td>
                                    <td className="px-6 py-6 font-label font-bold">${Number(order.total_amount).toFixed(2)}</td>
                                    <td className="px-6 py-6 text-center">
                                        <span className={`status-badge px-3 py-1.5 rounded-full ${
                                            order.order_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.order_status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                                            order.order_status === 'ready' ? 'bg-emerald-100 text-emerald-800 animate-pulse' :
                                            order.order_status === 'completed' ? 'bg-zinc-100 text-zinc-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => handleViewDetails(order)}
                                            className="text-on-surface-variant text-[10px] font-label font-bold uppercase tracking-widest px-4 py-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {(!orders || orders.length === 0) && (
                                <tr>
                                    <td colSpan={7} className="px-8 py-6 text-center text-on-surface-variant">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4" 
                id="order-details-modal" 
                style={{ display: isOpen && selectedOrder ? 'flex' : 'none' }}
            >
                <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
                {selectedOrder && (
                    <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                        <div className="px-8 py-6 border-b border-surface-container-high flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-4">
                                <h2 className="font-headline text-2xl font-black text-on-surface tracking-tight">#{selectedOrder.id}</h2>
                                <span className={`status-badge px-3 py-1.5 rounded-full ${
                                    selectedOrder.order_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    selectedOrder.order_status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                                    selectedOrder.order_status === 'ready' ? 'bg-emerald-100 text-emerald-800 animate-pulse' :
                                    selectedOrder.order_status === 'completed' ? 'bg-zinc-100 text-zinc-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {selectedOrder.order_status.charAt(0).toUpperCase() + selectedOrder.order_status.slice(1)}
                                </span>
                            </div>
                            <button
                                className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant"
                                onClick={() => setIsOpen(false)}>
                                <XIcon size={20} />
                            </button>
                        </div>
                        <div className="p-8 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-12 mb-8">
                                <div className="space-y-4">
                                    <h3 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Customer Information</h3>
                                    <div className="space-y-1">
                                        <p className="font-headline font-bold text-lg">{selectedOrder.customer_name || 'Guest'}</p>
                                        <p className="text-sm text-on-surface-variant">{selectedOrder.customer_phone || 'N/A'}</p>
                                        {selectedOrder.type === 'delivery' && selectedOrder.pickup_location && (
                                            <p className="text-sm text-on-surface-variant leading-relaxed mt-2 italic">{selectedOrder.pickup_location}</p>
                                        )}
                                        {selectedOrder.type === 'pickup' && selectedOrder.pickup_location && (
                                            <p className="text-sm text-on-surface-variant leading-relaxed mt-2 italic">Pickup at: {selectedOrder.pickup_location}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Order Timeline</h3>
                                    <div className="space-y-3">
                                        <div className="flex gap-3">
                                            <div className="relative flex flex-col items-center">
                                                <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                                                {selectedOrder.order_status !== 'pending' && <div className="w-0.5 h-full bg-outline-variant"></div>}
                                            </div>
                                            <div className="pb-4">
                                                <p className="text-xs font-bold">Order Placed</p>
                                                <p className="text-[10px] text-on-surface-variant">
                                                    {selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                                </p>
                                            </div>
                                        </div>
                                        {['preparing', 'ready', 'completed'].includes(selectedOrder.order_status) && (
                                            <div className="flex gap-3">
                                                <div className="relative flex flex-col items-center">
                                                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold">Preparing</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-8">
                                <h3 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-4">Order Items</h3>
                                <div className="space-y-3">
                                    {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-surface-container-low">
                                            <div className="flex gap-4">
                                                <span className="font-bold text-primary">{item.quantity}x</span>
                                                <span className="text-sm font-medium">{item.name}</span>
                                            </div>
                                            <span className="font-label text-sm font-bold">${Number(item.line_total).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-surface-container-low p-6 rounded-xl space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-on-surface-variant">Subtotal</span>
                                    <span className="font-bold">${Number(selectedOrder.total_amount).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-on-surface-variant">Tax</span>
                                    <span className="font-bold">$0.00</span>
                                </div>
                                <div className="pt-2 mt-2 border-t border-outline-variant flex justify-between items-center">
                                    <span className="font-bold">Total</span>
                                    <span className="text-xl font-black text-primary">${Number(selectedOrder.total_amount).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="px-8 py-6 bg-surface-container-high/30 flex gap-4 shrink-0 mt-auto">
                            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-outline rounded-xl font-label font-bold text-xs uppercase tracking-widest hover:bg-surface-container-low transition-colors">
                                <PrinterIcon size={16} />
                                Print Ticket
                            </button>
                            <button className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-label font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                Advance Status <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}