<?php

use App\Models\Customer;
use App\Models\FeatureToggle;
use App\Models\Permission;
use App\Models\PickupLocation;
use App\Models\Role;
use App\Models\SmsLog;
use App\Models\User;
use Illuminate\Http\Client\Request as HttpRequest;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

test('customers sms sends only to customers in accessible branches', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $allowedBranch = PickupLocation::query()->create([
        'name' => 'Allowed Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $hiddenBranch = PickupLocation::query()->create([
        'name' => 'Hidden Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $staff->pickupLocations()->sync([$allowedBranch->id]);

    $allowedCustomer = Customer::query()->create([
        'name' => 'Allowed Customer',
        'phone' => '251911110001',
    ]);

    $hiddenCustomer = Customer::query()->create([
        'name' => 'Hidden Customer',
        'phone' => '251911110002',
    ]);

    $allowedCustomer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $allowedBranch->id,
        'tracking_token' => Str::random(40),
        'total_amount' => 100,
    ]);

    $hiddenCustomer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $hiddenBranch->id,
        'tracking_token' => Str::random(40),
        'total_amount' => 200,
    ]);

    $this->actingAs($staff)
        ->post(route('staff.customers.sms'), [
            'customer_ids' => [$allowedCustomer->id, $hiddenCustomer->id],
            'message' => 'Hi {name}, this is a promo.',
        ])
        ->assertRedirect();

    expect(SmsLog::query()->count())->toBe(1);
    expect(SmsLog::query()->where('phone', '251911110001')->exists())->toBeTrue();
    expect(SmsLog::query()->where('phone', '251911110002')->exists())->toBeFalse();
});

test('customers sms validates customer list and message length', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $this->actingAs($staff)
        ->from(route('staff.customers.index'))
        ->post(route('staff.customers.sms'), [
            'customer_ids' => [],
            'message' => str_repeat('A', 481),
        ])
        ->assertRedirect(route('staff.customers.index'))
        ->assertSessionHasErrors(['customer_ids', 'message']);

    expect(SmsLog::query()->count())->toBe(0);
});

test('customers telegram outreach sends inline link button payload', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $branch = PickupLocation::query()->create([
        'name' => 'Telegram Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $staff->pickupLocations()->sync([$branch->id]);

    $telegramCustomer = Customer::query()->create([
        'name' => 'Telegram Customer',
        'phone' => '251922220001',
        'telegram_id' => 987650123,
        'telegram_username' => 'tg_customer',
    ]);

    $telegramCustomer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $branch->id,
        'tracking_token' => Str::random(40),
        'total_amount' => 320,
    ]);

    Http::fake([
        'https://api.telegram.org/*/sendMessage' => Http::response([
            'ok' => true,
            'result' => [
                'message_id' => 101,
            ],
        ], 200),
    ]);

    $this->actingAs($staff)
        ->post(route('staff.customers.sms'), [
            'customer_ids' => [$telegramCustomer->id],
            'platform' => 'telegram',
            'message' => 'Hi {name}, claim your special deal.',
            'telegram_button_text' => 'Open Promo',
            'telegram_button_url' => 'https://example.com/promo',
        ])
        ->assertRedirect();

    expect(SmsLog::query()->count())->toBe(0);

    Http::assertSent(function (HttpRequest $request) use ($telegramCustomer): bool {
        if (! str_contains($request->url(), '/sendMessage')) {
            return false;
        }

        $payload = $request->data();
        $replyMarkup = is_string($payload['reply_markup'] ?? null)
            ? json_decode($payload['reply_markup'], true)
            : null;

        return ($payload['chat_id'] ?? null) === (string) $telegramCustomer->telegram_id
            && ($payload['text'] ?? null) === 'Hi Telegram Customer, claim your special deal.'
            && is_array($replyMarkup)
            && (($replyMarkup['inline_keyboard'][0][0]['text'] ?? null) === 'Open Promo')
            && (($replyMarkup['inline_keyboard'][0][0]['url'] ?? null) === 'https://example.com/promo')
            && (($replyMarkup['inline_keyboard'][0][0]['style'] ?? null) === 'primary');
    });
});

test('customers telegram outreach skips username-only records without telegram id', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $branch = PickupLocation::query()->create([
        'name' => 'Username Only Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $staff->pickupLocations()->sync([$branch->id]);

    $customer = Customer::query()->create([
        'name' => 'Username Only Customer',
        'phone' => '251922220099',
        'telegram_username' => 'username_only_customer',
    ]);

    $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $branch->id,
        'tracking_token' => Str::random(40),
        'total_amount' => 250,
    ]);

    Http::fake([
        'https://api.telegram.org/*/sendMessage' => Http::response([
            'ok' => true,
            'result' => [
                'message_id' => 102,
            ],
        ], 200),
    ]);

    $this->actingAs($staff)
        ->post(route('staff.customers.sms'), [
            'customer_ids' => [$customer->id],
            'platform' => 'telegram',
            'message' => 'Hi {name}, this should be skipped.',
        ])
        ->assertRedirect()
        ->assertSessionHas('success', 'Telegram completed. Sent: 0, Failed: 1.');

    Http::assertNothingSent();
});

test('customers telegram outreach validates inline button text and url pairing', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    $branch = PickupLocation::query()->create([
        'name' => 'Validation Branch',
        'address' => 'Addis Ababa',
        'is_active' => true,
    ]);

    $staff->pickupLocations()->sync([$branch->id]);

    $customer = Customer::query()->create([
        'name' => 'Validation Customer',
        'phone' => '251922220009',
        'telegram_id' => 11223344,
    ]);

    $customer->orders()->create([
        'pickup_date' => now()->toDateString(),
        'pickup_location_id' => $branch->id,
        'tracking_token' => Str::random(40),
        'total_amount' => 210,
    ]);

    $this->actingAs($staff)
        ->from(route('staff.customers.index'))
        ->post(route('staff.customers.sms'), [
            'customer_ids' => [$customer->id],
            'platform' => 'telegram',
            'message' => 'Promo for Telegram only.',
            'telegram_button_url' => 'https://example.com/offer',
        ])
        ->assertRedirect(route('staff.customers.index'))
        ->assertSessionHasErrors(['telegram_button_text']);
});

test('customers sms endpoint returns lock payload for json requests when feature is disabled', function () {
    $staff = User::factory()->create([
        'role' => 'staff',
    ]);

    FeatureToggle::query()->updateOrCreate(
        ['feature_key' => 'staff_customers_sms'],
        [
            'name' => 'Customer SMS',
            'description' => 'Lock test for customer sms endpoint.',
            'is_enabled' => false,
            'lock_message' => 'Customer SMS is currently locked.',
            'help_url' => 'https://example.com/help/customers-sms',
        ],
    );

    $this->actingAs($staff)
        ->postJson(route('staff.customers.sms'), [
            'customer_ids' => [1],
            'message' => 'Hello',
        ])
        ->assertStatus(423)
        ->assertJson([
            'message' => 'Customer SMS is currently locked.',
            'feature_key' => 'staff_customers_sms',
            'help_url' => 'https://example.com/help/customers-sms',
        ]);
});

test('staff without customers sms permission can not send customer sms', function () {
    $permission = Permission::query()->create([
        'name' => 'Customers View Only',
        'slug' => 'customers_view_only',
        'description' => 'Allows viewing but not sms.',
    ]);

    $role = Role::query()->create([
        'name' => 'Customers Viewer',
        'slug' => 'customers_viewer',
        'description' => 'No sms permission.',
        'is_system' => false,
    ]);
    $role->permissions()->attach($permission->id);

    $limitedStaff = User::factory()->create([
        'role' => 'customer',
    ]);
    $limitedStaff->roles()->attach($role->id);

    $this->actingAs($limitedStaff)
        ->post(route('staff.customers.sms'), [
            'customer_ids' => [999],
            'message' => 'Blocked.',
        ])
        ->assertForbidden();
});
