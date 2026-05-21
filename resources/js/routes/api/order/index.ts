import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import orders from './orders'
/**
* @see Modules/Ordering/routes/api.php:13
* @route '/api/order/my-orders'
*/
export const myOrders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myOrders.url(options),
    method: 'get',
})

myOrders.definition = {
    methods: ["get","head"],
    url: '/api/order/my-orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see Modules/Ordering/routes/api.php:13
* @route '/api/order/my-orders'
*/
myOrders.url = (options?: RouteQueryOptions) => {
    return myOrders.definition.url + queryParams(options)
}

/**
* @see Modules/Ordering/routes/api.php:13
* @route '/api/order/my-orders'
*/
myOrders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myOrders.url(options),
    method: 'get',
})

/**
* @see Modules/Ordering/routes/api.php:13
* @route '/api/order/my-orders'
*/
myOrders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myOrders.url(options),
    method: 'head',
})

/**
* @see Modules/Ordering/routes/api.php:13
* @route '/api/order/my-orders'
*/
const myOrdersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myOrders.url(options),
    method: 'get',
})

/**
* @see Modules/Ordering/routes/api.php:13
* @route '/api/order/my-orders'
*/
myOrdersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myOrders.url(options),
    method: 'get',
})

/**
* @see Modules/Ordering/routes/api.php:13
* @route '/api/order/my-orders'
*/
myOrdersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: myOrders.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

myOrders.form = myOrdersForm

const order = {
    orders: Object.assign(orders, orders),
    myOrders: Object.assign(myOrders, myOrders),
}

export default order