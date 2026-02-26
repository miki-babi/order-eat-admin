import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\OrderController::upload
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:364
* @route '/orders/{trackingToken}/receipt'
*/
export const upload = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/orders/{trackingToken}/receipt',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::upload
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:364
* @route '/orders/{trackingToken}/receipt'
*/
upload.url = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return upload.definition.url
            .replace('{trackingToken}', parsedArgs.trackingToken.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::upload
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:364
* @route '/orders/{trackingToken}/receipt'
*/
upload.post = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::upload
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:364
* @route '/orders/{trackingToken}/receipt'
*/
const uploadForm = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: upload.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\OrderController::upload
* @see Modules/Ordering/app/Http/Controllers/OrderController.php:364
* @route '/orders/{trackingToken}/receipt'
*/
uploadForm.post = (args: { trackingToken: string | number } | [trackingToken: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: upload.url(args, options),
    method: 'post',
})

upload.form = uploadForm

const receipt = {
    upload: Object.assign(upload, upload),
}

export default receipt