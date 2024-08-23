<?php


// namespace App\Http\Controllers\posts;

// use App\Http\Controllers\Controller;
// use App\Models\Report;
// use App\Models\ReportReason;
// use Illuminate\Http\Request;

// class ReportController extends Controller
// {
//     public function index()
//     {
//         // Fetch reports with related data
//         $reports = Report::with(['reporter', 'reportedUser', 'post', 'reason'])->get();

//         return response()->json($reports);
//     }
//     public function getReasons()
//     {
//         $reasons = ReportReason::all();
//         return response()->json($reasons);
//     }

//   public function store(Request $request)
//   {
//       $validated = $request->validate([
//           'post_id' => 'required|exists:posts,id',
//           'reason_id' => 'required|exists:report_reasons,id',
//           'additional_info' => 'nullable|string',
//       ]);

//       // Fetch the post to get the user_id
//       $post = \App\Models\Post::find($validated['post_id']);

//       // Make sure $post is not null
//       if (!$post) {
//           return response()->json(['error' => 'Post not found'], 404);
//       }

//       $report = Report::create([
//           'reporter_id' => auth()->id(),
//           'reported_user_id' => $post->user_id,
//           'post_id' => $validated['post_id'],
//           'reason_id' => $validated['reason_id'],
//           'additional_info' => $validated['additional_info'] ?? null,
//       ]);

//       return response()->json(['message' => 'Report submitted successfully', 'report' => $report], 201);
//   }
//   public function destroy($id)
//   {

//           $report = Report::findOrFail($id);
//           $report->delete();

//           return response()->json(['message' => 'Report deleted successfully.'], 200);

//   }

// }


// <?php

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
        $reports = Report::with(['reporter', 'reportedUser', 'post', 'comment', 'reason'])->get();

        return response()->json($reports);
    }

    public function getReasons()
    {
        $reasons = ReportReason::all();
        return response()->json($reasons);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'post_id' => 'nullable|exists:posts,id',
            'comment_id' => 'nullable|exists:comments,id',
            'reason_id' => 'required|exists:report_reasons,id',
            'additional_info' => 'nullable|string',
        ]);

        // Ensure either post_id or comment_id is provided, but not both
        if (!$validated['post_id'] && !$validated['comment_id']) {
            return response()->json(['error' => 'Either post_id or comment_id must be provided'], 400);
        }

        // Determine the reported user's ID based on whether it's a post or comment
        if ($validated['post_id']) {
            $reportedUserId = Post::findOrFail($validated['post_id'])->user_id;
        } elseif ($validated['comment_id']) {
            $reportedUserId = Comment::findOrFail($validated['comment_id'])->user_id;
        }

        $report = Report::create([
            'reporter_id' => auth()->id(),
            'reported_user_id' => $reportedUserId,
            'post_id' => $validated['post_id'] ?? null,
            'comment_id' => $validated['comment_id'] ?? null,
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
