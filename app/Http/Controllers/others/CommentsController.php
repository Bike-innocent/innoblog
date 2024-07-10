<?php

// // app/Http/Controllers/CommentController.php

// namespace App\Http\Controllers;

// use App\Models\Comment;
// use App\Models\Post;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

// class CommentController extends Controller
// {
//     public function store(Request $request, Post $post)
//     {
//         $request->validate([
//             'body' => 'required|string|max:1000',
//             'parent_id' => 'nullable|exists:comments,id',
//         ]);

//         Comment::create([
//             'user_id' => Auth::id(),
//             'post_id' => $post->id,
//             'parent_id' => $request->parent_id,
//             'body' => $request->body,
//         ]);

//         return redirect()->back()->with('success', 'Comment posted!');
//     }
// }