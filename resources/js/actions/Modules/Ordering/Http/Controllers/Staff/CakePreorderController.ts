import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/cake-preorders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:22
* @route '/staff/cake-preorders'
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
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::packages
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
export const packages = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: packages.url(options),
    method: 'get',
})

packages.definition = {
    methods: ["get","head"],
    url: '/staff/cake-packages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::packages
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
packages.url = (options?: RouteQueryOptions) => {
    return packages.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::packages
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
packages.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: packages.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::packages
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
packages.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: packages.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::packages
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
const packagesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: packages.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::packages
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
packagesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: packages.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::packages
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:93
* @route '/staff/cake-packages'
*/
packagesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: packages.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

packages.form = packagesForm

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::storePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:145
* @route '/staff/cake-packages'
*/
export const storePackage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePackage.url(options),
    method: 'post',
})

storePackage.definition = {
    methods: ["post"],
    url: '/staff/cake-packages',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::storePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:145
* @route '/staff/cake-packages'
*/
storePackage.url = (options?: RouteQueryOptions) => {
    return storePackage.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::storePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:145
* @route '/staff/cake-packages'
*/
storePackage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePackage.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::storePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:145
* @route '/staff/cake-packages'
*/
const storePackageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storePackage.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::storePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:145
* @route '/staff/cake-packages'
*/
storePackageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storePackage.url(options),
    method: 'post',
})

storePackage.form = storePackageForm

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::updatePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:165
* @route '/staff/cake-packages/{cakePackage}'
*/
export const updatePackage = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePackage.url(args, options),
    method: 'put',
})

updatePackage.definition = {
    methods: ["put"],
    url: '/staff/cake-packages/{cakePackage}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::updatePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:165
* @route '/staff/cake-packages/{cakePackage}'
*/
updatePackage.url = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return updatePackage.definition.url
            .replace('{cakePackage}', parsedArgs.cakePackage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::updatePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:165
* @route '/staff/cake-packages/{cakePackage}'
*/
updatePackage.put = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePackage.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::updatePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:165
* @route '/staff/cake-packages/{cakePackage}'
*/
const updatePackageForm = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePackage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::updatePackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:165
* @route '/staff/cake-packages/{cakePackage}'
*/
updatePackageForm.put = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePackage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatePackage.form = updatePackageForm

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::destroyPackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:202
* @route '/staff/cake-packages/{cakePackage}'
*/
export const destroyPackage = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPackage.url(args, options),
    method: 'delete',
})

destroyPackage.definition = {
    methods: ["delete"],
    url: '/staff/cake-packages/{cakePackage}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::destroyPackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:202
* @route '/staff/cake-packages/{cakePackage}'
*/
destroyPackage.url = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return destroyPackage.definition.url
            .replace('{cakePackage}', parsedArgs.cakePackage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::destroyPackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:202
* @route '/staff/cake-packages/{cakePackage}'
*/
destroyPackage.delete = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPackage.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::destroyPackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:202
* @route '/staff/cake-packages/{cakePackage}'
*/
const destroyPackageForm = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyPackage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::destroyPackage
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:202
* @route '/staff/cake-packages/{cakePackage}'
*/
destroyPackageForm.delete = (args: { cakePackage: string | number | { id: string | number } } | [cakePackage: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyPackage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyPackage.form = destroyPackageForm

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::updatePreorderStatus
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:229
* @route '/staff/cake-preorders/{cakePreorder}/status'
*/
export const updatePreorderStatus = (args: { cakePreorder: string | number | { id: string | number } } | [cakePreorder: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePreorderStatus.url(args, options),
    method: 'patch',
})

updatePreorderStatus.definition = {
    methods: ["patch"],
    url: '/staff/cake-preorders/{cakePreorder}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::updatePreorderStatus
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:229
* @route '/staff/cake-preorders/{cakePreorder}/status'
*/
updatePreorderStatus.url = (args: { cakePreorder: string | number | { id: string | number } } | [cakePreorder: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cakePreorder: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cakePreorder: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cakePreorder: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cakePreorder: typeof args.cakePreorder === 'object'
        ? args.cakePreorder.id
        : args.cakePreorder,
    }

    return updatePreorderStatus.definition.url
            .replace('{cakePreorder}', parsedArgs.cakePreorder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::updatePreorderStatus
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:229
* @route '/staff/cake-preorders/{cakePreorder}/status'
*/
updatePreorderStatus.patch = (args: { cakePreorder: string | number | { id: string | number } } | [cakePreorder: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatePreorderStatus.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::updatePreorderStatus
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:229
* @route '/staff/cake-preorders/{cakePreorder}/status'
*/
const updatePreorderStatusForm = (args: { cakePreorder: string | number | { id: string | number } } | [cakePreorder: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePreorderStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\Staff\CakePreorderController::updatePreorderStatus
* @see Modules/Ordering/app/Http/Controllers/Staff/CakePreorderController.php:229
* @route '/staff/cake-preorders/{cakePreorder}/status'
*/
updatePreorderStatusForm.patch = (args: { cakePreorder: string | number | { id: string | number } } | [cakePreorder: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatePreorderStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatePreorderStatus.form = updatePreorderStatusForm

const CakePreorderController = { index, packages, storePackage, updatePackage, destroyPackage, updatePreorderStatus }

export default CakePreorderController