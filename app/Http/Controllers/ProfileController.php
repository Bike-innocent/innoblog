<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ProfileUpdateRequest;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): View
    {
        return view('profile.edit', [
            'user' => $request->user(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
    {
        $user = Auth::user();

        // Validate the request
        $request->validated();

        // Update user's profile information
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return response()->json(['message' => 'Profile updated successfully.'], 200);
    }

    /**
     * Delete user's avatar.
     */
    // public function deleteAvatar(Request $request): RedirectResponse
    // {
    //     $user = $request->user();

    //     if ($user->avatar) {
    //         Storage::disk('public')->delete($user->avatar);
    //         $user->avatar = null;
    //         $user->save();
    //     }

    //     return Redirect::route('profile.edit')->with('status', 'avatar-deleted');
    // }

    /**
     * Delete user's account.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['errors' => ['password' => 'The provided password does not match our records.']], 422);
        }

        // Delete the user
        $user->delete();

        return response()->json(['message' => 'Account deleted successfully.'], 200);
    }
}