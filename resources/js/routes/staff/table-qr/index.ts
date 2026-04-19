import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::index
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:23
* @route '/staff/table-qr'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/table-qr',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::index
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:23
* @route '/staff/table-qr'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::index
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:23
* @route '/staff/table-qr'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::index
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:23
* @route '/staff/table-qr'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::index
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:23
* @route '/staff/table-qr'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::index
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:23
* @route '/staff/table-qr'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::index
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:23
* @route '/staff/table-qr'
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
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::store
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:105
* @route '/staff/table-qr'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/staff/table-qr',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::store
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:105
* @route '/staff/table-qr'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::store
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:105
* @route '/staff/table-qr'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::store
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:105
* @route '/staff/table-qr'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::store
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:105
* @route '/staff/table-qr'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::update
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:126
* @route '/staff/table-qr/{diningTable}'
*/
export const update = (args: { diningTable: string | number | { id: string | number } } | [diningTable: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/staff/table-qr/{diningTable}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::update
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:126
* @route '/staff/table-qr/{diningTable}'
*/
update.url = (args: { diningTable: string | number | { id: string | number } } | [diningTable: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { diningTable: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { diningTable: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            diningTable: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        diningTable: typeof args.diningTable === 'object'
        ? args.diningTable.id
        : args.diningTable,
    }

    return update.definition.url
            .replace('{diningTable}', parsedArgs.diningTable.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::update
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:126
* @route '/staff/table-qr/{diningTable}'
*/
update.put = (args: { diningTable: string | number | { id: string | number } } | [diningTable: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::update
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:126
* @route '/staff/table-qr/{diningTable}'
*/
const updateForm = (args: { diningTable: string | number | { id: string | number } } | [diningTable: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::update
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:126
* @route '/staff/table-qr/{diningTable}'
*/
updateForm.put = (args: { diningTable: string | number | { id: string | number } } | [diningTable: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const tableQr = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
}

export default tableQr