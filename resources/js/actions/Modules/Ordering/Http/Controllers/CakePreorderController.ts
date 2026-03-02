import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/CakePreorderController.php:28
* @route '/cakes'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cakes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/CakePreorderController.php:28
* @route '/cakes'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/CakePreorderController.php:28
* @route '/cakes'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/CakePreorderController.php:28
* @route '/cakes'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/CakePreorderController.php:28
* @route '/cakes'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/CakePreorderController.php:28
* @route '/cakes'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\CakePreorderController::index
* @see Modules/Ordering/app/Http/Controllers/CakePreorderController.php:28
* @route '/cakes'
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
* @see \Modules\Ordering\Http\Controllers\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/CakePreorderController.php:60
* @route '/cakes/preorders'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cakes/preorders',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ordering\Http\Controllers\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/CakePreorderController.php:60
* @route '/cakes/preorders'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/CakePreorderController.php:60
* @route '/cakes/preorders'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/CakePreorderController.php:60
* @route '/cakes/preorders'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\CakePreorderController::store
* @see Modules/Ordering/app/Http/Controllers/CakePreorderController.php:60
* @route '/cakes/preorders'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const CakePreorderController = { index, store }

export default CakePreorderController