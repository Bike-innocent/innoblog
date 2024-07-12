<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Tag;

class ManageCategoryController extends Controller
{
  
    public function index()
    {
        try {
            $categories = Category::with('subCategories.tags')->get();
            return response()->json($categories);
        } catch (\Exception $e) {
            \Log::error('Error fetching categories: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories',
        ]);

        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    public function updateCategory(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,' . $category->id,
        ]);

        $category->update($request->all());
        return response()->json($category);
    }

    public function destroyCategory(Category $category)
    {
        $category->delete();
        return response()->json(null, 204);
    }

    // Similarly add methods for SubCategory and Tag CRUD operations
}