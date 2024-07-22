<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    public function MixedPostOnHome()
    {
        // Fetch the latest 12 posts, skipping the first 5
        $posts = Post::orderBy('created_at', 'desc')->skip(5)->take(12)->get();

        // Return the posts as JSON
        return response()->json($posts);
    }
}
