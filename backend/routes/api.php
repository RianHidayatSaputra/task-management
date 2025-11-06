<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->middleware('api')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
});

Route::middleware(['api', 'auth:api'])->group(function () {
    Route::get('tasks', [TaskController::class, 'index']);
    Route::post('tasks/store', [TaskController::class, 'store']);
    Route::get('tasks/show/{task_id}', [TaskController::class, 'show']);
    Route::patch('tasks/update/{task_id}', [TaskController::class, 'update']);
    Route::delete('tasks/delete/{task_id}', [TaskController::class, 'delete']);
});
