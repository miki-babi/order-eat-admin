import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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

const orders = {
    store: Object.assign(store, store),
}

export default orders