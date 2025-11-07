<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register()
    {
        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|min:3',
            'username' => 'required|min:3|max:15|unique:users',
            'password' => 'required|min:6|max:12'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()], 400);
        }

        $user = User::create([
            'name' => request('name'),
            'username' => request('username'),
            'password' => bcrypt(request('password')),
        ]);

        if ($user) {
            return response()->json([
                'message' => 'Register Successfully!',
                'data' => $user
            ], 200);
        } else {
            return response()->json(['message' => 'Register Failed!'], 400);
        }
    }

    public function login()
    {
        $validator = Validator::make(request()->all(), [
            'username' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()], 400);
        }

        $credentials = request(['username', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Logout Successfully!'], 200);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'message' => 'Login Successfully!',
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
