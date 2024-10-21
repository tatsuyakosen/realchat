<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function showLoginpage() {
        return view('auth.login'); // login.blade.phpのビューファイルを返す
    }
}
