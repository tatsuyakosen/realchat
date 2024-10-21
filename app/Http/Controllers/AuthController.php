<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {
    public function register(Request $request) {
        // リクエストのバリデーション
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // ユーザーの作成
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json(['user' => $user], 201);
    }

    public function login(Request $request) {
        // リクエストのバリデーション
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // ユーザーの認証
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'メールアドレスまたはパスワードが間違っています。'], 401);
        }

        // 認証が成功した場合、ユーザー情報を返す
        return response()->json(['user' => Auth::user()]);
    }

    public function logout() {
        // ログアウト処理
        Auth::logout();
        return response()->json(['message' => '正常にログアウトしました。']);
    }
}
