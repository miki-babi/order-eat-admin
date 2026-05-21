import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\CustomerOrderController::store
* @see Modules/Ordering/app/Http/Controllers/CustomerOrderController.php:22
* @route '/api/order/orders'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/order/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ordering\Http\Controllers\CustomerOrderController::store
* @see Modules/Ordering/app/Http/Controllers/CustomerOrderController.php:22
* @route '/api/order/orders'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\CustomerOrderController::store
* @see Modules/Ordering/app/Http/Controllers/CustomerOrderController.php:22
* @route '/api/order/orders'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\CustomerOrderController::store
* @see Modules/Ordering/app/Http/Controllers/CustomerOrderController.php:22
* @route '/api/order/orders'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\CustomerOrderController::store
* @see Modules/Ordering/app/Http/Controllers/CustomerOrderController.php:22
* @route '/api/order/orders'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

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

const CustomerOrderController = { store, index }

export default CustomerOrderController