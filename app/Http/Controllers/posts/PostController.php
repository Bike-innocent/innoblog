<?php
namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->query('limit', 12); // Default limit is 12
        $posts = Post::with('user')->paginate($limit);

        // Transform the posts to include the full URL for images and user avatars
        $posts->getCollection()->transform(function ($post) {
            $post->image = url('post-images/' . $post->image);
            if ($post->user && $post->user->avatar) {
                $post->user->avatar_url = url('avatars/' . $post->user->avatar);
            } else {
                $post->user->avatar_url = null;
                $post->user->placeholder_color = $post->user->placeholder_color; // Add placeholder color
            }
            return $post;
        });

        return response()->json($posts);
    }

}
