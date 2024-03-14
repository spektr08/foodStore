<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\Api\ProductsController;
use  App\Http\Controllers\Api\OrdersController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/products', [ProductsController::class, 'index']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/order/{order}', [OrdersController::class, 'show']);
    Route::post('/order', [OrdersController::class, 'create']);
});
