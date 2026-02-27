import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
const FeatureLockedController = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: FeatureLockedController.url(args, options),
    method: 'get',
})

FeatureLockedController.definition = {
    methods: ["get","head"],
    url: '/locked/{featureKey}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
FeatureLockedController.url = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { featureKey: args }
    }

    if (Array.isArray(args)) {
        args = {
            featureKey: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        featureKey: args.featureKey,
    }

    return FeatureLockedController.definition.url
            .replace('{featureKey}', parsedArgs.featureKey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
FeatureLockedController.get = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: FeatureLockedController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
FeatureLockedController.head = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: FeatureLockedController.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
const FeatureLockedControllerForm = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: FeatureLockedController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
FeatureLockedControllerForm.get = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: FeatureLockedController.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
FeatureLockedControllerForm.head = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: FeatureLockedController.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

FeatureLockedController.form = FeatureLockedControllerForm

export default FeatureLockedController