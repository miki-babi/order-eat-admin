import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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

const preorders = {
    store: Object.assign(store, store),
}

export default preorders