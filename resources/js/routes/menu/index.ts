import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:32
* @route '/menu'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/menu',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:32
* @route '/menu'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:32
* @route '/menu'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:32
* @route '/menu'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:32
* @route '/menu'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:32
* @route '/menu'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:32
* @route '/menu'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const menu = {
    index: Object.assign(index, index),
}

export default menu