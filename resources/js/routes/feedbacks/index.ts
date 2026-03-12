import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Modules\Operations\Http\Controllers\PublicFeedbackController::store
* @see Modules/Operations/app/Http/Controllers/PublicFeedbackController.php:17
* @route '/feedbacks'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/feedbacks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Operations\Http\Controllers\PublicFeedbackController::store
* @see Modules/Operations/app/Http/Controllers/PublicFeedbackController.php:17
* @route '/feedbacks'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\PublicFeedbackController::store
* @see Modules/Operations/app/Http/Controllers/PublicFeedbackController.php:17
* @route '/feedbacks'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\PublicFeedbackController::store
* @see Modules/Operations/app/Http/Controllers/PublicFeedbackController.php:17
* @route '/feedbacks'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\PublicFeedbackController::store
* @see Modules/Operations/app/Http/Controllers/PublicFeedbackController.php:17
* @route '/feedbacks'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const feedbacks = {
    store: Object.assign(store, store),
}

export default feedbacks