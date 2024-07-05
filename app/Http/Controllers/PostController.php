<?php

namespace App\Http\Controllers;

use App\Models\Post;

class PostController extends Controller
{
    // In PostController.php

    public function index()
    {
        $posts = Post::all()->map(function ($post) {
            $post->image = url('images/'.$post->image);

            return $post;
        });

        return response()->json($posts);
    }
}
