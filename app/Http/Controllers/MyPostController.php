<?php
// app/Http/Controllers/PostController.php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Post;

class MyPostController extends Controller
{

    // app/Http/Controllers/PostController.php

    public function index(Request $request)
    {
        $user = Auth::user();
        $posts = Post::where('user_id', $user->id)->paginate(10);
        return view('dashboard.my-post', ['posts' => $posts, 'filterType' => 'all', 'filterValue' => '']);
    }

    public function filterMyPosts($filter, Request $request)
    {
        $query = Post::where('user_id', auth()->id());
    
        switch ($filter) {
            case 'active':
                $query->where('status', 1);
                break;
            case 'unpublished':
                $query->where('status', 0);
                break;
            case 'category':
                $category = $request->input('value');
                $query->where('category', $category);
                break;
            default:
                // No additional filtering for 'all'
                break;
        }
    
        $posts = $query->paginate(10);
    
        return view('dashboard.my-post', [
            'posts' => $posts,
            'filterType' => $filter,
            'filterValue' => $category ?? null,
        ]);
    }
    
    // Display the form to create a new post
    public function create()
    {
        return view('dashboard.create-post');
    }
//store
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048', function ($attribute, $value, $fail) {
                $image = getimagesize($value);
                $width = $image[0];
                $height = $image[1];
    
                if ($height / $width > 1.2) {
                    $fail('The image height is too long.');
                }
            }],
            'category' => 'required|string',
        ]);
    
        $imageName = time() . '.' . $request->image->extension();
        $request->image->move(public_path('images'), $imageName);
    
        $post = new Post();
        $post->title = $request->title;
        $post->description = $request->description;
        $post->image = $imageName;
        $post->category = $request->category;
        $post->user_id = auth()->id(); // Associate the post with the authenticated user
    
        $post->save();
    
        return redirect()->route('dashboard.my-post')->with('success', 'Post created successfully.');
    }
    

    // Show a single post
    public function show(Post $post)
    {
        return view('dashboard.show-post', compact('post'));
    }

    // Display the form to edit a post
    public function edit(Post $post)
    {
        return view('dashboard.edit-post', compact('post'));
    }

     public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'image' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048', function ($attribute, $value, $fail) {
                if ($value) {
                    $image = getimagesize($value);
                    $width = $image[0];
                    $height = $image[1];

                    if ($height / $width > 1.2) {
                        $fail('The image height is too long.');
                    }
                }
            }],
            'category' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $post->image = $imageName;
        }

        $post->title = $request->title;
        $post->description = $request->description;
        $post->category = $request->category;
        $post->save();

        if (auth()->user()->hasRole('admin')) {
            return redirect()->route('dashboard.all-post')->with('success', 'Post updated successfully.');
        } else {
            return redirect()->route('dashboard.my-post')->with('success', 'Post updated successfully.');
        }
    }


    // Delete the post
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->back()->with('success', 'Post deleted successfully.');
    }
    public function publish($id)
    {
        $post = Post::find($id);
        if ($post) {
            $post->status = 1;
            $post->save();
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false]);
        }
        return redirect()->back()->with('success', 'Post published successfully.');
    }

    public function search(Request $request)
    {
        $query = $request->input('search');
        $posts = Post::where('title', 'LIKE', "%{$query}%")
                      ->orWhere('description', 'LIKE', "%{$query}%")
                      ->paginate(10);
                      
                      
        $popularPosts = Post::inRandomOrder()->where('status', 1)->limit(10)->get();
        $trendingPosts = Post::inRandomOrder()->where('status', 1)->limit(10)->get();
        $latestPosts = Post::latest()->where('status', 1)->limit(10)->get();
      
      
        return view('pages.search-result',  compact('posts','popularPosts', 'trendingPosts', 'latestPosts'));
    }
   

}