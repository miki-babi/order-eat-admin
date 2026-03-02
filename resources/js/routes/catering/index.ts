import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import requests from './requests'
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

const catering = {
    index: Object.assign(index, index),
    requests: Object.assign(requests, requests),
}

export default catering