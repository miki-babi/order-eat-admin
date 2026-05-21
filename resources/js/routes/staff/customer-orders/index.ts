import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\CustomerOrderController::index
* @see Modules/Ordering/app/Http/Controllers/CustomerOrderController.php:151
* @route '/staff/customer-orders'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/customer-orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\CustomerOrderController::index
* @see Modules/Ordering/app/Http/Controllers/CustomerOrderController.php:151
* @route '/staff/customer-orders'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\CustomerOrderController::index
* @see Modules/Ordering/app/Http/Controllers/CustomerOrderController.php:151
* @route '/staff/customer-orders'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\CustomerOrderController::index
* @see Modules/Ordering/app/Http/Controllers/CustomerOrderController.php:151
* @route '/staff/customer-orders'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\CustomerOrderController::index
* @see Modules/Ordering/app/Http/Controllers/CustomerOrderController.php:151
* @route '/staff/customer-orders'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\CustomerOrderController::index
* @see Modules/Ordering/app/Http/Controllers/CustomerOrderController.php:151
* @route '/staff/customer-orders'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\CustomerOrderController::index
* @see Modules/Ordering/app/Http/Controllers/CustomerOrderController.php:151
* @route '/staff/customer-orders'
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

const customerOrders = {
    index: Object.assign(index, index),
}

export default customerOrders