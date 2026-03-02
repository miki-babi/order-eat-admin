import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/cake-preorders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
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
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::status
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:177
* @route '/staff/cake-preorders/{cakePreorder}/status'
*/
export const status = (args: { cakePreorder: number | { id: number } } | [cakePreorder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/staff/cake-preorders/{cakePreorder}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::status
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:177
* @route '/staff/cake-preorders/{cakePreorder}/status'
*/
status.url = (args: { cakePreorder: number | { id: number } } | [cakePreorder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cakePreorder: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cakePreorder: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cakePreorder: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cakePreorder: typeof args.cakePreorder === 'object'
        ? args.cakePreorder.id
        : args.cakePreorder,
    }

    return status.definition.url
            .replace('{cakePreorder}', parsedArgs.cakePreorder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::status
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:177
* @route '/staff/cake-preorders/{cakePreorder}/status'
*/
status.patch = (args: { cakePreorder: number | { id: number } } | [cakePreorder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::status
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:177
* @route '/staff/cake-preorders/{cakePreorder}/status'
*/
const statusForm = (args: { cakePreorder: number | { id: number } } | [cakePreorder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::status
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:177
* @route '/staff/cake-preorders/{cakePreorder}/status'
*/
statusForm.patch = (args: { cakePreorder: number | { id: number } } | [cakePreorder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

status.form = statusForm

const cakePreorders = {
    index: Object.assign(index, index),
    status: Object.assign(status, status),
}

export default cakePreorders