import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::index
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:20
* @route '/staff/menu-items'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/menu-items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::index
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:20
* @route '/staff/menu-items'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::index
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:20
* @route '/staff/menu-items'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::index
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:20
* @route '/staff/menu-items'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::index
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:20
* @route '/staff/menu-items'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::index
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:20
* @route '/staff/menu-items'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::index
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:20
* @route '/staff/menu-items'
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
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::store
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:81
* @route '/staff/menu-items'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/staff/menu-items',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::store
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:81
* @route '/staff/menu-items'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::store
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:81
* @route '/staff/menu-items'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::store
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:81
* @route '/staff/menu-items'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::store
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:81
* @route '/staff/menu-items'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::update
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:104
* @route '/staff/menu-items/{menuItem}'
*/
export const update = (args: { menuItem: string | number | { id: string | number } } | [menuItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/staff/menu-items/{menuItem}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::update
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:104
* @route '/staff/menu-items/{menuItem}'
*/
update.url = (args: { menuItem: string | number | { id: string | number } } | [menuItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menuItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menuItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menuItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menuItem: typeof args.menuItem === 'object'
        ? args.menuItem.id
        : args.menuItem,
    }

    return update.definition.url
            .replace('{menuItem}', parsedArgs.menuItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::update
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:104
* @route '/staff/menu-items/{menuItem}'
*/
update.put = (args: { menuItem: string | number | { id: string | number } } | [menuItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::update
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:104
* @route '/staff/menu-items/{menuItem}'
*/
const updateForm = (args: { menuItem: string | number | { id: string | number } } | [menuItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::update
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:104
* @route '/staff/menu-items/{menuItem}'
*/
updateForm.put = (args: { menuItem: string | number | { id: string | number } } | [menuItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::destroy
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:135
* @route '/staff/menu-items/{menuItem}'
*/
export const destroy = (args: { menuItem: string | number | { id: string | number } } | [menuItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/staff/menu-items/{menuItem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::destroy
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:135
* @route '/staff/menu-items/{menuItem}'
*/
destroy.url = (args: { menuItem: string | number | { id: string | number } } | [menuItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menuItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menuItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menuItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menuItem: typeof args.menuItem === 'object'
        ? args.menuItem.id
        : args.menuItem,
    }

    return destroy.definition.url
            .replace('{menuItem}', parsedArgs.menuItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::destroy
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:135
* @route '/staff/menu-items/{menuItem}'
*/
destroy.delete = (args: { menuItem: string | number | { id: string | number } } | [menuItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::destroy
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:135
* @route '/staff/menu-items/{menuItem}'
*/
const destroyForm = (args: { menuItem: string | number | { id: string | number } } | [menuItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Menu\Http\Controllers\Staff\MenuItemController::destroy
* @see Modules/Menu/app/Http/Controllers/Staff/MenuItemController.php:135
* @route '/staff/menu-items/{menuItem}'
*/
destroyForm.delete = (args: { menuItem: string | number | { id: string | number } } | [menuItem: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const menuItems = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default menuItems