import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\Staff\CashierBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CashierBoardController.php:20
* @route '/staff/cashier-board'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/cashier-board',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CashierBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CashierBoardController.php:20
* @route '/staff/cashier-board'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CashierBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CashierBoardController.php:20
* @route '/staff/cashier-board'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CashierBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CashierBoardController.php:20
* @route '/staff/cashier-board'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CashierBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CashierBoardController.php:20
* @route '/staff/cashier-board'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CashierBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CashierBoardController.php:20
* @route '/staff/cashier-board'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CashierBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CashierBoardController.php:20
* @route '/staff/cashier-board'
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

const CashierBoardController = { index }

export default CashierBoardController