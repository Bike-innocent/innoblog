<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class SportController extends Controller
{
    use Illuminate\Support\Facades\URL;

public function index()
{
    $posts = Post::with('user')->latest()->take(10)->get();

    $posts->transform(function ($post) {
        $post->image = url('post-images/' . $post->image);
        if ($post->user && $post->user->avatar) {
            $post->user->avatar = url('avatars/' . $post->user->avatar);
        }
        return $post;
    });

    return response()->json($posts);
}

}
