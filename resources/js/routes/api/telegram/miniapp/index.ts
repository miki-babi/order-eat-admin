import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppIdentityController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppIdentityController.php:16
* @route '/api/telegram/miniapp/identity'
*/
export const identity = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: identity.url(options),
    method: 'post',
})

identity.definition = {
    methods: ["post"],
    url: '/api/telegram/miniapp/identity',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppIdentityController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppIdentityController.php:16
* @route '/api/telegram/miniapp/identity'
*/
identity.url = (options?: RouteQueryOptions) => {
    return identity.definition.url + queryParams(options)
}

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppIdentityController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppIdentityController.php:16
* @route '/api/telegram/miniapp/identity'
*/
identity.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: identity.url(options),
    method: 'post',
})

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppIdentityController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppIdentityController.php:16
* @route '/api/telegram/miniapp/identity'
*/
const identityForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: identity.url(options),
    method: 'post',
})

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppIdentityController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppIdentityController.php:16
* @route '/api/telegram/miniapp/identity'
*/
identityForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: identity.url(options),
    method: 'post',
})

identity.form = identityForm

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppOrdersController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppOrdersController.php:17
* @route '/api/telegram/miniapp/orders'
*/
export const orders = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: orders.url(options),
    method: 'post',
})

orders.definition = {
    methods: ["post"],
    url: '/api/telegram/miniapp/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppOrdersController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppOrdersController.php:17
* @route '/api/telegram/miniapp/orders'
*/
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options)
}

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppOrdersController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppOrdersController.php:17
* @route '/api/telegram/miniapp/orders'
*/
orders.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: orders.url(options),
    method: 'post',
})

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppOrdersController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppOrdersController.php:17
* @route '/api/telegram/miniapp/orders'
*/
const ordersForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: orders.url(options),
    method: 'post',
})

/**
* @see \Modules\TelegramBot\Http\Controllers\MiniAppOrdersController::__invoke
* @see Modules/TelegramBot/app/Http/Controllers/MiniAppOrdersController.php:17
* @route '/api/telegram/miniapp/orders'
*/
ordersForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: orders.url(options),
    method: 'post',
})

orders.form = ordersForm

const miniapp = {
    identity: Object.assign(identity, identity),
    orders: Object.assign(orders, orders),
}

export default miniapp