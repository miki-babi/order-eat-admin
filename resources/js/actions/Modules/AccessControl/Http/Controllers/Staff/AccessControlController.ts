import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storeRole
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:121
* @route '/staff/access-control/roles'
*/
export const storeRole = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRole.url(options),
    method: 'post',
})

storeRole.definition = {
    methods: ["post"],
    url: '/staff/access-control/roles',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storeRole
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:121
* @route '/staff/access-control/roles'
*/
storeRole.url = (options?: RouteQueryOptions) => {
    return storeRole.definition.url + queryParams(options)
}

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storeRole
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:121
* @route '/staff/access-control/roles'
*/
storeRole.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRole.url(options),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storeRole
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:121
* @route '/staff/access-control/roles'
*/
const storeRoleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeRole.url(options),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storeRole
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:121
* @route '/staff/access-control/roles'
*/
storeRoleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeRole.url(options),
    method: 'post',
})

storeRole.form = storeRoleForm

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::updateRole
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:154
* @route '/staff/access-control/roles/{role}'
*/
export const updateRole = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRole.url(args, options),
    method: 'put',
})

updateRole.definition = {
    methods: ["put"],
    url: '/staff/access-control/roles/{role}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::updateRole
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:154
* @route '/staff/access-control/roles/{role}'
*/
updateRole.url = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return updateRole.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::updateRole
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:154
* @route '/staff/access-control/roles/{role}'
*/
updateRole.put = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRole.url(args, options),
    method: 'put',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::updateRole
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:154
* @route '/staff/access-control/roles/{role}'
*/
const updateRoleForm = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateRole.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::updateRole
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:154
* @route '/staff/access-control/roles/{role}'
*/
updateRoleForm.put = (args: { role: string | number | { id: string | number } } | [role: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateRole.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateRole.form = updateRoleForm

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storePermission
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:182
* @route '/staff/access-control/permissions'
*/
export const storePermission = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePermission.url(options),
    method: 'post',
})

storePermission.definition = {
    methods: ["post"],
    url: '/staff/access-control/permissions',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storePermission
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:182
* @route '/staff/access-control/permissions'
*/
storePermission.url = (options?: RouteQueryOptions) => {
    return storePermission.definition.url + queryParams(options)
}

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storePermission
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:182
* @route '/staff/access-control/permissions'
*/
storePermission.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePermission.url(options),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storePermission
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:182
* @route '/staff/access-control/permissions'
*/
const storePermissionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storePermission.url(options),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storePermission
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:182
* @route '/staff/access-control/permissions'
*/
storePermissionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storePermission.url(options),
    method: 'post',
})

storePermission.form = storePermissionForm

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storeUser
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:206
* @route '/staff/access-control/users'
*/
export const storeUser = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser.url(options),
    method: 'post',
})

storeUser.definition = {
    methods: ["post"],
    url: '/staff/access-control/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storeUser
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:206
* @route '/staff/access-control/users'
*/
storeUser.url = (options?: RouteQueryOptions) => {
    return storeUser.definition.url + queryParams(options)
}

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storeUser
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:206
* @route '/staff/access-control/users'
*/
storeUser.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser.url(options),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storeUser
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:206
* @route '/staff/access-control/users'
*/
const storeUserForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeUser.url(options),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::storeUser
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:206
* @route '/staff/access-control/users'
*/
storeUserForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeUser.url(options),
    method: 'post',
})

storeUser.form = storeUserForm

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::updateUser
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:233
* @route '/staff/access-control/users/{user}'
*/
export const updateUser = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateUser.url(args, options),
    method: 'put',
})

updateUser.definition = {
    methods: ["put"],
    url: '/staff/access-control/users/{user}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::updateUser
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:233
* @route '/staff/access-control/users/{user}'
*/
updateUser.url = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return updateUser.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::updateUser
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:233
* @route '/staff/access-control/users/{user}'
*/
updateUser.put = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateUser.url(args, options),
    method: 'put',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::updateUser
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:233
* @route '/staff/access-control/users/{user}'
*/
const updateUserForm = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateUser.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\AccessControl\Http\Controllers\Staff\AccessControlController::updateUser
* @see Modules/AccessControl/app/Http/Controllers/Staff/AccessControlController.php:233
* @route '/staff/access-control/users/{user}'
*/
updateUserForm.put = (args: { user: string | number | { id: string | number } } | [user: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateUser.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateUser.form = updateUserForm

const AccessControlController = { index, storeRole, updateRole, storePermission, storeUser, updateUser }

export default AccessControlController