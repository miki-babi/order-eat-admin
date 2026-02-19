<?php

use App\Models\Customer;
use App\Models\SmsNotificationSetting;
use App\Models\SmsPhoneList;
use App\Models\SmsTemplate;
use App\Models\User;
use Illuminate\Http\UploadedFile;

test('staff can open sms templates page and defaults are synced', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($staff)
        ->get(route('staff.sms-templates.index'))
        ->assertOk();

    expect(SmsTemplate::query()->count())->toBeGreaterThan(0);
    expect(SmsNotificationSetting::query()->count())->toBeGreaterThan(0);
});

test('staff can update sms template body', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($staff)->get(route('staff.sms-templates.index'));

    $template = SmsTemplate::query()->firstOrFail();

    $this->actingAs($staff)
        ->put(route('staff.sms-templates.update', $template), [
            'label' => $template->label,
            'body' => 'Hi {name}, template updated.',
            'is_active' => true,
        ])
        ->assertRedirect();

    expect($template->fresh()?->body)->toBe('Hi {name}, template updated.');
});

test('staff can toggle sms notification setting', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($staff)->get(route('staff.sms-templates.index'));

    $setting = SmsNotificationSetting::query()
        ->where('event_key', 'order_created')
        ->firstOrFail();

    $this->actingAs($staff)
        ->put(route('staff.sms-notification-settings.update', $setting), [
            'is_enabled' => false,
        ])
        ->assertRedirect();

    expect($setting->fresh()?->is_enabled)->toBeFalse();
});

test('staff can add and remove sms whitelist blacklist entries', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($staff)
        ->post(route('staff.sms-phone-lists.store'), [
            'phone' => '0911000000',
            'list_type' => 'blacklist',
            'note' => 'Blocked number',
        ])
        ->assertRedirect();

    $entry = SmsPhoneList::query()->firstOrFail();

    expect($entry->normalized_phone)->toBe('251911000000');
    expect($entry->list_type)->toBe('blacklist');

    $this->actingAs($staff)
        ->delete(route('staff.sms-phone-lists.destroy', $entry))
        ->assertRedirect();

    expect(SmsPhoneList::query()->count())->toBe(0);
});

test('staff can import customer contacts csv', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $csv = implode(PHP_EOL, [
        'name,phone',
        'Alice,0911234567',
        'Bob,251922222222',
        'Broken,123',
    ]);

    $file = UploadedFile::fake()->createWithContent('contacts.csv', $csv);

    $this->actingAs($staff)
        ->post(route('staff.sms-contacts.import'), [
            'contacts_file' => $file,
        ])
        ->assertRedirect();

    expect(Customer::query()->where('name', 'Alice')->where('phone', '251911234567')->exists())->toBeTrue();
    expect(Customer::query()->where('name', 'Bob')->where('phone', '251922222222')->exists())->toBeTrue();
    expect(Customer::query()->count())->toBe(2);
});
