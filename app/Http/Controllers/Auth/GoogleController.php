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
        $googleToken = $request->input('code'); // Authorization code from Google

        // Exchange authorization code for access token
        $response = Http::asForm()->post('https://oauth2.googleapis.com/token', [
            'code' => $googleToken,
            'client_id' => env('GOOGLE_CLIENT_ID'),
            'client_secret' => env('GOOGLE_CLIENT_SECRET'),
            'redirect_uri' => env('GOOGLE_REDIRECT_URL'),
            'grant_type' => 'authorization_code',
        ]);

        $tokenData = $response->json();

        if (!isset($tokenData['id_token'])) {
            return response()->json(['error' => 'Invalid Google token'], 401);
        }

        // Verify ID token with Google
        $idToken = $tokenData['id_token'];
        $userInfo = Http::get('https://oauth2.googleapis.com/tokeninfo', [
            'id_token' => $idToken
        ])->json();

        if (isset($userInfo['email'])) {
            // Create or update user in the database
            $user = User::updateOrCreate(
                ['email' => $userInfo['email']],
                [
                    'name' => $userInfo['name'],
                    'google_id' => $userInfo['sub'],
                ]
            );

            // Log the user in and create a token
            Auth::login($user);
            $authToken = $user->createToken('authToken')->plainTextToken;

            // Redirect to React frontend with token
            return redirect("https://innoblog.com.ng?token={$authToken}");
        }

        return response()->json(['error' => 'Invalid Google token'], 401);
    }

}
