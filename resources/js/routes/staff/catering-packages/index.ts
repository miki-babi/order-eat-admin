import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:119
* @route '/staff/catering-packages'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/staff/catering-packages',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:119
* @route '/staff/catering-packages'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:119
* @route '/staff/catering-packages'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:119
* @route '/staff/catering-packages'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::store
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:119
* @route '/staff/catering-packages'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:139
* @route '/staff/catering-packages/{cateringPackage}'
*/
export const update = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/staff/catering-packages/{cateringPackage}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:139
* @route '/staff/catering-packages/{cateringPackage}'
*/
update.url = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cateringPackage: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cateringPackage: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cateringPackage: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cateringPackage: typeof args.cateringPackage === 'object'
        ? args.cateringPackage.id
        : args.cateringPackage,
    }

    return update.definition.url
            .replace('{cateringPackage}', parsedArgs.cateringPackage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:139
* @route '/staff/catering-packages/{cateringPackage}'
*/
update.put = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:139
* @route '/staff/catering-packages/{cateringPackage}'
*/
const updateForm = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::update
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:139
* @route '/staff/catering-packages/{cateringPackage}'
*/
updateForm.put = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::destroy
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:167
* @route '/staff/catering-packages/{cateringPackage}'
*/
export const destroy = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/staff/catering-packages/{cateringPackage}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::destroy
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:167
* @route '/staff/catering-packages/{cateringPackage}'
*/
destroy.url = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cateringPackage: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cateringPackage: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cateringPackage: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cateringPackage: typeof args.cateringPackage === 'object'
        ? args.cateringPackage.id
        : args.cateringPackage,
    }

    return destroy.definition.url
            .replace('{cateringPackage}', parsedArgs.cateringPackage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::destroy
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:167
* @route '/staff/catering-packages/{cateringPackage}'
*/
destroy.delete = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::destroy
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:167
* @route '/staff/catering-packages/{cateringPackage}'
*/
const destroyForm = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CateringRequestController::destroy
* @see Modules/Ordering/app/Http/Controllers/Staff/CateringRequestController.php:167
* @route '/staff/catering-packages/{cateringPackage}'
*/
destroyForm.delete = (args: { cateringPackage: number | { id: number } } | [cateringPackage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const cateringPackages = {
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default cateringPackages