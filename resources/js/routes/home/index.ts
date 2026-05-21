import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see Modules/Ordering/routes/web.php:29
* @route '/home'
*/
export const main = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: main.url(options),
    method: 'get',
})

main.definition = {
    methods: ["get","head"],
    url: '/home',
} satisfies RouteDefinition<["get","head"]>

/**
* @see Modules/Ordering/routes/web.php:29
* @route '/home'
*/
main.url = (options?: RouteQueryOptions) => {
    return main.definition.url + queryParams(options)
}

/**
* @see Modules/Ordering/routes/web.php:29
* @route '/home'
*/
main.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: main.url(options),
    method: 'get',
})

/**
* @see Modules/Ordering/routes/web.php:29
* @route '/home'
*/
main.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: main.url(options),
    method: 'head',
})

/**
* @see Modules/Ordering/routes/web.php:29
* @route '/home'
*/
const mainForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: main.url(options),
    method: 'get',
})

/**
* @see Modules/Ordering/routes/web.php:29
* @route '/home'
*/
mainForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: main.url(options),
    method: 'get',
})

/**
* @see Modules/Ordering/routes/web.php:29
* @route '/home'
*/
mainForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: main.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

main.form = mainForm

const home = {
    main: Object.assign(main, main),
}

export default home