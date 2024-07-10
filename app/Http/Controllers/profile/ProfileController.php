<?php
namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $user->load('roles', 'permissions');
        
        if ($user->avatar) {
            $user->avatar = url('avatars/' . $user->avatar);
        }
    
        return response()->json(['user' => $user], 200);
    }
    
    

    public function update(ProfileUpdateRequest $request)
    {
        $user = Auth::user();

        $request->validated();

        $user->name = $request->name;
        $user->email = $request->email;
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
}