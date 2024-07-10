<?php
namespace App\Http\Controllers\posts;
use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MyPostController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $posts = Post::where('user_id', $user->id)->get();

        // Include full path for image URL
        foreach ($posts as $post) {
            $post->image = url('post-images/'.$post->image);
        }

        return response()->json(['posts' => $posts]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imageName = time().'.'.$request->image->extension();
        $request->image->move(public_path('post-images'), $imageName);

        $post = new Post();
        $post->title = $request->title;
        $post->description = $request->description;
        $post->image = $imageName;
        $post->user_id = auth()->id();
        $post->save();

        return response()->json(['success' => 'Post created successfully.']);
    }
}