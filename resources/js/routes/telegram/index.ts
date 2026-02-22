import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
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
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
* @route '/telegram/menu'
*/
menu.url = (options?: RouteQueryOptions) => {
    return menu.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
* @route '/telegram/menu'
*/
menu.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: menu.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
* @route '/telegram/menu'
*/
menu.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: menu.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
* @route '/telegram/menu'
*/
const menuForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: menu.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
* @route '/telegram/menu'
*/
menuForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: menu.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::menu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
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

const telegram = {
    menu: Object.assign(menu, menu),
}

export default telegram