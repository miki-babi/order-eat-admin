import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\QrMenuController::store
* @see Modules/Ordering/app/Http/Controllers/QrMenuController.php:143
* @route '/qr-menu/{diningTable}/orders'
*/
export const store = (args: { diningTable: string | number | { qr_code: string | number } } | [diningTable: string | number | { qr_code: string | number } ] | string | number | { qr_code: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/qr-menu/{diningTable}/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ordering\Http\Controllers\QrMenuController::store
* @see Modules/Ordering/app/Http/Controllers/QrMenuController.php:143
* @route '/qr-menu/{diningTable}/orders'
*/
store.url = (args: { diningTable: string | number | { qr_code: string | number } } | [diningTable: string | number | { qr_code: string | number } ] | string | number | { qr_code: string | number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{diningTable}', parsedArgs.diningTable.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\QrMenuController::store
* @see Modules/Ordering/app/Http/Controllers/QrMenuController.php:143
* @route '/qr-menu/{diningTable}/orders'
*/
store.post = (args: { diningTable: string | number | { qr_code: string | number } } | [diningTable: string | number | { qr_code: string | number } ] | string | number | { qr_code: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\QrMenuController::store
* @see Modules/Ordering/app/Http/Controllers/QrMenuController.php:143
* @route '/qr-menu/{diningTable}/orders'
*/
const storeForm = (args: { diningTable: string | number | { qr_code: string | number } } | [diningTable: string | number | { qr_code: string | number } ] | string | number | { qr_code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\QrMenuController::store
* @see Modules/Ordering/app/Http/Controllers/QrMenuController.php:143
* @route '/qr-menu/{diningTable}/orders'
*/
storeForm.post = (args: { diningTable: string | number | { qr_code: string | number } } | [diningTable: string | number | { qr_code: string | number } ] | string | number | { qr_code: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const orders = {
    store: Object.assign(store, store),
}

export default orders