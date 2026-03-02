import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::storePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:119
* @route '/staff/catering-packages'
*/
export const storePackage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePackage.url(options),
    method: 'post',
})

storePackage.definition = {
    methods: ["post"],
    url: '/staff/catering-packages',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::storePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:119
* @route '/staff/catering-packages'
*/
storePackage.url = (options?: RouteQueryOptions) => {
    return storePackage.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::storePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:119
* @route '/staff/catering-packages'
*/
storePackage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePackage.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::storePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:119
* @route '/staff/catering-packages'
*/
const storePackageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storePackage.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::storePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:119
* @route '/staff/catering-packages'
*/
storePackageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storePackage.url(options),
    method: 'post',
})

storePackage.form = storePackageForm

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::updatePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:139
* @route '/staff/catering-packages/{cateringPackage}'
*/
export const updatePackage = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePackage.url(args, options),
    method: 'put',
})

updatePackage.definition = {
    methods: ["put"],
    url: '/staff/catering-packages/{cateringPackage}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::updatePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:139
* @route '/staff/catering-packages/{cateringPackage}'
*/
updatePackage.url = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cateringPackage: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cateringPackage: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cateringPackage: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cateringPackage: typeof args.cateringPackage === 'object'
        ? args.cateringPackage.id
        : args.cateringPackage,
    }

    return updatePackage.definition.url
            .replace('{cateringPackage}', parsedArgs.cateringPackage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::updatePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:139
* @route '/staff/catering-packages/{cateringPackage}'
*/
updatePackage.put = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePackage.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::updatePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:139
* @route '/staff/catering-packages/{cateringPackage}'
*/
const updatePackageForm = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePackage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::updatePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:139
* @route '/staff/catering-packages/{cateringPackage}'
*/
updatePackageForm.put = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePackage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatePackage.form = updatePackageForm

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::destroyPackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:167
* @route '/staff/catering-packages/{cateringPackage}'
*/
export const destroyPackage = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPackage.url(args, options),
    method: 'delete',
})

destroyPackage.definition = {
    methods: ["delete"],
    url: '/staff/catering-packages/{cateringPackage}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::destroyPackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:167
* @route '/staff/catering-packages/{cateringPackage}'
*/
destroyPackage.url = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cateringPackage: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cateringPackage: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cateringPackage: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cateringPackage: typeof args.cateringPackage === 'object'
        ? args.cateringPackage.id
        : args.cateringPackage,
    }

    return destroyPackage.definition.url
            .replace('{cateringPackage}', parsedArgs.cateringPackage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::destroyPackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:167
* @route '/staff/catering-packages/{cateringPackage}'
*/
destroyPackage.delete = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPackage.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::destroyPackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:167
* @route '/staff/catering-packages/{cateringPackage}'
*/
const destroyPackageForm = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyPackage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::destroyPackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:167
* @route '/staff/catering-packages/{cateringPackage}'
*/
destroyPackageForm.delete = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyPackage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyPackage.form = destroyPackageForm

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::updateRequestStatus
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:187
* @route '/staff/catering-requests/{cateringServiceRequest}/status'
*/
export const updateRequestStatus = (args: { cateringServiceRequest: number | { id: number } } | [cateringServiceRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateRequestStatus.url(args, options),
    method: 'patch',
})

updateRequestStatus.definition = {
    methods: ["patch"],
    url: '/staff/catering-requests/{cateringServiceRequest}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::updateRequestStatus
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:187
* @route '/staff/catering-requests/{cateringServiceRequest}/status'
*/
updateRequestStatus.url = (args: { cateringServiceRequest: number | { id: number } } | [cateringServiceRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateRequestStatus.definition.url
            .replace('{cateringServiceRequest}', parsedArgs.cateringServiceRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::updateRequestStatus
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:187
* @route '/staff/catering-requests/{cateringServiceRequest}/status'
*/
updateRequestStatus.patch = (args: { cateringServiceRequest: number | { id: number } } | [cateringServiceRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateRequestStatus.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::updateRequestStatus
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:187
* @route '/staff/catering-requests/{cateringServiceRequest}/status'
*/
const updateRequestStatusForm = (args: { cateringServiceRequest: number | { id: number } } | [cateringServiceRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateRequestStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::updateRequestStatus
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:187
* @route '/staff/catering-requests/{cateringServiceRequest}/status'
*/
updateRequestStatusForm.patch = (args: { cateringServiceRequest: number | { id: number } } | [cateringServiceRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateRequestStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateRequestStatus.form = updateRequestStatusForm

const CateringRequestController = { index, storePackage, updatePackage, destroyPackage, updateRequestStatus }

export default CateringRequestController