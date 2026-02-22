import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
export const locked = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: locked.url(args, options),
    method: 'get',
})

locked.definition = {
    methods: ["get","head"],
    url: '/locked/{featureKey}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
locked.url = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return locked.definition.url
            .replace('{featureKey}', parsedArgs.featureKey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
locked.get = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: locked.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
locked.head = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: locked.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
const lockedForm = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: locked.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
lockedForm.get = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: locked.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FeatureLockedController::__invoke
* @see app/Http/Controllers/FeatureLockedController.php:15
* @route '/locked/{featureKey}'
*/
lockedForm.head = (args: { featureKey: string | number } | [featureKey: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: locked.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

locked.form = lockedForm

const feature = {
    locked: Object.assign(locked, locked),
}

export default feature