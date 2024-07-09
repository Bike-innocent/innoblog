<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AllUserController extends Controller
{
    public function index()
    {
        // Fetch users with their roles
        $users = User::with('roles')->orderBy('created_at', 'desc')->paginate(30); // Adjust per page as needed

        // Map roles to a simpler format if needed
        $users->getCollection()->transform(function ($user) {
            $user->roles = $user->roles->pluck('name'); // Ensuring roles are array of names
            return $user;
        });

        return response()->json($users);
    }
}