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
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
// use Laravel\Sanctum\HasApiTokens;
use Google\Client;

class GoogleController extends Controller
{
    public function handleGoogleCallback(Request $request)
    {
        $googleToken = $request->input('credential');

        // Initialize Google Client
        $client = new Client(['client_id' => '794515842840-l1gtp80th79222cimtr0mo3dj414rvfl.apps.googleusercontent.com']);
        
        // Verify the token with Google
        $payload = $client->verifyIdToken($googleToken);

        if ($payload) {
            // Retrieve user information from Google
            $googleUserId = $payload['sub'];
            $email = $payload['email'];
            $name = $payload['name'];

            // Find or create the user in your local database
            $user = User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'google_id' => $googleUserId,
                ]
            );

            // Log the user in
            Auth::login($user);

            // Generate token for React app (e.g., Laravel Sanctum token)
            $token = $user->createToken('authToken')->plainTextToken;

            // Return token to React frontend
            return response()->json(['token' => $token]);
        }

        return response()->json(['error' => 'Invalid Google token'], 401);
    }
}
