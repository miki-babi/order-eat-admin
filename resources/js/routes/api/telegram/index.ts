import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import miniapp from './miniapp'
/**
* @see \Modules\TelegramBot\Http\Controllers\WebhookController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/WebhookController.php:24
* @route '/api/telegram/webhook'
*/
export const webhook = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(options),
    method: 'post',
})

webhook.definition = {
    methods: ["post"],
    url: '/api/telegram/webhook',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\TelegramBot\Http\Controllers\WebhookController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/WebhookController.php:24
* @route '/api/telegram/webhook'
*/
webhook.url = (options?: RouteQueryOptions) => {
    return webhook.definition.url + queryParams(options)
}

/**
* @see \Modules\TelegramBot\Http\Controllers\WebhookController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/WebhookController.php:24
* @route '/api/telegram/webhook'
*/
webhook.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(options),
    method: 'post',
})

/**
* @see \Modules\TelegramBot\Http\Controllers\WebhookController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/WebhookController.php:24
* @route '/api/telegram/webhook'
*/
const webhookForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhook.url(options),
    method: 'post',
})

/**
* @see \Modules\TelegramBot\Http\Controllers\WebhookController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/WebhookController.php:24
* @route '/api/telegram/webhook'
*/
webhookForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: webhook.url(options),
    method: 'post',
})

webhook.form = webhookForm

const telegram = {
    webhook: Object.assign(webhook, webhook),
    miniapp: Object.assign(miniapp, miniapp),
}

export default telegram