<?php
namespace App\Http\Controllers\admin;

use App\Models\Post;
use App\Http\Controllers\Controller;
class AllPostController extends Controller
{
    public function index()
    {
        // Use pagination with 10 posts per page
        $posts = Post::orderBy('created_at', 'desc')->paginate(30);

        // Include full path for image URL
        foreach ($posts as $post) {
            $post->image = url('post-images/'.$post->image);
        }

        return response()->json($posts);
    }

    public function delete($id)
    {
        $post = Post::find($id);
        if ($post) {
            $post->delete();

            return response()->json(['message' => 'Post deleted successfully']);
        }

        return response()->json(['message' => 'Post not found'], 404);
    }
}