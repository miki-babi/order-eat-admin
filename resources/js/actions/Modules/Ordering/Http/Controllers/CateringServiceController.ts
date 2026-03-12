import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Ordering\Http\Controllers\CateringServiceController::index
* @see Modules/Ordering/app/Http/Controllers/CateringServiceController.php:27
* @route '/catering'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/catering',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Ordering\Http\Controllers\CateringServiceController::index
* @see Modules/Ordering/app/Http/Controllers/CateringServiceController.php:27
* @route '/catering'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\CateringServiceController::index
* @see Modules/Ordering/app/Http/Controllers/CateringServiceController.php:27
* @route '/catering'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\CateringServiceController::index
* @see Modules/Ordering/app/Http/Controllers/CateringServiceController.php:27
* @route '/catering'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Ordering\Http\Controllers\CateringServiceController::index
* @see Modules/Ordering/app/Http/Controllers/CateringServiceController.php:27
* @route '/catering'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\CateringServiceController::index
* @see Modules/Ordering/app/Http/Controllers/CateringServiceController.php:27
* @route '/catering'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Ordering\Http\Controllers\CateringServiceController::index
* @see Modules/Ordering/app/Http/Controllers/CateringServiceController.php:27
* @route '/catering'
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
* @see \Modules\Ordering\Http\Controllers\CateringServiceController::store
* @see Modules/Ordering/app/Http/Controllers/CateringServiceController.php:56
* @route '/catering/requests'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/catering/requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Ordering\Http\Controllers\CateringServiceController::store
* @see Modules/Ordering/app/Http/Controllers/CateringServiceController.php:56
* @route '/catering/requests'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Ordering\Http\Controllers\CateringServiceController::store
* @see Modules/Ordering/app/Http/Controllers/CateringServiceController.php:56
* @route '/catering/requests'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\CateringServiceController::store
* @see Modules/Ordering/app/Http/Controllers/CateringServiceController.php:56
* @route '/catering/requests'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Ordering\Http\Controllers\CateringServiceController::store
* @see Modules/Ordering/app/Http/Controllers/CateringServiceController.php:56
* @route '/catering/requests'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const CateringServiceController = { index, store }

export default CateringServiceController