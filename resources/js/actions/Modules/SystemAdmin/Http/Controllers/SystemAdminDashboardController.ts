import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::index
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/__system-admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::index
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::index
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::index
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::index
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::index
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::index
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
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
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::updateFeature
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:104
* @route '/__system-admin/features/{featureToggle}'
*/
export const updateFeature = (args: { featureToggle: number | { id: number } } | [featureToggle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateFeature.url(args, options),
    method: 'put',
})

updateFeature.definition = {
    methods: ["put"],
    url: '/__system-admin/features/{featureToggle}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::updateFeature
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:104
* @route '/__system-admin/features/{featureToggle}'
*/
updateFeature.url = (args: { featureToggle: number | { id: number } } | [featureToggle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { featureToggle: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { featureToggle: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            featureToggle: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        featureToggle: typeof args.featureToggle === 'object'
        ? args.featureToggle.id
        : args.featureToggle,
    }

    return updateFeature.definition.url
            .replace('{featureToggle}', parsedArgs.featureToggle.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::updateFeature
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:104
* @route '/__system-admin/features/{featureToggle}'
*/
updateFeature.put = (args: { featureToggle: number | { id: number } } | [featureToggle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateFeature.url(args, options),
    method: 'put',
})

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::updateFeature
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:104
* @route '/__system-admin/features/{featureToggle}'
*/
const updateFeatureForm = (args: { featureToggle: number | { id: number } } | [featureToggle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateFeature.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::updateFeature
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:104
* @route '/__system-admin/features/{featureToggle}'
*/
updateFeatureForm.put = (args: { featureToggle: number | { id: number } } | [featureToggle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateFeature.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateFeature.form = updateFeatureForm

const SystemAdminDashboardController = { index, updateFeature }

export default SystemAdminDashboardController