import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:121
* @route '/staff/access-control/roles'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/staff/access-control/roles',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:121
* @route '/staff/access-control/roles'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:121
* @route '/staff/access-control/roles'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:121
* @route '/staff/access-control/roles'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:121
* @route '/staff/access-control/roles'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::update
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:154
* @route '/staff/access-control/roles/{role}'
*/
export const update = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/staff/access-control/roles/{role}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::update
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:154
* @route '/staff/access-control/roles/{role}'
*/
update.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        role: typeof args.role === 'object'
        ? args.role.id
        : args.role,
    }

    return update.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::update
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:154
* @route '/staff/access-control/roles/{role}'
*/
update.put = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::update
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:154
* @route '/staff/access-control/roles/{role}'
*/
const updateForm = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::update
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:154
* @route '/staff/access-control/roles/{role}'
*/
updateForm.put = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const roles = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
}

export default roles