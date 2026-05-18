import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TelegramSettingController::index
* @see app/Http/Controllers/TelegramSettingController.php:17
* @route '/staff/telegram-settings'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/telegram-settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TelegramSettingController::index
* @see app/Http/Controllers/TelegramSettingController.php:17
* @route '/staff/telegram-settings'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TelegramSettingController::index
* @see app/Http/Controllers/TelegramSettingController.php:17
* @route '/staff/telegram-settings'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TelegramSettingController::index
* @see app/Http/Controllers/TelegramSettingController.php:17
* @route '/staff/telegram-settings'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TelegramSettingController::index
* @see app/Http/Controllers/TelegramSettingController.php:17
* @route '/staff/telegram-settings'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TelegramSettingController::index
* @see app/Http/Controllers/TelegramSettingController.php:17
* @route '/staff/telegram-settings'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TelegramSettingController::index
* @see app/Http/Controllers/TelegramSettingController.php:17
* @route '/staff/telegram-settings'
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
* @see \App\Http\Controllers\TelegramSettingController::update
* @see app/Http/Controllers/TelegramSettingController.php:32
* @route '/staff/telegram-settings'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/staff/telegram-settings',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\TelegramSettingController::update
* @see app/Http/Controllers/TelegramSettingController.php:32
* @route '/staff/telegram-settings'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TelegramSettingController::update
* @see app/Http/Controllers/TelegramSettingController.php:32
* @route '/staff/telegram-settings'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TelegramSettingController::update
* @see app/Http/Controllers/TelegramSettingController.php:32
* @route '/staff/telegram-settings'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TelegramSettingController::update
* @see app/Http/Controllers/TelegramSettingController.php:32
* @route '/staff/telegram-settings'
*/
updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const TelegramSettingController = { index, update }

export default TelegramSettingController