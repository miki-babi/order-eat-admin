import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import features from './features'
/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::dashboard
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/__system-admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::dashboard
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::dashboard
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::dashboard
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::dashboard
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::dashboard
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \Modules\SystemAdmin\Http\Controllers\SystemAdminDashboardController::dashboard
* @see Modules/SystemAdmin/app/Http/Controllers/SystemAdminDashboardController.php:23
* @route '/__system-admin/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

const systemAdmin = {
    dashboard: Object.assign(dashboard, dashboard),
    features: Object.assign(features, features),
}

export default systemAdmin