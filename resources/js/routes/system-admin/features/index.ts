import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::update
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:104
* @route '/__system-admin/features/{featureToggle}'
*/
export const update = (args: { featureToggle: number | { id: number } } | [featureToggle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/__system-admin/features/{featureToggle}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::update
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:104
* @route '/__system-admin/features/{featureToggle}'
*/
update.url = (args: { featureToggle: number | { id: number } } | [featureToggle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{featureToggle}', parsedArgs.featureToggle.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::update
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:104
* @route '/__system-admin/features/{featureToggle}'
*/
update.put = (args: { featureToggle: number | { id: number } } | [featureToggle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::update
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:104
* @route '/__system-admin/features/{featureToggle}'
*/
const updateForm = (args: { featureToggle: number | { id: number } } | [featureToggle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::update
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:104
* @route '/__system-admin/features/{featureToggle}'
*/
updateForm.put = (args: { featureToggle: number | { id: number } } | [featureToggle: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const features = {
    update: Object.assign(update, update),
}

export default features