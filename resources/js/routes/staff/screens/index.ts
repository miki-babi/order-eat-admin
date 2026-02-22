import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::index
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:22
* @route '/staff/screens'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/staff/screens',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::index
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:22
* @route '/staff/screens'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::index
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:22
* @route '/staff/screens'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::index
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:22
* @route '/staff/screens'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::index
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:22
* @route '/staff/screens'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::index
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:22
* @route '/staff/screens'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::index
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:22
* @route '/staff/screens'
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
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::store
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:149
* @route '/staff/screens'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/staff/screens',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::store
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:149
* @route '/staff/screens'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::store
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:149
* @route '/staff/screens'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::store
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:149
* @route '/staff/screens'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::store
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:149
* @route '/staff/screens'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::update
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:182
* @route '/staff/screens/{branchScreen}'
*/
export const update = (args: { branchScreen: number | { id: number } } | [branchScreen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/staff/screens/{branchScreen}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::update
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:182
* @route '/staff/screens/{branchScreen}'
*/
update.url = (args: { branchScreen: number | { id: number } } | [branchScreen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { branchScreen: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { branchScreen: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            branchScreen: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        branchScreen: typeof args.branchScreen === 'object'
        ? args.branchScreen.id
        : args.branchScreen,
    }

    return update.definition.url
            .replace('{branchScreen}', parsedArgs.branchScreen.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::update
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:182
* @route '/staff/screens/{branchScreen}'
*/
update.put = (args: { branchScreen: number | { id: number } } | [branchScreen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::update
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:182
* @route '/staff/screens/{branchScreen}'
*/
const updateForm = (args: { branchScreen: number | { id: number } } | [branchScreen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::update
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:182
* @route '/staff/screens/{branchScreen}'
*/
updateForm.put = (args: { branchScreen: number | { id: number } } | [branchScreen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::assignments
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:217
* @route '/staff/screens/{branchScreen}/assignments'
*/
export const assignments = (args: { branchScreen: number | { id: number } } | [branchScreen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assignments.url(args, options),
    method: 'patch',
})

assignments.definition = {
    methods: ["patch"],
    url: '/staff/screens/{branchScreen}/assignments',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::assignments
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:217
* @route '/staff/screens/{branchScreen}/assignments'
*/
assignments.url = (args: { branchScreen: number | { id: number } } | [branchScreen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { branchScreen: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { branchScreen: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            branchScreen: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        branchScreen: typeof args.branchScreen === 'object'
        ? args.branchScreen.id
        : args.branchScreen,
    }

    return assignments.definition.url
            .replace('{branchScreen}', parsedArgs.branchScreen.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::assignments
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:217
* @route '/staff/screens/{branchScreen}/assignments'
*/
assignments.patch = (args: { branchScreen: number | { id: number } } | [branchScreen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assignments.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::assignments
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:217
* @route '/staff/screens/{branchScreen}/assignments'
*/
const assignmentsForm = (args: { branchScreen: number | { id: number } } | [branchScreen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignments.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Modules\Operations\Http\Controllers\Staff\BranchScreenController::assignments
* @see Modules/Operations/app/Http/Controllers/Staff/BranchScreenController.php:217
* @route '/staff/screens/{branchScreen}/assignments'
*/
assignmentsForm.patch = (args: { branchScreen: number | { id: number } } | [branchScreen: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignments.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

assignments.form = assignmentsForm

const screens = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    assignments: Object.assign(assignments, assignments),
}

export default screens