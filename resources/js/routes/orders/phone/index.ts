import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:388
* @route '/orders/{trackingToken}/phone'
*/
export const store = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/orders/{trackingToken}/phone',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:388
* @route '/orders/{trackingToken}/phone'
*/
store.url = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { trackingToken: args }
    }

    if (Array.isArray(args)) {
        args = {
            trackingToken: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        trackingToken: args.trackingToken,
    }

    return store.definition.url
            .replace('{trackingToken}', parsedArgs.trackingToken.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:388
* @route '/orders/{trackingToken}/phone'
*/
store.post = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:388
* @route '/orders/{trackingToken}/phone'
*/
const storeForm = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:388
* @route '/orders/{trackingToken}/phone'
*/
storeForm.post = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const phone = {
    store: Object.assign(store, store),
}

export default phone