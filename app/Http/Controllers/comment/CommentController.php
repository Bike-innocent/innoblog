<?php

namespace App\Http\Controllers\comment;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommentController extends Controller
{
      // Store a new comment
      public function store(Request $request)
      {
          $request->validate([
              'post_id' => 'required|exists:posts,id',
              'content' => 'required|string|max:1000',
              'parent_id' => 'nullable|exists:comments,id',
          ]);

          $comment = Comment::create([
              'user_id' => Auth::id(),
              'post_id' => $request->post_id,
              'content' => $request->content,
              'parent_id' => $request->parent_id, // For replies, otherwise null
          ]);

          return response()->json($comment, 201);
      }

      // Get all comments for a post
      public function index($postId)
      {
          $comments = Comment::where('post_id', $postId)
              ->with(['user' => function ($query) {
                  $query->withCount('comments');
              }, 'replies' => function ($query) {
                  $query->with(['user' => function ($query) {
                      $query->withCount('comments');
                  }]);
              }])
              ->whereNull('parent_id') // Only get top-level comments
              ->orderBy('created_at', 'desc')
              ->get();

          return response()->json($comments);
      }

      public function update(Request $request, $id)
      {
          $request->validate([
              'content' => 'required|string|max:1000',
          ]);

          $comment = Comment::findOrFail($id);

          // Ensure the logged-in user is the owner of the comment
          if ($comment->user_id !== Auth::id()) {
              return response()->json(['error' => 'Unauthorized'], 403);
          }

          $comment->update([
              'content' => $request->content,
          ]);

          return response()->json($comment, 200);
      }

      public function destroy($id)
      {
          $comment = Comment::findOrFail($id);

          // Ensure the logged-in user is the owner of the comment
          if ($comment->user_id !== Auth::id()) {
              return response()->json(['error' => 'Unauthorized'], 403);
          }

          $comment->delete();

          return response()->json(['message' => 'Comment deleted successfully'], 200);
      }



}
