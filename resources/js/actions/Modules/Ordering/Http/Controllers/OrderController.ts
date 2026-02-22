import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:31
* @route '/'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:31
* @route '/'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:31
* @route '/'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:31
* @route '/'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:31
* @route '/'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:31
* @route '/'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::index
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:31
* @route '/'
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

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramMenu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
* @route '/telegram/menu'
*/
export const telegramMenu = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: telegramMenu.url(options),
    method: 'get',
})

telegramMenu.definition = {
    methods: ["get","head"],
    url: '/telegram/menu',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramMenu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
* @route '/telegram/menu'
*/
telegramMenu.url = (options?: RouteQueryOptions) => {
    return telegramMenu.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramMenu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
* @route '/telegram/menu'
*/
telegramMenu.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: telegramMenu.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramMenu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
* @route '/telegram/menu'
*/
telegramMenu.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: telegramMenu.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramMenu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
* @route '/telegram/menu'
*/
const telegramMenuForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: telegramMenu.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramMenu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
* @route '/telegram/menu'
*/
telegramMenuForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: telegramMenu.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramMenu
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:43
* @route '/telegram/menu'
*/
telegramMenuForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: telegramMenu.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

telegramMenu.form = telegramMenuForm

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramOrders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:56
* @route '/telegram/orders'
*/
export const telegramOrders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: telegramOrders.url(options),
    method: 'get',
})

telegramOrders.definition = {
    methods: ["get","head"],
    url: '/telegram/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramOrders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:56
* @route '/telegram/orders'
*/
telegramOrders.url = (options?: RouteQueryOptions) => {
    return telegramOrders.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramOrders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:56
* @route '/telegram/orders'
*/
telegramOrders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: telegramOrders.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramOrders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:56
* @route '/telegram/orders'
*/
telegramOrders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: telegramOrders.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramOrders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:56
* @route '/telegram/orders'
*/
const telegramOrdersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: telegramOrders.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramOrders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:56
* @route '/telegram/orders'
*/
telegramOrdersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: telegramOrders.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::telegramOrders
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:56
* @route '/telegram/orders'
*/
telegramOrdersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: telegramOrders.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

telegramOrders.form = telegramOrdersForm

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:139
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
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:139
* @route '/orders'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:139
* @route '/orders'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:139
* @route '/orders'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::store
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:139
* @route '/orders'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::confirmation
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:299
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
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:299
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
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:299
* @route '/orders/{trackingToken}/confirmation'
*/
confirmation.get = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::confirmation
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:299
* @route '/orders/{trackingToken}/confirmation'
*/
confirmation.head = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirmation.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::confirmation
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:299
* @route '/orders/{trackingToken}/confirmation'
*/
const confirmationForm = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::confirmation
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:299
* @route '/orders/{trackingToken}/confirmation'
*/
confirmationForm.get = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::confirmation
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:299
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
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:311
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
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:311
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
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:311
* @route '/orders/{trackingToken}/track'
*/
track.get = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: track.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::track
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:311
* @route '/orders/{trackingToken}/track'
*/
track.head = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: track.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::track
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:311
* @route '/orders/{trackingToken}/track'
*/
const trackForm = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: track.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::track
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:311
* @route '/orders/{trackingToken}/track'
*/
trackForm.get = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: track.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::track
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:311
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

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::uploadReceipt
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:323
* @route '/orders/{trackingToken}/receipt'
*/
export const uploadReceipt = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadReceipt.url(args, options),
    method: 'post',
})

uploadReceipt.definition = {
    methods: ["post"],
    url: '/orders/{trackingToken}/receipt',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::uploadReceipt
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:323
* @route '/orders/{trackingToken}/receipt'
*/
uploadReceipt.url = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return uploadReceipt.definition.url
            .replace('{trackingToken}', parsedArgs.trackingToken.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::uploadReceipt
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:323
* @route '/orders/{trackingToken}/receipt'
*/
uploadReceipt.post = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadReceipt.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::uploadReceipt
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:323
* @route '/orders/{trackingToken}/receipt'
*/
const uploadReceiptForm = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadReceipt.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::uploadReceipt
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:323
* @route '/orders/{trackingToken}/receipt'
*/
uploadReceiptForm.post = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadReceipt.url(args, options),
    method: 'post',
})

uploadReceipt.form = uploadReceiptForm

const OrderController = { index, telegramMenu, telegramOrders, store, confirmation, track, uploadReceipt }

export default OrderController