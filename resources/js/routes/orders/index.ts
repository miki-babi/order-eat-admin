import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import receipt from './receipt'
/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:101
* @route '/orders'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:101
* @route '/orders'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:101
* @route '/orders'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:101
* @route '/orders'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:101
* @route '/orders'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::confirmation
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:261
* @route '/orders/{trackingToken}/confirmation'
*/
export const confirmation = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(args, options),
    method: 'get',
})

confirmation.definition = {
    methods: ["get","head"],
    url: '/orders/{trackingToken}/confirmation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::confirmation
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:261
* @route '/orders/{trackingToken}/confirmation'
*/
confirmation.url = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return confirmation.definition.url
            .replace('{trackingToken}', parsedArgs.trackingToken.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::confirmation
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:261
* @route '/orders/{trackingToken}/confirmation'
*/
confirmation.get = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::confirmation
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:261
* @route '/orders/{trackingToken}/confirmation'
*/
confirmation.head = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirmation.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::confirmation
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:261
* @route '/orders/{trackingToken}/confirmation'
*/
const confirmationForm = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::confirmation
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:261
* @route '/orders/{trackingToken}/confirmation'
*/
confirmationForm.get = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::confirmation
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:261
* @route '/orders/{trackingToken}/confirmation'
*/
confirmationForm.head = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

confirmation.form = confirmationForm

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::track
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:273
* @route '/orders/{trackingToken}/track'
*/
export const track = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: track.url(args, options),
    method: 'get',
})

track.definition = {
    methods: ["get","head"],
    url: '/orders/{trackingToken}/track',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::track
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:273
* @route '/orders/{trackingToken}/track'
*/
track.url = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return track.definition.url
            .replace('{trackingToken}', parsedArgs.trackingToken.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::track
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:273
* @route '/orders/{trackingToken}/track'
*/
track.get = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: track.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::track
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:273
* @route '/orders/{trackingToken}/track'
*/
track.head = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: track.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::track
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:273
* @route '/orders/{trackingToken}/track'
*/
const trackForm = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: track.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::track
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:273
* @route '/orders/{trackingToken}/track'
*/
trackForm.get = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: track.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::track
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:273
* @route '/orders/{trackingToken}/track'
*/
trackForm.head = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: track.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

track.form = trackForm

const orders = {
    store: Object.assign(store, store),
    confirmation: Object.assign(confirmation, confirmation),
    track: Object.assign(track, track),
    receipt: Object.assign(receipt, receipt),
}

export default orders