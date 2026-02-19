<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\Staff\ImportCustomerContactsRequest;
use App\Http\Requests\Staff\StoreSmsPhoneListRequest;
use App\Http\Requests\Staff\UpdateSmsNotificationSettingRequest;
use App\Http\Requests\Staff\UpdateSmsTemplateRequest;
use App\Models\Customer;
use App\Models\SmsNotificationSetting;
use App\Models\SmsPhoneList;
use App\Models\SmsTemplate;
use App\Services\SmsEthiopiaService;
use App\Services\SmsNotificationService;
use App\Services\SmsTemplateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class SmsTemplateController extends Controller
{
    /**
     * Show SMS template management page.
     */
    public function index(
        SmsTemplateService $smsTemplateService,
        SmsNotificationService $smsNotificationService,
    ): Response
    {
        $smsTemplateService->syncDefaultTemplates();
        $smsNotificationService->syncDefaultSettings();

        $hasTemplatesTable = Schema::hasTable('sms_templates');
        $hasNotificationSettingsTable = Schema::hasTable('sms_notification_settings');
        $hasPhoneListsTable = Schema::hasTable('sms_phone_lists');
        $hasCustomersTable = Schema::hasTable('customers');

        $templates = $hasTemplatesTable
            ? SmsTemplate::query()
                ->orderBy('key')
                ->get()
                ->map(fn (SmsTemplate $template) => [
                    'id' => $template->id,
                    'key' => $template->key,
                    'label' => $template->label,
                    'body' => $template->body,
                    'is_active' => $template->is_active,
                    'updated_at' => $template->updated_at?->toDateTimeString(),
                ])
            : collect();

        return Inertia::render('staff/sms-templates', [
            'templates' => $templates,
            'notificationSettings' => $hasNotificationSettingsTable
                ? SmsNotificationSetting::query()
                    ->orderBy('event_key')
                    ->get()
                    ->map(fn (SmsNotificationSetting $setting) => [
                        'id' => $setting->id,
                        'event_key' => $setting->event_key,
                        'label' => $setting->label,
                        'description' => (string) ($setting->description ?? ''),
                        'is_enabled' => (bool) $setting->is_enabled,
                    ])
                    ->values()
                : [],
            'phoneLists' => $hasPhoneListsTable
                ? SmsPhoneList::query()
                    ->orderByDesc('created_at')
                    ->get()
                    ->map(fn (SmsPhoneList $phoneList) => [
                        'id' => $phoneList->id,
                        'phone' => $phoneList->phone,
                        'normalized_phone' => $phoneList->normalized_phone,
                        'list_type' => $phoneList->list_type,
                        'note' => $phoneList->note,
                        'created_at' => $phoneList->created_at?->toDateTimeString(),
                    ])
                    ->values()
                : [],
            'placeholders' => $smsTemplateService->placeholders(),
            'summary' => [
                'total_templates' => $hasTemplatesTable ? SmsTemplate::query()->count() : 0,
                'active_templates' => $hasTemplatesTable ? SmsTemplate::query()->where('is_active', true)->count() : 0,
                'notification_events' => $hasNotificationSettingsTable
                    ? SmsNotificationSetting::query()->count()
                    : 0,
                'enabled_events' => $hasNotificationSettingsTable
                    ? SmsNotificationSetting::query()->where('is_enabled', true)->count()
                    : 0,
                'whitelist_count' => $hasPhoneListsTable
                    ? SmsPhoneList::query()->where('list_type', 'whitelist')->count()
                    : 0,
                'blacklist_count' => $hasPhoneListsTable
                    ? SmsPhoneList::query()->where('list_type', 'blacklist')->count()
                    : 0,
                'customers_count' => $hasCustomersTable ? Customer::query()->count() : 0,
            ],
        ]);
    }

    /**
     * Update an SMS template.
     */
    public function update(UpdateSmsTemplateRequest $request, SmsTemplate $smsTemplate): RedirectResponse
    {
        $validated = $request->validated();

        $smsTemplate->update([
            'label' => $validated['label'],
            'body' => $validated['body'],
            'is_active' => $request->boolean('is_active', $smsTemplate->is_active),
        ]);

        return back()->with('success', 'SMS template updated.');
    }

    /**
     * Update an SMS notification event toggle.
     */
    public function updateNotificationSetting(
        UpdateSmsNotificationSettingRequest $request,
        SmsNotificationSetting $smsNotificationSetting,
    ): RedirectResponse {
        $smsNotificationSetting->update([
            'is_enabled' => $request->boolean('is_enabled'),
        ]);

        return back()->with('success', 'Notification setting updated.');
    }

    /**
     * Add a number to whitelist or blacklist.
     *
     * @throws ValidationException
     */
    public function storePhoneList(
        StoreSmsPhoneListRequest $request,
        SmsEthiopiaService $smsService,
    ): RedirectResponse {
        $validated = $request->validated();
        $normalizedPhone = $smsService->normalizePhone($validated['phone']);

        if (! $normalizedPhone) {
            throw ValidationException::withMessages([
                'phone' => 'Invalid Ethiopian phone format.',
            ]);
        }

        $phoneList = SmsPhoneList::query()->firstOrNew([
            'normalized_phone' => $normalizedPhone,
            'list_type' => $validated['list_type'],
        ]);

        $phoneList->phone = $validated['phone'];
        $phoneList->note = $validated['note'] ?? null;
        $phoneList->save();

        return back()->with('success', 'Phone list updated.');
    }

    /**
     * Remove phone list entry.
     */
    public function destroyPhoneList(SmsPhoneList $smsPhoneList): RedirectResponse
    {
        $smsPhoneList->delete();

        return back()->with('success', 'Phone list entry removed.');
    }

    /**
     * Import customer contacts from a CSV file.
     */
    public function importContacts(
        ImportCustomerContactsRequest $request,
        SmsEthiopiaService $smsService,
    ): RedirectResponse {
        $file = $request->file('contacts_file');

        if (! $file) {
            return back()->with('error', 'No file uploaded.');
        }

        $handle = fopen($file->getRealPath(), 'r');

        if (! $handle) {
            return back()->with('error', 'Unable to read uploaded file.');
        }

        $created = 0;
        $updated = 0;
        $skipped = 0;
        $line = 0;

        while (($row = fgetcsv($handle)) !== false) {
            $line++;

            if (! is_array($row) || count($row) < 2) {
                $skipped++;
                continue;
            }

            $name = trim((string) ($row[0] ?? ''));
            $phone = trim((string) ($row[1] ?? ''));

            if (
                $line === 1 &&
                strcasecmp($name, 'name') === 0 &&
                strcasecmp($phone, 'phone') === 0
            ) {
                continue;
            }

            $normalizedPhone = $smsService->normalizePhone($phone);

            if (! $normalizedPhone) {
                $skipped++;
                continue;
            }

            $finalName = $name !== '' ? $name : 'Customer '.Str::substr($normalizedPhone, -4);

            $customer = Customer::query()->firstOrNew([
                'phone' => $normalizedPhone,
            ]);

            $wasExisting = $customer->exists;

            $customer->name = $finalName;
            $customer->save();

            if ($wasExisting) {
                $updated++;
            } else {
                $created++;
            }
        }

        fclose($handle);

        return back()->with(
            'success',
            "Contact import complete. Created: {$created}, Updated: {$updated}, Skipped: {$skipped}.",
        );
    }
}
