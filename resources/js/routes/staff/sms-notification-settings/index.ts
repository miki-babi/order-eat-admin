import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::update
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:602
* @route '/staff/sms-notification-settings/{smsNotificationSetting}'
*/
export const update = (args: { smsNotificationSetting: string | number | { id: string | number } } | [smsNotificationSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/staff/sms-notification-settings/{smsNotificationSetting}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::update
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:602
* @route '/staff/sms-notification-settings/{smsNotificationSetting}'
*/
update.url = (args: { smsNotificationSetting: string | number | { id: string | number } } | [smsNotificationSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { smsNotificationSetting: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { smsNotificationSetting: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            smsNotificationSetting: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        smsNotificationSetting: typeof args.smsNotificationSetting === 'object'
        ? args.smsNotificationSetting.id
        : args.smsNotificationSetting,
    }

    return update.definition.url
            .replace('{smsNotificationSetting}', parsedArgs.smsNotificationSetting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::update
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:602
* @route '/staff/sms-notification-settings/{smsNotificationSetting}'
*/
update.put = (args: { smsNotificationSetting: string | number | { id: string | number } } | [smsNotificationSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::update
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:602
* @route '/staff/sms-notification-settings/{smsNotificationSetting}'
*/
const updateForm = (args: { smsNotificationSetting: string | number | { id: string | number } } | [smsNotificationSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:602
* @route '/staff/sms-notification-settings/{smsNotificationSetting}'
*/
updateForm.put = (args: { smsNotificationSetting: string | number | { id: string | number } } | [smsNotificationSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const smsNotificationSettings = {
    update: Object.assign(update, update),
}

export default smsNotificationSettings