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
        
        $subCategory = Subcategory::where('slug', $subcategorySlug)->first();
    
        if (!$subCategory) {
            return response()->json(['error' => 'Subcategory not found'], 404);
        }
    
      
        $posts = $subCategory->posts()->with('user')->get();
    
        foreach ($posts as $post) {
            $post->image = url('post-images/' . $post->image);
        }
    
        return response()->json(['data' => $posts]);
    }
    
    
}
