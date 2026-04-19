import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::index
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:23
* @route '/staff/pickup-locations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/pickup-locations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::index
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:23
* @route '/staff/pickup-locations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::index
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:23
* @route '/staff/pickup-locations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::index
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:23
* @route '/staff/pickup-locations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::index
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:23
* @route '/staff/pickup-locations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::index
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:23
* @route '/staff/pickup-locations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::index
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:23
* @route '/staff/pickup-locations'
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
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::store
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:184
* @route '/staff/pickup-locations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/staff/pickup-locations',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::store
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:184
* @route '/staff/pickup-locations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::store
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:184
* @route '/staff/pickup-locations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::store
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:184
* @route '/staff/pickup-locations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::store
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:184
* @route '/staff/pickup-locations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::update
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:201
* @route '/staff/pickup-locations/{pickupLocation}'
*/
export const update = (args: { pickupLocation: string | number | { id: string | number } } | [pickupLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/staff/pickup-locations/{pickupLocation}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::update
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:201
* @route '/staff/pickup-locations/{pickupLocation}'
*/
update.url = (args: { pickupLocation: string | number | { id: string | number } } | [pickupLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pickupLocation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pickupLocation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pickupLocation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pickupLocation: typeof args.pickupLocation === 'object'
        ? args.pickupLocation.id
        : args.pickupLocation,
    }

    return update.definition.url
            .replace('{pickupLocation}', parsedArgs.pickupLocation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::update
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:201
* @route '/staff/pickup-locations/{pickupLocation}'
*/
update.put = (args: { pickupLocation: string | number | { id: string | number } } | [pickupLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::update
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:201
* @route '/staff/pickup-locations/{pickupLocation}'
*/
const updateForm = (args: { pickupLocation: string | number | { id: string | number } } | [pickupLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::update
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:201
* @route '/staff/pickup-locations/{pickupLocation}'
*/
updateForm.put = (args: { pickupLocation: string | number | { id: string | number } } | [pickupLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::destroy
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:220
* @route '/staff/pickup-locations/{pickupLocation}'
*/
export const destroy = (args: { pickupLocation: string | number | { id: string | number } } | [pickupLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/staff/pickup-locations/{pickupLocation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::destroy
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:220
* @route '/staff/pickup-locations/{pickupLocation}'
*/
destroy.url = (args: { pickupLocation: string | number | { id: string | number } } | [pickupLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pickupLocation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pickupLocation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pickupLocation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pickupLocation: typeof args.pickupLocation === 'object'
        ? args.pickupLocation.id
        : args.pickupLocation,
    }

    return destroy.definition.url
            .replace('{pickupLocation}', parsedArgs.pickupLocation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::destroy
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:220
* @route '/staff/pickup-locations/{pickupLocation}'
*/
destroy.delete = (args: { pickupLocation: string | number | { id: string | number } } | [pickupLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::destroy
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:220
* @route '/staff/pickup-locations/{pickupLocation}'
*/
const destroyForm = (args: { pickupLocation: string | number | { id: string | number } } | [pickupLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\PickupLocationController::destroy
* @see Modules/Operations/app/Http/Controllers/Staff/PickupLocationController.php:220
* @route '/staff/pickup-locations/{pickupLocation}'
*/
destroyForm.delete = (args: { pickupLocation: string | number | { id: string | number } } | [pickupLocation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PickupLocationController = { index, store, update, destroy }

export default PickupLocationController