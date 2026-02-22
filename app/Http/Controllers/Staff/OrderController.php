<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use BadMethodCallException;
use RuntimeException;

/**
 * Backward-compatible proxy for legacy references.
 *
 * Routes and new code should point to:
 * Modules\Ordering\Http\Controllers\Staff\OrderController
 */
class OrderController extends Controller
{
    private const DELEGATE_CLASS = 'Modules\\Ordering\\Http\\Controllers\\Staff\\OrderController';

    /**
     * Forward unknown method calls to the module controller.
     *
     * @param  array<int, mixed>  $parameters
     */
    public function __call(string $method, array $parameters): mixed
    {
        $delegateClass = self::DELEGATE_CLASS;

        if (! class_exists($delegateClass)) {
            throw new RuntimeException(sprintf('Delegate controller [%s] was not found.', $delegateClass));
        }

        $delegate = app($delegateClass);

        if (! method_exists($delegate, $method)) {
            throw new BadMethodCallException(sprintf('Method [%s::%s] does not exist.', $delegateClass, $method));
        }

        return $delegate->{$method}(...$parameters);
    }
}
