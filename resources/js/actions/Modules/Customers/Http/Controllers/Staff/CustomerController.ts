import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:26
* @route '/staff/customers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/customers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:26
* @route '/staff/customers'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:26
* @route '/staff/customers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:26
* @route '/staff/customers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:26
* @route '/staff/customers'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:26
* @route '/staff/customers'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:26
* @route '/staff/customers'
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
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::sendSms
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:193
* @route '/staff/customers/sms'
*/
export const sendSms = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendSms.url(options),
    method: 'post',
})

sendSms.definition = {
    methods: ["post"],
    url: '/staff/customers/sms',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::sendSms
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:193
* @route '/staff/customers/sms'
*/
sendSms.url = (options?: RouteQueryOptions) => {
    return sendSms.definition.url + queryParams(options)
}

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::sendSms
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:193
* @route '/staff/customers/sms'
*/
sendSms.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendSms.url(options),
    method: 'post',
})

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::sendSms
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:193
* @route '/staff/customers/sms'
*/
const sendSmsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendSms.url(options),
    method: 'post',
})

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::sendSms
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:193
* @route '/staff/customers/sms'
*/
sendSmsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendSms.url(options),
    method: 'post',
})

sendSms.form = sendSmsForm

const CustomerController = { index, sendSms }

export default CustomerController