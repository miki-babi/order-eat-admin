import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    LayoutGrid,
    Megaphone,
    MessageCircle,
    Settings,
    Shield,
    Smartphone,
    UploadCloud,
    Users,
    XCircle,
} from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type SmsTemplate = {
    id: number;
    key: string;
    label: string;
    body: string;
    is_active: boolean;
    updated_at: string | null;
};

type SmsPlaceholder = {
    token: string;
    description: string;
};

type SmsNotificationSetting = {
    id: number;
    event_key: string;
    label: string;
    description: string;
    is_enabled: boolean;
};

type SmsPhoneList = {
    id: number;
    phone: string;
    normalized_phone: string;
    list_type: 'whitelist' | 'blacklist';
    note: string | null;
    created_at: string | null;
};

type Summary = {
    total_templates: number;
    active_templates: number;
    notification_events: number;
    enabled_events: number;
    whitelist_count: number;
    blacklist_count: number;
    customers_count: number;
};

type BranchOption = {
    id: number;
    name: string;
};

type MenuItemOption = {
    id: number;
    name: string;
    category: string | null;
};

type PromoPlatform = 'sms' | 'telegram';

type PromoWizardData = {
    platform: PromoPlatform | '';
    search: string;
    orders_min: string;
    orders_max: string;
    recency_min_days: string;
    recency_max_days: string;
    total_spent_min: string;
    total_spent_max: string;
    avg_order_value_min: string;
    avg_order_value_max: string;
    branch_ids: number[];
    include_menu_item_ids: number[];
    exclude_menu_item_ids: number[];
    message: string;
    telegram_button_text: string;
    telegram_button_url: string;
    save_template: boolean;
    template_label: string;
};

type PromoAudiencePreviewSummary = {
    matched_customers: number;
    high_value_customers: number;
    dormant_customers: number;
    average_orders_per_customer: number;
    average_total_spent: number;
};

type PromoAudiencePreviewRow = {
    id: number;
    name: string;
    phone: string;
    telegram_username: string | null;
    orders_count: number;
    total_spent: number;
    average_order_value: number;
    last_order_at: string | null;
    recency_days: number | null;
    preview_variables: Record<string, string>;
};

type PromoAudiencePreview = {
    summary: PromoAudiencePreviewSummary;
    sample: PromoAudiencePreviewRow[];
};

type SharedProps = {
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Communication',
        href: '/staff/sms-templates',
    },
];

const promoSteps = ['Start', 'Platform', 'Customers', 'Promo Message'] as const;
const promoShowcaseSlides = [
    {
        title: 'Recover dormant customers',
        description: 'Target people inactive for 30-120 days and re-engage them with a branch-specific offer.',
        outcome: 'Higher reactivation rate',
    },
    {
        title: 'Upsell frequent buyers',
        description: 'Focus on high-frequency audiences and personalize message with frequent item + branch variables.',
        outcome: 'Bigger average order value',
    },
    {
        title: 'Launch branch-specific promos',
        description: 'Pinpoint by branch and item behavior so each audience receives relevant campaign content.',
        outcome: 'Stronger conversion quality',
    },
] as const;

const placeholderDetails: Record<string, string> = {
    recent_item:
        'Uses the item from the customer most recent order. If that order has multiple items, it picks the most dominant one.',
    recent_branch:
        'Uses the pickup branch from the customer most recent order so your message can reference the latest location they used.',
    freq_item:
        'Uses the item the customer buys most frequently across order history, helping you recommend what they already prefer.',
    freq_branch:
        'Uses the branch the customer orders from most often, useful for location-specific promos and reminders.',
};

const currencyFormatter = new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    maximumFractionDigits: 2,
});

function formatCurrency(value: number): string {
    return currencyFormatter.format(value);
}

export default function SmsTemplates({
    templates,
    placeholders,
    notificationSettings,
    phoneLists,
    summary,
    branches = [],
    menuItems = [],
}: {
    templates: SmsTemplate[];
    placeholders: SmsPlaceholder[];
    notificationSettings: SmsNotificationSetting[];
    phoneLists: SmsPhoneList[];
    summary: Summary;
    branches?: BranchOption[];
    menuItems?: MenuItemOption[];
}) {
    const { flash } = usePage<SharedProps>().props;
    const [editingTemplate, setEditingTemplate] = useState<SmsTemplate | null>(templates[0] ?? null);
    const [updatingSettingId, setUpdatingSettingId] = useState<number | null>(null);
    const [deletingPhoneListId, setDeletingPhoneListId] = useState<number | null>(null);
    const [contactsFileInputKey, setContactsFileInputKey] = useState(0);
    const [promoWizardOpen, setPromoWizardOpen] = useState(false);
    const [promoStepIndex, setPromoStepIndex] = useState(0);
    const [promoSubmitMode, setPromoSubmitMode] = useState<'send' | 'save_send' | null>(null);
    const [promoConfirmOpen, setPromoConfirmOpen] = useState(false);
    const [promoConfirmMode, setPromoConfirmMode] = useState<'send' | 'save_send' | null>(null);
    const [audiencePreview, setAudiencePreview] = useState<PromoAudiencePreview | null>(null);
    const [audiencePreviewLoading, setAudiencePreviewLoading] = useState(false);
    const [audiencePreviewError, setAudiencePreviewError] = useState<string | null>(null);
    const [promoShowcaseIndex, setPromoShowcaseIndex] = useState(0);
    const [isPromoShowcaseHovered, setIsPromoShowcaseHovered] = useState(false);
    const [selectedPlaceholder, setSelectedPlaceholder] = useState<SmsPlaceholder | null>(null);
    const promoMessageTextareaRef = useRef<HTMLTextAreaElement | null>(null);
    const templateBodyTextareaRef = useRef<HTMLTextAreaElement | null>(null);

    const templateForm = useForm({
        label: templates[0]?.label ?? '',
        body: templates[0]?.body ?? '',
        is_active: templates[0]?.is_active ?? true,
    });

    const phoneListForm = useForm({
        phone: '',
        list_type: 'whitelist',
        note: '',
    });

    const contactsForm = useForm<{ contacts_file: File | null }>({
        contacts_file: null,
    });

    const promoForm = useForm<PromoWizardData>({
        platform: '',
        search: '',
        orders_min: '',
        orders_max: '',
        recency_min_days: '',
        recency_max_days: '',
        total_spent_min: '',
        total_spent_max: '',
        avg_order_value_min: '',
        avg_order_value_max: '',
        branch_ids: [],
        include_menu_item_ids: [],
        exclude_menu_item_ids: [],
        message: '',
        telegram_button_text: '',
        telegram_button_url: '',
        save_template: false,
        template_label: '',
    });

    const whitelistEntries = phoneLists.filter((entry) => entry.list_type === 'whitelist');
    const blacklistEntries = phoneLists.filter((entry) => entry.list_type === 'blacklist');

    const isSmsPlatform = promoForm.data.platform === 'sms';
    const promoMessageLimit = isSmsPlatform ? 480 : 2000;
    const hasPartialTelegramButton =
        promoForm.data.platform === 'telegram' &&
        ((promoForm.data.telegram_button_text.trim() === '') !==
            (promoForm.data.telegram_button_url.trim() === ''));
    const isLastPromoStep = promoStepIndex === promoSteps.length - 1;
    const selectedBranchLabels = branches
        .filter((branch) => promoForm.data.branch_ids.includes(branch.id))
        .map((branch) => branch.name);
    const selectedIncludedMenuItemLabels = menuItems
        .filter((menuItem) => promoForm.data.include_menu_item_ids.includes(menuItem.id))
        .map((menuItem) => menuItem.name);
    const selectedExcludedMenuItemLabels = menuItems
        .filter((menuItem) => promoForm.data.exclude_menu_item_ids.includes(menuItem.id))
        .map((menuItem) => menuItem.name);
    const activePromoShowcase = promoShowcaseSlides[promoShowcaseIndex];
    const selectedPlaceholderDetail = selectedPlaceholder
        ? placeholderDetails[selectedPlaceholder.token] ??
          'This variable is replaced automatically with customer/order data when the campaign is sent.'
        : '';

    const insertTokenAtCursor = ({
        token,
        textarea,
        currentValue,
        maxLength,
        updateValue,
    }: {
        token: string;
        textarea: HTMLTextAreaElement | null;
        currentValue: string;
        maxLength: number;
        updateValue: (value: string) => void;
    }) => {
        const tokenText = `{${token}}`;

        if (!textarea) {
            updateValue(`${currentValue}${tokenText}`.slice(0, maxLength));
            return;
        }

        const selectionStart = textarea.selectionStart ?? currentValue.length;
        const selectionEnd = textarea.selectionEnd ?? selectionStart;
        const nextValue = `${currentValue.slice(0, selectionStart)}${tokenText}${currentValue.slice(selectionEnd)}`.slice(
            0,
            maxLength,
        );

        updateValue(nextValue);

        const cursorPosition = Math.min(selectionStart + tokenText.length, nextValue.length);
        const refocusTextarea = () => {
            textarea.focus();
            textarea.setSelectionRange(cursorPosition, cursorPosition);
        };

        if (typeof window !== 'undefined') {
            window.requestAnimationFrame(refocusTextarea);
            return;
        }

        refocusTextarea();
    };

    const insertPromoPlaceholder = (token: string) => {
        insertTokenAtCursor({
            token,
            textarea: promoMessageTextareaRef.current,
            currentValue: promoForm.data.message,
            maxLength: promoMessageLimit,
            updateValue: (value) => promoForm.setData('message', value),
        });
    };

    const insertTemplatePlaceholder = (token: string) => {
        insertTokenAtCursor({
            token,
            textarea: templateBodyTextareaRef.current,
            currentValue: templateForm.data.body,
            maxLength: 480,
            updateValue: (value) => templateForm.setData('body', value),
        });
    };

    useEffect(() => {
        if (isPromoShowcaseHovered) {
            return;
        }

        const timerId = window.setInterval(() => {
            setPromoShowcaseIndex((current) =>
                current === promoShowcaseSlides.length - 1 ? 0 : current + 1,
            );
        }, 3000);

        return () => {
            window.clearInterval(timerId);
        };
    }, [isPromoShowcaseHovered]);

    const selectTemplate = (template: SmsTemplate) => {
        setEditingTemplate(template);
        templateForm.setData({
            label: template.label,
            body: template.body,
            is_active: template.is_active,
        });
        templateForm.clearErrors();
    };

    const saveTemplate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editingTemplate) {
            return;
        }

        templateForm.put(`/staff/sms-templates/${editingTemplate.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                templateForm.clearErrors();
            },
        });
    };

    const toggleNotificationSetting = (setting: SmsNotificationSetting) => {
        setUpdatingSettingId(setting.id);
        router.put(
            `/staff/sms-notification-settings/${setting.id}`,
            {
                is_enabled: !setting.is_enabled,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => {
                    setUpdatingSettingId((current) => (current === setting.id ? null : current));
                },
            },
        );
    };

    const savePhoneListEntry = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        phoneListForm.post('/staff/sms-phone-lists', {
            preserveScroll: true,
            onSuccess: () => {
                phoneListForm.reset('phone', 'note');
            },
        });
    };

    const removePhoneListEntry = (entryId: number) => {
        setDeletingPhoneListId(entryId);
        router.delete(`/staff/sms-phone-lists/${entryId}`, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                setDeletingPhoneListId((current) => (current === entryId ? null : current));
            },
        });
    };

    const uploadContacts = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        contactsForm.post('/staff/sms-contacts/import', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                contactsForm.reset('contacts_file');
                setContactsFileInputKey((key) => key + 1);
            },
        });
    };

    const clearAudiencePreview = () => {
        setAudiencePreview(null);
        setAudiencePreviewError(null);
    };

    const updatePromoTargetingField = <K extends keyof PromoWizardData>(
        key: K,
        value: PromoWizardData[K],
    ) => {
        promoForm.setData(key, value);
        clearAudiencePreview();
    };

    const openPromoWizard = () => {
        promoForm.reset();
        promoForm.clearErrors();
        setPromoStepIndex(0);
        setPromoWizardOpen(true);
        setPromoConfirmOpen(false);
        setPromoConfirmMode(null);
        setAudiencePreview(null);
        setAudiencePreviewError(null);
    };

    const closePromoWizard = () => {
        setPromoWizardOpen(false);
        setPromoStepIndex(0);
        setPromoConfirmOpen(false);
        setPromoConfirmMode(null);
        setPromoSubmitMode(null);
    };

    const goToPreviousPromoStep = () => {
        setPromoStepIndex((current) => Math.max(current - 1, 0));
    };

    const goToNextPromoStep = () => {
        if (promoStepIndex === 1 && promoForm.data.platform === '') {
            return;
        }

        setPromoStepIndex((current) => Math.min(current + 1, promoSteps.length - 1));
    };

    const updatePromoPlatform = (platform: PromoPlatform) => {
        promoForm.setData('platform', platform);
        clearAudiencePreview();

        if (platform === 'sms' && promoForm.data.message.length > 480) {
            promoForm.setData('message', promoForm.data.message.slice(0, 480));
        }

        if (platform === 'sms') {
            promoForm.setData('telegram_button_text', '');
            promoForm.setData('telegram_button_url', '');
        }
    };

    const togglePromoBranch = (branchId: number) => {
        const isSelected = promoForm.data.branch_ids.includes(branchId);

        updatePromoTargetingField(
            'branch_ids',
            isSelected
                ? promoForm.data.branch_ids.filter((id) => id !== branchId)
                : [...promoForm.data.branch_ids, branchId],
        );
    };

    const toggleIncludedPromoMenuItem = (menuItemId: number) => {
        const isSelected = promoForm.data.include_menu_item_ids.includes(menuItemId);

        updatePromoTargetingField(
            'include_menu_item_ids',
            isSelected
                ? promoForm.data.include_menu_item_ids.filter((id) => id !== menuItemId)
                : [...promoForm.data.include_menu_item_ids, menuItemId],
        );

        if (!isSelected && promoForm.data.exclude_menu_item_ids.includes(menuItemId)) {
            promoForm.setData(
                'exclude_menu_item_ids',
                promoForm.data.exclude_menu_item_ids.filter((id) => id !== menuItemId),
            );
        }
    };

    const toggleExcludedPromoMenuItem = (menuItemId: number) => {
        const isSelected = promoForm.data.exclude_menu_item_ids.includes(menuItemId);

        updatePromoTargetingField(
            'exclude_menu_item_ids',
            isSelected
                ? promoForm.data.exclude_menu_item_ids.filter((id) => id !== menuItemId)
                : [...promoForm.data.exclude_menu_item_ids, menuItemId],
        );

        if (!isSelected && promoForm.data.include_menu_item_ids.includes(menuItemId)) {
            promoForm.setData(
                'include_menu_item_ids',
                promoForm.data.include_menu_item_ids.filter((id) => id !== menuItemId),
            );
        }
    };

    const previewPromoAudience = async () => {
        if (!promoForm.data.platform) {
            return;
        }

        const params = new URLSearchParams();
        const appendIfSet = (key: string, value: string) => {
            if (value.trim() !== '') {
                params.append(key, value.trim());
            }
        };

        params.set('platform', promoForm.data.platform);
        appendIfSet('search', promoForm.data.search);
        appendIfSet('orders_min', promoForm.data.orders_min);
        appendIfSet('orders_max', promoForm.data.orders_max);
        appendIfSet('recency_min_days', promoForm.data.recency_min_days);
        appendIfSet('recency_max_days', promoForm.data.recency_max_days);
        appendIfSet('total_spent_min', promoForm.data.total_spent_min);
        appendIfSet('total_spent_max', promoForm.data.total_spent_max);
        appendIfSet('avg_order_value_min', promoForm.data.avg_order_value_min);
        appendIfSet('avg_order_value_max', promoForm.data.avg_order_value_max);
        promoForm.data.branch_ids.forEach((id) => params.append('branch_ids[]', String(id)));
        promoForm.data.include_menu_item_ids.forEach((id) => params.append('include_menu_item_ids[]', String(id)));
        promoForm.data.exclude_menu_item_ids.forEach((id) => params.append('exclude_menu_item_ids[]', String(id)));

        setAudiencePreviewLoading(true);
        setAudiencePreviewError(null);

        try {
            const response = await fetch(`/staff/sms-campaigns/preview-audience?${params.toString()}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            const payload: unknown = await response.json();

            if (!response.ok) {
                const errorMessage =
                    typeof payload === 'object' &&
                    payload !== null &&
                    'message' in payload &&
                    typeof payload.message === 'string'
                        ? payload.message
                        : 'Unable to preview audience with the selected filters.';

                setAudiencePreview(null);
                setAudiencePreviewError(errorMessage);
                return;
            }

            setAudiencePreview(payload as PromoAudiencePreview);
        } catch {
            setAudiencePreview(null);
            setAudiencePreviewError('Unable to preview audience right now. Please try again.');
        } finally {
            setAudiencePreviewLoading(false);
        }
    };

    const ordersRangeLabel =
        promoForm.data.orders_min || promoForm.data.orders_max
            ? `${promoForm.data.orders_min || '0'} - ${promoForm.data.orders_max || 'Any'} orders`
            : 'Any purchase frequency';
    const recencyRangeLabel =
        promoForm.data.recency_min_days || promoForm.data.recency_max_days
            ? `${promoForm.data.recency_min_days || '0'} to ${promoForm.data.recency_max_days || 'Any'} days since last order`
            : 'Any recency window';
    const totalSpentRangeLabel =
        promoForm.data.total_spent_min || promoForm.data.total_spent_max
            ? `${promoForm.data.total_spent_min || '0'} to ${promoForm.data.total_spent_max || 'Any'} ETB total spend`
            : 'Any total spend';
    const averageOrderRangeLabel =
        promoForm.data.avg_order_value_min || promoForm.data.avg_order_value_max
            ? `${promoForm.data.avg_order_value_min || '0'} to ${promoForm.data.avg_order_value_max || 'Any'} ETB average order value`
            : 'Any average order value';

    const canMoveToNextPromoStep = promoStepIndex === 1 ? promoForm.data.platform !== '' : true;
    const canSendPromoCampaign =
        promoForm.data.platform !== '' &&
        promoForm.data.message.trim().length > 0 &&
        (audiencePreview?.summary.matched_customers ?? 0) > 0 &&
        !hasPartialTelegramButton;
    const promoPreviewSample = audiencePreview?.sample[0] ?? null;
    const promoPreviewVariables = promoPreviewSample?.preview_variables ?? {};
    const promoMessageUsesRecentAndFrequentItems =
        /\{recent_item\}/i.test(promoForm.data.message) &&
        /\{freq_item\}/i.test(promoForm.data.message);
    const recentItemPreviewValue = promoPreviewVariables.recent_item?.trim() ?? '';
    const frequentItemPreviewValue = promoPreviewVariables.freq_item?.trim() ?? '';
    const promoPreviewItemsResolveToSameValue =
        recentItemPreviewValue !== '' &&
        frequentItemPreviewValue !== '' &&
        recentItemPreviewValue.toLowerCase() === frequentItemPreviewValue.toLowerCase();
    const renderedPromoMessagePreview = promoForm.data.message.replace(/\{([a-z0-9_]+)\}/gi, (match, rawToken) => {
        const token = String(rawToken).toLowerCase();

        if (Object.prototype.hasOwnProperty.call(promoPreviewVariables, token)) {
            return promoPreviewVariables[token] ?? '';
        }

        return match;
    });
    const isConfirmingSaveAndSend = promoConfirmMode === 'save_send';
    const promoConfirmationActionLabel = isConfirmingSaveAndSend ? 'Save Template + Send' : 'Send Promo';

    const requestPromoCampaignConfirmation = (mode: 'send' | 'save_send') => {
        if (!canSendPromoCampaign || promoForm.processing) {
            return;
        }

        setPromoConfirmMode(mode);
        setPromoConfirmOpen(true);
    };

    const cancelPromoCampaignConfirmation = () => {
        if (promoForm.processing) {
            return;
        }

        setPromoConfirmOpen(false);
        setPromoConfirmMode(null);
    };

    const sendPromoCampaign = (saveTemplate: boolean) => {
        if (!canSendPromoCampaign) {
            return;
        }

        setPromoSubmitMode(saveTemplate ? 'save_send' : 'send');
        promoForm.transform((data) => ({
            ...data,
            save_template: saveTemplate,
        }));

        promoForm.post('/staff/sms-campaigns/send', {
            preserveScroll: true,
            onSuccess: () => {
                promoForm.reset();
                promoForm.clearErrors();
                setAudiencePreview(null);
                setAudiencePreviewError(null);
                closePromoWizard();
            },
            onError: () => {
                setPromoStepIndex(3);
            },
            onFinish: () => {
                setPromoSubmitMode(null);
                promoForm.transform((data) => ({
                    ...data,
                    save_template: false,
                }));
            },
        });
    };

    const confirmPromoCampaignSend = () => {
        if (promoConfirmMode === null) {
            return;
        }

        const saveTemplate = promoConfirmMode === 'save_send';
        setPromoConfirmOpen(false);
        setPromoConfirmMode(null);
        sendPromoCampaign(saveTemplate);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Outreach System" />
            <div className="space-y-8 bg-zinc-50/50 p-6 min-h-screen">
                {flash?.success ? (
                    <div className="rounded-2xl border-none bg-emerald-50 px-6 py-4 text-sm font-black text-emerald-800 shadow-sm ring-1 ring-emerald-200">
                        {flash.success}
                    </div>
                ) : null}
                {flash?.error ? (
                    <div className="rounded-2xl border-none bg-rose-50 px-6 py-4 text-sm font-black text-rose-800 shadow-sm ring-1 ring-rose-200">
                        {flash.error}
                    </div>
                ) : null}

                <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-[#212121] shadow-xl">
                    <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#F57C00]/25 blur-3xl" />
                    <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                    <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
                        <div className="space-y-5">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F57C00]">Campaign Studio</p>
                            <h2 className="max-w-xl text-3xl font-black leading-tight text-white">
                                Build laser-targeted promo campaigns that feel personal for every customer.
                            </h2>
                            <p className="max-w-xl text-sm font-bold leading-relaxed text-zinc-300">
                                Use behavior filters, branch scope, and dynamic placeholders to turn mass outreach into high-conversion personalized campaigns.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge className="rounded-lg bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white ring-1 ring-white/20">Flow: Start</Badge>
                                <Badge className="rounded-lg bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white ring-1 ring-white/20">Platform</Badge>
                                <Badge className="rounded-lg bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white ring-1 ring-white/20">Targeting</Badge>
                                <Badge className="rounded-lg bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white ring-1 ring-white/20">Message</Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <Button
                                    type="button"
                                    className="h-12 rounded-xl bg-[#F57C00] px-7 text-xs font-black uppercase tracking-widest shadow-lg shadow-[#F57C00]/30 hover:bg-[#E65100]"
                                    onClick={openPromoWizard}
                                >
                                    <Megaphone className="mr-2 size-4" />
                                    Launch Promo Wizard
                                </Button>
                                <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                                    Audience base: {summary.customers_count.toLocaleString()} customers
                                </p>
                            </div>
                        </div>

                        <div
                            className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm"
                            onMouseEnter={() => setIsPromoShowcaseHovered(true)}
                            onMouseLeave={() => setIsPromoShowcaseHovered(false)}
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">Outcome Showcase</p>
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="size-8 rounded-lg bg-white/10 text-white hover:bg-white/20"
                                        onClick={() =>
                                            setPromoShowcaseIndex((current) =>
                                                current === 0 ? promoShowcaseSlides.length - 1 : current - 1,
                                            )
                                        }
                                    >
                                        <ArrowLeft className="size-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="size-8 rounded-lg bg-white/10 text-white hover:bg-white/20"
                                        onClick={() =>
                                            setPromoShowcaseIndex((current) =>
                                                current === promoShowcaseSlides.length - 1 ? 0 : current + 1,
                                            )
                                        }
                                    >
                                        <ArrowRight className="size-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 rounded-xl border-2 border-dashed border-white/20 bg-gradient-to-br from-white/10 to-white/0 p-5">
                                <div className="flex h-36 items-center justify-center rounded-lg border border-white/15 bg-black/20 text-center">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">Carousel Image Slot</p>
                                        <p className="text-xs font-bold text-zinc-400">
                                            Add final target-outcome screenshot here later.
                                        </p>
                                    </div>
                                </div>
                                <h3 className="mt-4 text-base font-black text-white">{activePromoShowcase.title}</h3>
                                <p className="mt-1 text-xs font-bold leading-relaxed text-zinc-300">
                                    {activePromoShowcase.description}
                                </p>
                                <p className="mt-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#F57C00]">
                                    Outcome: {activePromoShowcase.outcome}
                                </p>
                            </div>
                            <div className="mt-3 flex items-center justify-center gap-1.5">
                                {promoShowcaseSlides.map((slide, index) => (
                                    <button
                                        key={slide.title}
                                        type="button"
                                        className={`h-1.5 rounded-full transition-all ${
                                            index === promoShowcaseIndex
                                                ? 'w-7 bg-[#F57C00]'
                                                : 'w-3 bg-white/30 hover:bg-white/50'
                                        }`}
                                        onClick={() => setPromoShowcaseIndex(index)}
                                        aria-label={`Showcase slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog
                    open={selectedPlaceholder !== null}
                    onOpenChange={(open) => {
                        if (!open) {
                            setSelectedPlaceholder(null);
                        }
                    }}
                >
                    <DialogContent className="border-none p-0 sm:max-w-xl">
                        <DialogHeader className="border-b border-zinc-100 bg-zinc-50/70 p-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#F57C00]">
                                SMS Variable Details
                            </p>
                            <DialogTitle className="mt-1 text-xl font-black text-[#212121]">
                                {selectedPlaceholder ? `{${selectedPlaceholder.token}}` : 'Variable'}
                            </DialogTitle>
                            <DialogDescription className="mt-2 text-xs font-bold leading-relaxed text-zinc-500">
                                {selectedPlaceholder?.description}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 p-6">
                            <div className="rounded-xl border border-zinc-200 bg-white p-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                    What It Does
                                </p>
                                <p className="mt-2 text-sm font-bold leading-relaxed text-zinc-600">
                                    {selectedPlaceholderDetail}
                                </p>
                            </div>
                            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                    How To Use
                                </p>
                                <p className="mt-2 text-xs font-bold leading-relaxed text-zinc-500">
                                    Put this token directly in your SMS body. During send, the system replaces it with
                                    per-customer values. If no value exists for a customer, it resolves as empty text.
                                </p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={promoWizardOpen}
                    onOpenChange={(open) => {
                        if (open) {
                            setPromoWizardOpen(true);
                            return;
                        }

                        closePromoWizard();
                    }}
                >
                    <DialogContent className="max-h-[90vh] overflow-y-auto border-none p-0 sm:max-w-4xl">
                        <DialogHeader className="border-b border-zinc-100 bg-zinc-50/60 p-6">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#F57C00]">Promo Campaign Wizard</p>
                                    <DialogTitle className="mt-1 text-xl font-black text-[#212121]">
                                        Build a targeted campaign
                                    </DialogTitle>
                                    <DialogDescription className="mt-1 text-xs font-bold text-zinc-500">
                                        Flow: Start, choose platform, set customer filters, then write your platform-specific message.
                                    </DialogDescription>
                                </div>
                                <Badge className="rounded-lg bg-[#212121] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                                    Step {promoStepIndex + 1} / {promoSteps.length}
                                </Badge>
                            </div>
                            <div className="mt-5 grid gap-2 sm:grid-cols-4">
                                {promoSteps.map((stepLabel, stepIndex) => {
                                    const isActive = stepIndex === promoStepIndex;
                                    const isCompleted = stepIndex < promoStepIndex;

                                    return (
                                        <div
                                            key={stepLabel}
                                            className={`rounded-xl px-3 py-2 text-left ring-1 transition-all ${
                                                isActive
                                                    ? 'bg-[#212121] text-white ring-[#212121]'
                                                    : isCompleted
                                                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                                                      : 'bg-white text-zinc-500 ring-zinc-200'
                                            }`}
                                        >
                                            <p className="text-[9px] font-black uppercase tracking-widest">
                                                Step {stepIndex + 1}
                                            </p>
                                            <p className="mt-1 text-xs font-black">{stepLabel}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </DialogHeader>

                        <div className="p-6">
                            {promoStepIndex === 0 ? (
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#F57C00]">Start</p>
                                        <h3 className="mt-2 text-lg font-black text-[#212121]">
                                            Configure a high-conversion promo blast
                                        </h3>
                                        <p className="mt-3 text-xs font-bold leading-relaxed text-zinc-500">
                                            You will first select delivery platform, then define audience filters by purchase behavior and branch activity.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                            Wizard Flow
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <Badge className="bg-zinc-900 text-[10px] font-black uppercase tracking-widest text-white">
                                                Start
                                            </Badge>
                                            <Badge className="bg-zinc-900 text-[10px] font-black uppercase tracking-widest text-white">
                                                Platform
                                            </Badge>
                                            <Badge className="bg-zinc-900 text-[10px] font-black uppercase tracking-widest text-white">
                                                Customers
                                            </Badge>
                                            <Badge className="bg-zinc-900 text-[10px] font-black uppercase tracking-widest text-white">
                                                Promo Message
                                            </Badge>
                                        </div>
                                        <p className="mt-4 text-xs font-bold text-zinc-500">
                                            Audience base available: {summary.customers_count.toLocaleString()} customers.
                                        </p>
                                    </div>
                                </div>
                            ) : null}

                            {promoStepIndex === 1 ? (
                                <div className="grid gap-4 md:grid-cols-2">
                                    <button
                                        type="button"
                                        className={`rounded-2xl border p-5 text-left transition-all ${
                                            promoForm.data.platform === 'sms'
                                                ? 'border-[#F57C00] bg-[#F57C00]/5 shadow-sm'
                                                : 'border-zinc-200 bg-white hover:border-[#F57C00]/30'
                                        }`}
                                        onClick={() => updatePromoPlatform('sms')}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-zinc-900 p-2 text-white">
                                                <Smartphone className="size-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-[#212121]">SMS</p>
                                                <p className="text-[10px] font-bold text-zinc-500">Fast text delivery, 480 char max.</p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        className={`rounded-2xl border p-5 text-left transition-all ${
                                            promoForm.data.platform === 'telegram'
                                                ? 'border-[#F57C00] bg-[#F57C00]/5 shadow-sm'
                                                : 'border-zinc-200 bg-white hover:border-[#F57C00]/30'
                                        }`}
                                        onClick={() => updatePromoPlatform('telegram')}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-zinc-900 p-2 text-white">
                                                <MessageCircle className="size-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest text-[#212121]">Telegram</p>
                                                <p className="text-[10px] font-bold text-zinc-500">Rich text style with longer copy limits.</p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            ) : null}

                            {promoStepIndex === 2 ? (
                                <div className="space-y-5">
                                    <div className="flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4">
                                        <div className="grid w-full gap-2 sm:max-w-sm">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="promo-customer-search">
                                                Customer Search
                                            </Label>
                                            <Input
                                                id="promo-customer-search"
                                                className="h-11 rounded-xl border-zinc-200"
                                                value={promoForm.data.search}
                                                onChange={(event) =>
                                                    updatePromoTargetingField('search', event.target.value)
                                                }
                                                placeholder="Name, phone, telegram username..."
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            className="h-11 rounded-xl bg-[#212121] px-6 font-black uppercase tracking-widest hover:bg-[#F57C00]"
                                            disabled={audiencePreviewLoading || !promoForm.data.platform}
                                            onClick={previewPromoAudience}
                                        >
                                            {audiencePreviewLoading ? 'Previewing...' : 'Preview Audience'}
                                        </Button>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                            <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-[#212121]">Order Frequency</p>
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="promo-orders-min">
                                                        Min Orders
                                                    </Label>
                                                    <Input
                                                        id="promo-orders-min"
                                                        type="number"
                                                        min={0}
                                                        className="h-11 rounded-xl border-zinc-200"
                                                        value={promoForm.data.orders_min}
                                                        onChange={(event) =>
                                                            updatePromoTargetingField('orders_min', event.target.value)
                                                        }
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="promo-orders-max">
                                                        Max Orders
                                                    </Label>
                                                    <Input
                                                        id="promo-orders-max"
                                                        type="number"
                                                        min={0}
                                                        className="h-11 rounded-xl border-zinc-200"
                                                        value={promoForm.data.orders_max}
                                                        onChange={(event) =>
                                                            updatePromoTargetingField('orders_max', event.target.value)
                                                        }
                                                        placeholder="No limit"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                            <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-[#212121]">Recency Window (days)</p>
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="promo-recency-min">
                                                        Min Days Ago
                                                    </Label>
                                                    <Input
                                                        id="promo-recency-min"
                                                        type="number"
                                                        min={0}
                                                        className="h-11 rounded-xl border-zinc-200"
                                                        value={promoForm.data.recency_min_days}
                                                        onChange={(event) =>
                                                            updatePromoTargetingField('recency_min_days', event.target.value)
                                                        }
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="promo-recency-max">
                                                        Max Days Ago
                                                    </Label>
                                                    <Input
                                                        id="promo-recency-max"
                                                        type="number"
                                                        min={0}
                                                        className="h-11 rounded-xl border-zinc-200"
                                                        value={promoForm.data.recency_max_days}
                                                        onChange={(event) =>
                                                            updatePromoTargetingField('recency_max_days', event.target.value)
                                                        }
                                                        placeholder="No limit"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                            <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-[#212121]">Lifetime Spend (ETB)</p>
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="promo-total-min">
                                                        Min Total
                                                    </Label>
                                                    <Input
                                                        id="promo-total-min"
                                                        type="number"
                                                        min={0}
                                                        className="h-11 rounded-xl border-zinc-200"
                                                        value={promoForm.data.total_spent_min}
                                                        onChange={(event) =>
                                                            updatePromoTargetingField('total_spent_min', event.target.value)
                                                        }
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="promo-total-max">
                                                        Max Total
                                                    </Label>
                                                    <Input
                                                        id="promo-total-max"
                                                        type="number"
                                                        min={0}
                                                        className="h-11 rounded-xl border-zinc-200"
                                                        value={promoForm.data.total_spent_max}
                                                        onChange={(event) =>
                                                            updatePromoTargetingField('total_spent_max', event.target.value)
                                                        }
                                                        placeholder="No limit"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                            <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-[#212121]">Average Order Value (ETB)</p>
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="promo-avg-min">
                                                        Min AOV
                                                    </Label>
                                                    <Input
                                                        id="promo-avg-min"
                                                        type="number"
                                                        min={0}
                                                        className="h-11 rounded-xl border-zinc-200"
                                                        value={promoForm.data.avg_order_value_min}
                                                        onChange={(event) =>
                                                            updatePromoTargetingField('avg_order_value_min', event.target.value)
                                                        }
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="promo-avg-max">
                                                        Max AOV
                                                    </Label>
                                                    <Input
                                                        id="promo-avg-max"
                                                        type="number"
                                                        min={0}
                                                        className="h-11 rounded-xl border-zinc-200"
                                                        value={promoForm.data.avg_order_value_max}
                                                        onChange={(event) =>
                                                            updatePromoTargetingField('avg_order_value_max', event.target.value)
                                                        }
                                                        placeholder="No limit"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#212121]">Branch Filter</p>
                                                <Badge variant="outline" className="border-zinc-200 text-[10px] font-black text-zinc-500">
                                                    {promoForm.data.branch_ids.length} selected
                                                </Badge>
                                            </div>
                                            {branches.length > 0 ? (
                                                <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
                                                    {branches.map((branch) => (
                                                        <label key={branch.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/40 px-3 py-2">
                                                            <input
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                                checked={promoForm.data.branch_ids.includes(branch.id)}
                                                                onChange={() => togglePromoBranch(branch.id)}
                                                            />
                                                            <span className="text-xs font-bold text-[#212121]">{branch.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-xs font-bold text-zinc-400">No branches available yet.</p>
                                            )}
                                        </div>

                                        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#212121]">Include Item Purchasers</p>
                                                <Badge variant="outline" className="border-zinc-200 text-[10px] font-black text-zinc-500">
                                                    {promoForm.data.include_menu_item_ids.length}
                                                </Badge>
                                            </div>
                                            {menuItems.length > 0 ? (
                                                <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
                                                    {menuItems.map((menuItem) => (
                                                        <label key={menuItem.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50/40 px-3 py-2">
                                                            <input
                                                                type="checkbox"
                                                                className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                                checked={promoForm.data.include_menu_item_ids.includes(menuItem.id)}
                                                                onChange={() => toggleIncludedPromoMenuItem(menuItem.id)}
                                                            />
                                                            <span className="leading-tight">
                                                                <span className="block text-xs font-bold text-[#212121]">{menuItem.name}</span>
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                                                    {menuItem.category ?? 'Uncategorized'}
                                                                </span>
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-xs font-bold text-zinc-400">No menu items available yet.</p>
                                            )}
                                        </div>

                                        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#212121]">Exclude Item Purchasers</p>
                                                <Badge variant="outline" className="border-zinc-200 text-[10px] font-black text-zinc-500">
                                                    {promoForm.data.exclude_menu_item_ids.length}
                                                </Badge>
                                            </div>
                                            {menuItems.length > 0 ? (
                                                <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
                                                    {menuItems.map((menuItem) => (
                                                        <label key={menuItem.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50/40 px-3 py-2">
                                                            <input
                                                                type="checkbox"
                                                                className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                                checked={promoForm.data.exclude_menu_item_ids.includes(menuItem.id)}
                                                                onChange={() => toggleExcludedPromoMenuItem(menuItem.id)}
                                                            />
                                                            <span className="leading-tight">
                                                                <span className="block text-xs font-bold text-[#212121]">{menuItem.name}</span>
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                                                    {menuItem.category ?? 'Uncategorized'}
                                                                </span>
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-xs font-bold text-zinc-400">No menu items available yet.</p>
                                            )}
                                        </div>
                                    </div>

                                    {audiencePreviewError ? (
                                        <div className="rounded-2xl border-none bg-rose-50 px-4 py-3 text-xs font-black text-rose-700 ring-1 ring-rose-200">
                                            {audiencePreviewError}
                                        </div>
                                    ) : null}

                                    {audiencePreview ? (
                                        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-4">
                                            <div className="grid gap-3 md:grid-cols-5">
                                                <div className="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-200">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Matched</p>
                                                    <p className="mt-1 text-lg font-black text-[#212121]">
                                                        {audiencePreview.summary.matched_customers.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-200">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">High Value</p>
                                                    <p className="mt-1 text-lg font-black text-[#212121]">
                                                        {audiencePreview.summary.high_value_customers.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-200">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Dormant 90d+</p>
                                                    <p className="mt-1 text-lg font-black text-[#212121]">
                                                        {audiencePreview.summary.dormant_customers.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-200">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Avg Orders</p>
                                                    <p className="mt-1 text-lg font-black text-[#212121]">
                                                        {audiencePreview.summary.average_orders_per_customer.toFixed(1)}
                                                    </p>
                                                </div>
                                                <div className="rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-200">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Avg Spend</p>
                                                    <p className="mt-1 text-lg font-black text-[#212121]">
                                                        {formatCurrency(audiencePreview.summary.average_total_spent)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="overflow-x-auto rounded-xl ring-1 ring-zinc-200">
                                                <table className="w-full text-left">
                                                    <thead>
                                                        <tr className="bg-zinc-50/70">
                                                            <th className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">Customer</th>
                                                            <th className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">Orders</th>
                                                            <th className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">Spent</th>
                                                            <th className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">AOV</th>
                                                            <th className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">Recency</th>
                                                            <th className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">Telegram</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {audiencePreview.sample.length === 0 ? (
                                                            <tr>
                                                                <td colSpan={6} className="px-3 py-4 text-center text-xs font-bold text-zinc-400">
                                                                    No sample rows available for this audience.
                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            audiencePreview.sample.map((customer) => (
                                                                <tr key={customer.id} className="border-t border-zinc-100">
                                                                    <td className="px-3 py-2">
                                                                        <p className="text-xs font-black text-[#212121]">{customer.name}</p>
                                                                        <p className="text-[10px] font-bold text-zinc-500">{customer.phone}</p>
                                                                    </td>
                                                                    <td className="px-3 py-2 text-xs font-black text-[#212121]">{customer.orders_count}</td>
                                                                    <td className="px-3 py-2 text-xs font-black text-[#212121]">{formatCurrency(customer.total_spent)}</td>
                                                                    <td className="px-3 py-2 text-xs font-black text-[#212121]">{formatCurrency(customer.average_order_value)}</td>
                                                                    <td className="px-3 py-2 text-xs font-black text-[#212121]">
                                                                        {customer.recency_days === null ? 'N/A' : `${customer.recency_days}d`}
                                                                    </td>
                                                                    <td className="px-3 py-2 text-xs font-black text-[#212121]">
                                                                        {customer.telegram_username ? `@${customer.telegram_username}` : 'Not linked'}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}

                            {promoStepIndex === 3 ? (
                                <div className="space-y-5">
                                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#212121]">
                                                Promo Message ({promoForm.data.platform === 'sms' ? 'SMS' : 'Telegram'})
                                            </p>
                                            <span className={`text-[10px] font-black ${promoForm.data.message.length > promoMessageLimit * 0.9 ? 'text-rose-500' : 'text-zinc-400'}`}>
                                                {promoForm.data.message.length}/{promoMessageLimit}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-xs font-bold text-zinc-500">
                                            {promoForm.data.platform === 'sms'
                                                ? 'SMS mode: short and direct copy works best.'
                                                : 'Telegram mode: you can use longer copy and richer tone.'}
                                        </p>
                                    </div>

                                    <textarea
                                        ref={promoMessageTextareaRef}
                                        className="min-h-[180px] w-full rounded-2xl border border-zinc-200 bg-white p-4 text-sm font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20 transition-all placeholder:text-zinc-300"
                                        value={promoForm.data.message}
                                        maxLength={promoMessageLimit}
                                        onChange={(event) => promoForm.setData('message', event.target.value)}
                                        placeholder={
                                            promoForm.data.platform === 'sms'
                                                ? 'Example: Hi {customer_name}, enjoy 15% off your next order this week at your nearest branch.'
                                                : 'Example: Hello {customer_name}! We have a limited-time offer for you. Reply to this message to claim your promo.'
                                        }
                                    />

                                    {promoForm.data.platform === 'telegram' ? (
                                        <div className="grid gap-3 md:grid-cols-2">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="promo-telegram-button-text">
                                                    Telegram Button Text
                                                </Label>
                                                <Input
                                                    id="promo-telegram-button-text"
                                                    className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                                    value={promoForm.data.telegram_button_text}
                                                    maxLength={64}
                                                    onChange={(event) => promoForm.setData('telegram_button_text', event.target.value)}
                                                    placeholder="Open Offer"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="promo-telegram-button-url">
                                                    Telegram Button URL
                                                </Label>
                                                <Input
                                                    id="promo-telegram-button-url"
                                                    type="url"
                                                    className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                                    value={promoForm.data.telegram_button_url}
                                                    onChange={(event) => promoForm.setData('telegram_button_url', event.target.value)}
                                                    placeholder="https://example.com/promo"
                                                />
                                            </div>
                                            <p className={`text-[10px] font-black uppercase tracking-widest md:col-span-2 ${
                                                hasPartialTelegramButton ? 'text-rose-500' : 'text-zinc-400'
                                            }`}>
                                                {hasPartialTelegramButton
                                                    ? 'Provide both Telegram button text and URL, or leave both empty.'
                                                    : 'Optional: recipients will receive a primary inline URL button.'}
                                            </p>
                                        </div>
                                    ) : null}

                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="promo-template-label">
                                            Template Label (used for Save Template + Send)
                                        </Label>
                                        <Input
                                            id="promo-template-label"
                                            className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                            value={promoForm.data.template_label}
                                            maxLength={255}
                                            onChange={(event) => promoForm.setData('template_label', event.target.value)}
                                            placeholder="Promo Campaign - Weekend Offer"
                                        />
                                    </div>

                                    {(promoForm.errors.message ||
                                        promoForm.errors.telegram_button_text ||
                                        promoForm.errors.telegram_button_url ||
                                        promoForm.errors.template_label) ? (
                                        <div className="space-y-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                                            {promoForm.errors.message ? (
                                                <p className="text-[11px] font-bold text-rose-700">{promoForm.errors.message}</p>
                                            ) : null}
                                            {promoForm.errors.telegram_button_text ? (
                                                <p className="text-[11px] font-bold text-rose-700">{promoForm.errors.telegram_button_text}</p>
                                            ) : null}
                                            {promoForm.errors.telegram_button_url ? (
                                                <p className="text-[11px] font-bold text-rose-700">{promoForm.errors.telegram_button_url}</p>
                                            ) : null}
                                            {promoForm.errors.template_label ? (
                                                <p className="text-[11px] font-bold text-rose-700">{promoForm.errors.template_label}</p>
                                            ) : null}
                                        </div>
                                    ) : null}

                                    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Campaign Summary</p>
                                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                                            <p className="text-xs font-bold text-zinc-500">
                                                Platform: <span className="text-[#212121]">{promoForm.data.platform === 'sms' ? 'SMS' : 'Telegram'}</span>
                                            </p>
                                            <p className="text-xs font-bold text-zinc-500">
                                                Audience Preview: <span className="text-[#212121]">{audiencePreview ? audiencePreview.summary.matched_customers.toLocaleString() : '0'} customers</span>
                                            </p>
                                            <p className="text-xs font-bold text-zinc-500">
                                                Orders Range: <span className="text-[#212121]">{ordersRangeLabel}</span>
                                            </p>
                                            <p className="text-xs font-bold text-zinc-500">
                                                Recency Window: <span className="text-[#212121]">{recencyRangeLabel}</span>
                                            </p>
                                            <p className="text-xs font-bold text-zinc-500">
                                                Total Spend: <span className="text-[#212121]">{totalSpentRangeLabel}</span>
                                            </p>
                                            <p className="text-xs font-bold text-zinc-500">
                                                Average Order Value: <span className="text-[#212121]">{averageOrderRangeLabel}</span>
                                            </p>
                                            <p className="text-xs font-bold text-zinc-500">
                                                Branches: <span className="text-[#212121]">{selectedBranchLabels.length === 0 ? 'All branches' : selectedBranchLabels.join(', ')}</span>
                                            </p>
                                            <p className="text-xs font-bold text-zinc-500 md:col-span-2">
                                                Include item purchasers: <span className="text-[#212121]">{selectedIncludedMenuItemLabels.length === 0 ? 'Any item' : selectedIncludedMenuItemLabels.join(', ')}</span>
                                            </p>
                                            <p className="text-xs font-bold text-zinc-500 md:col-span-2">
                                                Exclude item purchasers: <span className="text-[#212121]">{selectedExcludedMenuItemLabels.length === 0 ? 'No exclusions' : selectedExcludedMenuItemLabels.join(', ')}</span>
                                            </p>
                                            <p className="text-xs font-bold text-zinc-500 md:col-span-2">
                                                Search keyword: <span className="text-[#212121]">{promoForm.data.search.trim() === '' ? 'No keyword filter' : promoForm.data.search}</span>
                                            </p>
                                        </div>

                                        {placeholders.length > 0 ? (
                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {placeholders.map((placeholder) => (
                                                    <Badge
                                                        key={placeholder.token}
                                                        asChild
                                                        variant="outline"
                                                        className="rounded-lg border-zinc-200 bg-white px-0 py-0 text-[9px] font-bold text-zinc-500"
                                                    >
                                                        <button
                                                            type="button"
                                                            className="rounded-lg px-2 py-0.5 hover:bg-zinc-50"
                                                            title={placeholder.description}
                                                            onClick={() => insertPromoPlaceholder(placeholder.token)}
                                                        >
                                                            {`{${placeholder.token}}`}
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 bg-zinc-50/50 p-6">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 rounded-xl border-zinc-200 font-bold"
                                onClick={promoStepIndex === 0 ? closePromoWizard : goToPreviousPromoStep}
                            >
                                {promoStepIndex === 0 ? (
                                    'Cancel'
                                ) : (
                                    <>
                                        <ArrowLeft className="mr-2 size-4" />
                                        Previous
                                    </>
                                )}
                            </Button>

                            {isLastPromoStep ? (
                                <div className="space-y-2 text-right">
                                    <div className="flex flex-wrap justify-end gap-2">
                                        <Button
                                            type="button"
                                            className="h-11 rounded-xl bg-[#F57C00] px-7 font-black uppercase tracking-widest hover:bg-[#E65100]"
                                            disabled={!canSendPromoCampaign || promoForm.processing}
                                            onClick={() => requestPromoCampaignConfirmation('send')}
                                        >
                                            {promoForm.processing && promoSubmitMode === 'send' ? 'Sending...' : 'Send Promo'}
                                        </Button>
                                        <Button
                                            type="button"
                                            className="h-11 rounded-xl bg-[#212121] px-7 font-black uppercase tracking-widest hover:bg-[#F57C00]"
                                            disabled={!canSendPromoCampaign || promoForm.processing}
                                            onClick={() => requestPromoCampaignConfirmation('save_send')}
                                        >
                                            {promoForm.processing && promoSubmitMode === 'save_send'
                                                ? 'Saving + Sending...'
                                                : 'Save Template + Send'}
                                        </Button>
                                    </div>
                                    {!canSendPromoCampaign ? (
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                            Preview and message are required before sending.
                                        </p>
                                    ) : null}
                                </div>
                            ) : (
                                <Button
                                    type="button"
                                    className="h-11 rounded-xl bg-[#F57C00] px-8 font-black uppercase tracking-widest hover:bg-[#E65100]"
                                    disabled={!canMoveToNextPromoStep}
                                    onClick={goToNextPromoStep}
                                >
                                    Next
                                    <ArrowRight className="ml-2 size-4" />
                                </Button>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={promoConfirmOpen}
                    onOpenChange={(open) => {
                        if (open) {
                            setPromoConfirmOpen(true);
                            return;
                        }

                        cancelPromoCampaignConfirmation();
                    }}
                >
                    <DialogContent className="border-none p-0 sm:max-w-2xl">
                        <DialogHeader className="border-b border-zinc-100 bg-zinc-50/70 p-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#F57C00]">
                                Final Confirmation
                            </p>
                            <DialogTitle className="mt-1 text-xl font-black text-[#212121]">
                                Review promo preview before sending
                            </DialogTitle>
                            <DialogDescription className="mt-1 text-xs font-bold text-zinc-500">
                                This preview is generated from a sample customer in your current audience.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 p-6">
                            <div className="grid gap-3 md:grid-cols-3">
                                <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Platform</p>
                                    <p className="mt-1 text-sm font-black text-[#212121]">
                                        {promoForm.data.platform === 'telegram' ? 'Telegram' : 'SMS'}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Audience</p>
                                    <p className="mt-1 text-sm font-black text-[#212121]">
                                        {(audiencePreview?.summary.matched_customers ?? 0).toLocaleString()} customers
                                    </p>
                                </div>
                                <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Action</p>
                                    <p className="mt-1 text-sm font-black text-[#212121]">
                                        {promoConfirmationActionLabel}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 px-4 py-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                    Sample Recipient
                                </p>
                                {promoPreviewSample ? (
                                    <p className="mt-1 text-xs font-bold text-zinc-700">
                                        {promoPreviewSample.name} ({promoPreviewSample.phone})
                                        {promoPreviewSample.telegram_username
                                            ? ` · @${promoPreviewSample.telegram_username}`
                                            : ''}
                                    </p>
                                ) : (
                                    <p className="mt-1 text-xs font-bold text-zinc-700">
                                        Audience preview sample unavailable. Unknown placeholders stay as tokens.
                                    </p>
                                )}
                            </div>

                            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">
                                    Message Preview
                                </p>
                                <div className="mt-2 rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 text-sm font-bold leading-relaxed text-zinc-700 whitespace-pre-wrap">
                                    {renderedPromoMessagePreview.trim() === ''
                                        ? 'Preview is empty for this sample.'
                                        : renderedPromoMessagePreview}
                                </div>
                                {promoForm.data.platform === 'telegram' &&
                                promoForm.data.telegram_button_text.trim() !== '' &&
                                promoForm.data.telegram_button_url.trim() !== '' ? (
                                    <div className="mt-3 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-sky-600">
                                            Telegram Inline Button
                                        </p>
                                        <p className="mt-1 text-xs font-bold text-sky-700">
                                            {promoForm.data.telegram_button_text} ({promoForm.data.telegram_button_url})
                                        </p>
                                    </div>
                                ) : null}
                            </div>

                            <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                                    Placeholder Warning
                                </p>
                                <p className="text-xs font-bold leading-relaxed text-amber-800">
                                    Placeholder values are customer-specific, so final messages can vary per recipient.
                                </p>
                                {promoMessageUsesRecentAndFrequentItems ? (
                                    <p className="text-xs font-bold leading-relaxed text-amber-800">
                                        You used both {'{recent_item}'} and {'{freq_item}'}. They can resolve to the same item for some
                                        customers, so the promo might look repetitive by accident.
                                    </p>
                                ) : null}
                                {promoPreviewItemsResolveToSameValue ? (
                                    <p className="text-xs font-bold leading-relaxed text-amber-800">
                                        In this sample preview, both tokens resolved to "{recentItemPreviewValue}".
                                    </p>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 bg-zinc-50/60 p-6">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 rounded-xl border-zinc-200 font-bold"
                                disabled={promoForm.processing}
                                onClick={cancelPromoCampaignConfirmation}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                className="h-11 rounded-xl bg-[#F57C00] px-8 font-black uppercase tracking-widest hover:bg-[#E65100]"
                                disabled={promoForm.processing || promoConfirmMode === null}
                                onClick={confirmPromoCampaignSend}
                            >
                                {promoForm.processing
                                    ? isConfirmingSaveAndSend
                                        ? 'Saving + Sending...'
                                        : 'Sending...'
                                    : promoConfirmationActionLabel}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* 📌 System Overview Metrics */}
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Blueprints</p>
                            <h3 className="mt-1 text-2xl font-black text-[#212121]">{summary.total_templates}</h3>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#F57C00]">Active</p>
                            <h3 className="mt-1 text-2xl font-black text-[#212121]">{summary.active_templates}</h3>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Automation</p>
                            <h3 className="mt-1 text-2xl font-black text-[#212121]">{summary.enabled_events}/{summary.notification_events}</h3>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Whitelist</p>
                            <h3 className="mt-1 text-2xl font-black text-[#212121]">{summary.whitelist_count}</h3>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Restricted</p>
                            <h3 className="mt-1 text-2xl font-black text-[#212121]">{summary.blacklist_count}</h3>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm ring-1 ring-zinc-200">
                        <CardContent className="pt-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]">Reach</p>
                            <h3 className="mt-1 text-2xl font-black text-[#212121]">{summary.customers_count}</h3>
                        </CardContent>
                    </Card>
                </div>

          

                <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
                    {/* 📌 Template Selection */}
                    <Card className="border-none shadow-md ring-1 ring-zinc-200 h-fit">
                        <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-5">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-[#212121]">Message blueprints</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 space-y-2">
                            {templates.map((template) => {
                                const isSelected = editingTemplate?.id === template.id;

                                return (
                                    <button
                                        key={template.id}
                                        type="button"
                                        className={`w-full rounded-2xl p-4 text-left transition-all ${isSelected
                                                ? 'bg-[#212121] text-white shadow-xl'
                                                : 'hover:bg-zinc-100 group'
                                            }`}
                                        onClick={() => selectTemplate(template)}
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <p className={`text-xs font-black uppercase tracking-wide ${isSelected ? 'text-white' : 'text-[#212121]'}`}>{template.label}</p>
                                            {template.is_active ? (
                                                <CheckCircle2 className={`size-3.5 ${isSelected ? 'text-emerald-400' : 'text-emerald-500'}`} />
                                            ) : (
                                                <XCircle className={`size-3.5 ${isSelected ? 'text-white/40' : 'text-zinc-300'}`} />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className={`text-[10px] font-black uppercase tracking-tighter ${isSelected ? 'text-white/40' : 'text-zinc-400'}`}>Ref: {template.key}</p>
                                            <Badge variant="outline" className={`text-[9px] font-black uppercase tracking-widest border-none p-0 ${isSelected ? 'text-white/60' : 'bg-transparent text-zinc-400 group-hover:text-[#F57C00]'}`}>
                                                Load blueprint
                                            </Badge>
                                        </div>
                                    </button>
                                );
                            })}
                        </CardContent>
                    </Card>

                    {/* 📌 Template Editor */}
                    <Card className="border-none shadow-xl ring-1 ring-zinc-200">
                        <CardHeader className="border-b border-zinc-100 py-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#F57C00]">Editor console</p>
                                    <CardTitle className="mt-1 text-xl font-black text-[#212121]">
                                        {editingTemplate ? editingTemplate.label : 'Select Blueprint'}
                                    </CardTitle>
                                </div>
                                {editingTemplate && (
                                    <Badge className="bg-[#212121] text-white font-black uppercase tracking-[0.2em] text-[9px] px-3 py-1">
                                        System-{editingTemplate.key}
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="pt-8">
                            {editingTemplate ? (
                                <form className="space-y-8" onSubmit={saveTemplate}>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="template-label">Display name</Label>
                                            <Input
                                                id="template-label"
                                                className="h-11 rounded-xl border-zinc-200 focus:ring-[#F57C00]"
                                                value={templateForm.data.label}
                                                onChange={(event) =>
                                                    templateForm.setData('label', event.target.value)
                                                }
                                            />
                                            <InputError message={templateForm.errors.label} />
                                        </div>
                                        <div className="flex items-center gap-4 mt-6">
                                            <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-2.5 ring-1 ring-zinc-200">
                                                <input
                                                    type="checkbox"
                                                    id="is_active_check"
                                                    className="h-4 w-4 rounded border-zinc-300 text-[#F57C00] focus:ring-[#F57C00]/20"
                                                    checked={templateForm.data.is_active}
                                                    onChange={(event) =>
                                                        templateForm.setData('is_active', event.target.checked)
                                                    }
                                                />
                                                <Label htmlFor="is_active_check" className="cursor-pointer text-xs font-bold text-zinc-600">Active status</Label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="template-body">SMS Body</Label>
                                            <span className={`text-[10px] font-black ${templateForm.data.body.length > 300 ? 'text-rose-500' : 'text-zinc-400'}`}>
                                                {templateForm.data.body.length}/480 Content Length
                                            </span>
                                        </div>
                                        <textarea
                                            id="template-body"
                                            ref={templateBodyTextareaRef}
                                            className="min-h-[220px] w-full rounded-2xl border border-zinc-200 bg-white p-5 text-sm font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20 transition-all placeholder:text-zinc-300"
                                            value={templateForm.data.body}
                                            maxLength={480}
                                            onChange={(event) =>
                                                templateForm.setData('body', event.target.value)
                                            }
                                        />
                                        <InputError message={templateForm.errors.body} />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button type="submit" disabled={templateForm.processing} className="h-12 px-10 rounded-xl bg-[#F57C00] font-black shadow-lg shadow-[#F57C00]/20 hover:bg-[#E65100]">
                                            {templateForm.processing ? 'Syncing...' : 'Commit Changes'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-12 rounded-xl font-bold border-zinc-200"
                                            onClick={() => selectTemplate(editingTemplate)}
                                        >
                                            Revert
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="py-20 text-center">
                                    <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Select a blueprint from the catalog to begin editing</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                      {/* 📌 Placeholder Reference */}
                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#212121]">
                            <LayoutGrid className="size-4 text-[#F57C00]" />
                            Variable Library
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap gap-3">
                            {placeholders.map((placeholder) => (
                                <button
                                    key={placeholder.token}
                                    type="button"
                                    className="group relative flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-left ring-1 ring-zinc-200 transition-all hover:ring-[#F57C00]/30 hover:shadow-sm"
                                    onClick={() => insertTemplatePlaceholder(placeholder.token)}
                                    title={placeholder.description}
                                >
                                    <code className="text-xs font-black text-[#F57C00]">{`{${placeholder.token}}`}</code>
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{placeholder.description}</span>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 📌 Automation Settings */}
                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-5">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <Settings className="size-4 text-[#F57C00]" />
                            Trigger mechanisms
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            {notificationSettings.map((setting) => (
                                <div
                                    key={setting.id}
                                    className="flex items-start justify-between gap-4 rounded-2xl border border-zinc-100 bg-white p-5 transition-all hover:ring-1 hover:ring-[#F57C00]/20"
                                >
                                    <div className="space-y-1">
                                        <p className="text-xs font-black text-[#212121] uppercase tracking-wide">{setting.label}</p>
                                        <p className="text-[10px] font-bold text-zinc-500 leading-relaxed">{setting.description}</p>
                                        <Badge variant="outline" className="mt-2 rounded-md border-none bg-zinc-100 text-[9px] font-black uppercase text-zinc-400">
                                            Event: {setting.event_key}
                                        </Badge>
                                    </div>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant={setting.is_enabled ? 'default' : 'outline'}
                                        className={`h-9 rounded-xl px-6 font-black uppercase tracking-tighter text-[10px] transition-all ${setting.is_enabled ? 'bg-[#212121] text-white' : 'text-zinc-400'
                                            }`}
                                        disabled={updatingSettingId === setting.id}
                                        onClick={() => toggleNotificationSetting(setting)}
                                    >
                                        {setting.is_enabled ? 'Active' : 'Offline'}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* 📌 Gatekeeper (Filter Management) */}
                    <Card className="border-none shadow-md ring-1 ring-zinc-200">
                        <CardHeader className="border-b border-zinc-100 py-5">
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                                <Shield className="size-4 text-[#F57C00]" />
                                Audience filtering
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form className="space-y-6" onSubmit={savePhoneListEntry}>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="phone">Phone terminal</Label>
                                        <Input
                                            id="phone"
                                            className="h-11 rounded-xl border-zinc-200"
                                            value={phoneListForm.data.phone}
                                            onChange={(event) =>
                                                phoneListForm.setData('phone', event.target.value)
                                            }
                                            placeholder="2519..."
                                        />
                                        <InputError message={phoneListForm.errors.phone} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="list_type">Access level</Label>
                                        <select
                                            id="list_type"
                                            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F57C00]/20"
                                            value={phoneListForm.data.list_type}
                                            onChange={(event) =>
                                                phoneListForm.setData(
                                                    'list_type',
                                                    event.target.value as 'whitelist' | 'blacklist',
                                                )
                                            }
                                        >
                                            <option value="whitelist">Whitelist (Allow)</option>
                                            <option value="blacklist">Blacklist (Restrict)</option>
                                        </select>
                                        <InputError message={phoneListForm.errors.list_type} />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-[#9E9E9E]" htmlFor="note">Administrative note</Label>
                                    <Input
                                        id="note"
                                        className="h-11 rounded-xl border-zinc-200"
                                        value={phoneListForm.data.note}
                                        onChange={(event) =>
                                            phoneListForm.setData('note', event.target.value)
                                        }
                                        placeholder="Reason for listing..."
                                    />
                                    <InputError message={phoneListForm.errors.note} />
                                </div>
                                <Button type="submit" disabled={phoneListForm.processing} className="h-11 w-full rounded-xl bg-[#212121] font-black hover:bg-[#F57C00] transition-colors">
                                    {phoneListForm.processing ? 'Registering...' : 'Add to Filter'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* 📌 Mass Upload */}
                    <Card className="border-none shadow-md ring-1 ring-zinc-200">
                        <CardHeader className="border-b border-zinc-100 py-5">
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                                <UploadCloud className="size-4 text-[#F57C00]" />
                                Batch Import
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form className="space-y-6" onSubmit={uploadContacts}>
                                <div className="rounded-2xl border-2 border-dashed border-zinc-100 bg-zinc-50/50 p-8 text-center transition-all hover:bg-white hover:border-[#F57C00]/20">
                                    <UploadCloud className="mx-auto size-10 text-zinc-300" />
                                    <p className="mt-4 text-xs font-bold text-zinc-500 uppercase">Support CSV (name, phone)</p>
                                    <Input
                                        key={contactsFileInputKey}
                                        id="contacts_file"
                                        type="file"
                                        className="mt-6 h-11 border-none bg-transparent p-0 file:h-11 file:rounded-xl file:border-0 file:bg-zinc-200 file:px-6 file:text-xs file:font-black file:uppercase"
                                        accept=".csv,text/csv,.txt,text/plain"
                                        onChange={(event) =>
                                            contactsForm.setData(
                                                'contacts_file',
                                                event.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                    <InputError message={contactsForm.errors.contacts_file} />
                                </div>
                                <Button
                                    type="submit"
                                    className="h-11 w-full rounded-xl bg-[#212121] font-black hover:bg-[#F57C00] transition-colors"
                                    disabled={contactsForm.processing || !contactsForm.data.contacts_file}
                                >
                                    {contactsForm.processing ? 'Ingesting Data...' : 'Start Global Import'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* 📌 Filter Journal */}
                <Card className="border-none shadow-md ring-1 ring-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-5">
                        <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#212121]">
                            <Users className="size-4 text-[#F57C00]" />
                            Filtering Journal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid lg:grid-cols-2 divide-x divide-zinc-100">
                            {/* Whitelist column */}
                            <div className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                                        <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                        Whitelisted ({whitelistEntries.length})
                                    </h4>
                                </div>
                                <div className="space-y-3">
                                    {whitelistEntries.length === 0 ? (
                                        <p className="py-8 text-center text-[10px] font-bold uppercase text-zinc-300">No entries</p>
                                    ) : (
                                        whitelistEntries.map((entry) => (
                                            <div key={entry.id} className="flex items-center justify-between rounded-xl bg-white p-3 ring-1 ring-zinc-100">
                                                <div>
                                                    <p className="text-xs font-black text-[#212121]">{entry.phone}</p>
                                                    {entry.note && <p className="text-[9px] font-bold text-zinc-400 mt-0.5">{entry.note}</p>}
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 rounded-lg text-rose-500 hover:bg-rose-50 font-bold text-[10px] uppercase"
                                                    disabled={deletingPhoneListId === entry.id}
                                                    onClick={() => removePhoneListEntry(entry.id)}
                                                >
                                                    Purge
                                                </Button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Blacklist column */}
                            <div className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-rose-600 flex items-center gap-2">
                                        <div className="size-2 rounded-full bg-rose-500" />
                                        Restricted ({blacklistEntries.length})
                                    </h4>
                                </div>
                                <div className="space-y-3">
                                    {blacklistEntries.length === 0 ? (
                                        <p className="py-8 text-center text-[10px] font-bold uppercase text-zinc-300">No restrictions</p>
                                    ) : (
                                        blacklistEntries.map((entry) => (
                                            <div key={entry.id} className="flex items-center justify-between rounded-xl bg-white p-3 ring-1 ring-zinc-100">
                                                <div>
                                                    <p className="text-xs font-black text-[#212121]">{entry.phone}</p>
                                                    {entry.note && <p className="text-[9px] font-bold text-zinc-400 mt-0.5">{entry.note}</p>}
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 rounded-lg text-rose-500 hover:bg-rose-50 font-bold text-[10px] uppercase"
                                                    disabled={deletingPhoneListId === entry.id}
                                                    onClick={() => removePhoneListEntry(entry.id)}
                                                >
                                                    Restore
                                                </Button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
