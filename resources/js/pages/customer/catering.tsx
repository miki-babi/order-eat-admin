import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CalendarDays, Check, ChevronLeft, ChevronRight, ImagePlus, MapPin, Phone, ShoppingBag, Users, User } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import BusinessFooter from '@/components/customer/business-footer';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type CateringPackage = {
    id: number;
    name: string;
    description: string | null;
    image_url: string | null;
};

type SharedProps = {
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

type CateringRequestForm = {
    customer_token: string;
    name: string;
    phone: string;
    package_ids: number[];
    event_date: string;
    guest_count: number | '';
    venue: string;
    special_instructions: string;
};

type WizardStep = 1 | 2 | 3;

const stepMeta: Array<{ id: WizardStep; title: string; hint: string }> = [
    { id: 1, title: 'Packages', hint: 'Select one or more packages' },
    { id: 2, title: 'Event & Contact', hint: 'Enter event details and contact info' },
    { id: 3, title: 'Review', hint: 'Confirm and submit request' },
];

function todayDate(): string {
    const now = new Date();
    const shifted = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    return shifted.toISOString().slice(0, 10);
}

export default function Catering({
    packages,
    customerToken,
    customerPrefill,
    business,
}: {
    packages: CateringPackage[];
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
    const [stepError, setStepError] = useState<string | null>(null);

    const form = useForm<CateringRequestForm>({
        customer_token: customerToken,
        name: customerPrefill.name ?? '',
        phone: customerPrefill.phone ?? '',
        package_ids: packages[0] ? [packages[0].id] : [],
        event_date: todayDate(),
        guest_count: 1,
        venue: '',
        special_instructions: '',
    });

    const selectedPackages = useMemo(
        () => packages.filter((item) => form.data.package_ids.includes(item.id)),
        [packages, form.data.package_ids],
    );

    const togglePackage = (packageId: number) => {
        setStepError(null);

        const alreadySelected = form.data.package_ids.includes(packageId);
        const nextPackageIds = alreadySelected
            ? form.data.package_ids.filter((id) => id !== packageId)
            : [...form.data.package_ids, packageId];

        form.setData('package_ids', nextPackageIds);
    };

    const validateStepOne = (): boolean => {
        if (form.data.package_ids.length === 0) {
            setStepError('Select at least one catering package before continuing.');
            return false;
        }

        return true;
    };

    const validateStepTwo = (): boolean => {
        if (form.data.event_date.trim() === '') {
            setStepError('Enter the event date before continuing.');
            return false;
        }

        if (typeof form.data.guest_count !== 'number' || form.data.guest_count < 1) {
            setStepError('Guest count must be at least 1.');
            return false;
        }

        if (form.data.name.trim() === '' || form.data.phone.trim() === '') {
            setStepError('Enter your full name and phone number before continuing.');
            return false;
        }

        return true;
    };

    const goToStepTwo = () => {
        if (!validateStepOne()) {
            setStep(1);
            return;
        }

        setStepError(null);
        setStep(2);
    };

    const goToStepThree = () => {
        if (!validateStepOne()) {
            setStep(1);
            return;
        }

        if (!validateStepTwo()) {
            setStep(2);
            return;
        }

        setStepError(null);
        setStep(3);
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateStepOne()) {
            setStep(1);
            return;
        }

        if (!validateStepTwo()) {
            setStep(2);
            return;
        }

        setStepError(null);

        form.post('/catering/requests', {
            preserveScroll: true,
            onSuccess: () => {
                setStep(1);
                setStepError(null);
                form.reset('special_instructions', 'venue');
            },
        });
    };

    return (
        <>
            <Head title="Catering Services" />
            <div className="min-h-screen bg-[#FAFAFA] px-4 py-8 text-[#212121] md:px-8 md:py-10">
                <div className="mx-auto w-full max-w-5xl space-y-6">
                    <header className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 md:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-[#F57C00]">Special Services</p>
                                <h1 className="mt-2 text-3xl font-black tracking-tight">Catering Request Wizard</h1>
                                <p className="mt-2 max-w-2xl text-sm text-zinc-600">
                                    Follow the steps to select packages, enter event/contact details, and submit your request.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button asChild variant="outline" className="rounded-xl border-zinc-200">
                                    <Link href="/">Main Menu</Link>
                                </Button>
                                <Button asChild className="rounded-xl bg-[#212121] text-white hover:bg-black">
                                    <Link href="/cakes">Cake Preorders</Link>
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
                                         {/* <p className="mt-1 text-xs text-zinc-600">{item.hint}</p> */}
                                    </article>
                                );
                            })}
                        </section>

                        {step === 1 && (
                            <section className="space-y-5">
                                <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-500">
                                    <ShoppingBag className="size-4 text-[#F57C00]" />
                                    Step 1: Select Packages
                                </h2>

                                <div>
                                    <label className="mb-2 block text-xs font-black uppercase tracking-widest text-zinc-500">
                                        Packages
                                    </label>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {packages.length === 0 && (
                                            <p className="sm:col-span-2 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-500">
                                                No catering packages are available right now.
                                            </p>
                                        )}

                                        {packages.map((pkg) => {
                                            const selected = form.data.package_ids.includes(pkg.id);

                                            return (
                                                <button
                                                    key={pkg.id}
                                                    type="button"
                                                    onClick={() => togglePackage(pkg.id)}
                                                    className={`overflow-hidden rounded-2xl border text-left transition ${
                                                        selected
                                                            ? 'border-[#F57C00] ring-2 ring-[#F57C00]/20'
                                                            : 'border-zinc-200 hover:border-zinc-300'
                                                    }`}
                                                >
                                                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
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
                                                    <div className="p-3">
                                                        <p className="text-sm font-black text-zinc-900">{pkg.name}</p>
                                                        <p className="mt-1 line-clamp-2 text-xs text-zinc-600">
                                                            {pkg.description ?? 'Full-service catering package for your event.'}
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <InputError message={form.errors.package_ids} />
                                </div>
                            </section>
                        )}

                        {step === 2 && (
                            <section className="space-y-5">
                                <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-500">
                                    <CalendarDays className="size-4 text-[#F57C00]" />
                                    Step 2: Event, Contact, and Notes
                                </h2>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500" htmlFor="event_date">
                                            <CalendarDays className="size-3.5" />
                                            Event Date
                                        </label>
                                        <Input
                                            id="event_date"
                                            type="date"
                                            min={todayDate()}
                                            value={form.data.event_date}
                                            onChange={(event) => {
                                                setStepError(null);
                                                form.setData('event_date', event.target.value);
                                            }}
                                            className="h-11 rounded-xl border-zinc-200"
                                        />
                                        <InputError message={form.errors.event_date} />
                                    </div>

                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500" htmlFor="guest_count">
                                            <Users className="size-3.5" />
                                            Number of Guests
                                        </label>
                                        <Input
                                            id="guest_count"
                                            type="number"
                                            min={1}
                                            value={form.data.guest_count}
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                setStepError(null);
                                                form.setData('guest_count', value === '' ? '' : Number(value));
                                            }}
                                            className="h-11 rounded-xl border-zinc-200"
                                        />
                                        <InputError message={form.errors.guest_count} />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500" htmlFor="venue">
                                        <MapPin className="size-3.5" />
                                        Venue
                                    </label>
                                    <Input
                                        id="venue"
                                        value={form.data.venue}
                                        onChange={(event) => {
                                            setStepError(null);
                                            form.setData('venue', event.target.value);
                                        }}
                                        className="h-11 rounded-xl border-zinc-200"
                                        placeholder="Event venue/address"
                                    />
                                    <InputError message={form.errors.venue} />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500" htmlFor="name">
                                            <User className="size-3.5" />
                                            Full Name
                                        </label>
                                        <Input
                                            id="name"
                                            value={form.data.name}
                                            onChange={(event) => {
                                                setStepError(null);
                                                form.setData('name', event.target.value);
                                            }}
                                            className="h-11 rounded-xl border-zinc-200"
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
                                            onChange={(event) => {
                                                setStepError(null);
                                                form.setData('phone', event.target.value);
                                            }}
                                            className="h-11 rounded-xl border-zinc-200"
                                            placeholder="+2519XXXXXXXX"
                                        />
                                        <InputError message={form.errors.phone} />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-black uppercase tracking-widest text-zinc-500" htmlFor="special_instructions">
                                        Special Instructions
                                    </label>
                                    <textarea
                                        id="special_instructions"
                                        rows={6}
                                        value={form.data.special_instructions}
                                        onChange={(event) => {
                                            setStepError(null);
                                            form.setData('special_instructions', event.target.value);
                                        }}
                                        className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm focus:border-[#F57C00] focus:outline-none focus:ring-2 focus:ring-[#F57C00]/15"
                                        placeholder="Cuisine preferences, setup requirements, service duration, and other details..."
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

                                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Selected Packages</p>
                                    <div className="mt-3 space-y-2">
                                        {selectedPackages.map((pkg) => (
                                            <div key={pkg.id} className="flex items-start justify-between gap-3 text-sm">
                                                <span className="font-semibold text-zinc-700">{pkg.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Event</p>
                                        <p className="mt-2 text-sm text-zinc-700">Date: {form.data.event_date || 'N/A'}</p>
                                        <p className="text-sm text-zinc-700">Guests: {form.data.guest_count || 'N/A'}</p>
                                        <p className="text-sm text-zinc-700">Venue: {form.data.venue.trim() !== '' ? form.data.venue : 'Not specified'}</p>
                                    </article>

                                    <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Contact</p>
                                        <p className="mt-2 text-sm font-semibold text-zinc-800">{form.data.name || 'N/A'}</p>
                                        <p className="text-sm text-zinc-700">{form.data.phone || 'N/A'}</p>
                                    </article>
                                </div>

                                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Special Instructions</p>
                                    <p className="mt-2 text-zinc-700">
                                        {form.data.special_instructions.trim() !== '' ? form.data.special_instructions : 'No extra instructions.'}
                                    </p>
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
                                        {form.processing ? 'Submitting Request...' : 'Submit Catering Request'}
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
