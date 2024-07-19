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

    // Add this method
    public function getSubcategoriesByCategory($categorySlug)
    {
        $category = Category::where('slug', $categorySlug)->first();

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $subcategories = $category->subcategories; // Assuming you have a subcategories relationship in your Category model

        return response()->json($subcategories);
    }

    public function getPostsBySubCategory($categorySlug, $subcategorySlug)
    {
        $subCategory = SubCategory::where('slug', $subcategorySlug)
            ->whereHas('category', function($query) use ($categorySlug) {
                $query->where('slug', $categorySlug);
            })->first();

        if (!$subCategory) {
            return response()->json(['error' => 'Subcategory not found'], 404);
        }

        $posts = $subCategory->posts; // Assuming you have a posts relationship in your SubCategory model

        return response()->json($posts);
    }
    
}