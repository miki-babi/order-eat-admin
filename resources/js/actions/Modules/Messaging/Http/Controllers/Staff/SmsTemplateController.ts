import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:582
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
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:582
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
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:582
* @route '/staff/sms-templates/{smsTemplate}'
*/
update.put = (args: { smsTemplate: string | number | { id: string | number } } | [smsTemplate: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::update
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:582
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
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:582
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

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::updateNotificationSetting
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:602
* @route '/staff/sms-notification-settings/{smsNotificationSetting}'
*/
export const updateNotificationSetting = (args: { smsNotificationSetting: string | number | { id: string | number } } | [smsNotificationSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateNotificationSetting.url(args, options),
    method: 'put',
})

updateNotificationSetting.definition = {
    methods: ["put"],
    url: '/staff/sms-notification-settings/{smsNotificationSetting}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::updateNotificationSetting
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:602
* @route '/staff/sms-notification-settings/{smsNotificationSetting}'
*/
updateNotificationSetting.url = (args: { smsNotificationSetting: string | number | { id: string | number } } | [smsNotificationSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return updateNotificationSetting.definition.url
            .replace('{smsNotificationSetting}', parsedArgs.smsNotificationSetting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::updateNotificationSetting
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:602
* @route '/staff/sms-notification-settings/{smsNotificationSetting}'
*/
updateNotificationSetting.put = (args: { smsNotificationSetting: string | number | { id: string | number } } | [smsNotificationSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateNotificationSetting.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::updateNotificationSetting
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:602
* @route '/staff/sms-notification-settings/{smsNotificationSetting}'
*/
const updateNotificationSettingForm = (args: { smsNotificationSetting: string | number | { id: string | number } } | [smsNotificationSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateNotificationSetting.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::updateNotificationSetting
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:602
* @route '/staff/sms-notification-settings/{smsNotificationSetting}'
*/
updateNotificationSettingForm.put = (args: { smsNotificationSetting: string | number | { id: string | number } } | [smsNotificationSetting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateNotificationSetting.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateNotificationSetting.form = updateNotificationSettingForm

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::storePhoneList
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:618
* @route '/staff/sms-phone-lists'
*/
export const storePhoneList = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePhoneList.url(options),
    method: 'post',
})

storePhoneList.definition = {
    methods: ["post"],
    url: '/staff/sms-phone-lists',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::storePhoneList
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:618
* @route '/staff/sms-phone-lists'
*/
storePhoneList.url = (options?: RouteQueryOptions) => {
    return storePhoneList.definition.url + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::storePhoneList
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:618
* @route '/staff/sms-phone-lists'
*/
storePhoneList.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePhoneList.url(options),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::storePhoneList
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:618
* @route '/staff/sms-phone-lists'
*/
const storePhoneListForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storePhoneList.url(options),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::storePhoneList
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:618
* @route '/staff/sms-phone-lists'
*/
storePhoneListForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storePhoneList.url(options),
    method: 'post',
})

storePhoneList.form = storePhoneListForm

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::destroyPhoneList
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:646
* @route '/staff/sms-phone-lists/{smsPhoneList}'
*/
export const destroyPhoneList = (args: { smsPhoneList: string | number | { id: string | number } } | [smsPhoneList: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPhoneList.url(args, options),
    method: 'delete',
})

destroyPhoneList.definition = {
    methods: ["delete"],
    url: '/staff/sms-phone-lists/{smsPhoneList}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::destroyPhoneList
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:646
* @route '/staff/sms-phone-lists/{smsPhoneList}'
*/
destroyPhoneList.url = (args: { smsPhoneList: string | number | { id: string | number } } | [smsPhoneList: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return destroyPhoneList.definition.url
            .replace('{smsPhoneList}', parsedArgs.smsPhoneList.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::destroyPhoneList
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:646
* @route '/staff/sms-phone-lists/{smsPhoneList}'
*/
destroyPhoneList.delete = (args: { smsPhoneList: string | number | { id: string | number } } | [smsPhoneList: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyPhoneList.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::destroyPhoneList
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:646
* @route '/staff/sms-phone-lists/{smsPhoneList}'
*/
const destroyPhoneListForm = (args: { smsPhoneList: string | number | { id: string | number } } | [smsPhoneList: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyPhoneList.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::destroyPhoneList
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:646
* @route '/staff/sms-phone-lists/{smsPhoneList}'
*/
destroyPhoneListForm.delete = (args: { smsPhoneList: string | number | { id: string | number } } | [smsPhoneList: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyPhoneList.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyPhoneList.form = destroyPhoneListForm

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::importContacts
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:656
* @route '/staff/sms-contacts/import'
*/
export const importContacts = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importContacts.url(options),
    method: 'post',
})

importContacts.definition = {
    methods: ["post"],
    url: '/staff/sms-contacts/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::importContacts
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:656
* @route '/staff/sms-contacts/import'
*/
importContacts.url = (options?: RouteQueryOptions) => {
    return importContacts.definition.url + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::importContacts
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:656
* @route '/staff/sms-contacts/import'
*/
importContacts.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importContacts.url(options),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::importContacts
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:656
* @route '/staff/sms-contacts/import'
*/
const importContactsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: importContacts.url(options),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::importContacts
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:656
* @route '/staff/sms-contacts/import'
*/
importContactsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: importContacts.url(options),
    method: 'post',
})

importContacts.form = importContactsForm

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
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::sendCampaign
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:223
* @route '/staff/sms-campaigns/send'
*/
export const sendCampaign = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendCampaign.url(options),
    method: 'post',
})

sendCampaign.definition = {
    methods: ["post"],
    url: '/staff/sms-campaigns/send',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::sendCampaign
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:223
* @route '/staff/sms-campaigns/send'
*/
sendCampaign.url = (options?: RouteQueryOptions) => {
    return sendCampaign.definition.url + queryParams(options)
}

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::sendCampaign
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:223
* @route '/staff/sms-campaigns/send'
*/
sendCampaign.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendCampaign.url(options),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::sendCampaign
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:223
* @route '/staff/sms-campaigns/send'
*/
const sendCampaignForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendCampaign.url(options),
    method: 'post',
})

/**
* @see \Modules\Messaging\Http\Controllers\Staff\SmsTemplateController::sendCampaign
* @see Modules/Messaging/app/Http/Controllers/Staff/SmsTemplateController.php:223
* @route '/staff/sms-campaigns/send'
*/
sendCampaignForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendCampaign.url(options),
    method: 'post',
})

sendCampaign.form = sendCampaignForm

const SmsTemplateController = { index, update, updateNotificationSetting, storePhoneList, destroyPhoneList, importContacts, previewAudience, sendCampaign }

export default SmsTemplateController