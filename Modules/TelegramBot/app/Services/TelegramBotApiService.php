<?php

namespace Modules\TelegramBot\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramBotApiService
{
    /**
     * Send a plain-text message to a Telegram chat.
     *
     * @param  array<string, mixed>  $options
     */
    public function sendMessage(int|string $chatId, string $text, array $options = []): void
    {
        $token = $this->botToken();

        if (! $token) {
            Log::warning('telegram.webhook.bot_token_missing');

            return;
        }

        try {
            $payload = array_merge([
                'chat_id' => (string) $chatId,
                'text' => $text,
            ], $options);

            if (isset($payload['reply_markup']) && is_array($payload['reply_markup'])) {
                $payload['reply_markup'] = json_encode($payload['reply_markup'], JSON_THROW_ON_ERROR);
            }

            $response = Http::asForm()
                ->timeout($this->timeoutSeconds())
                ->post("https://api.telegram.org/bot{$token}/sendMessage", $payload);

            if ($response->failed()) {
                Log::warning('telegram.webhook.send_message_failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
            }
        } catch (\Throwable $exception) {
            Log::warning('telegram.webhook.send_message_exception', [
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
}
