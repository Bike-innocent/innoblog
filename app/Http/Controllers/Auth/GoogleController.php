<?php
namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
 use Illuminate\Support\Facades\Auth;
// use Illuminate\Http\Request;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }
    public function handleGoogleCallback()
    {
        try {
            // Retrieve the Google user
            $googleUser = Socialite::driver('google')->stateless()->user();
    
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
    
            // Return token and user information as JSON to the React app
            return response()->json([
                'token' => $token,
                'user' => $user,
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }
    

    
}
