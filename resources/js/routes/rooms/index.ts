import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see routes/web.php:56
* @route '/rooms'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rooms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:56
* @route '/rooms'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:56
* @route '/rooms'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:56
* @route '/rooms'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/web.php:56
* @route '/rooms'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:56
* @route '/rooms'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:56
* @route '/rooms'
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

/**
* @see routes/web.php:81
* @route '/room/{roomId}'
*/
export const show = (args: { roomId: string | number } | [roomId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/room/{roomId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:81
* @route '/room/{roomId}'
*/
show.url = (args: { roomId: string | number } | [roomId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { roomId: args }
    }

    if (Array.isArray(args)) {
        args = {
            roomId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        roomId: args.roomId,
    }

    return show.definition.url
            .replace('{roomId}', parsedArgs.roomId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:81
* @route '/room/{roomId}'
*/
show.get = (args: { roomId: string | number } | [roomId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:81
* @route '/room/{roomId}'
*/
show.head = (args: { roomId: string | number } | [roomId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:81
* @route '/room/{roomId}'
*/
const showForm = (args: { roomId: string | number } | [roomId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:81
* @route '/room/{roomId}'
*/
showForm.get = (args: { roomId: string | number } | [roomId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:81
* @route '/room/{roomId}'
*/
showForm.head = (args: { roomId: string | number } | [roomId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const rooms = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default rooms