import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import preorders from './preorders'
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

const cakes = {
    index: Object.assign(index, index),
    preorders: Object.assign(preorders, preorders),
}

export default cakes