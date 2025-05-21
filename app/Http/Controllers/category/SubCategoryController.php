<?php
namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Models\SubCategory;
use App\Models\Category;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    public function index()
    {
        $subCategories = SubCategory::with('category')->get();
        return response()->json($subCategories);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:sub_categories',
            'category_id' => 'required|exists:categories,id',
        ]);

        $subCategory = SubCategory::create($request->all());

        return response()->json($subCategory, 201);
    }

    public function show($id)
    {
        $subCategory = SubCategory::with('category')->findOrFail($id);
        return response()->json($subCategory);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:sub_categories,slug,' . $id,
            'category_id' => 'required|exists:categories,id',
        ]);

        $subCategory = SubCategory::findOrFail($id);
        $subCategory->update($request->all());

        return response()->json($subCategory);
    }

    public function destroy($id)
    {
        $subCategory = SubCategory::findOrFail($id);
        $subCategory->delete();

        return response()->json(null, 204);
    }



    public function getPostsBySubcategory($subcategorySlug)
{
    // Find the subcategory by slug
    $subCategory = Subcategory::where('slug', $subcategorySlug)->first();

    // If the subcategory doesn't exist, return a 404 error
    if (!$subCategory) {
        return response()->json(['error' => 'Subcategory not found'], 404);
    }

    // Fetch only published posts (status = 1) and order by the most recent (created_at desc)
    $posts = $subCategory->posts()
                ->with('user') // Include the user relationship
                ->where('status', 1) // Only fetch published posts
                ->orderBy('created_at', 'desc') // Order by the most recent posts
                ->get();

    // Update the image URL for each post
    foreach ($posts as $post) {
     $post->image = config('image.url') . $post->image;

    }

    // Return the posts as JSON
    return response()->json(['data' => $posts]);
}


}
