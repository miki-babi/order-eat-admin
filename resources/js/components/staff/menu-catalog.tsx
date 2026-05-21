import type { MenuItemRow } from '@/pages/staff/menu-items';

export default function MenuCatalog({
    items,
    startEdit,
    deleteItem,
    visibilityChannelLabel,
}: {
    items: MenuItemRow[];
    startEdit: (item: MenuItemRow) => void;
    deleteItem: (item: MenuItemRow) => void;
    visibilityChannelLabel: (channel: string) => string;
}) {
    const currency = (amount: number) => {
        return new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB' }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.length === 0 ? (
                <div className="md:col-span-3 xl:col-span-4 py-20 text-center">
                    <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No products found matching your search</p>
                </div>
            ) : (
                items.map((item) => (
                    <article
                        key={item.id}
                        className={`bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col custom-shadow transition-transform hover:-translate-y-1 ${!item.is_active ? 'opacity-75 grayscale-[0.5]' : ''}`}
                    >
                        <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                            {item.image_url ? (
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                />
                            ) : (
                                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor">
                                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                </svg>
                            )}
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                <span className="px-2 py-1 bg-slate-900 text-[10px] font-bold text-white uppercase rounded">
                                    {item.category ?? 'General'}
                                </span>
                                <span className={`px-2 py-1 text-[10px] font-bold text-white uppercase rounded ${item.is_active ? 'bg-[#F57C00]' : 'bg-slate-400'}`}>
                                    {item.is_active ? 'Live' : 'Draft'}
                                </span>
                                {item.is_featured && (
                                    <span className="px-2 py-1 bg-amber-500 text-[10px] font-bold text-white uppercase rounded">
                                        Featured
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-lg font-bold text-slate-900 leading-tight">{item.name}</h3>
                                <span className="text-[#F57C00] font-bold text-sm">{currency(item.price)}</span>
                            </div>
                            <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                                {item.description || "No description provided for this catalog item."}
                            </p>
                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.visibility_channels.map((channel) => (
                                        <span key={`${item.id}-${channel}`} className="px-2 py-0.5 bg-[#F57C00]/10 text-[#F57C00] text-[10px] font-semibold rounded border border-[#F57C00]/10">
                                            {visibilityChannelLabel(channel)}
                                        </span>
                                    ))}
                                    {item.visibility_channels.length === 0 && (
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[10px] font-semibold rounded border border-slate-200">
                                            Not Assigned
                                        </span>
                                    )}
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div className="text-[10px] uppercase font-bold text-slate-400">
                                        <span className="block">Lifetime Demand</span>
                                        <span className="text-slate-900">{item.order_items_count} units sold</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => startEdit(item)}
                                            className="p-2 text-slate-400 hover:text-[#F57C00] hover:bg-slate-50 rounded-lg transition-colors"
                                            title="Edit Details"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor">
                                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => deleteItem(item)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Product"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor">
                                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))
            )}
        </div>
    );
}