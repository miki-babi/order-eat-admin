import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:22
* @route '/staff/catering-requests'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/catering-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:22
* @route '/staff/catering-requests'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:22
* @route '/staff/catering-requests'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:22
* @route '/staff/catering-requests'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:22
* @route '/staff/catering-requests'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:22
* @route '/staff/catering-requests'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:22
* @route '/staff/catering-requests'
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
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::status
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:187
* @route '/staff/catering-requests/{cateringServiceRequest}/status'
*/
export const status = (args: { cateringServiceRequest: number | { id: number } } | [cateringServiceRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

status.definition = {
    methods: ["patch"],
    url: '/staff/catering-requests/{cateringServiceRequest}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::status
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:187
* @route '/staff/catering-requests/{cateringServiceRequest}/status'
*/
status.url = (args: { cateringServiceRequest: number | { id: number } } | [cateringServiceRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cateringServiceRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cateringServiceRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cateringServiceRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cateringServiceRequest: typeof args.cateringServiceRequest === 'object'
        ? args.cateringServiceRequest.id
        : args.cateringServiceRequest,
    }

    return status.definition.url
            .replace('{cateringServiceRequest}', parsedArgs.cateringServiceRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::status
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:187
* @route '/staff/catering-requests/{cateringServiceRequest}/status'
*/
status.patch = (args: { cateringServiceRequest: number | { id: number } } | [cateringServiceRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: status.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::status
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:187
* @route '/staff/catering-requests/{cateringServiceRequest}/status'
*/
const statusForm = (args: { cateringServiceRequest: number | { id: number } } | [cateringServiceRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::status
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:187
* @route '/staff/catering-requests/{cateringServiceRequest}/status'
*/
statusForm.patch = (args: { cateringServiceRequest: number | { id: number } } | [cateringServiceRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

status.form = statusForm

const cateringRequests = {
    index: Object.assign(index, index),
    status: Object.assign(status, status),
}

export default cateringRequests