import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:44
* @route '/telegram/menu'
*/
export const menu = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: menu.url(options),
    method: 'get',
})

menu.definition = {
    methods: ["get","head"],
    url: '/telegram/menu',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:44
* @route '/telegram/menu'
*/
menu.url = (options?: RouteQueryOptions) => {
    return menu.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:44
* @route '/telegram/menu'
*/
menu.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: menu.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:44
* @route '/telegram/menu'
*/
menu.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: menu.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:44
* @route '/telegram/menu'
*/
const menuForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: menu.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:44
* @route '/telegram/menu'
*/
menuForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: menu.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:44
* @route '/telegram/menu'
*/
menuForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: menu.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

menu.form = menuForm

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::orders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:57
* @route '/telegram/orders'
*/
export const orders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})

orders.definition = {
    methods: ["get","head"],
    url: '/telegram/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::orders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:57
* @route '/telegram/orders'
*/
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::orders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:57
* @route '/telegram/orders'
*/
orders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::orders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:57
* @route '/telegram/orders'
*/
orders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: orders.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::orders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:57
* @route '/telegram/orders'
*/
const ordersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: orders.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::orders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:57
* @route '/telegram/orders'
*/
ordersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: orders.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::orders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:57
* @route '/telegram/orders'
*/
ordersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: orders.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

orders.form = ordersForm

const telegram = {
    menu: Object.assign(menu, menu),
    orders: Object.assign(orders, orders),
}

export default telegram