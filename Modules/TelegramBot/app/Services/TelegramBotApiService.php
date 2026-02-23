<?php

namespace Modules\TelegramBot\Services;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramBotApiService
{
    /**
     * Send a plain-text message to a Telegram chat.
     *
     * @param  array<string, mixed>  $options
     * @param  array<string, mixed>  $context
     */
    public function sendMessage(
        int|string $chatId,
        string $text,
        array $options = [],
        array $context = [],
    ): void
    {
        $token = $this->botToken();
        $logContext = $this->buildLogContext($chatId, $context);

        if (! $token) {
            Log::warning('telegram.webhook.bot_token_missing');

            return;
        }

        try {
            $payload = $this->buildPayload($chatId, $text, $options);
            $response = $this->postMessage($token, $payload);

            if ($this->isFailedTelegramResponse($response)) {
                Log::warning('telegram.webhook.send_message_failed', array_merge($logContext, [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]));

                if ($this->isChatNotFoundResponse($response)) {
                    Log::warning('telegram.webhook.chat_not_found', array_merge($logContext, [
                        'status' => $response->status(),
                        'description' => $this->responseDescription($response),
                    ]));
                }

                $replyMarkup = $options['reply_markup'] ?? null;

                if (
                    is_array($replyMarkup)
                    && $this->containsStyleField($replyMarkup)
                    && $this->shouldRetryWithoutStyle($response)
                ) {
                    $fallbackOptions = $options;
                    $fallbackOptions['reply_markup'] = $this->stripStyleField($replyMarkup);
                    $fallbackPayload = $this->buildPayload($chatId, $text, $fallbackOptions);
                    $fallbackResponse = $this->postMessage($token, $fallbackPayload);

                    if ($this->isFailedTelegramResponse($fallbackResponse)) {
                        Log::warning('telegram.webhook.send_message_fallback_failed', array_merge($logContext, [
                            'status' => $fallbackResponse->status(),
                            'body' => $fallbackResponse->body(),
                        ]));
                    }
                }
            }
        } catch (\Throwable $exception) {
            Log::warning('telegram.webhook.send_message_exception', array_merge($logContext, [
                'message' => $exception->getMessage(),
            ]));
        }
    }

    /**
     * Acknowledge an inline keyboard callback query.
     *
     * @param  array<string, mixed>  $options
     */
    public function answerCallbackQuery(string $callbackQueryId, array $options = []): void
    {
        $token = $this->botToken();

        if (! $token) {
            Log::warning('telegram.webhook.bot_token_missing');

            return;
        }

        try {
            $payload = array_merge([
                'callback_query_id' => $callbackQueryId,
            ], $options);

            $response = Http::asForm()
                ->timeout($this->timeoutSeconds())
                ->post("https://api.telegram.org/bot{$token}/answerCallbackQuery", $payload);

            if ($this->isFailedTelegramResponse($response)) {
                Log::warning('telegram.webhook.answer_callback_query_failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
            }
        } catch (\Throwable $exception) {
            Log::warning('telegram.webhook.answer_callback_query_exception', [
                'message' => $exception->getMessage(),
            ]);
        }
    }

    protected function botToken(): ?string
    {
        $token = trim((string) config('telegram.bot_token', ''));

        return $token === '' ? null : $token;
    }

    protected function timeoutSeconds(): int
    {
        $timeout = (int) config('telegram.http_timeout', 10);

        return max(1, $timeout);
    }

    /**
     * @param  array<string, mixed>  $options
     * @return array<string, mixed>
     */
    protected function buildPayload(int|string $chatId, string $text, array $options): array
    {
        $payload = array_merge([
            'chat_id' => (string) $chatId,
            'text' => $text,
        ], $options);

        if (isset($payload['reply_markup']) && is_array($payload['reply_markup'])) {
            $payload['reply_markup'] = json_encode($payload['reply_markup'], JSON_THROW_ON_ERROR);
        }

        return $payload;
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    protected function postMessage(string $token, array $payload): Response
    {
        return Http::asForm()
            ->timeout($this->timeoutSeconds())
            ->post("https://api.telegram.org/bot{$token}/sendMessage", $payload);
    }

    protected function isFailedTelegramResponse(Response $response): bool
    {
        if ($response->failed()) {
            return true;
        }

        $json = $response->json();

        return is_array($json)
            && array_key_exists('ok', $json)
            && $json['ok'] !== true;
    }

    /**
     * @param  array<string, mixed>  $context
     * @return array<string, int|float|bool|string|null>
     */
    protected function buildLogContext(int|string $chatId, array $context): array
    {
        $normalized = [
            'chat_id' => (string) $chatId,
        ];

        foreach ($context as $key => $value) {
            if (! is_string($key) || $key === '') {
                continue;
            }

            if (
                is_int($value)
                || is_float($value)
                || is_bool($value)
                || is_string($value)
                || $value === null
            ) {
                $normalized[$key] = $value;
            }
        }

        return $normalized;
    }

    protected function responseDescription(Response $response): string
    {
        $json = $response->json();

        if (is_array($json) && is_string($json['description'] ?? null)) {
            return (string) $json['description'];
        }

        return trim((string) $response->body());
    }

    protected function isChatNotFoundResponse(Response $response): bool
    {
        return str_contains(
            strtolower($this->responseDescription($response)),
            'chat not found',
        );
    }

    protected function shouldRetryWithoutStyle(Response $response): bool
    {
        $json = $response->json();
        $description = is_array($json) && is_string($json['description'] ?? null)
            ? strtolower($json['description'])
            : strtolower((string) $response->body());

        if ($description === '') {
            return false;
        }

        return str_contains($description, 'style')
            || str_contains($description, 'reply markup')
            || str_contains($description, 'reply keyboard')
            || str_contains($description, 'inline keyboard');
    }

    protected function containsStyleField(array $value): bool
    {
        foreach ($value as $key => $item) {
            if ($key === 'style') {
                return true;
            }

            if (is_array($item) && $this->containsStyleField($item)) {
                return true;
            }
        }

        return false;
    }

    protected function stripStyleField(array $value): array
    {
        $stripped = [];

        foreach ($value as $key => $item) {
            if ($key === 'style') {
                continue;
            }

            $stripped[$key] = is_array($item)
                ? $this->stripStyleField($item)
                : $item;
        }

        return $stripped;
    }
}
