<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\SmsLog;
use App\Models\SmsPhoneList;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class SmsEthiopiaService
{
    /**
     * Send an SMS and persist the provider result.
     */
    public function send(string $phone, string $message, ?Customer $customer = null): SmsLog
    {
        $enabled = (bool) config('services.sms_ethiopia.enabled');
        $baseUrl = rtrim((string) config('services.sms_ethiopia.base_url'), '/');
        $normalizedPhone = $this->normalizePhone($phone);

        $log = SmsLog::query()->create([
            'customer_id' => $customer?->id,
            'phone' => $phone,
            'message' => $message,
            'status' => 'pending',
        ]);

        Log::info('sms_ethiopia.send.attempt', [
            'sms_log_id' => $log->id,
            'customer_id' => $customer?->id,
            'phone' => $phone,
            'normalized_phone' => $normalizedPhone,
            'enabled' => $enabled,
            'base_url' => $baseUrl,
        ]);

        if (! $normalizedPhone) {
            $log->update([
                'status' => 'failed',
                'provider_response' => 'Invalid Ethiopian phone format. Expected 2519XXXXXXXX / 09XXXXXXXX.',
            ]);

            Log::warning('sms_ethiopia.send.failed', [
                'sms_log_id' => $log->id,
                'reason' => 'invalid_phone_format',
                'phone' => $phone,
            ]);

            return $log->fresh();
        }

        if (Schema::hasTable('sms_phone_lists')) {
            $isBlacklisted = SmsPhoneList::query()
                ->where('list_type', 'blacklist')
                ->where('normalized_phone', $normalizedPhone)
                ->exists();

            if ($isBlacklisted) {
                $log->update([
                    'status' => 'failed',
                    'provider_response' => 'Phone is blacklisted for SMS.',
                ]);

                Log::warning('sms_ethiopia.send.failed', [
                    'sms_log_id' => $log->id,
                    'reason' => 'phone_blacklisted',
                    'normalized_phone' => $normalizedPhone,
                ]);

                return $log->fresh();
            }

            $whitelistCount = SmsPhoneList::query()
                ->where('list_type', 'whitelist')
                ->count();

            if ($whitelistCount > 0) {
                $isWhitelisted = SmsPhoneList::query()
                    ->where('list_type', 'whitelist')
                    ->where('normalized_phone', $normalizedPhone)
                    ->exists();

                if (! $isWhitelisted) {
                    $log->update([
                        'status' => 'failed',
                        'provider_response' => 'Phone not in whitelist while whitelist mode is active.',
                    ]);

                    Log::warning('sms_ethiopia.send.failed', [
                        'sms_log_id' => $log->id,
                        'reason' => 'phone_not_whitelisted',
                        'normalized_phone' => $normalizedPhone,
                    ]);

                    return $log->fresh();
                }
            }
        }

        if (! $enabled) {
            $log->update([
                'status' => 'failed',
                'provider_response' => 'SMS provider disabled in environment.',
                'sent_at' => null,
            ]);

            Log::info('sms_ethiopia.send.skipped', [
                'sms_log_id' => $log->id,
                'reason' => 'provider_disabled',
            ]);

            return $log->fresh();
        }

        $apiKey = config('services.sms_ethiopia.key');
        $endpoint = $baseUrl.'/api/sms/send';

        if (! $apiKey) {
            $log->update([
                'status' => 'failed',
                'provider_response' => 'Missing SMS_ETHIOPIA_API_KEY.',
            ]);

            Log::warning('sms_ethiopia.send.failed', [
                'sms_log_id' => $log->id,
                'reason' => 'missing_api_key',
            ]);

            return $log->fresh();
        }

        try {
            $response = Http::timeout(10)
                ->withHeaders([
                    'KEY' => $apiKey,
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ])
                ->post($endpoint, [
                    'msisdn' => $normalizedPhone,
                    'text' => $message,
                ]);

            $log->update([
                'status' => $response->successful() ? 'sent' : 'failed',
                'provider_response' => $response->body(),
                'sent_at' => $response->successful() ? now() : null,
            ]);

            Log::info('sms_ethiopia.send.response', [
                'sms_log_id' => $log->id,
                'http_status' => $response->status(),
                'successful' => $response->successful(),
                'provider_response' => $response->body(),
            ]);
        } catch (\Throwable $exception) {
            $log->update([
                'status' => 'failed',
                'provider_response' => $exception->getMessage(),
            ]);

            Log::error('sms_ethiopia.send.exception', [
                'sms_log_id' => $log->id,
                'message' => $exception->getMessage(),
            ]);
        }

        return $log->fresh();
    }

    /**
     * Normalize supported Ethiopian mobile number formats to 251XXXXXXXXX.
     */
    public function normalizePhone(string $phone): ?string
    {
        $digits = preg_replace('/\D+/', '', $phone);

        if (! is_string($digits) || $digits === '') {
            return null;
        }

        if (preg_match('/^(251)([79]\d{8})$/', $digits, $matches)) {
            return $matches[1].$matches[2];
        }

        if (preg_match('/^0([79]\d{8})$/', $digits, $matches)) {
            return '251'.$matches[1];
        }

        if (preg_match('/^([79]\d{8})$/', $digits, $matches)) {
            return '251'.$matches[1];
        }

        return null;
    }
}
