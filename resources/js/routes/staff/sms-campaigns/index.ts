import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::previewAudience
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:163
* @route '/staff/sms-campaigns/preview-audience'
*/
export const previewAudience = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previewAudience.url(options),
    method: 'get',
})

previewAudience.definition = {
    methods: ["get","head"],
    url: '/staff/sms-campaigns/preview-audience',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::previewAudience
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:163
* @route '/staff/sms-campaigns/preview-audience'
*/
previewAudience.url = (options?: RouteQueryOptions) => {
    return previewAudience.definition.url + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::previewAudience
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:163
* @route '/staff/sms-campaigns/preview-audience'
*/
previewAudience.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previewAudience.url(options),
    method: 'get',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::previewAudience
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:163
* @route '/staff/sms-campaigns/preview-audience'
*/
previewAudience.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: previewAudience.url(options),
    method: 'head',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::previewAudience
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:163
* @route '/staff/sms-campaigns/preview-audience'
*/
const previewAudienceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: previewAudience.url(options),
    method: 'get',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::previewAudience
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:163
* @route '/staff/sms-campaigns/preview-audience'
*/
previewAudienceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: previewAudience.url(options),
    method: 'get',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::previewAudience
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:163
* @route '/staff/sms-campaigns/preview-audience'
*/
previewAudienceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: previewAudience.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

previewAudience.form = previewAudienceForm

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::send
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:256
* @route '/staff/sms-campaigns/send'
*/
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/staff/sms-campaigns/send',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::send
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:256
* @route '/staff/sms-campaigns/send'
*/
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::send
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:256
* @route '/staff/sms-campaigns/send'
*/
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::send
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:256
* @route '/staff/sms-campaigns/send'
*/
const sendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: send.url(options),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::send
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:256
* @route '/staff/sms-campaigns/send'
*/
sendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: send.url(options),
    method: 'post',
})

send.form = sendForm

const smsCampaigns = {
    previewAudience: Object.assign(previewAudience, previewAudience),
    send: Object.assign(send, send),
}

export default smsCampaigns