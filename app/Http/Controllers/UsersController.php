<?php
// app/Http/Controllers/UsersController.php
// app/Http/Controllers/UsersController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::paginate(50);
        return view('dashboard.all-users', compact('users'));
    }

    public function usersRoles()
    {
        $users = User::orderBy('created_at', 'desc')->paginate(50);
        return view('dashboard.users-roles', compact('users'));
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('dashboard.all-users')->with('success', 'User deleted successfully.');
    }

    public function showProfile()
    {
        $user = Auth::user();
        return view('dashboard.profile', compact('user'));
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'profile_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('profile_image')) {
            $imagePath = $request->file('profile_image')->store('profile_images', 'public');
            $user->profile_image = $imagePath;
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return redirect()->route('dashboard.profile')->with('success', 'Profile updated successfully.');
    }
}
