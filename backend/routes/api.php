<?php

use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->middleware('api')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
});

Route::middleware(['api', 'auth:api'])->group(function () {
    Route::get('users', function () {
        $users = User::all();
        return response()->json([
            'message' => 'success!',
            'data' => $users
        ]);
    });
});
