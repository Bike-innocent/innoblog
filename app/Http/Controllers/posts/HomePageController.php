<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Post;

use Illuminate\Http\Request;


class HomePageController extends Controller
{



public function search(Request $request) {
    $query = $request->input('query');

    // Assuming you have a Post model
    $results = Post::where('title', 'LIKE', "%{$query}%")
                   ->orWhere('content', 'LIKE', "%{$query}%")
                   ->get();

    return response()->json($results);
}

}
