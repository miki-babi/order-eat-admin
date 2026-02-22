import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:27
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
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:27
* @route '/staff/customers'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:27
* @route '/staff/customers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:27
* @route '/staff/customers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:27
* @route '/staff/customers'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:27
* @route '/staff/customers'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::index
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:27
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
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::sms
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:202
* @route '/staff/customers/sms'
*/
export const sms = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sms.url(options),
    method: 'post',
})

sms.definition = {
    methods: ["post"],
    url: '/staff/customers/sms',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::sms
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:202
* @route '/staff/customers/sms'
*/
sms.url = (options?: RouteQueryOptions) => {
    return sms.definition.url + queryParams(options)
}

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::sms
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:202
* @route '/staff/customers/sms'
*/
sms.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sms.url(options),
    method: 'post',
})

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::sms
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:202
* @route '/staff/customers/sms'
*/
const smsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sms.url(options),
    method: 'post',
})

/**
* @see \Modules\Customers\Http\Controllers\Staff\CustomerController::sms
* @see Modules/Customers/app/Http/Controllers/Staff/CustomerController.php:202
* @route '/staff/customers/sms'
*/
smsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sms.url(options),
    method: 'post',
})

sms.form = smsForm

const customers = {
    index: Object.assign(index, index),
    sms: Object.assign(sms, sms),
}

export default customers