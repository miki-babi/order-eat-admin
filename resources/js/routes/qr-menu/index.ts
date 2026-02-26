import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import orders from './orders'
/**
* @see \Modules\Ordering\Http\Controllers\QrMenuController::show
* @see Modules/Ordering/app/Http/Controllers/QrMenuController.php:26
* @route '/qr-menu/{diningTable}'
*/
export const show = (args: { diningTable: string | { qr_code: string } } | [diningTable: string | { qr_code: string } ] | string | { qr_code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/qr-menu/{diningTable}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\QrMenuController::show
* @see Modules/Ordering/app/Http/Controllers/QrMenuController.php:26
* @route '/qr-menu/{diningTable}'
*/
show.url = (args: { diningTable: string | { qr_code: string } } | [diningTable: string | { qr_code: string } ] | string | { qr_code: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { diningTable: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'qr_code' in args) {
        args = { diningTable: args.qr_code }
    }

    if (Array.isArray(args)) {
        args = {
            diningTable: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        diningTable: typeof args.diningTable === 'object'
        ? args.diningTable.qr_code
        : args.diningTable,
    }

    return show.definition.url
            .replace('{diningTable}', parsedArgs.diningTable.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\QrMenuController::show
* @see Modules/Ordering/app/Http/Controllers/QrMenuController.php:26
* @route '/qr-menu/{diningTable}'
*/
show.get = (args: { diningTable: string | { qr_code: string } } | [diningTable: string | { qr_code: string } ] | string | { qr_code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\QrMenuController::show
* @see Modules/Ordering/app/Http/Controllers/QrMenuController.php:26
* @route '/qr-menu/{diningTable}'
*/
show.head = (args: { diningTable: string | { qr_code: string } } | [diningTable: string | { qr_code: string } ] | string | { qr_code: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\QrMenuController::show
* @see Modules/Ordering/app/Http/Controllers/QrMenuController.php:26
* @route '/qr-menu/{diningTable}'
*/
const showForm = (args: { diningTable: string | { qr_code: string } } | [diningTable: string | { qr_code: string } ] | string | { qr_code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\QrMenuController::show
* @see Modules/Ordering/app/Http/Controllers/QrMenuController.php:26
* @route '/qr-menu/{diningTable}'
*/
showForm.get = (args: { diningTable: string | { qr_code: string } } | [diningTable: string | { qr_code: string } ] | string | { qr_code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\QrMenuController::show
* @see Modules/Ordering/app/Http/Controllers/QrMenuController.php:26
* @route '/qr-menu/{diningTable}'
*/
showForm.head = (args: { diningTable: string | { qr_code: string } } | [diningTable: string | { qr_code: string } ] | string | { qr_code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const qrMenu = {
    show: Object.assign(show, show),
    orders: Object.assign(orders, orders),
}

export default qrMenu