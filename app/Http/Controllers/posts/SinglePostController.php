<?php

namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class SinglePostController extends Controller
{
    public function latest()
    {
        $posts = Post::with('user')->orderBy('created_at', 'desc')->take(5)->get();
        foreach ($posts as $post) {
            $post->image = url('post-images/' . $post->image);
        }
        return response()->json(['latestpost' => $posts]);
    }

    public function popular()
    {
        $posts = Post::with('user')->inRandomOrder()->take(5)->get();
        foreach ($posts as $post) {
            $post->image = url('post-images/' . $post->image);
        }
        return response()->json(['popularpost' => $posts]);
    }
}