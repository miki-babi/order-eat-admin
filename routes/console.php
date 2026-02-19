<?php

use App\Services\SmsEthiopiaService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('sms:test {phone} {message}', function (string $phone, string $message): void {
    /** @var SmsEthiopiaService $smsService */
    $smsService = app(SmsEthiopiaService::class);
    $smsLog = $smsService->send($phone, $message, null);

    $this->line('SMS log ID: '.$smsLog->id);
    $this->line('Status: '.$smsLog->status);
    $this->line('Phone: '.$smsLog->phone);
    $this->line('Provider response: '.($smsLog->provider_response ?? 'N/A'));
})->purpose('Send a test SMS via SmsEthiopiaService');
