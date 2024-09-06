<?php

// namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
// use Laravel\Socialite\Facades\Socialite;
// use App\Models\User;
// use Illuminate\Support\Facades\Auth;

// class GoogleController extends Controller
// {
//     public function redirectToGoogle()
//     {
//         return Socialite::driver('google')->stateless()->redirect();
//     }

//     public function handleGoogleCallback()
//     {
//         try {
//             // Retrieve the Google user information
//             $googleUser = Socialite::driver('google')->stateless()->user();
    
//             // Find or create the user in the local database
//             $user = User::updateOrCreate(
//                 [
//                     'email' => $googleUser->getEmail(),
//                 ],
//                 [
//                     'name' => $googleUser->getName(),
//                     'google_id' => $googleUser->getId(),
//                 ]
//             );
    
//             // Log the user in manually
//             Auth::login($user);
    
//             // Generate a token for API authentication (for React frontend)
//             $token = $user->createToken('authToken')->plainTextToken;
    
//             // Redirect back to React frontend with the token in the query params
//             return redirect('https://innoblog.com.ng?token=' . $token);
//         } catch (\Exception $e) {
//             return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
//         }
//     }
// }

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback(Request $request)
    {
        try {
            // Extract the credential from the request
            $credential = $request->input('credential');
            if (!$credential) {
                return response()->json(['error' => 'No credential provided'], 400);
            }

            // Use the credential to get user info from Google
            $googleUser = Socialite::driver('google')->stateless()->userFromToken($credential);

            // Find or create the user in the local database
            $user = User::updateOrCreate(
                [
                    'email' => $googleUser->getEmail(),
                ],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                ]
            );

            // Log the user in manually
            Auth::login($user);

            // Generate a token for API authentication (for React frontend)
            $token = $user->createToken('authToken')->plainTextToken;

            // Send the token in the response
            return response()->json(['token' => $token]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }
}
