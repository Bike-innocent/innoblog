<?php


namespace App\Http\Controllers\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
// use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class GoogleController extends Controller
{
    // Redirect to Google login
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    // Handle callback from Google
    // public function handleGoogleCallback()
    // {
    //     try {
    //         $googleUser = Socialite::driver('google')->stateless()->user();

    //         // Find or create the user
    //         $user = User::updateOrCreate(
    //             ['email' => $googleUser->email],
    //             [
    //                 'name' => $googleUser->name,
    //                 'google_id' => $googleUser->id,
    //                 'password' => Hash::make(uniqid()), // Generate random password
    //             ]
    //         );

    //         // Log the user in
    //         Auth::login($user);

    //         // Generate a token (if using Sanctum)
    //         $token = $user->createToken('authToken')->plainTextToken;

    //         // Return the token to the frontend
    //         return response()->json(['token' => $token]);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'Failed to authenticate'], 500);
    //     }
    // }



    public function handleGoogleCallback(Request $request)
    {
        try {
            // Step 1: Get the authorization code from the request
            $googleToken = $request->input('code'); // Authorization code from Google

            if (!$googleToken) {
                return response()->json(['error' => 'No authorization code provided'], 400);
            }

            // Step 2: Exchange the authorization code for an access token
            $tokenResponse = Http::asForm()->post('https://oauth2.googleapis.com/token', [
                'code' => $googleToken,
                'client_id' => env('GOOGLE_CLIENT_ID'),
                'client_secret' => env('GOOGLE_CLIENT_SECRET'),
                'redirect_uri' => env('GOOGLE_REDIRECT_URL'),
                'grant_type' => 'authorization_code',
            ]);

            $tokenData = $tokenResponse->json();

            // Check if token was successfully retrieved
            if (!isset($tokenData['id_token'])) {
                return response()->json(['error' => 'Failed to retrieve Google tokens', 'details' => $tokenData], 401);
            }

            // Step 3: Verify the ID token
            $idToken = $tokenData['id_token'];
            $userInfoResponse = Http::get('https://www.googleapis.com/oauth2/v3/tokeninfo', [
                'id_token' => $idToken,
            ]);

            $userInfo = $userInfoResponse->json();

            if (!isset($userInfo['email'])) {
                return response()->json(['error' => 'Invalid ID token, user email not found'], 401);
            }

            // Step 4: Find or create the user in the database
            $user = User::updateOrCreate(
                ['email' => $userInfo['email']],
                [
                    'name' => $userInfo['name'] ?? '',
                    'google_id' => $userInfo['sub'],
                ]
            );

            // Step 5: Log the user in and generate an authentication token
            Auth::login($user);
            $authToken = $user->createToken('authToken')->plainTextToken;

            // Step 6: Redirect to the frontend with the token
            return redirect("https://innoblog.com.ng?token={$authToken}");

        } catch (\Exception $e) {
            // Handle any errors during the process
            return response()->json(['error' => 'An error occurred during the Google login process', 'message' => $e->getMessage()], 500);
        }
    }
}
