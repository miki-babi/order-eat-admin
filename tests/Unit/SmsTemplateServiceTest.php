<?php

use App\Services\SmsTemplateService;

test('sms template service replaces known placeholders', function () {
    $service = new SmsTemplateService();

    $rendered = $service->render(
        'Hi {name}, order #{orderid} at {branch}',
        [
            'name' => 'Miki',
            'orderid' => 45,
            'branch' => 'Bole Branch',
        ],
    );

    expect($rendered)->toBe('Hi Miki, order #45 at Bole Branch');
});

test('sms template service keeps unknown placeholders unchanged', function () {
    $service = new SmsTemplateService();

    $rendered = $service->render('Hi {name}, code {unknown}', [
        'name' => 'Miki',
    ]);

    expect($rendered)->toBe('Hi Miki, code {unknown}');
});

test('sms template service matches placeholders case-insensitively', function () {
    $service = new SmsTemplateService();

    $rendered = $service->render('Hi {NAME}, order #{OrderId}', [
        'name' => 'Miki',
        'orderid' => 99,
    ]);

    expect($rendered)->toBe('Hi Miki, order #99');
});
