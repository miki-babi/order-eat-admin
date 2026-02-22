import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::store
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:618
* @route '/staff/sms-phone-lists'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/staff/sms-phone-lists',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::store
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:618
* @route '/staff/sms-phone-lists'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::store
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:618
* @route '/staff/sms-phone-lists'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::store
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:618
* @route '/staff/sms-phone-lists'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::store
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:618
* @route '/staff/sms-phone-lists'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::destroy
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:646
* @route '/staff/sms-phone-lists/{smsPhoneList}'
*/
export const destroy = (args: { smsPhoneList: number | { id: number } } | [smsPhoneList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/staff/sms-phone-lists/{smsPhoneList}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::destroy
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:646
* @route '/staff/sms-phone-lists/{smsPhoneList}'
*/
destroy.url = (args: { smsPhoneList: number | { id: number } } | [smsPhoneList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { smsPhoneList: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { smsPhoneList: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            smsPhoneList: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        smsPhoneList: typeof args.smsPhoneList === 'object'
        ? args.smsPhoneList.id
        : args.smsPhoneList,
    }

    return destroy.definition.url
            .replace('{smsPhoneList}', parsedArgs.smsPhoneList.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::destroy
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:646
* @route '/staff/sms-phone-lists/{smsPhoneList}'
*/
destroy.delete = (args: { smsPhoneList: number | { id: number } } | [smsPhoneList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::destroy
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:646
* @route '/staff/sms-phone-lists/{smsPhoneList}'
*/
const destroyForm = (args: { smsPhoneList: number | { id: number } } | [smsPhoneList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::destroy
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:646
* @route '/staff/sms-phone-lists/{smsPhoneList}'
*/
destroyForm.delete = (args: { smsPhoneList: number | { id: number } } | [smsPhoneList: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const smsPhoneLists = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default smsPhoneLists