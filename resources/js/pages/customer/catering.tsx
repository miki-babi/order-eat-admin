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
            <div className="min-h-screen bg-zinc-50/50 px-4 pb-20 pt-6 text-[#212121] md:px-8 md:py-10">
                <div className="mx-auto w-full max-w-4xl space-y-8">
                    {/* Header: More compact and focused */}
                    <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className="h-1 w-8 rounded-full bg-[#F57C00]" />
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F57C00]">{business.business_name}</p>
                            </div>
                            <h1 className="text-3xl font-black tracking-tight md:text-4xl">Plan Your Event</h1>
                        </div>
                        <div className="flex items-center gap-3 hidden">
                            <Button asChild variant="ghost" className="h-12 rounded-2xl px-6 text-zinc-500 hover:bg-zinc-100 md:h-11">
                                <Link href="/">Main Menu</Link>
                            </Button>
                            <Button asChild className="h-12 rounded-2xl bg-zinc-900 px-6 font-bold text-white shadow-xl shadow-zinc-900/10 hover:bg-black md:h-11">
                                <Link href="/cakes">Cakes</Link>
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
                        <div className="rounded-[1rem] border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-800 backdrop-blur-sm">
                            {flash.error}
                        </div>
                    )}

                    {/* Step Progress: Minimalist and beautiful */}
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
                                        <div className="h-0.5 flex-1 rounded-full bg-zinc-200 overflow-hidden">
                                            <div
                                                className={`h-full bg-[#F57C00] transition-all duration-500 ${active ? 'w-1/2' : completed ? 'w-full' : 'w-0'}`}
                                            />
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
                                <div className="mb-6">
                                    <h2 className="text-xl font-black tracking-tight text-zinc-900">Select Packages</h2>
                                    <p className="text-sm text-zinc-500 mt-1">Choose the catering packages that fit your event needs.</p>
                                </div>

                                <div className="space-y-4">
                                    {packages.length === 0 && (
                                        <div className="flex flex-col items-center justify-center rounded-[1rem] border-2 border-dashed border-zinc-200 bg-zinc-50/50 py-12 px-6 text-center">
                                            <ShoppingBag className="size-12 text-zinc-300 mb-4" />
                                            <p className="text-lg font-bold text-zinc-800">No packages available</p>
                                            <p className="mt-1 text-sm text-zinc-500">Check back later for our new catering offers.</p>
                                        </div>
                                    )}

                                    {packages.map((pkg) => {
                                        const selected = form.data.package_ids.includes(pkg.id);

                                        return (
                                            <button
                                                key={pkg.id}
                                                type="button"
                                                onClick={() => togglePackage(pkg.id)}
                                                className={`group relative flex w-full flex-col overflow-hidden rounded-[1rem] border transition-all duration-300 sm:flex-row ${selected
                                                    ? 'border-[#F57C00] bg-white shadow-2xl shadow-[#F57C00]/10 ring-4 ring-[#F57C00]/5'
                                                    : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-lg'
                                                    }`}
                                            >
                                                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden sm:aspect-square sm:w-48">
                                                    {pkg.image_url ? (
                                                        <img src={pkg.image_url} alt={pkg.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-300">
                                                            <ImagePlus className="size-10" />
                                                        </div>
                                                    )}

                                                    {selected && (
                                                        <div className="absolute inset-0 bg-[#F57C00]/10 backdrop-blur-[2px] sm:hidden" />
                                                    )}

                                                    {selected && (
                                                        <div className="absolute left-4 top-4 flex size-8 items-center justify-center rounded-full bg-[#F57C00] text-white shadow-lg ring-4 ring-white">
                                                            <Check className="size-5 font-black" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-1 flex-col justify-center p-6 text-left">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="space-y-1">
                                                            <h3 className={`text-lg font-black tracking-tight transition-colors ${selected ? 'text-[#F57C00]' : 'text-zinc-900 group-hover:text-zinc-700'}`}>
                                                                {pkg.name}
                                                            </h3>
                                                            <p className="text-sm leading-relaxed text-zinc-500">
                                                                {pkg.description ?? 'Full-service catering package for your special event.'}
                                                            </p>
                                                        </div>
                                                        <div className={`hidden size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 sm:flex ${selected ? 'border-[#F57C00] bg-[#F57C00] text-white scale-110' : 'border-zinc-200 text-transparent group-hover:border-zinc-300'}`}>
                                                            <Check className="size-3.5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                                <InputError message={form.errors.package_ids} />
                            </section>
                        )}

                        {step === 2 && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                <div className="mb-6">
                                    <h2 className="text-xl font-black tracking-tight text-zinc-900">Event & Contact</h2>
                                    <p className="text-sm text-zinc-500 mt-1">Provide your event details and contact information.</p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor="event_date">
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
                                            className="h-14 rounded-2xl border-zinc-200 bg-white px-4 text-base shadow-sm focus:ring-[#F57C00]/20"
                                        />
                                        <InputError message={form.errors.event_date} />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor="guest_count">
                                            <Users className="size-3.5" />
                                            Guests
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
                                            className="h-14 rounded-2xl border-zinc-200 bg-white px-4 text-base shadow-sm focus:ring-[#F57C00]/20"
                                            placeholder="Number of guests"
                                        />
                                        <InputError message={form.errors.guest_count} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor="venue">
                                        <MapPin className="size-3.5" />
                                        Venue Address
                                    </label>
                                    <Input
                                        id="venue"
                                        value={form.data.venue}
                                        onChange={(event) => {
                                            setStepError(null);
                                            form.setData('venue', event.target.value);
                                        }}
                                        className="h-14 rounded-2xl border-zinc-200 bg-white px-4 text-base shadow-sm focus:ring-[#F57C00]/20"
                                        placeholder="Where is the event happening?"
                                    />
                                    <InputError message={form.errors.venue} />
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
                                            onChange={(event) => {
                                                setStepError(null);
                                                form.setData('name', event.target.value);
                                            }}
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
                                            onChange={(event) => {
                                                setStepError(null);
                                                form.setData('phone', event.target.value);
                                            }}
                                            className="h-14 rounded-2xl border-zinc-200 bg-white px-4 text-base shadow-sm focus:ring-[#F57C00]/20"
                                            placeholder="+251 ..."
                                        />
                                        <InputError message={form.errors.phone} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400" htmlFor="special_instructions">
                                        Special Instructions
                                    </label>
                                    <textarea
                                        id="special_instructions"
                                        rows={4}
                                        value={form.data.special_instructions}
                                        onChange={(event) => {
                                            setStepError(null);
                                            form.setData('special_instructions', event.target.value);
                                        }}
                                        className="w-full rounded-[2rem] border border-zinc-200 bg-white px-6 py-4 text-base shadow-sm focus:border-[#F57C00] focus:outline-none focus:ring-4 focus:ring-[#F57C00]/10 placeholder:text-zinc-300"
                                        placeholder="Any specific needs or preferences?"
                                    />
                                    <InputError message={form.errors.special_instructions} />
                                </div>
                            </section>
                        )}

                        {step === 3 && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                <div className="mb-6">
                                    <h2 className="text-xl font-black tracking-tight text-zinc-900">Review Request</h2>
                                    <p className="text-sm text-zinc-500 mt-1">Please double check your details before submitting.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-sm">
                                        <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-100">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F57C00]">Selected Packages</p>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPackages.map((pkg) => (
                                                    <span key={pkg.id} className="inline-flex items-center rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold text-zinc-800">
                                                        {pkg.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-sm">
                                            <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-100">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F57C00]">Event Details</p>
                                            </div>
                                            <div className="p-6 space-y-3">
                                                <div className="flex items-center gap-3 text-sm">
                                                    <CalendarDays className="size-4 text-zinc-400" />
                                                    <span className="font-medium">{form.data.event_date || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm">
                                                    <Users className="size-4 text-zinc-400" />
                                                    <span className="font-medium">{form.data.guest_count || 'N/A'} Guests</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm">
                                                    <MapPin className="size-4 text-zinc-400" />
                                                    <span className="font-medium line-clamp-1">{form.data.venue || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-sm">
                                            <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-100">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F57C00]">Contact Info</p>
                                            </div>
                                            <div className="p-6 space-y-3">
                                                <div className="flex items-center gap-3 text-sm">
                                                    <User className="size-4 text-zinc-400" />
                                                    <span className="font-medium">{form.data.name || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm">
                                                    <Phone className="size-4 text-zinc-400" />
                                                    <span className="font-medium">{form.data.phone || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {form.data.special_instructions && (
                                        <div className="overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-sm">
                                            <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-100">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F57C00]">Instructions</p>
                                            </div>
                                            <div className="p-6">
                                                <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-wrap">
                                                    {form.data.special_instructions}
                                                </p>
                                            </div>
                                        </div>
                                    )}
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
                                        <ChevronRight className="ml-2 size-5" />
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
                                        {form.processing ? 'Starting Magic...' : 'Submit Request'}
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
