<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Telegram Bot Token
    |--------------------------------------------------------------------------
    |
    | Bot token provided by BotFather.
    |
    */
    'bot_token' => env('TELEGRAM_BOT_TOKEN'),

    /*
    |--------------------------------------------------------------------------
    | Validate Webhook Secret
    |--------------------------------------------------------------------------
    |
    | When enabled, webhook requests must include:
    | X-Telegram-Bot-Api-Secret-Token
    |
    */
    'validate_webhook_secret' => (bool) env('TELEGRAM_VALIDATE_WEBHOOK_SECRET', false),

    /*
    |--------------------------------------------------------------------------
    | Telegram Webhook Secret
    |--------------------------------------------------------------------------
    |
    | Optional secret token validated from:
    | X-Telegram-Bot-Api-Secret-Token
    |
    */
    'webhook_secret' => env('TELEGRAM_WEBHOOK_SECRET'),

    /*
    |--------------------------------------------------------------------------
    | HTTP Timeout
    |--------------------------------------------------------------------------
    |
    | Timeout in seconds for Telegram Bot API requests.
    |
    */
    'http_timeout' => (int) env('TELEGRAM_HTTP_TIMEOUT', 10),
];
