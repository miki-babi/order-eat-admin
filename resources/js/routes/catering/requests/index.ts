import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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

const requests = {
    store: Object.assign(store, store),
}

export default requests