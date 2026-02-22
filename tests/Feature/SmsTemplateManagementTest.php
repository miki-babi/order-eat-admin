<?php

use App\Models\Customer;
use App\Models\FeatureToggle;
use App\Models\Permission;
use App\Models\Role;
use App\Models\SmsNotificationSetting;
use App\Models\SmsPhoneList;
use App\Models\SmsTemplate;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

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

test('staff can update notification setting using valid boolean payloads', function (mixed $value, bool $expected) {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $setting = SmsNotificationSetting::query()->create([
        'event_key' => 'event_'.Str::replace('-', '_', Str::lower((string) Str::uuid())),
        'label' => 'Test Event',
        'description' => 'Toggle test event.',
        'is_enabled' => ! $expected,
    ]);

    $this->actingAs($staff)
        ->from(route('staff.sms-templates.index'))
        ->put(route('staff.sms-notification-settings.update', $setting), [
            'is_enabled' => $value,
        ])
        ->assertRedirect(route('staff.sms-templates.index'))
        ->assertSessionHasNoErrors();

    expect($setting->fresh()?->is_enabled)->toBe($expected);
})->with([
    'boolean true' => [true, true],
    'boolean false' => [false, false],
    'int 1' => [1, true],
    'int 0' => [0, false],
    'string 1' => ['1', true],
    'string 0' => ['0', false],
]);

test('notification setting update rejects invalid boolean payloads', function (mixed $value) {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $setting = SmsNotificationSetting::query()->create([
        'event_key' => 'event_'.Str::replace('-', '_', Str::lower((string) Str::uuid())),
        'label' => 'Invalid Payload Event',
        'description' => 'Reject invalid payload.',
        'is_enabled' => true,
    ]);

    $this->actingAs($staff)
        ->from(route('staff.sms-templates.index'))
        ->put(route('staff.sms-notification-settings.update', $setting), [
            'is_enabled' => $value,
        ])
        ->assertRedirect(route('staff.sms-templates.index'))
        ->assertSessionHasErrors('is_enabled');

    expect($setting->fresh()?->is_enabled)->toBeTrue();
})->with([
    'string true' => 'true',
    'string false' => 'false',
    'string yes' => 'yes',
    'string no' => 'no',
    'string on' => 'on',
    'string off' => 'off',
    'empty string' => '',
    'array' => [['1']],
]);

test('notification setting update requires is_enabled field', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $setting = SmsNotificationSetting::query()->create([
        'event_key' => 'event_'.Str::replace('-', '_', Str::lower((string) Str::uuid())),
        'label' => 'Required Field Event',
        'description' => 'Require is_enabled.',
        'is_enabled' => true,
    ]);

    $this->actingAs($staff)
        ->from(route('staff.sms-templates.index'))
        ->put(route('staff.sms-notification-settings.update', $setting), [])
        ->assertRedirect(route('staff.sms-templates.index'))
        ->assertSessionHasErrors('is_enabled');

    expect($setting->fresh()?->is_enabled)->toBeTrue();
});

test('guest can not update sms notification setting', function () {
    $setting = SmsNotificationSetting::query()->create([
        'event_key' => 'event_'.Str::replace('-', '_', Str::lower((string) Str::uuid())),
        'label' => 'Guest Block Event',
        'description' => 'Guests should be blocked.',
        'is_enabled' => true,
    ]);

    $this->put(route('staff.sms-notification-settings.update', $setting), [
        'is_enabled' => false,
    ])->assertRedirect(route('login'));

    expect($setting->fresh()?->is_enabled)->toBeTrue();
});

test('non staff users can not update sms notification setting', function () {
    $customer = User::factory()->create([
        'role' => 'customer',
    ]);

    $setting = SmsNotificationSetting::query()->create([
        'event_key' => 'event_'.Str::replace('-', '_', Str::lower((string) Str::uuid())),
        'label' => 'Staff Only Event',
        'description' => 'Only staff can update.',
        'is_enabled' => true,
    ]);

    $this->actingAs($customer)
        ->put(route('staff.sms-notification-settings.update', $setting), [
            'is_enabled' => false,
        ])
        ->assertForbidden();

    expect($setting->fresh()?->is_enabled)->toBeTrue();
});

test('staff without sms_templates.manage permission can not update sms notification setting', function () {
    $suffix = Str::lower(Str::random(8));

    $permission = Permission::query()->create([
        'name' => 'Orders View '.$suffix,
        'slug' => 'orders_view_'.$suffix,
        'description' => 'Allows only order-view-like access.',
    ]);

    $role = Role::query()->create([
        'name' => 'Limited '.$suffix,
        'slug' => 'limited_'.$suffix,
        'description' => 'Limited non-SMS staff role.',
        'is_system' => false,
    ]);

    $role->permissions()->attach($permission);

    $limitedStaff = User::factory()->create([
        'role' => 'customer',
    ]);

    $limitedStaff->roles()->attach($role);

    $setting = SmsNotificationSetting::query()->create([
        'event_key' => 'event_'.Str::replace('-', '_', Str::lower((string) Str::uuid())),
        'label' => 'Permission Gated Event',
        'description' => 'Requires sms_templates.manage.',
        'is_enabled' => true,
    ]);

    $this->actingAs($limitedStaff)
        ->put(route('staff.sms-notification-settings.update', $setting), [
            'is_enabled' => false,
        ])
        ->assertForbidden();

    expect($setting->fresh()?->is_enabled)->toBeTrue();
});

test('notification setting update returns not found for unknown setting id', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($staff)
        ->put(route('staff.sms-notification-settings.update', ['smsNotificationSetting' => 999999]), [
            'is_enabled' => false,
        ])
        ->assertNotFound();
});

test('disabled sms notification setting feature redirects web requests', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $setting = SmsNotificationSetting::query()->create([
        'event_key' => 'event_'.Str::replace('-', '_', Str::lower((string) Str::uuid())),
        'label' => 'Feature Locked Event',
        'description' => 'Feature lock redirect test.',
        'is_enabled' => true,
    ]);

    FeatureToggle::query()->create([
        'feature_key' => 'staff_sms_notification_settings',
        'name' => 'SMS Notification Settings',
        'description' => 'Feature lock test.',
        'is_enabled' => false,
        'lock_message' => 'SMS notification settings are locked.',
        'help_url' => 'https://example.com/help/sms-settings',
    ]);

    $this->actingAs($staff)
        ->put(route('staff.sms-notification-settings.update', $setting), [
            'is_enabled' => false,
        ])
        ->assertRedirect(route('feature.locked', ['featureKey' => 'staff_sms_notification_settings']));

    expect($setting->fresh()?->is_enabled)->toBeTrue();
});

test('disabled sms notification setting feature returns lock payload for json requests', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $setting = SmsNotificationSetting::query()->create([
        'event_key' => 'event_'.Str::replace('-', '_', Str::lower((string) Str::uuid())),
        'label' => 'Feature Locked JSON Event',
        'description' => 'Feature lock json response test.',
        'is_enabled' => true,
    ]);

    FeatureToggle::query()->create([
        'feature_key' => 'staff_sms_notification_settings',
        'name' => 'SMS Notification Settings',
        'description' => 'Feature lock test.',
        'is_enabled' => false,
        'lock_message' => 'SMS notification settings are locked.',
        'help_url' => 'https://example.com/help/sms-settings',
    ]);

    $this->actingAs($staff)
        ->putJson(route('staff.sms-notification-settings.update', $setting), [
            'is_enabled' => false,
        ])
        ->assertStatus(423)
        ->assertJson([
            'message' => 'SMS notification settings are locked.',
            'feature_key' => 'staff_sms_notification_settings',
            'help_url' => 'https://example.com/help/sms-settings',
        ]);

    expect($setting->fresh()?->is_enabled)->toBeTrue();
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
