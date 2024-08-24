<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Post;

use Illuminate\Http\Request;


class HomePageController extends Controller
{



   public function search(Request $request) {
    $query = $request->input('query');

    // Assuming you have a Post model and relationships set up
    $results = Post::where('title', 'LIKE', "%{$query}%")
                   ->orWhere('content', 'LIKE', "%{$query}%")
                   ->with('user') // Eager load the user relationship
                   ->get();

    // Add the full image URL and user avatar URL
    foreach ($results as $post) {
        $post->image = url('post-images/' . $post->image);
        $post->user->avatar_url = url('avatars/' . $post->user->avatar);
    }

    return response()->json($results);
}

    

}
