import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::index
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:42
* @route '/staff/sms-templates'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/sms-templates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::index
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:42
* @route '/staff/sms-templates'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::index
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:42
* @route '/staff/sms-templates'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::index
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:42
* @route '/staff/sms-templates'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::index
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:42
* @route '/staff/sms-templates'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::index
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:42
* @route '/staff/sms-templates'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::index
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:42
* @route '/staff/sms-templates'
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
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::update
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:615
* @route '/staff/sms-templates/{smsTemplate}'
*/
export const update = (args: { smsTemplate: string | number | { id: string | number } } | [smsTemplate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/staff/sms-templates/{smsTemplate}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::update
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:615
* @route '/staff/sms-templates/{smsTemplate}'
*/
update.url = (args: { smsTemplate: string | number | { id: string | number } } | [smsTemplate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { smsTemplate: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { smsTemplate: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            smsTemplate: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        smsTemplate: typeof args.smsTemplate === 'object'
        ? args.smsTemplate.id
        : args.smsTemplate,
    }

    return update.definition.url
            .replace('{smsTemplate}', parsedArgs.smsTemplate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::update
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:615
* @route '/staff/sms-templates/{smsTemplate}'
*/
update.put = (args: { smsTemplate: string | number | { id: string | number } } | [smsTemplate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::update
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:615
* @route '/staff/sms-templates/{smsTemplate}'
*/
const updateForm = (args: { smsTemplate: string | number | { id: string | number } } | [smsTemplate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::update
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:615
* @route '/staff/sms-templates/{smsTemplate}'
*/
updateForm.put = (args: { smsTemplate: string | number | { id: string | number } } | [smsTemplate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const smsTemplates = {
    index: Object.assign(index, index),
    update: Object.assign(update, update),
}

export default smsTemplates