<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;

Route::get('/', function () {
    return redirect('/loginpage'); // ログイン画面にリダイレクト
});

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::get('/loginpage', [PageController::class, 'showLoginpage'])->name('farstpage');