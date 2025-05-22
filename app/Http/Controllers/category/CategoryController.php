<?php
namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;


class CategoryController extends Controller
{
    // Display a listing of the categories
    public function index()
    {
        try {
            Log::info('Entering the index method in CategoryController.');

            $categories = Category::with('subcategories')->get();

            Log::info('Successfully retrieved categories.', ['categories' => $categories]);

            return response()->json($categories);
        } catch (\Exception $e) {
            Log::error('Error in the index method of CategoryController.', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json(['error' => 'An error occurred while fetching categories.'], 500);
        }
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
    // Find the category by slug or return 404 if not found
    $category = Category::where('slug', $categorySlug)->firstOrFail();

    // Default limit to 50 if not provided
    $limit = request()->get('limit', 100);

    // Fetch posts from the category where status is 1 (published) and order by recent posts
    $posts = Post::where('category_id', $category->id)
                ->where('status', 1) // Only fetch published posts
                ->with('user') // Eager load the user relationship
                ->orderBy('created_at', 'desc') // Order by the most recent posts
                ->paginate($limit); // Paginate the results

    // Add image URLs to each post
    foreach ($posts as $post) {
$post->image;

    }

    // Return the paginated posts as a JSON response
    return response()->json($posts);
}



}
