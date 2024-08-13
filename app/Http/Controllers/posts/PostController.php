<?php

namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Like;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // Method to fetch paginated posts
    public function index(Request $request)
    {
        $limit = $request->query('limit', 12); // Default limit is 12
        $posts = Post::with('user')->paginate($limit);

        // Transform posts to include full URL for images and user avatars
        $posts->getCollection()->transform(function ($post) {
            $post->image = url('post-images/' . $post->image);
            if ($post->user && $post->user->avatar) {
                $post->user->avatar_url = url('avatars/' . $post->user->avatar);
            } else {
                $post->user->avatar_url = null;
                $post->user->placeholder_color = $post->user->placeholder_color;
            }
            return $post;
        });

        return response()->json($posts);
    }

    // Method to like/unlike a post
    public function like($slug)
    {
        $user = auth()->user();

        // Find the post by slug
        $post = Post::where('slug', $slug)->firstOrFail();

        // Check if the user has already liked the post
        $like = Like::where('post_id', $post->id)->where('user_id', $user->id)->first();

        if ($like) {
            // If like exists, delete it (unlike)
            $like->delete();
            $isLikedByUser = false;
        } else {
            // If like doesn't exist, create a new one
            Like::create([
                'post_id' => $post->id,
                'user_id' => $user->id,
            ]);
            $isLikedByUser = true;
        }

        return response()->json([
            'likes_count' => $post->likes()->count(),
            'is_liked_by_user' => $isLikedByUser,
        ]);
    }

    // Method to save/unsave a post
    public function toggleSave($slug)
    {
        $user = auth()->user();
        $post = Post::where('slug', $slug)->firstOrFail();

        if ($user->savedPosts()->where('post_id', $post->id)->exists()) {
            $user->savedPosts()->detach($post->id); // Unsave
            $isSaved = false;
        } else {
            $user->savedPosts()->attach($post->id); // Save
            $isSaved = true;
        }

        return response()->json([
            'is_saved' => $isSaved,
        ]);
    }

public function removeSave($slug)
{
    try {
        $user = auth()->user();
        $post = Post::where('slug', $slug)->firstOrFail();

        if ($user->savedPosts()->where('post_id', $post->id)->exists()) {
            $user->savedPosts()->detach($post->id); // Remove from saved posts
            $isRemoved = true;
        } else {
            $isRemoved = false;
        }

        return response()->json([
            'is_removed' => $isRemoved,
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}




    // Method to fetch saved posts
    public function getSavedPosts(Request $request)
    {
        $user = auth()->user();

        // Fetch the saved posts with pagination
        $savedPosts = $user->savedPosts()->with('user')->paginate($request->get('limit', 12));

        // Transform the saved posts to include the full URL for images and user avatars
        $savedPosts->getCollection()->transform(function ($post) {
            $post->image = url('post-images/' . $post->image);
            if ($post->user && $post->user->avatar) {
                $post->user->avatar_url = url('avatars/' . $post->user->avatar);
            } else {
                $post->user->avatar_url = null;
                $post->user->placeholder_color = $post->user->placeholder_color;
            }
            return $post;
        });


        return response()->json($savedPosts);
    }
}
