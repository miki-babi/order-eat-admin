import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:111
* @route '/staff/cake-packages'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/staff/cake-packages',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:111
* @route '/staff/cake-packages'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:111
* @route '/staff/cake-packages'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:111
* @route '/staff/cake-packages'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:111
* @route '/staff/cake-packages'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:130
* @route '/staff/cake-packages/{cakePackage}'
*/
export const update = (args: { cakePackage: number | { id: number } } | [cakePackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/staff/cake-packages/{cakePackage}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:130
* @route '/staff/cake-packages/{cakePackage}'
*/
update.url = (args: { cakePackage: number | { id: number } } | [cakePackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cakePackage: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cakePackage: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cakePackage: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cakePackage: typeof args.cakePackage === 'object'
        ? args.cakePackage.id
        : args.cakePackage,
    }

    return update.definition.url
            .replace('{cakePackage}', parsedArgs.cakePackage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:130
* @route '/staff/cake-packages/{cakePackage}'
*/
update.put = (args: { cakePackage: number | { id: number } } | [cakePackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:130
* @route '/staff/cake-packages/{cakePackage}'
*/
const updateForm = (args: { cakePackage: number | { id: number } } | [cakePackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:130
* @route '/staff/cake-packages/{cakePackage}'
*/
updateForm.put = (args: { cakePackage: number | { id: number } } | [cakePackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::destroy
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:157
* @route '/staff/cake-packages/{cakePackage}'
*/
export const destroy = (args: { cakePackage: number | { id: number } } | [cakePackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/staff/cake-packages/{cakePackage}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::destroy
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:157
* @route '/staff/cake-packages/{cakePackage}'
*/
destroy.url = (args: { cakePackage: number | { id: number } } | [cakePackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cakePackage: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cakePackage: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cakePackage: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cakePackage: typeof args.cakePackage === 'object'
        ? args.cakePackage.id
        : args.cakePackage,
    }

    return destroy.definition.url
            .replace('{cakePackage}', parsedArgs.cakePackage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::destroy
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:157
* @route '/staff/cake-packages/{cakePackage}'
*/
destroy.delete = (args: { cakePackage: number | { id: number } } | [cakePackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::destroy
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:157
* @route '/staff/cake-packages/{cakePackage}'
*/
const destroyForm = (args: { cakePackage: number | { id: number } } | [cakePackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::destroy
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:157
* @route '/staff/cake-packages/{cakePackage}'
*/
destroyForm.delete = (args: { cakePackage: number | { id: number } } | [cakePackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const cakePackages = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default cakePackages