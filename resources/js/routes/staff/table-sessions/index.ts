import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::verify
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:147
* @route '/staff/table-sessions/{tableSession}/verify'
*/
export const verify = (args: { tableSession: string | number | { id: string | number } } | [tableSession: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: verify.url(args, options),
    method: 'patch',
})

verify.definition = {
    methods: ["patch"],
    url: '/staff/table-sessions/{tableSession}/verify',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::verify
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:147
* @route '/staff/table-sessions/{tableSession}/verify'
*/
verify.url = (args: { tableSession: string | number | { id: string | number } } | [tableSession: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tableSession: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tableSession: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tableSession: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tableSession: typeof args.tableSession === 'object'
        ? args.tableSession.id
        : args.tableSession,
    }

    return verify.definition.url
            .replace('{tableSession}', parsedArgs.tableSession.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::verify
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:147
* @route '/staff/table-sessions/{tableSession}/verify'
*/
verify.patch = (args: { tableSession: string | number | { id: string | number } } | [tableSession: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: verify.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::verify
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:147
* @route '/staff/table-sessions/{tableSession}/verify'
*/
const verifyForm = (args: { tableSession: string | number | { id: string | number } } | [tableSession: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verify.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\TableQrController::verify
* @see Modules/Operations/app/Http/Controllers/Staff/TableQrController.php:147
* @route '/staff/table-sessions/{tableSession}/verify'
*/
verifyForm.patch = (args: { tableSession: string | number | { id: string | number } } | [tableSession: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verify.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

verify.form = verifyForm

const tableSessions = {
    verify: Object.assign(verify, verify),
}

export default tableSessions