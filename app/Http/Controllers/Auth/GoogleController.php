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
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class GoogleController extends Controller
{
    // Redirect to Google login
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    // Handle callback from Google
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            // Find or create the user
            $user = User::updateOrCreate(
                ['email' => $googleUser->email],
                [
                    'name' => $googleUser->name,
                    'google_id' => $googleUser->id,
                    'password' => Hash::make(uniqid()), // Generate random password
                ]
            );

            // Log the user in
            Auth::login($user);

            // Generate a token (if using Sanctum)
            $token = $user->createToken('authToken')->plainTextToken;

            // Return the token to the frontend
            return response()->json(['token' => $token]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to authenticate'], 500);
        }
    }
}
