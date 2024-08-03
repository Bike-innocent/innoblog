<?php

namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MyPostController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $posts = Post::where('user_id', $user->id)
            ->with('category', 'subCategory') // Eager load category and subcategory
            ->paginate(12); // Use pagination

        // Update image URLs
        foreach ($posts as $post) {
            $post->image = url('post-images/' . $post->image);
        }

        return response()->json($posts);
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
        ]);

        $imageName = time() . '.' . $request->image->extension();
        $request->image->move(public_path('post-images'), $imageName);

        $post = new Post();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->image = $imageName;
        $post->category_id = $request->category_id;
        $post->sub_category_id = $request->sub_category_id;
        $post->user_id = Auth::id();
        $post->save();

        return response()->json(['message' => 'Post created successfully']);
    }

    public function show($slug)
    {
        $post = Post::with(['category', 'subCategory'])->findOrFail($slug);
        $post->image = url('post-images/' . $post->image);

        return response()->json(['post' => $post]);
    }


    public function update(Request $request, $slug)
    {
        $post = Post::findOrFail($slug);

        $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if (file_exists(public_path('post-images/' . $post->image))) {
                unlink(public_path('post-images/' . $post->image));
            }

            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('post-images'), $imageName);
            $post->image = $imageName;
        }

        $post->title = $request->title;
        $post->content = $request->content;
        $post->category_id = $request->category_id;
        $post->sub_category_id = $request->sub_category_id;
        $post->save();

        return response()->json(['message' => 'Post updated successfully.']);
    }

    public function destroy($slug)
    {
        $post = Post::findOrFail($slug);
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }

    public function publish($id)
    {
        $post = Post::findOrFail($id);
        $post->status = 1; // Change status to published
        $post->save();

        return response()->json(['message' => 'Post published successfully.'], 200);
    }
    public function unPublish($id)
    {
        $post = Post::findOrFail($id);
        $post->status = 0; // Change status to published
        $post->save();

        return response()->json(['message' => 'Post unpublished successfully.'], 200);
    }

    public function formData()
    {
        $categories = Category::all();
        $subCategories = SubCategory::all();

        return response()->json([
            'categories' => $categories,
            'subCategories' => $subCategories,
        ]);
    }
}