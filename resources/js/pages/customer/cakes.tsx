import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CalendarDays, CakeSlice, Check, ChevronLeft, ChevronRight, ImagePlus, Phone, ShoppingBag, User } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import BusinessFooter from '@/components/customer/business-footer';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type CakePackage = {
    id: number;
    name: string;
    description: string | null;
    image_url: string | null;
    price: number;
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

const stepMeta: Array<{ id: WizardStep; title: string; hint: string }> = [
    { id: 1, title: 'Choose Cakes', hint: 'Select one or more packages' },
    { id: 2, title: 'Your Details', hint: 'Contact and date' },
    { id: 3, title: 'Review', hint: 'Confirm and submit' },
];

function currency(value: number): string {
    return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: 'ETB',
        maximumFractionDigits: 2,
    }).format(value);
}

function todayDate(): string {
    const now = new Date();
    const shifted = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    return shifted.toISOString().slice(0, 10);
}

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
    const [lineSelections, setLineSelections] = useState<Record<number, { size: string; servings: number; specification: string }>>({});
    const [stepError, setStepError] = useState<string | null>(null);

    const form = useForm<CakePreorderForm>({
        customer_token: customerToken,
        name: customerPrefill.name ?? '',
        phone: customerPrefill.phone ?? '',
        needed_date: todayDate(),
        special_instructions: '',
        items: [],
    });

    const selectedItems = useMemo(
        () =>
            Object.entries(lineSelections)
                .map(([rawPackageId, line]) => {
                    const packageId = Number(rawPackageId);
                    const currentPackage = packages.find((item) => item.id === packageId);

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
                .filter(
                    (
                        line,
                    ): line is {
                        cake_package_id: number;
                        quantity: number;
                        size: string;
                        servings: number;
                        specification: string;
                        package: CakePackage;
                        line_total: number;
                    } => Boolean(line),
                ),
        [lineSelections, packages],
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
                [packageId]: {
                    size: '',
                    servings: 1,
                    specification: '',
                },
            };
        });
    };

    const updateSize = (packageId: number, size: string) => {
        setStepError(null);
        setLineSelections((previous) => {
            const current = previous[packageId] ?? { size: '', servings: 1, specification: '' };

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
            const current = previous[packageId] ?? { size: '', servings: 1, specification: '' };

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
            const current = previous[packageId] ?? { size: '', servings: 1, specification: '' };

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
                setStep(1);
                setStepError(null);
                form.reset('special_instructions');
            },
        });
    };

    return (
        <>
            <Head title="Cake Preordering" />
            <div className="min-h-screen bg-[#FAFAFA] px-4 py-8 text-[#212121] md:px-8 md:py-10">
                <div className="mx-auto w-full max-w-6xl space-y-6">
                    <header className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 md:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-[#F57C00]">Special Services</p>
                                <h1 className="mt-2 text-3xl font-black tracking-tight">Cake Preordering Wizard</h1>
                                <p className="mt-2 max-w-2xl text-sm text-zinc-600">
                                    Complete the steps to select cakes, enter details, and submit your preorder.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button asChild variant="outline" className="rounded-xl border-zinc-200">
                                    <Link href="/">Main Menu</Link>
                                </Button>
                                <Button asChild className="rounded-xl bg-[#212121] text-white hover:bg-black">
                                    <Link href="/catering">Catering</Link>
                                </Button>
                            </div>
                        </div>
                    </header>

                    {flash?.success && (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                            {flash.success}
                        </div>
                    )}

                    {flash?.error && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                            {flash.error}
                        </div>
                    )}

                    <form className="space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 md:p-8" onSubmit={submit}>
                        <section className="grid gap-2 md:grid-cols-3">
                            {stepMeta.map((item) => {
                                const active = item.id === step;
                                const completed = item.id < step;

                                return (
                                    <article
                                        key={item.id}
                                        className={`rounded-2xl border px-4 py-3 ${
                                            active
                                                ? 'border-[#F57C00] bg-[#FFF3E0]'
                                                : completed
                                                  ? 'border-emerald-200 bg-emerald-50'
                                                  : 'border-zinc-200 bg-zinc-50'
                                        }`}
                                    >
                                        <p className="text-[11px] font-black uppercase tracking-widest text-zinc-500">Step {item.id}</p>
                                        <p className="mt-1 text-sm font-black text-zinc-900">{item.title}</p>
                                        <p className="mt-1 text-xs text-zinc-600">{item.hint}</p>
                                    </article>
                                );
                            })}
                        </section>

                        {step === 1 && (
                            <section className="space-y-4">
                                <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-500">
                                    <CakeSlice className="size-4 text-[#F57C00]" />
                                    Step 1: Choose Packages
                                </h2>

                                <div className="space-y-4">
                                    {packages.length === 0 && (
                                        <p className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-500">
                                            No cake packages are available right now.
                                        </p>
                                    )}

                                    {packages.map((pkg) => {
                                        const selected = lineSelections[pkg.id];

                                        return (
                                            <article key={pkg.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/50">
                                                <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100">
                                                    {pkg.image_url ? (
                                                        <img src={pkg.image_url} alt={pkg.name} className="h-full w-full object-cover" loading="lazy" />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-zinc-400">
                                                            <ImagePlus className="size-8" />
                                                        </div>
                                                    )}

                                                    {selected && (
                                                        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-1 text-[11px] font-black text-white">
                                                            <Check className="size-3" />
                                                            Selected
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="p-4">
                                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                                        <div>
                                                            <h3 className="text-base font-black text-zinc-900">{pkg.name}</h3>
                                                            {pkg.description ? (
                                                                <p className="mt-1 text-sm text-zinc-600">{pkg.description}</p>
                                                            ) : (
                                                                <p className="mt-1 text-sm text-zinc-500">Custom cake package for special occasions.</p>
                                                            )}
                                                        </div>
                                                        <span className="rounded-full bg-[#FFF3E0] px-3 py-1 text-xs font-black text-[#F57C00]">
                                                            {currency(pkg.price)}
                                                        </span>
                                                    </div>

                                                    <div className="mt-4">
                                                        <Button
                                                            type="button"
                                                            variant={selected ? 'outline' : 'default'}
                                                            className={selected ? 'rounded-xl border-zinc-300' : 'rounded-xl bg-[#212121] text-white hover:bg-black'}
                                                            onClick={() => togglePackage(pkg.id)}
                                                        >
                                                            {selected ? 'Remove Package' : 'Add Package'}
                                                        </Button>
                                                    </div>

                                                    {selected && (
                                                        <div className="mt-4">
                                                            <div className="grid gap-3 sm:grid-cols-2">
                                                                <div>
                                                                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500" htmlFor={`size-${pkg.id}`}>
                                                                        Cake Size
                                                                    </label>
                                                                    <Input
                                                                        id={`size-${pkg.id}`}
                                                                        value={selected.size}
                                                                        onChange={(event) => updateSize(pkg.id, event.target.value)}
                                                                        className="mt-2 h-10 rounded-xl border-zinc-200"
                                                                        placeholder="Small, Medium, Large, 2kg..."
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500" htmlFor={`servings-${pkg.id}`}>
                                                                        Servings
                                                                    </label>
                                                                    <Input
                                                                        id={`servings-${pkg.id}`}
                                                                        type="number"
                                                                        min={1}
                                                                        value={selected.servings}
                                                                        onChange={(event) => updateServings(pkg.id, Number(event.target.value))}
                                                                        className="mt-2 h-10 rounded-xl border-zinc-200"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <label className="mt-3 block text-xs font-black uppercase tracking-widest text-zinc-500" htmlFor={`spec-${pkg.id}`}>
                                                                Item Specification
                                                            </label>
                                                            <textarea
                                                                id={`spec-${pkg.id}`}
                                                                value={selected.specification}
                                                                onChange={(event) => updateSpecification(pkg.id, event.target.value)}
                                                                rows={3}
                                                                placeholder="Flavor, writing on cake, color, size notes..."
                                                                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-[#F57C00] focus:outline-none focus:ring-2 focus:ring-[#F57C00]/15"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>

                                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Current Selection</p>
                                    <div className="mt-3 space-y-2">
                                        {selectedItems.length === 0 && (
                                            <p className="text-sm text-zinc-500">No cake packages selected yet.</p>
                                        )}
                                        {selectedItems.map((item) => (
                                            <div key={item.cake_package_id} className="flex items-start justify-between gap-3 text-sm">
                                                <span className="font-semibold text-zinc-700">
                                                    {item.package.name}
                                                    <span className="block text-xs font-medium text-zinc-500">
                                                        Size: {item.size || 'N/A'} | Servings: {item.servings}
                                                    </span>
                                                </span>
                                                <span className="font-black text-zinc-900">{currency(item.line_total)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 border-t border-zinc-200 pt-3">
                                        <div className="flex items-center justify-between text-sm font-black">
                                            <span>Total</span>
                                            <span>{currency(totalAmount)}</span>
                                        </div>
                                    </div>
                                    <InputError message={form.errors.items} />
                                </div>
                            </section>
                        )}

                        {step === 2 && (
                            <section className="space-y-5">
                                <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-500">
                                    <ShoppingBag className="size-4 text-[#F57C00]" />
                                    Step 2: Your Details
                                </h2>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500" htmlFor="name">
                                            <User className="size-3.5" />
                                            Full Name
                                        </label>
                                        <Input
                                            id="name"
                                            value={form.data.name}
                                            onChange={(event) => form.setData('name', event.target.value)}
                                            className="h-11 rounded-xl border-zinc-200"
                                            placeholder="Your full name"
                                        />
                                        <InputError message={form.errors.name} />
                                    </div>

                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500" htmlFor="phone">
                                            <Phone className="size-3.5" />
                                            Phone Number
                                        </label>
                                        <Input
                                            id="phone"
                                            value={form.data.phone}
                                            onChange={(event) => form.setData('phone', event.target.value)}
                                            className="h-11 rounded-xl border-zinc-200"
                                            placeholder="+2519XXXXXXXX"
                                        />
                                        <InputError message={form.errors.phone} />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500" htmlFor="needed_date">
                                        <CalendarDays className="size-3.5" />
                                        Needed Date
                                    </label>
                                    <Input
                                        id="needed_date"
                                        type="date"
                                        min={todayDate()}
                                        value={form.data.needed_date}
                                        onChange={(event) => form.setData('needed_date', event.target.value)}
                                        className="h-11 rounded-xl border-zinc-200"
                                    />
                                    <InputError message={form.errors.needed_date} />
                                </div>

                                <div>
                                    <label className="mb-2 text-xs font-black uppercase tracking-widest text-zinc-500" htmlFor="special_instructions">
                                        General Notes
                                    </label>
                                    <textarea
                                        id="special_instructions"
                                        rows={4}
                                        value={form.data.special_instructions}
                                        onChange={(event) => form.setData('special_instructions', event.target.value)}
                                        className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm focus:border-[#F57C00] focus:outline-none focus:ring-2 focus:ring-[#F57C00]/15"
                                        placeholder="Delivery timing, pickup preferences, extra instructions..."
                                    />
                                    <InputError message={form.errors.special_instructions} />
                                </div>
                            </section>
                        )}

                        {step === 3 && (
                            <section className="space-y-5">
                                <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-500">
                                    <ShoppingBag className="size-4 text-[#F57C00]" />
                                    Step 3: Review and Submit
                                </h2>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Contact</p>
                                        <p className="mt-2 text-sm font-semibold text-zinc-800">{form.data.name || 'N/A'}</p>
                                        <p className="text-sm text-zinc-700">{form.data.phone || 'N/A'}</p>
                                        <p className="mt-2 text-sm text-zinc-700">Needed: {form.data.needed_date || 'N/A'}</p>
                                    </article>
                                    <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Notes</p>
                                        <p className="mt-2 text-sm text-zinc-700">
                                            {form.data.special_instructions.trim() !== '' ? form.data.special_instructions : 'No additional notes.'}
                                        </p>
                                    </article>
                                </div>

                                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Selected Cakes</p>
                                    <div className="mt-3 space-y-2">
                                        {selectedItems.map((item) => (
                                            <div key={item.cake_package_id} className="flex items-start justify-between gap-3 text-sm">
                                                <span className="font-semibold text-zinc-700">
                                                    {item.package.name}
                                                    <span className="block text-xs font-medium text-zinc-500">
                                                        Size: {item.size || 'N/A'} | Servings: {item.servings}
                                                    </span>
                                                    {item.specification.trim() !== '' && (
                                                        <span className="block text-xs font-medium text-zinc-500">Spec: {item.specification}</span>
                                                    )}
                                                </span>
                                                <span className="font-black text-zinc-900">{currency(item.line_total)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 border-t border-zinc-200 pt-3">
                                        <div className="flex items-center justify-between text-sm font-black">
                                            <span>Total</span>
                                            <span>{currency(totalAmount)}</span>
                                        </div>
                                    </div>
                                    <InputError message={form.errors.items} />
                                </div>
                            </section>
                        )}

                        {stepError && (
                            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                                {stepError}
                            </div>
                        )}

                        <section className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-4">
                            <div>
                                {step > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-xl border-zinc-200"
                                        onClick={() => {
                                            setStepError(null);
                                            setStep(step === 3 ? 2 : 1);
                                        }}
                                    >
                                        <ChevronLeft className="mr-1 size-4" />
                                        Back
                                    </Button>
                                )}
                            </div>

                            <div className="ml-auto flex gap-2">
                                {step === 1 && (
                                    <Button type="button" className="rounded-xl bg-[#212121] text-white hover:bg-black" onClick={goToStepTwo}>
                                        Next
                                        <ChevronRight className="ml-1 size-4" />
                                    </Button>
                                )}
                                {step === 2 && (
                                    <Button type="button" className="rounded-xl bg-[#212121] text-white hover:bg-black" onClick={goToStepThree}>
                                        Next
                                        <ChevronRight className="ml-1 size-4" />
                                    </Button>
                                )}
                                {step === 3 && (
                                    <Button
                                        type="submit"
                                        className="rounded-xl bg-[#F57C00] text-white hover:bg-[#E65100]"
                                        disabled={form.processing}
                                    >
                                        {form.processing ? 'Submitting Preorder...' : 'Submit Cake Preorder'}
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
