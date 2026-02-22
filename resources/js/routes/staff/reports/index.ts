import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Reporting\Http\Controllers\Staff\ReportController::index
* @see Modules/Reporting/app/Http/Controllers/Staff/ReportController.php:22
* @route '/staff/reports'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Reporting\Http\Controllers\Staff\ReportController::index
* @see Modules/Reporting/app/Http/Controllers/Staff/ReportController.php:22
* @route '/staff/reports'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Reporting\Http\Controllers\Staff\ReportController::index
* @see Modules/Reporting/app/Http/Controllers/Staff/ReportController.php:22
* @route '/staff/reports'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Reporting\Http\Controllers\Staff\ReportController::index
* @see Modules/Reporting/app/Http/Controllers/Staff/ReportController.php:22
* @route '/staff/reports'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Reporting\Http\Controllers\Staff\ReportController::index
* @see Modules/Reporting/app/Http/Controllers/Staff/ReportController.php:22
* @route '/staff/reports'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Reporting\Http\Controllers\Staff\ReportController::index
* @see Modules/Reporting/app/Http/Controllers/Staff/ReportController.php:22
* @route '/staff/reports'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Reporting\Http\Controllers\Staff\ReportController::index
* @see Modules/Reporting/app/Http/Controllers/Staff/ReportController.php:22
* @route '/staff/reports'
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

const reports = {
    index: Object.assign(index, index),
}

export default reports