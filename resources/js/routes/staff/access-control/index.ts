import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import roles from './roles'
import permissions from './permissions'
import users from './users'
/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::index
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:27
* @route '/staff/access-control'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/access-control',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::index
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:27
* @route '/staff/access-control'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::index
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:27
* @route '/staff/access-control'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::index
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:27
* @route '/staff/access-control'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::index
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:27
* @route '/staff/access-control'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::index
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:27
* @route '/staff/access-control'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::index
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:27
* @route '/staff/access-control'
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

const accessControl = {
    index: Object.assign(index, index),
    roles: Object.assign(roles, roles),
    permissions: Object.assign(permissions, permissions),
    users: Object.assign(users, users),
}

export default accessControl