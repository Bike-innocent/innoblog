<?php
namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Like;
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

    public function like($slug)
    {
        $user = auth()->user();

        // Find the post by slug
        $post = Post::where('slug', $slug)->firstOrFail();

        // Check if the user has already liked the post
        $like = Like::where('post_id', $post->id)->where('user_id', $user->id)->first();

        if ($like) {
            // If the like exists, delete it (unlike)
            $like->delete();
            $isLikedByUser = false;
        } else {
            // If the like doesn't exist, create a new one
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

}
