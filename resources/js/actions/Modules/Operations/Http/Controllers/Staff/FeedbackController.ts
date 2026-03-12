import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Operations\Http\Controllers\Staff\FeedbackController::index
* @see Modules/Operations/app/Http/Controllers/Staff/FeedbackController.php:16
* @route '/staff/feedbacks'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/feedbacks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\FeedbackController::index
* @see Modules/Operations/app/Http/Controllers/Staff/FeedbackController.php:16
* @route '/staff/feedbacks'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\FeedbackController::index
* @see Modules/Operations/app/Http/Controllers/Staff/FeedbackController.php:16
* @route '/staff/feedbacks'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\FeedbackController::index
* @see Modules/Operations/app/Http/Controllers/Staff/FeedbackController.php:16
* @route '/staff/feedbacks'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\FeedbackController::index
* @see Modules/Operations/app/Http/Controllers/Staff/FeedbackController.php:16
* @route '/staff/feedbacks'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\FeedbackController::index
* @see Modules/Operations/app/Http/Controllers/Staff/FeedbackController.php:16
* @route '/staff/feedbacks'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\FeedbackController::index
* @see Modules/Operations/app/Http/Controllers/Staff/FeedbackController.php:16
* @route '/staff/feedbacks'
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

const FeedbackController = { index }

export default FeedbackController