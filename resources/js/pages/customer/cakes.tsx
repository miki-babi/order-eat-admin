import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CalendarDays, Check, ChevronLeft, ChevronRight, ImagePlus, Layers, Phone, ShoppingBag, User } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import BusinessFooter from '@/components/customer/business-footer';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type CakeSubPackage = {
    id: number;
    parent_id: number;
    name: string;
    description: string | null;
    image_url: string | null;
    price: number | null;
};

type CakePackage = {
    id: number;
    parent_id: number | null;
    name: string;
    description: string | null;
    image_url: string | null;
    price: number | null;
    sub_packages: CakeSubPackage[];
};

type OrderableCakePackage = {
    id: number;
    name: string;
    description: string | null;
    image_url: string | null;
    price: number | null;
    group_name: string | null;
};

type SharedProps = {
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

type CakePreorderForm = {
    customer_token: string;
    name: string;
    phone: string;
    needed_date: string;
    special_instructions: string;
    items: Array<{
        cake_package_id: number;
        quantity: number;
        size: string;
        servings: number;
        specification: string;
    }>;
};

type WizardStep = 1 | 2 | 3;

type SelectionLine = {
    size: string;
    servings: number;
    specification: string;
};

type SelectedOrderLine = {
    cake_package_id: number;
    quantity: number;
    size: string;
    servings: number;
    specification: string;
    package: OrderableCakePackage;
    line_total: number;
};

const stepMeta: Array<{ id: WizardStep; title: string; hint: string }> = [
    { id: 1, title: 'Choose Cakes', hint: 'Select one or more packages' },
    { id: 2, title: 'Your Details', hint: 'Contact and date' },
    { id: 3, title: 'Review', hint: 'Confirm and submit' },
];

function currency(value: number | null | undefined): string {
    if (!value) return '';
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

function hasPrice(value: number | null | undefined): value is number {
    return typeof value === 'number' && value > 0;
}

function todayDate(): string {
    const now = new Date();
    const shifted = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    return shifted.toISOString().slice(0, 10);
}

const defaultSelectionLine: SelectionLine = {
    size: '',
    servings: 1,
    specification: '',
};

export default function Cakes({
    packages,
    customerToken,
    customerPrefill,
    business,
}: {
    packages: CakePackage[];
    customerToken: string;
    customerPrefill: {
        name: string | null;
        phone: string | null;
    };
    business: {
        business_name: string;
        description: string | null;
        contact_phone: string | null;
        contact_email: string | null;
        contact_address: string | null;
        socials: {
            facebook: string | null;
            instagram: string | null;
            tiktok: string | null;
            telegram: string | null;
            x: string | null;
        };
    };
}) {
    const { flash } = usePage<SharedProps>().props;
    const [step, setStep] = useState<WizardStep>(1);
    const [lineSelections, setLineSelections] = useState<Record<number, SelectionLine>>({});
    const [expandedPackageGroups, setExpandedPackageGroups] = useState<Record<number, boolean>>({});
    const [stepError, setStepError] = useState<string | null>(null);

    const form = useForm<CakePreorderForm>({
        customer_token: customerToken,
        name: customerPrefill.name ?? '',
        phone: customerPrefill.phone ?? '',
        needed_date: todayDate(),
        special_instructions: '',
        items: [],
    });

    const orderablePackages = useMemo(() => {
        return packages.flatMap<OrderableCakePackage>((pkg) => {
            if (pkg.sub_packages.length > 0) {
                return pkg.sub_packages.map((subPackage) => ({
                    id: subPackage.id,
                    name: subPackage.name,
                    description: subPackage.description,
                    image_url: subPackage.image_url,
                    price: subPackage.price,
                    group_name: pkg.name,
                }));
            }

            return [
                {
                    id: pkg.id,
                    name: pkg.name,
                    description: pkg.description,
                    image_url: pkg.image_url,
                    price: pkg.price,
                    group_name: null,
                },
            ];
        });
    }, [packages]);

    const orderablePackageMap = useMemo(() => {
        return orderablePackages.reduce<Map<number, OrderableCakePackage>>((accumulator, currentPackage) => {
            accumulator.set(currentPackage.id, currentPackage);

            return accumulator;
        }, new Map<number, OrderableCakePackage>());
    }, [orderablePackages]);

    const selectedItems = useMemo(
        () =>
            Object.entries(lineSelections)
                .map(([rawPackageId, line]) => {
                    const packageId = Number(rawPackageId);
                    const currentPackage = orderablePackageMap.get(packageId);

                    if (!currentPackage) {
                        return null;
                    }

                    return {
                        cake_package_id: packageId,
                        quantity: 1,
                        size: line.size,
                        servings: line.servings,
                        specification: line.specification,
                        package: currentPackage,
                        line_total: currentPackage.price,
                    };
                })
                .filter((line): line is SelectedOrderLine => Boolean(line)),
        [lineSelections, orderablePackageMap],
    );

    const totalAmount = selectedItems.reduce((sum, line) => sum + line.line_total, 0);

    const togglePackage = (packageId: number) => {
        setStepError(null);
        setLineSelections((previous) => {
            if (previous[packageId]) {
                const next = { ...previous };
                delete next[packageId];

                return next;
            }

            return {
                ...previous,
                [packageId]: { ...defaultSelectionLine },
            };
        });
    };

    const togglePackageGroup = (packageId: number) => {
        setExpandedPackageGroups((previous) => ({
            ...previous,
            [packageId]: !previous[packageId],
        }));
    };

    const updateSize = (packageId: number, size: string) => {
        setStepError(null);
        setLineSelections((previous) => {
            const current = previous[packageId] ?? defaultSelectionLine;

            return {
                ...previous,
                [packageId]: {
                    ...current,
                    size,
                },
            };
        });
    };

    const updateServings = (packageId: number, servings: number) => {
        setStepError(null);
        setLineSelections((previous) => {
            const current = previous[packageId] ?? defaultSelectionLine;

            return {
                ...previous,
                [packageId]: {
                    ...current,
                    servings: Number.isFinite(servings) && servings > 0 ? servings : 1,
                },
            };
        });
    };

    const updateSpecification = (packageId: number, specification: string) => {
        setStepError(null);
        setLineSelections((previous) => {
            const current = previous[packageId] ?? defaultSelectionLine;

            return {
                ...previous,
                [packageId]: {
                    ...current,
                    specification,
                },
            };
        });
    };

    const validateItems = (): boolean => {
        if (selectedItems.length === 0) {
            setStepError('Select at least one cake package before continuing.');
            return false;
        }

        if (selectedItems.some((item) => item.size.trim() === '' || item.servings < 1)) {
            setStepError('Enter size and servings for each selected cake package.');
            return false;
        }

        return true;
    };

    const validateContact = (): boolean => {
        if (form.data.name.trim() === '' || form.data.phone.trim() === '' || form.data.needed_date.trim() === '') {
            setStepError('Enter your name, phone, and needed date before continuing.');
            return false;
        }

        return true;
    };

    const goToStepTwo = () => {
        if (!validateItems()) {
            setStep(1);
            return;
        }

        setStepError(null);
        setStep(2);
    };

    const goToStepThree = () => {
        if (!validateItems()) {
            setStep(1);
            return;
        }

        if (!validateContact()) {
            setStep(2);
            return;
        }

        setStepError(null);
        setStep(3);
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateItems()) {
            setStep(1);
            return;
        }

        if (!validateContact()) {
            setStep(2);
            return;
        }

        setStepError(null);

        form.transform((data) => ({
            ...data,
            items: selectedItems.map((item) => ({
                cake_package_id: item.cake_package_id,
                quantity: 1,
                size: item.size.trim(),
                servings: item.servings,
                specification: item.specification,
            })),
        }));

        form.post('/cakes/preorders', {
            preserveScroll: true,
            onSuccess: () => {
                setLineSelections({});
                setExpandedPackageGroups({});
                setStep(1);
                setStepError(null);
                form.reset('special_instructions');
            },
        });
    };

    return (
        <>
            <Head title="Cake Preordering" />
            <div className="min-h-screen bg-zinc-50/50 px-4 pb-20 pt-6 text-[#212121] md:px-8 md:py-10">
                <div className="mx-auto w-full max-w-4xl space-y-8">
                    <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className="h-1 w-8 rounded-full bg-[#F57C00]" />
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F57C00]">{business.business_name}</p>
                            </div>
                            <h1 className="text-3xl font-black tracking-tight md:text-4xl">Order Your Cake</h1>
                        </div>
                        <div className=" hidden flex items-center gap-3">
                            <Button asChild variant="ghost" className="h-12 rounded-2xl px-6 text-zinc-500 hover:bg-zinc-100 md:h-11">
                                <Link href="/">Main Menu</Link>
                            </Button>
                            <Button asChild className="h-12 rounded-2xl bg-zinc-900 px-6 font-bold text-white shadow-xl shadow-zinc-900/10 hover:bg-black md:h-11">
                                <Link href="/catering">Catering</Link>
                            </Button>
                        </div>
                    </header>

                    {flash?.success && (
                        <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-sm font-bold text-emerald-800 backdrop-blur-sm">
                            <div className="flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                                <Check className="size-4" />
                            </div>
                            {flash.success}
                        </div>
                    )}

                    {flash?.error && (
                        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-800 backdrop-blur-sm">
                            {flash.error}
                        </div>
                    )}

                    <nav className="relative flex justify-between gap-2 px-1">
                        {stepMeta.map((item) => {
                            const active = item.id === step;
                            const completed = item.id < step;

                            return (
                                <div
                                    key={item.id}
                                    className={`relative flex flex-1 flex-col gap-2 transition-all duration-500 ${active ? 'opacity-100' : completed ? 'opacity-60' : 'opacity-40'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`flex size-6 items-center justify-center rounded-full text-[10px] font-black transition-all duration-300 ${active ? 'bg-[#F57C00] text-white shadow-lg shadow-[#F57C00]/20 scale-110' : completed ? 'bg-emerald-500 text-white' : 'bg-zinc-200 text-zinc-500'}`}>
                                            {completed ? <Check className="size-3.5" /> : item.id}
                                        </span>
                                        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-zinc-200">
                                            <div className={`h-full bg-[#F57C00] transition-all duration-500 ${active ? 'w-1/2' : completed ? 'w-full' : 'w-0'}`} />
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-wider ${active ? 'text-zinc-900' : 'text-zinc-500'}`}>
                                        {item.title}
                                    </span>
                                </div>
                            );
                        })}
                    </nav>

                    <form className="space-y-8" onSubmit={submit}>
                        {step === 1 && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="mb-6 flex items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-black tracking-tight text-zinc-900">Choose Cakes</h2>
                                        <p className="mt-1 text-sm text-zinc-500">Pick a package, browse sub-options where available, and customize your selection.</p>
                                    </div>
                                    {hasPrice(totalAmount) && (
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Total Amount</p>
                                            <p className="text-lg font-black text-[#F57C00]">{currency(totalAmount)}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    {packages.length === 0 && (
                                        <div className="flex flex-col items-center justify-center rounded-[1rem] border-2 border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-12 text-center">
                                            <ShoppingBag className="mb-4 size-12 text-zinc-300" />
                                            <p className="text-lg font-bold text-zinc-800">No cakes available</p>
                                            <p className="mt-1 text-sm text-zinc-500">We are currently updating our cake menu.</p>
                                        </div>
                                    )}

                                    {packages.map((pkg) => {
                                        const hasSubPackages = pkg.sub_packages.length > 0;

                                        if (!hasSubPackages) {
                                            const selected = lineSelections[pkg.id];

                                            return (
                                                <div
                                                    key={pkg.id}
                                                    className={`group relative flex flex-col overflow-hidden rounded-[1rem]  border transition-all duration-500 ${selected ? 'border-[#F57C00] bg-white shadow-2xl shadow-[#F57C00]/10 ring-4 ring-[#F57C00]/5' : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-lg'}`}
                                                >
                                                    <div className="flex flex-col sm:flex-row">
                                                        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden sm:aspect-square sm:w-56">
                                                            {pkg.image_url ? (
                                                                <img src={pkg.image_url} alt={pkg.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-zinc-200">
                                                                    <ImagePlus className="size-12" />
                                                                </div>
                                                            )}

                                                            <div className="absolute left-6 top-6 sm:left-4 sm:top-4">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => togglePackage(pkg.id)}
                                                                    className={`flex size-10 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${selected ? 'bg-[#F57C00] text-white scale-110' : 'bg-white text-zinc-400 hover:text-zinc-600 hover:scale-110'}`}
                                                                >
                                                                    {selected ? <Check className="size-6 font-black" /> : <ShoppingBag className="size-5" />}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-1 flex-col justify-center p-8 sm:p-6">
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="space-y-1">
                                                                    <h3 className={`text-xl font-black tracking-tight transition-colors sm:text-lg ${selected ? 'text-[#F57C00]' : 'text-zinc-900 group-hover:text-zinc-700'}`}>
                                                                        {pkg.name}
                                                                    </h3>
                                                                    <p className="max-w-md text-sm leading-relaxed text-zinc-500">
                                                                        {pkg.description ?? 'Artisanal cake hand-crafted for your most special moments.'}
                                                                    </p>
                                                                </div>
                                                                {hasPrice(pkg.price) && (
                                                                    <div className="text-right">
                                                                        <p className="text-sm font-black text-zinc-900 sm:text-base">{currency(pkg.price)}</p>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {!selected && (
                                                                // <div className="mt-6 flex sm:hidden">
                                                                //     <Button
                                                                //         type="button"
                                                                //         onClick={() => togglePackage(pkg.id)}
                                                                //         className="h-12 w-full rounded-2xl bg-zinc-900 px-6 font-bold text-white shadow-xl shadow-zinc-900/10 hover:bg-black"
                                                                //     >
                                                                //         Add to Order
                                                                //     </Button>
                                                                // </div>
                                                                <div className="mt-6 flex justify-end">
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => togglePackage(pkg.id)}
                                                                        className="h-10 rounded-[1rem]  px-6 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                                                                    >
                                                                        Add to Order
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {selected && (
                                                        <div className="animate-in slide-in-from-top-4 duration-500 border-t border-zinc-50 bg-zinc-50/30 p-8 sm:p-10">
                                                            <div className="grid gap-8 sm:grid-cols-2">
                                                                <div className="space-y-3">
                                                                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor={`size-${pkg.id}`}>
                                                                        Cake Size
                                                                    </label>
                                                                    <Input
                                                                        id={`size-${pkg.id}`}
                                                                        value={selected.size}
                                                                        onChange={(event) => updateSize(pkg.id, event.target.value)}
                                                                        className="h-14 rounded-2xl border-zinc-200 bg-white px-6 text-base shadow-sm focus:ring-[#F57C00]/20"
                                                                        placeholder="e.g. 2kg, Medium..."
                                                                    />
                                                                </div>
                                                                <div className="space-y-3">
                                                                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor={`servings-${pkg.id}`}>
                                                                        Servings
                                                                    </label>
                                                                    <Input
                                                                        id={`servings-${pkg.id}`}
                                                                        type="number"
                                                                        min={1}
                                                                        value={selected.servings}
                                                                        onChange={(event) => updateServings(pkg.id, Number(event.target.value))}
                                                                        className="h-14 rounded-2xl border-zinc-200 bg-white px-6 text-base shadow-sm focus:ring-[#F57C00]/20"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="mt-8 space-y-3">
                                                                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor={`spec-${pkg.id}`}>
                                                                    Personalization
                                                                </label>
                                                                <textarea
                                                                    id={`spec-${pkg.id}`}
                                                                    value={selected.specification}
                                                                    onChange={(event) => updateSpecification(pkg.id, event.target.value)}
                                                                    rows={3}
                                                                    placeholder="Writing on cake, color preferences, flavors..."
                                                                    className="w-full rounded-[2rem] border border-zinc-200 bg-white px-8 py-5 text-base shadow-sm focus:border-[#F57C00] focus:outline-none focus:ring-4 focus:ring-[#F57C00]/10 placeholder:text-zinc-300"
                                                                />
                                                            </div>

                                                            <div className="mt-6 flex justify-end">
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    className="h-10 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-600"
                                                                    onClick={() => togglePackage(pkg.id)}
                                                                >
                                                                    Remove Item
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }

                                        const isExpanded = Boolean(expandedPackageGroups[pkg.id]);
                                        const selectedSubPackages = pkg.sub_packages.filter((subPackage) => lineSelections[subPackage.id]).length;

                                        return (
                                            <div
                                                key={pkg.id}
                                                className="overflow-hidden rounded-[1rem] border border-zinc-200 bg-white transition-all duration-500 hover:border-zinc-300 hover:shadow-lg"
                                            >
                                                <div className="flex flex-col sm:flex-row">
                                                    <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden sm:aspect-square sm:w-56">
                                                        {pkg.image_url ? (
                                                            <img src={pkg.image_url} alt={pkg.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-zinc-200">
                                                                <Layers className="size-12" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-1 flex-col justify-between p-8 sm:p-6">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="inline-flex rounded-full bg-[#F57C00]/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#F57C00]">
                                                                    {pkg.sub_packages.length} options
                                                                </span>
                                                                {selectedSubPackages > 0 && (
                                                                    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                                                                        {selectedSubPackages} selected
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <h3 className="text-xl font-black tracking-tight text-zinc-900 sm:text-lg">{pkg.name}</h3>
                                                            <p className="max-w-md text-sm leading-relaxed text-zinc-500">
                                                                {pkg.description ?? 'Choose from the available sub-packages to continue.'}
                                                            </p>
                                                        </div>

                                                        <div className="mt-6 flex justify-end">
                                                            <Button
                                                                type="button"
                                                                onClick={() => togglePackageGroup(pkg.id)}
                                                                className="h-10 rounded-[1rem]  px-6 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                                                            >
                                                                {isExpanded ? 'hide options' : 'See options'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {isExpanded && (
                                                    <div className="animate-in slide-in-from-top-4 border-t border-zinc-100 bg-zinc-50/40 p-6 duration-500 sm:p-8">
                                                        <div className="grid gap-5 md:grid-cols-2">
                                                            {pkg.sub_packages.map((subPackage) => {
                                                                const selected = lineSelections[subPackage.id];

                                                                return (
                                                                    <div
                                                                        key={subPackage.id}
                                                                        className={`overflow-hidden rounded-3xl border bg-white transition-all duration-300 ${selected ? 'border-[#F57C00] shadow-xl shadow-[#F57C00]/10 ring-4 ring-[#F57C00]/5' : 'border-zinc-200 hover:border-zinc-300'}`}
                                                                    >
                                                                        <div className="relative aspect-[16/10] overflow-hidden">
                                                                            {subPackage.image_url ? (
                                                                                <img
                                                                                    src={subPackage.image_url}
                                                                                    alt={subPackage.name}
                                                                                    className="h-full w-full object-cover"
                                                                                    loading="lazy"
                                                                                />
                                                                            ) : (
                                                                                <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-zinc-200">
                                                                                    <ImagePlus className="size-10" />
                                                                                </div>
                                                                            )}
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => togglePackage(subPackage.id)}
                                                                                className={`absolute right-3 top-3 flex h-9 items-center justify-center rounded-full px-3 text-xs font-black uppercase tracking-wider shadow-lg transition-all ${selected ? 'bg-[#F57C00] text-white' : 'bg-white text-zinc-700 hover:bg-zinc-100'}`}
                                                                            >
                                                                                {selected ? 'Selected' : 'Select'}
                                                                            </button>
                                                                        </div>

                                                                        <div className="space-y-4 p-5">
                                                                            <div className="flex items-start justify-between gap-3">
                                                                                <div>
                                                                                    <h4 className="text-base font-black text-zinc-900">{subPackage.name}</h4>
                                                                                    <p className="mt-1 text-xs text-zinc-500">
                                                                                        {subPackage.description ?? 'Sub-package option'}
                                                                                    </p>
                                                                                </div>
                                                                                {hasPrice(subPackage.price) && (
                                                                                    <p className="text-sm font-black text-[#F57C00]">{currency(subPackage.price)}</p>
                                                                                )}
                                                                            </div>

                                                                            {selected && (
                                                                                <div className="space-y-4 border-t border-zinc-100 pt-4">
                                                                                    <div className="grid gap-4 sm:grid-cols-2">
                                                                                        <div className="space-y-2">
                                                                                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor={`size-${subPackage.id}`}>
                                                                                                Cake Size
                                                                                            </label>
                                                                                            <Input
                                                                                                id={`size-${subPackage.id}`}
                                                                                                value={selected.size}
                                                                                                onChange={(event) => updateSize(subPackage.id, event.target.value)}
                                                                                                className="h-11 rounded-xl border-zinc-200 bg-white px-4 text-sm"
                                                                                                placeholder="e.g. Medium"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor={`servings-${subPackage.id}`}>
                                                                                                Servings
                                                                                            </label>
                                                                                            <Input
                                                                                                id={`servings-${subPackage.id}`}
                                                                                                type="number"
                                                                                                min={1}
                                                                                                value={selected.servings}
                                                                                                onChange={(event) => updateServings(subPackage.id, Number(event.target.value))}
                                                                                                className="h-11 rounded-xl border-zinc-200 bg-white px-4 text-sm"
                                                                                            />
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="space-y-2">
                                                                                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor={`spec-${subPackage.id}`}>
                                                                                            Personalization
                                                                                        </label>
                                                                                        <textarea
                                                                                            id={`spec-${subPackage.id}`}
                                                                                            value={selected.specification}
                                                                                            onChange={(event) => updateSpecification(subPackage.id, event.target.value)}
                                                                                            rows={3}
                                                                                            placeholder="Writing on cake, color preferences, flavors..."
                                                                                            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-[#F57C00] focus:outline-none focus:ring-4 focus:ring-[#F57C00]/10"
                                                                                        />
                                                                                    </div>

                                                                                    <div className="flex justify-end">
                                                                                        <Button
                                                                                            type="button"
                                                                                            variant="ghost"
                                                                                            className="h-9 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-600"
                                                                                            onClick={() => togglePackage(subPackage.id)}
                                                                                        >
                                                                                            Remove Item
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <InputError message={form.errors.items} />
                            </section>
                        )}

                        {step === 2 && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                <div className="mb-6">
                                    <h2 className="text-xl font-black tracking-tight text-zinc-900">Your Details</h2>
                                    <p className="text-sm text-zinc-500 mt-1">Tell us who you are and when you need the cake.</p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor="name">
                                            <User className="size-3.5" />
                                            Full Name
                                        </label>
                                        <Input
                                            id="name"
                                            value={form.data.name}
                                            onChange={(event) => form.setData('name', event.target.value)}
                                            className="h-14 rounded-2xl border-zinc-200 bg-white px-4 text-base shadow-sm focus:ring-[#F57C00]/20"
                                            placeholder="Your name"
                                        />
                                        <InputError message={form.errors.name} />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor="phone">
                                            <Phone className="size-3.5" />
                                            Phone Number
                                        </label>
                                        <Input
                                            id="phone"
                                            value={form.data.phone}
                                            onChange={(event) => form.setData('phone', event.target.value)}
                                            className="h-14 rounded-[1rem] border-zinc-200 bg-white px-4 text-base shadow-sm focus:ring-[#F57C00]/20"
                                            placeholder="+251 ..."
                                        />
                                        <InputError message={form.errors.phone} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor="needed_date">
                                        <CalendarDays className="size-3.5" />
                                        Needed Date
                                    </label>
                                    <Input
                                        id="needed_date"
                                        type="date"
                                        min={todayDate()}
                                        value={form.data.needed_date}
                                        onChange={(event) => form.setData('needed_date', event.target.value)}
                                        className="h-14 rounded-[1rem] border-zinc-200 bg-white px-4 text-base shadow-sm focus:ring-[#F57C00]/20"
                                    />
                                    <InputError message={form.errors.needed_date} />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor="special_instructions">
                                        Notes
                                    </label>
                                    <textarea
                                        id="special_instructions"
                                        rows={4}
                                        value={form.data.special_instructions}
                                        onChange={(event) => form.setData('special_instructions', event.target.value)}
                                        className="w-full rounded-[1rem] border border-zinc-200 bg-white px-6 py-4 text-base shadow-sm focus:border-[#F57C00] focus:outline-none focus:ring-4 focus:ring-[#F57C00]/10 placeholder:text-zinc-300"
                                        placeholder="Any other details for your cake order?"
                                    />
                                    <InputError message={form.errors.special_instructions} />
                                </div>
                            </section>
                        )}

                        {step === 3 && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                <div className="mb-6">
                                    <h2 className="text-xl font-black tracking-tight text-zinc-900">Review Preorder</h2>
                                    <p className="text-sm text-zinc-500 mt-1">Please confirm your selection and details.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="overflow-hidden rounded-[1rem] border border-zinc-100 bg-white shadow-sm">
                                        <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-100">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F57C00]">Selected Cakes</p>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            {selectedItems.map((item) => (
                                                <div key={item.cake_package_id} className="flex items-start justify-between gap-4">
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-bold text-zinc-800">
                                                            {item.package.group_name ? `${item.package.group_name} / ${item.package.name}` : item.package.name}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            <span className="inline-flex rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500 uppercase">Size: {item.size || 'N/A'}</span>
                                                            <span className="inline-flex rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500 uppercase">Servings: {item.servings}</span>
                                                        </div>
                                                        {item.specification && (
                                                            <p className="text-xs italic text-zinc-500 mt-1 line-clamp-1">"{item.specification}"</p>
                                                        )}
                                                    </div>
                                                    {hasPrice(item.line_total) && (
                                                        <p className="text-sm font-black text-[#F57C00]">{currency(item.line_total)}</p>
                                                    )}
                                                </div>
                                            ))}
                                            {hasPrice(totalAmount) && (
                                                <div className="mt-4 border-t border-zinc-100 pt-4 flex items-center justify-between">
                                                    <p className="text-sm font-black uppercase tracking-widest text-zinc-400">Total Amount</p>
                                                    <p className="text-xl font-black text-zinc-900">{currency(totalAmount)}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="overflow-hidden rounded-[1rem] border border-zinc-100 bg-white shadow-sm">
                                            <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-100">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F57C00]">Contact Detail</p>
                                            </div>
                                            <div className="p-6 space-y-3">
                                                <div className="flex items-center gap-3 text-sm">
                                                    <User className="size-4 text-zinc-400" />
                                                    <span className="font-medium text-zinc-700">{form.data.name || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm">
                                                    <Phone className="size-4 text-zinc-400" />
                                                    <span className="font-medium text-zinc-700">{form.data.phone || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm">
                                                    <CalendarDays className="size-4 text-zinc-400" />
                                                    <span className="font-medium text-zinc-700">Needed {form.data.needed_date || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {form.data.special_instructions && (
                                            <div className="overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-sm">
                                                <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-100">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F57C00]">General Notes</p>
                                                </div>
                                                <div className="p-6">
                                                    <p className="text-sm text-zinc-600 leading-relaxed italic line-clamp-4">
                                                        "{form.data.special_instructions}"
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        )}

                        {stepError && (
                            <div className="animate-in fade-in zoom-in-95 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-800">
                                {stepError}
                            </div>
                        )}

                        <section className="flex items-center justify-between gap-4 pt-4 px-8">
                            <div>
                                {step > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="h-14 rounded-2xl px-8 font-bold text-zinc-500 hover:bg-zinc-100"
                                        onClick={() => {
                                            setStepError(null);
                                            setStep(step === 3 ? 2 : 1);
                                        }}
                                    >
                                        <ChevronLeft className="mr-2 size-5" />
                                        Back
                                    </Button>
                                )}
                            </div>

                            <div className="flex-1 sm:flex-initial flex justify-end">
                                {step === 1 && (
                                    <Button type="button"
                                        className="h-10 rounded-[1rem]  px-6 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                                        onClick={goToStepTwo}>
                                        Continue
                                        <ChevronRight className="ml-1 size-5" />
                                    </Button>


                                )}
                                {step === 2 && (
                                    <Button type="button"
                                        className="h-10 rounded-[1rem]  px-6 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                                        onClick={goToStepThree}>
                                        Review Detail
                                        <ChevronRight className="ml-2 size-5" />
                                    </Button>
                                )}
                                {step === 3 && (
                                    <Button
                                        type="submit"
                                        className="h-10 rounded-[1rem]  px-6 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                                        disabled={form.processing}
                                    >
                                        {form.processing ? 'Crafting Sweets...' : 'Place Preorder'}
                                    </Button>
                                )}
                            </div>
                        </section>
                    </form>

                    <BusinessFooter business={business} />
                </div>
            </div>
        </>
    );
}
