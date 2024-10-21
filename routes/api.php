<?php

use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('messages', [MessageController::class, 'index']);
    Route::post('messages', [MessageController::class, 'store']);
    Route::post('messages/{id}/read', [MessageController::class, 'markAsRead']); // 既読マーク
    Route::post('groups', [GroupController::class, 'store']);
    Route::put('groups/{id}', [GroupController::class, 'update']); // グループ名の変更
 });
 