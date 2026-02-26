<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasTable('customers')) {
            return;
        }

        DB::table('customers')
            ->select(['id', 'phone', 'name', 'telegram_id', 'telegram_username'])
            ->orderBy('id')
            ->chunkById(200, function (Collection $customers): void {
                foreach ($customers as $customer) {
                    $rawPhone = is_string($customer->phone) ? trim($customer->phone) : '';

                    if ($rawPhone === '' || $this->isSyntheticPhone($rawPhone)) {
                        continue;
                    }

                    $canonicalPhone = $this->canonicalPhone($rawPhone);

                    if ($canonicalPhone === null || $canonicalPhone === $rawPhone) {
                        continue;
                    }

                    $canonicalOwnerId = DB::table('customers')
                        ->where('phone', $canonicalPhone)
                        ->value('id');

                    if (is_numeric($canonicalOwnerId) && (int) $canonicalOwnerId !== (int) $customer->id) {
                        $this->mergeCustomerRecords(
                            fromCustomerId: (int) $customer->id,
                            toCustomerId: (int) $canonicalOwnerId,
                            fromCustomer: $customer,
                        );

                        continue;
                    }

                    DB::table('customers')
                        ->where('id', (int) $customer->id)
                        ->update([
                            'phone' => $canonicalPhone,
                            'updated_at' => now(),
                        ]);
                }
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Keep +251 canonical storage on rollback to avoid re-introducing legacy formats.
    }

    protected function mergeCustomerRecords(int $fromCustomerId, int $toCustomerId, object $fromCustomer): void
    {
        DB::table('orders')
            ->where('customer_id', $fromCustomerId)
            ->update(['customer_id' => $toCustomerId]);

        DB::table('sms_logs')
            ->where('customer_id', $fromCustomerId)
            ->update(['customer_id' => $toCustomerId]);

        if (Schema::hasTable('customer_tokens')) {
            DB::table('customer_tokens')
                ->where('customer_id', $fromCustomerId)
                ->update([
                    'customer_id' => $toCustomerId,
                    'updated_at' => now(),
                ]);
        }

        $targetCustomer = DB::table('customers')
            ->select(['id', 'name', 'telegram_id', 'telegram_username'])
            ->where('id', $toCustomerId)
            ->first();

        if ($targetCustomer !== null) {
            $updates = [];

            if ($this->isBlank($targetCustomer->telegram_id) && ! $this->isBlank($fromCustomer->telegram_id ?? null)) {
                $updates['telegram_id'] = trim((string) $fromCustomer->telegram_id);
            }

            if ($this->isBlank($targetCustomer->telegram_username) && ! $this->isBlank($fromCustomer->telegram_username ?? null)) {
                $updates['telegram_username'] = ltrim(trim((string) $fromCustomer->telegram_username), '@');
            }

            if ($this->isPlaceholderName($targetCustomer->name) && ! $this->isBlank($fromCustomer->name ?? null)) {
                $updates['name'] = trim((string) $fromCustomer->name);
            }

            if ($updates !== []) {
                $updates['updated_at'] = now();

                DB::table('customers')
                    ->where('id', $toCustomerId)
                    ->update($updates);
            }
        }

        DB::table('customers')
            ->where('id', $fromCustomerId)
            ->delete();
    }

    protected function canonicalPhone(string $phone): ?string
    {
        $digits = preg_replace('/\D+/', '', $phone);

        if (! is_string($digits) || $digits === '') {
            return null;
        }

        if (preg_match('/^251([79]\d{8})$/', $digits, $matches) === 1) {
            return '+251'.$matches[1];
        }

        if (preg_match('/^0([79]\d{8})$/', $digits, $matches) === 1) {
            return '+251'.$matches[1];
        }

        if (preg_match('/^([79]\d{8})$/', $digits, $matches) === 1) {
            return '+251'.$matches[1];
        }

        return null;
    }

    protected function isSyntheticPhone(string $value): bool
    {
        return preg_match('/^q[a-f0-9]{19}$/i', trim($value)) === 1;
    }

    protected function isBlank(mixed $value): bool
    {
        if (! is_string($value)) {
            return true;
        }

        return trim($value) === '';
    }

    protected function isPlaceholderName(mixed $value): bool
    {
        if (! is_string($value)) {
            return true;
        }

        $name = trim($value);

        if ($name === '') {
            return true;
        }

        if (strcasecmp($name, 'guest') === 0) {
            return true;
        }

        return preg_match('/^Table\s+.+\s+Guest$/i', $name) === 1;
    }
};
