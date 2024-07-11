<?php
namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->take(5)->get()->map(function ($post) {
            $post->image = url('post-images/' . $post->image);
            return $post;
        });

        return response()->json($posts);
    }

    public function show($id)
    {
        $post = Post::findOrFail($id);
        $post->image = url('post-images/' . $post->image);

        return response()->json($post);
    }
}