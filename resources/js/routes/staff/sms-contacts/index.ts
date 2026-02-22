import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::importMethod
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:661
* @route '/staff/sms-contacts/import'
*/
export const importMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/staff/sms-contacts/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::importMethod
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:661
* @route '/staff/sms-contacts/import'
*/
importMethod.url = (options?: RouteQueryOptions) => {
    return importMethod.definition.url + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::importMethod
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:661
* @route '/staff/sms-contacts/import'
*/
importMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::importMethod
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:661
* @route '/staff/sms-contacts/import'
*/
const importMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: importMethod.url(options),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::importMethod
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:661
* @route '/staff/sms-contacts/import'
*/
importMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: importMethod.url(options),
    method: 'post',
})

importMethod.form = importMethodForm

const smsContacts = {
    import: Object.assign(importMethod, importMethod),
}

export default smsContacts