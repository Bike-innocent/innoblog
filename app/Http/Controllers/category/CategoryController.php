<?php
namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    // Display a listing of the categories
    public function index()
    {
        $categories = Category::with('subcategories')->get();
        return response()->json($categories);
    }
    public function getSubcategories($categorySlug)
    {
        $category = Category::where('slug', $categorySlug)->firstOrFail();
        $subcategories = $category->subcategories;
        return response()->json($subcategories);
    }

    // Store a newly created category in storage
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories,name',
            'slug' => 'required|string|max:255|unique:categories,slug'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $category = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->slug),
        ]);

        return response()->json($category, 201);
    }

    // Display the specified category
    public function show($identifier)
    {
        $category = Category::where('id', $identifier)->orWhere('slug', $identifier)->first();

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        return response()->json($category);
    }

    // Update the specified category in storage
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
            'slug' => 'required|string|max:255|unique:categories,slug,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $category = Category::find($id);
        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->slug),
        ]);

        return response()->json($category);
    }

    // Remove the specified category from storage
    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
    public function getMixedPosts($categorySlug)
    {
        $category = Category::where('slug', $categorySlug)->firstOrFail();

        $limit = request()->get('limit', 50); // Default limit to 12 if not provided
        $posts = Post::where('category_id', $category->id)
            ->with('user') // Eager load the user relationship
            ->orderBy('created_at', 'desc')
            ->paginate($limit);

        // Add image URLs to the posts
        foreach ($posts as $post) {
            $post->image = url('post-images/' . $post->image);
        }

        return response()->json($posts);
    }


}
