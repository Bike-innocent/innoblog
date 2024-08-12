<?php

namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use App\Models\Post;

class SinglePostController extends Controller
{


    public function show($slug)
    {
        $user = auth()->user();
        $post = Post::with(['category', 'user', 'likes'])->where('slug', $slug)->firstOrFail();
        $post->image = url('post-images/' . $post->image);

        if ($post->user->avatar) {
            $post->user->avatar = url('avatars/' . $post->user->avatar);
        }

        // Add the likes count to the post
        $post->likes_count = $post->likes()->count();
        $post->is_liked_by_user = $post->likes()->where('user_id', $user->id)->exists();

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
