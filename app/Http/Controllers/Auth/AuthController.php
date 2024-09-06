<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

// use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::updateOrCreate(
            [
                'email' => $googleUser->getEmail(),
            ],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
            ]
        );

        // Generate token for API authentication
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }

// public function logout(Request $request)
// {
//     $request->user()->currentAccessToken()->delete();


//         // Handle the case where no valid token is found
//         return response()->json(['message' => 'logout sucessfully inno'], 200);

// }
public function logout(Request $request)
{
    // Revoke all tokens for the user
    $request->user('sanctum')->tokens()->delete();

    // Logout the user from the web guard (session)
    Auth::guard('web')->logout();

    return response()->json(['message' => 'Logged out successfully'], 200);
}


}
















