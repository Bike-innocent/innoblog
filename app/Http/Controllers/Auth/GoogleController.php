<?php


namespace App\Http\Controllers\Auth;
use Illuminate\Http\Request;
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
    $googleToken = $request->input('code'); // This is the authorization code from Google

    // Initialize Google Client
    $client = new \Google\Client();
    $client->setClientId(env('GOOGLE_CLIENT_ID'));
    $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
    $client->setRedirectUri(env('GOOGLE_REDIRECT_URL'));

    $token = $client->fetchAccessTokenWithAuthCode($googleToken);

    // Now you can use $token['access_token'] to verify with Google
    $payload = $client->verifyIdToken($token['id_token']);

    if ($payload) {
        // Create or update user
        $user = User::updateOrCreate(
            ['email' => $payload['email']],
            [
                'name' => $payload['name'],
                'google_id' => $payload['sub']
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
