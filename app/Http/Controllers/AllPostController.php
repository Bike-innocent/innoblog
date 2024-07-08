<?php

namespace App\Http\Controllers;

use App\Models\Post;

class AllPostController extends Controller
{
    public function index()
    {
        $posts = Post::all();

         // Include full path for image URL
         foreach ($posts as $post) {
            $post->image = url('post-images/'.$post->image);
        }

        return response()->json(['posts' => $posts]);
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