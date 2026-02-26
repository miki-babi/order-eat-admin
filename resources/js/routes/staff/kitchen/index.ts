import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\Staff\KitchenBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/KitchenBoardController.php:23
* @route '/staff/kitchen-board'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/kitchen-board',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\KitchenBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/KitchenBoardController.php:23
* @route '/staff/kitchen-board'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\KitchenBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/KitchenBoardController.php:23
* @route '/staff/kitchen-board'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\KitchenBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/KitchenBoardController.php:23
* @route '/staff/kitchen-board'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\KitchenBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/KitchenBoardController.php:23
* @route '/staff/kitchen-board'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\KitchenBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/KitchenBoardController.php:23
* @route '/staff/kitchen-board'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\KitchenBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/KitchenBoardController.php:23
* @route '/staff/kitchen-board'
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
* @see \Modules\Ordering\Http\Controllers\Staff\KitchenBoardController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/KitchenBoardController.php:118
* @route '/staff/kitchen-board/statuses/{orderScreenStatus}'
*/
export const update = (args: { orderScreenStatus: number | { id: number } } | [orderScreenStatus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/staff/kitchen-board/statuses/{orderScreenStatus}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\KitchenBoardController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/KitchenBoardController.php:118
* @route '/staff/kitchen-board/statuses/{orderScreenStatus}'
*/
update.url = (args: { orderScreenStatus: number | { id: number } } | [orderScreenStatus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { orderScreenStatus: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { orderScreenStatus: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            orderScreenStatus: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        orderScreenStatus: typeof args.orderScreenStatus === 'object'
        ? args.orderScreenStatus.id
        : args.orderScreenStatus,
    }

    return update.definition.url
            .replace('{orderScreenStatus}', parsedArgs.orderScreenStatus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\KitchenBoardController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/KitchenBoardController.php:118
* @route '/staff/kitchen-board/statuses/{orderScreenStatus}'
*/
update.patch = (args: { orderScreenStatus: number | { id: number } } | [orderScreenStatus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\KitchenBoardController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/KitchenBoardController.php:118
* @route '/staff/kitchen-board/statuses/{orderScreenStatus}'
*/
const updateForm = (args: { orderScreenStatus: number | { id: number } } | [orderScreenStatus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\KitchenBoardController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/KitchenBoardController.php:118
* @route '/staff/kitchen-board/statuses/{orderScreenStatus}'
*/
updateForm.patch = (args: { orderScreenStatus: number | { id: number } } | [orderScreenStatus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const kitchen = {
    index: Object.assign(index, index),
    update: Object.assign(update, update),
}

export default kitchen