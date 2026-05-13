import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:274
* @route '/staff/waiter-board/orders/{order}/customer-tags'
*/
export const update = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/staff/waiter-board/orders/{order}/customer-tags',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:274
* @route '/staff/waiter-board/orders/{order}/customer-tags'
*/
update.url = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order: typeof args.order === 'object'
        ? args.order.id
        : args.order,
    }

    return update.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:274
* @route '/staff/waiter-board/orders/{order}/customer-tags'
*/
update.patch = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:274
* @route '/staff/waiter-board/orders/{order}/customer-tags'
*/
const updateForm = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:274
* @route '/staff/waiter-board/orders/{order}/customer-tags'
*/
updateForm.patch = (args: { order: string | number | { id: string | number } } | [order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const customerTags = {
    update: Object.assign(update, update),
}

export default customerTags