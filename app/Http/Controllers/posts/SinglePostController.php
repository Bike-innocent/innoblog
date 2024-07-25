<?php

namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use App\Models\Post;

class SinglePostController extends Controller
{
    public function show($id)
    {
        $post = Post::with('category')->findOrFail($id);
        $post->image = url('post-images/' . $post->image);

        return response()->json($post);
    }

    public function related($id)
    {
        $post = Post::findOrFail($id);
        $relatedPosts = Post::with('user', 'category')
                            ->where('category_id', $post->category_id)
                            ->where('id', '!=', $id)
                            ->take(5)
                            ->latest()
                            ->get();

        foreach ($relatedPosts as $relatedPost) {
            $relatedPost->image = url('post-images/' . $relatedPost->image);
        }

        return response()->json(['relatedPosts' => $relatedPosts]);
    }
}
