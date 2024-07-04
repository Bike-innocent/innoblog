<?php
namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\CommentPosted;

class CommentController extends Controller
{
    // Store Comment
   
public function store(Request $request, Post $post)
{
    $request->validate([
        'body' => 'required|string|max:1000',
    ]);

    $comment = Comment::create([
        'user_id' => Auth::id(),
        'post_id' => $post->id,
        'body' => $request->body,
    ]);

    $comment->load('user'); // Ensure the user relationship is loaded

    broadcast(new CommentPosted($comment))->toOthers();

    return response()->json($comment); // This line returns the JSON response you're seeing
}
    // Store Reply
    public function storeReply(Request $request, Comment $comment)
    {
        $request->validate([
            'body' => 'required|string',
        ]);

        Comment::create([
            'user_id' => Auth::id(),
            'post_id' => $comment->post_id,
            'parent_id' => $comment->id,
            'body' => $request->body,
        ]);

        return redirect()->back()->with('success', 'Reply posted successfully.');
    }

    // Update Comment
    public function update(Request $request, Comment $comment)
    {
        $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $comment->update([
            'body' => $request->body,
        ]);

        return redirect()->back()->with('success', 'Comment updated!');
    }

    // Update Reply
    public function updateReply(Request $request, Comment $reply)
    {
        $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $reply->update([
            'body' => $request->body,
        ]);

        return redirect()->back()->with('success', 'Reply updated!');
    }

    // Delete Comment
    public function destroy(Comment $comment)
    {
        $comment->delete();

        return redirect()->back()->with('success', 'Comment deleted!');
    }

    // Delete Reply
    public function destroyReply(Comment $reply)
    {
        $reply->delete();

        return redirect()->back()->with('success', 'Reply deleted!');
    }
}