<?php
namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->get()->map(function ($post) {
            $post->image = url('post-images/' . $post->image);
            if ($post->user && $post->user->avatar) {
                $post->user->avatar_url = url('avatars/' . $post->user->avatar);
            } else {
                $post->user->avatar_url = null;
            }
            return $post;
        });
    
        return response()->json($posts);
    }
    

    
}
