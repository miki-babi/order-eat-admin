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
    | Miniapp URL Override
    |--------------------------------------------------------------------------
    |
    | Optional absolute URL for Telegram WebApp button launch. When omitted,
    | the app falls back to APP_URL with ?channel=telegram.
    |
    */
    'miniapp_url' => env('TELEGRAM_MINIAPP_URL'),

    /*
    |--------------------------------------------------------------------------
    | Miniapp Button Text
    |--------------------------------------------------------------------------
    |
    | Default button text for Telegram inline WebApp launch buttons.
    | System admin can override this from feature settings.
    |
    */
    'miniapp_button_text' => env('TELEGRAM_MINIAPP_BUTTON_TEXT', 'Order'),

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
