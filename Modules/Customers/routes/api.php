<?php
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

Route::post('/sanctum/token', function (Request $request) {
    Log::info('Received token request', ['request' => $request->all()]);
    $request->validate([
        'phone' => 'required',
        'password' => 'required',
        'device_name' => 'required',
    ]);

    $customer = Customer::where('phone', $request->phone)->first();

    if (! $customer) {

        $customer = Customer::create([
            'name' => 'Customer '.$request->phone,
            'phone' => $request->phone,
            'password' => $request->password, // This will be hashed automatically by the model
        ]);

    }
    if (! $customer || ! Hash::check($request->password, $customer->password)) {

        throw ValidationException::withMessages([
            'phone' => ['The provided credentials are incorrect.'],
        ]);
    }

    return $customer->createToken($request->device_name)->plainTextToken;
});