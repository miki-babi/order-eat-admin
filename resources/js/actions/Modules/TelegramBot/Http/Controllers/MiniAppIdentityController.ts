import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppIdentityController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppIdentityController.php:16
* @route '/api/telegram/miniapp/identity'
*/
const MiniAppIdentityController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: MiniAppIdentityController.url(options),
    method: 'post',
})

MiniAppIdentityController.definition = {
    methods: ["post"],
    url: '/api/telegram/miniapp/identity',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppIdentityController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppIdentityController.php:16
* @route '/api/telegram/miniapp/identity'
*/
MiniAppIdentityController.url = (options?: RouteQueryOptions) => {
    return MiniAppIdentityController.definition.url + queryParams(options)
}

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppIdentityController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppIdentityController.php:16
* @route '/api/telegram/miniapp/identity'
*/
MiniAppIdentityController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: MiniAppIdentityController.url(options),
    method: 'post',
})

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppIdentityController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppIdentityController.php:16
* @route '/api/telegram/miniapp/identity'
*/
const MiniAppIdentityControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: MiniAppIdentityController.url(options),
    method: 'post',
})

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppIdentityController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppIdentityController.php:16
* @route '/api/telegram/miniapp/identity'
*/
MiniAppIdentityControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: MiniAppIdentityController.url(options),
    method: 'post',
})

MiniAppIdentityController.form = MiniAppIdentityControllerForm

export default MiniAppIdentityController