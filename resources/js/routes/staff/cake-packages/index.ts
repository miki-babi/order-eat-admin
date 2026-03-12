import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/cake-packages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
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
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:145
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
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:145
* @route '/staff/cake-packages'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:145
* @route '/staff/cake-packages'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:145
* @route '/staff/cake-packages'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:145
* @route '/staff/cake-packages'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:165
* @route '/staff/cake-packages/{cakePackage}'
*/
export const update = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/staff/cake-packages/{cakePackage}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:165
* @route '/staff/cake-packages/{cakePackage}'
*/
update.url = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:165
* @route '/staff/cake-packages/{cakePackage}'
*/
update.put = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:165
* @route '/staff/cake-packages/{cakePackage}'
*/
const updateForm = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:165
* @route '/staff/cake-packages/{cakePackage}'
*/
updateForm.put = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:202
* @route '/staff/cake-packages/{cakePackage}'
*/
export const destroy = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/staff/cake-packages/{cakePackage}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::destroy
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:202
* @route '/staff/cake-packages/{cakePackage}'
*/
destroy.url = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:202
* @route '/staff/cake-packages/{cakePackage}'
*/
destroy.delete = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::destroy
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:202
* @route '/staff/cake-packages/{cakePackage}'
*/
const destroyForm = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:202
* @route '/staff/cake-packages/{cakePackage}'
*/
destroyForm.delete = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default cakePackages