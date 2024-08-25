<?php

namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\Post;
use App\Models\ReportReason;
use App\Models\Comment;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index()
    {
        // Fetch reports with related data
        $reports = Report::with(['reporter', 'reportedUser', 'post', 'comment.user', 'reason'])->get();

        return response()->json($reports);
    }

    public function getReasons()
    {
        $reasons = ReportReason::all();
        return response()->json($reasons);
    }

    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'post_id' => 'required|exists:posts,id', // post_id is now required
            'comment_id' => 'nullable|exists:comments,id',
            'reason_id' => 'required|exists:report_reasons,id',
            'additional_info' => 'nullable|string',
        ]);

        // Determine the reported user's ID
        $reportedUserId = null;

        if ($validated['comment_id']) {
            // Reporting a comment
            $comment = Comment::findOrFail($validated['comment_id']);
            $reportedUserId = $comment->user_id;
        } else {
            // Reporting a post
            $post = Post::findOrFail($validated['post_id']);
            $reportedUserId = $post->user_id;
        }

        // Create the report
        $report = Report::create([
            'reporter_id' => auth()->id(),
            'reported_user_id' => $reportedUserId,
            'post_id' => $validated['post_id'], // Associate the post
            'comment_id' => $validated['comment_id'] ?? null, // Associate the comment if present
            'reason_id' => $validated['reason_id'],
            'additional_info' => $validated['additional_info'] ?? null,
        ]);

        return response()->json(['message' => 'Report submitted successfully', 'report' => $report], 201);
    }

    public function destroy($id)
    {
        $report = Report::findOrFail($id);
        $report->delete();

        return response()->json(['message' => 'Report deleted successfully.'], 200);
    }
}
