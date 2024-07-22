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

        // Modify each post to include full image URLs
        $posts->transform(function ($post) {
            $post->image = url('post-images/' . $post->image);
            if ($post->user && $post->user->avatar) {
                $post->user->avatar = url('avatars/' . $post->user->avatar);
            }
            return $post;
        });

        // Return the posts as JSON
        return response()->json($posts);
    }
}
