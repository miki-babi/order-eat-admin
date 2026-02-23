import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppOrdersController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppOrdersController.php:18
* @route '/api/telegram/miniapp/orders'
*/
const MiniAppOrdersController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: MiniAppOrdersController.url(options),
    method: 'post',
})

MiniAppOrdersController.definition = {
    methods: ["post"],
    url: '/api/telegram/miniapp/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppOrdersController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppOrdersController.php:18
* @route '/api/telegram/miniapp/orders'
*/
MiniAppOrdersController.url = (options?: RouteQueryOptions) => {
    return MiniAppOrdersController.definition.url + queryParams(options)
}

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppOrdersController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppOrdersController.php:18
* @route '/api/telegram/miniapp/orders'
*/
MiniAppOrdersController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: MiniAppOrdersController.url(options),
    method: 'post',
})

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppOrdersController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppOrdersController.php:18
* @route '/api/telegram/miniapp/orders'
*/
const MiniAppOrdersControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: MiniAppOrdersController.url(options),
    method: 'post',
})

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppOrdersController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppOrdersController.php:18
* @route '/api/telegram/miniapp/orders'
*/
MiniAppOrdersControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: MiniAppOrdersController.url(options),
    method: 'post',
})

MiniAppOrdersController.form = MiniAppOrdersControllerForm

export default MiniAppOrdersController