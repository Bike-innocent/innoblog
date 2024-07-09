<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUser(Request $request)
{
    $user = Auth::user();
    $user->roles = $user->roles()->pluck('name'); // Assuming roles are a relationship on the User model
    return response()->json($user);
}
}