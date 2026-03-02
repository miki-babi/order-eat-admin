import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/BusinessSettingsController.php:18
* @route '/staff/business-settings'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/business-settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/BusinessSettingsController.php:18
* @route '/staff/business-settings'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/BusinessSettingsController.php:18
* @route '/staff/business-settings'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/BusinessSettingsController.php:18
* @route '/staff/business-settings'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/BusinessSettingsController.php:18
* @route '/staff/business-settings'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/BusinessSettingsController.php:18
* @route '/staff/business-settings'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/BusinessSettingsController.php:18
* @route '/staff/business-settings'
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
* @see \Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/BusinessSettingsController.php:42
* @route '/staff/business-settings'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/staff/business-settings',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/BusinessSettingsController.php:42
* @route '/staff/business-settings'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/BusinessSettingsController.php:42
* @route '/staff/business-settings'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/BusinessSettingsController.php:42
* @route '/staff/business-settings'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\BusinessSettingsController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/BusinessSettingsController.php:42
* @route '/staff/business-settings'
*/
updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const businessSettings = {
    index: Object.assign(index, index),
    update: Object.assign(update, update),
}

export default businessSettings