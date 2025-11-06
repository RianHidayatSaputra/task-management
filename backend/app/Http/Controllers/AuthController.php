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
            'name' => 'required|string',
            'username' => 'required|min:3|max:15|unique:users',
            'password' => 'required|min:6|max:12'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->messages()], 400);
        }

        $validator['password'] = bcrypt(request('password'));
        $user = User::create($validator);

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

        if (! $token = auth()->attempt($validator)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
