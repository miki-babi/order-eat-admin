import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:182
* @route '/staff/access-control/permissions'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/staff/access-control/permissions',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:182
* @route '/staff/access-control/permissions'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:182
* @route '/staff/access-control/permissions'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:182
* @route '/staff/access-control/permissions'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:182
* @route '/staff/access-control/permissions'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const permissions = {
    store: Object.assign(store, store),
}

export default permissions