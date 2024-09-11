<?php

namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use App\Models\Post;

class SinglePostController extends Controller
{


    public function show($slug)
    {
        // Fetch the post with category, user, and likes relationships
        $post = Post::with(['category', 'user', 'likes'])->where('slug', $slug)->firstOrFail();

        // Set the image URL
        $post->image = url('post-images/' . $post->image);

        // Set the avatar URL if it exists
        if ($post->user->avatar) {
            $post->user->avatar = url('avatars/' . $post->user->avatar);
        }

        // Add the likes count to the post
        $post->likes_count = $post->likes()->count();

        // Check if the user is authenticated
        if (auth()->check()) {
            $user = auth()->user();
            // If authenticated, check if the post is liked by the user
            $post->is_liked_by_user = $post->likes()->where('user_id', $user->id)->exists();
        } else {
            // If not authenticated, set is_liked_by_user to false
            $post->is_liked_by_user = false;
        }

        // Return the post as JSON response
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
