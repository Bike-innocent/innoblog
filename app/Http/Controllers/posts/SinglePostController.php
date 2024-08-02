<?php

namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use App\Models\Post;

class SinglePostController extends Controller
{


    public function show($slug)
    {
        $post = Post::with('category')->where('slug', $slug)->firstOrFail();
        $post->image = url('post-images/' . $post->image);

        return response()->json($post);
    }

    public function related($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        $relatedPosts = Post::with('user', 'category')
            ->where('category_id', $post->category_id)
            ->where('slug', '!=', $slug)
            ->take(5)
            ->latest()
            ->get();

        foreach ($relatedPosts as $relatedPost) {
            $relatedPost->image = url('post-images/' . $relatedPost->image);
        }

        return response()->json(['relatedPosts' => $relatedPosts]);
    }
}
