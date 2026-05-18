<?php


Route::get('test', function () {
    return response()->json(['message' => 'API is working']);
});

Route::get('/my-orders', function () {
    // return $request->user();

    return response()->json([
        'orders' => [
            [
                'id' => 1,
                'items' => [
                    ['name' => 'Burger', 'quantity' => 2, 'price' => 5.99],
                    ['name' => 'Fries', 'quantity' => 1, 'price' => 2.99],
                ],
                'total_amount' => 14.97,
                'status' => 'pending_confirmation',
            ],
            [
                'id' => 2,
                'items' => [
                    ['name' => 'Pizza', 'quantity' => 1, 'price' => 8.99],
                    ['name' => 'Soda', 'quantity' => 2, 'price' => 1.50],
                ],
                'total_amount' => 11.99,
                'status' => 'confirmed',
            ],
        ],
    ]);

})->middleware('auth:sanctum')->name('my-orders');