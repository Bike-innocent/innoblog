<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class ManageCategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('subCategories.tags')->get();
        return response()->json($categories);
    }

    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories',
        ]);

        try {
            $category = Category::create($request->all());
            \Log::info('Category created: ', $category->toArray());
            return response()->json($category, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating category: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function updateCategory(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,' . $category->id,
        ]);

        try {
            $category->update($request->all());
            \Log::info('Category updated: ', $category->toArray());
            return response()->json($category);
        } catch (\Exception $e) {
            \Log::error('Error updating category: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function destroyCategory(Category $category)
    {
        try {
            $category->delete();
            \Log::info('Category deleted: ', ['id' => $category->id]);
            return response()->json(null, 204);
        } catch (\Exception $e) {
            \Log::error('Error deleting category: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}