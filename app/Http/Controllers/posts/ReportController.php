<?php
namespace App\Http\Controllers\posts;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\ReportReason;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index()
    {
        // Fetch reports with related data
        $reports = Report::with(['reporter', 'reportedUser', 'post', 'reason'])->get();

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
          'post_id' => 'required|exists:posts,id',
          'reason_id' => 'required|exists:report_reasons,id',
          'additional_info' => 'nullable|string',
      ]);
  
      // Fetch the post to get the user_id
      $post = \App\Models\Post::find($validated['post_id']);
      
      // Make sure $post is not null
      if (!$post) {
          return response()->json(['error' => 'Post not found'], 404);
      }
  
      $report = Report::create([
          'reporter_id' => auth()->id(),
          'reported_user_id' => $post->user_id,
          'post_id' => $validated['post_id'],
          'reason_id' => $validated['reason_id'],
          'additional_info' => $validated['additional_info'] ?? null,
      ]);
  
      return response()->json(['message' => 'Report submitted successfully', 'report' => $report], 201);
  }
  
}
