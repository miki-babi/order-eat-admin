import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:206
* @route '/staff/access-control/users'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/staff/access-control/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:206
* @route '/staff/access-control/users'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:206
* @route '/staff/access-control/users'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:206
* @route '/staff/access-control/users'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::store
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:206
* @route '/staff/access-control/users'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::update
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:233
* @route '/staff/access-control/users/{user}'
*/
export const update = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/staff/access-control/users/{user}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::update
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:233
* @route '/staff/access-control/users/{user}'
*/
update.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        user: typeof args.user === 'object'
        ? args.user.id
        : args.user,
    }

    return update.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::update
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:233
* @route '/staff/access-control/users/{user}'
*/
update.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::update
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:233
* @route '/staff/access-control/users/{user}'
*/
const updateForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:233
* @route '/staff/access-control/users/{user}'
*/
updateForm.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const users = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
}

export default users