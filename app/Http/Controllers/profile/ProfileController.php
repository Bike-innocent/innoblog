<?php
namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class ProfileController extends Controller
{
   public function index()
    {
        $user = Auth::user();
        $user->load('roles', 'permissions');

        // Construct the URL for the avatar if it exists
        if ($user->avatar) {
            $user->avatar = url('avatars/' . $user->avatar);
        }

        // Add placeholder color to the response
        $user->placeholder_color = $user->placeholder_color ?? ''; // Default color if none provided

        return response()->json(['user' => $user], 200);
    }



   public function update(ProfileUpdateRequest $request)
    {
        $user = Auth::user();

        $request->validated();

        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->has('username')) {
            $user->username = $request->username;
        }
        $user->save();

        return response()->json(['message' => 'Profile updated successfully.'], 200);
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['errors' => ['password' => 'The provided password does not match our records.']], 422);
        }

        $user->delete();

        return response()->json(['message' => 'Account deleted successfully.'], 200);
    }


    public function showProfile($username)
    {
        // Find user by username
        $user = User::where('username', $username)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Load roles and permissions if needed
        $user->load('roles', 'permissions');

        // Construct the URL for the avatar if it exists
        if ($user->avatar) {
            $user->avatar = url('avatars/' . $user->avatar);
        }

        // Add placeholder color to the response
        $user->placeholder_color = $user->placeholder_color ?? ''; // Default color if none provided

        return response()->json([
            'name' => $user->name,
            'username' => $user->username,
            'avatar_url' => $user->avatar,
            'placeholder_color' => $user->placeholder_color,
            // Add other profile information here if needed
        ], 200);
    }
}
