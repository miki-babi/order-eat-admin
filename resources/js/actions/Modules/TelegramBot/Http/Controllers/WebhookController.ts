import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\TelegramBot\Http\Controllers\WebhookController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/WebhookController.php:28
* @route '/api/telegram/webhook'
*/
const WebhookController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: WebhookController.url(options),
    method: 'post',
})

WebhookController.definition = {
    methods: ["post"],
    url: '/api/telegram/webhook',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\TelegramBot\Http\Controllers\WebhookController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/WebhookController.php:28
* @route '/api/telegram/webhook'
*/
WebhookController.url = (options?: RouteQueryOptions) => {
    return WebhookController.definition.url + queryParams(options)
}

/**
* @see \Modules\TelegramBot\Http\Controllers\WebhookController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/WebhookController.php:28
* @route '/api/telegram/webhook'
*/
WebhookController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: WebhookController.url(options),
    method: 'post',
})

/**
* @see \Modules\TelegramBot\Http\Controllers\WebhookController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/WebhookController.php:28
* @route '/api/telegram/webhook'
*/
const WebhookControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: WebhookController.url(options),
    method: 'post',
})

/**
* @see \Modules\TelegramBot\Http\Controllers\WebhookController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/WebhookController.php:28
* @route '/api/telegram/webhook'
*/
WebhookControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: WebhookController.url(options),
    method: 'post',
})

WebhookController.form = WebhookControllerForm

export default WebhookController