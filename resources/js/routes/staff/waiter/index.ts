import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:23
* @route '/staff/waiter-board'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/waiter-board',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:23
* @route '/staff/waiter-board'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:23
* @route '/staff/waiter-board'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:23
* @route '/staff/waiter-board'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:23
* @route '/staff/waiter-board'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:23
* @route '/staff/waiter-board'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:23
* @route '/staff/waiter-board'
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
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::confirm
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:121
* @route '/staff/waiter-board/orders/{order}/confirm'
*/
export const confirm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: confirm.url(args, options),
    method: 'patch',
})

confirm.definition = {
    methods: ["patch"],
    url: '/staff/waiter-board/orders/{order}/confirm',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::confirm
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:121
* @route '/staff/waiter-board/orders/{order}/confirm'
*/
confirm.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return confirm.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::confirm
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:121
* @route '/staff/waiter-board/orders/{order}/confirm'
*/
confirm.patch = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: confirm.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::confirm
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:121
* @route '/staff/waiter-board/orders/{order}/confirm'
*/
const confirmForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: confirm.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::confirm
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:121
* @route '/staff/waiter-board/orders/{order}/confirm'
*/
confirmForm.patch = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: confirm.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

confirm.form = confirmForm

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::serve
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:222
* @route '/staff/waiter-board/orders/{order}/serve'
*/
export const serve = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: serve.url(args, options),
    method: 'patch',
})

serve.definition = {
    methods: ["patch"],
    url: '/staff/waiter-board/orders/{order}/serve',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::serve
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:222
* @route '/staff/waiter-board/orders/{order}/serve'
*/
serve.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return serve.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::serve
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:222
* @route '/staff/waiter-board/orders/{order}/serve'
*/
serve.patch = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: serve.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::serve
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:222
* @route '/staff/waiter-board/orders/{order}/serve'
*/
const serveForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: serve.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\WaiterBoardController::serve
* @see Modules/Ordering/app/Http/Controllers/Staff/WaiterBoardController.php:222
* @route '/staff/waiter-board/orders/{order}/serve'
*/
serveForm.patch = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: serve.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

serve.form = serveForm

const waiter = {
    index: Object.assign(index, index),
    confirm: Object.assign(confirm, confirm),
    serve: Object.assign(serve, serve),
}

export default waiter