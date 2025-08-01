<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
    $feilds = $request->validate([
        'username' => 'required|max:255|unique:users',
        'password' => 'required'
    ]);

    $user = User::create([
        'username' => $feilds['username'],
        'password' => Hash::make($feilds['password'])
    ]);

    $token = $user->createToken($request->username);

    return [
        'user' => $user,
        'token' => $token->plainTextToken
        ];
    }

    public function login(Request $request){
        $request->validate([
        'username' => 'required|exists:users',
        'password' => 'required'
    ]);

    $user = User::where('username', $request->username)->first();

    if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
            'errors' => [
            'creds' => 'The password is incorrect.'
            ]], 401);
        }

        $token = $user->createToken($user->username);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();

        return [
            'message' => 'You are logged out.'
        ];
    }
}
