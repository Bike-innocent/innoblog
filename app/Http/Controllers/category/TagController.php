<?php

// namespace App\Http\Controllers\Category;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use App\Models\Tag;
// use App\Models\SubCategory;

// class TagController extends Controller
// {
//     /**
//      * Display a listing of the resource.
//      */
//     public function index()
//     {
//         $tags = Tag::with(['subCategory.Category'])->get();
//         return response()->json($tags);
//     }
    
//     /**
//      * Store a newly created resource in storage.
//      */
//     public function store(Request $request)
//     {
//         $request->validate([
//             'name' => 'required|string|unique:tags,name',
//             'slug' => 'required|string|unique:tags,slug',
//             'sub_category_id' => 'required|exists:sub_categories,id'
//         ]);

//         $tag = Tag::create($request->all());
//         return response()->json($tag, 201);
//     }

//     /**
//      * Display the specified resource.
//      */
//     public function show($id)
//     {
//         $tag = Tag::with('subCategory')->findOrFail($id);
//         return response()->json($tag);
//     }

//     /**
//      * Update the specified resource in storage.
//      */
//     public function update(Request $request, $id)
//     {
//         $request->validate([
//             'name' => 'required|string|unique:tags,name,' . $id,
//             'slug' => 'required|string|unique:tags,slug,' . $id,
//             'sub_category_id' => 'required|exists:sub_categories,id'
//         ]);

//         $tag = Tag::findOrFail($id);
//         $tag->update($request->all());
//         return response()->json($tag);
//     }

//     /**
//      * Remove the specified resource from storage.
//      */
//     public function destroy($id)
//     {
//         $tag = Tag::findOrFail($id);
//         $tag->delete();
//         return response()->json(null, 204);
//     }
// }