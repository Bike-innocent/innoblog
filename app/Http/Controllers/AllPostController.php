<?php
// app/Http/Controllers/PostController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class AllPostController extends Controller
{

    // app/Http/Controllers/PostController.php

    public function index()
    {
        $posts = Post::orderBy('created_at', 'desc')->paginate(50);
        $filterType = 'all';
        $filterValue = '';
    
        return view('dashboard.all-post', compact('posts', 'filterType', 'filterValue'));
    }
    
    public function filterPost(Request $request)
    {
        $query = Post::query();
    
        $filterType = 'all';
        $filterValue = '';
    
        if ($request->has('status')) {
            if ($request->status == 'active') {
                $query->where('status', 1);
                $filterType = 'active';
            } elseif ($request->status == 'unpublished') {
                $query->where('status', 0);
                $filterType = 'unpublished';
            }
        }
    
        if ($request->has('category')) {
            $query->where('category', $request->category);
            $filterType = 'category';
            $filterValue = $request->category;
        }
    
        $posts = $query->paginate(50); // Use paginate instead of get
    
        return view('dashboard.all-post', compact('posts', 'filterType', 'filterValue'));
    }
    

    // Display the form to create a new post
    // public function create()
    // {
    //     return view('dashboard.create-post');
    // }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'title' => 'required|max:255',
    //         'description' => 'required',
    //         'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048', function ($attribute, $value, $fail) {
    //             $image = getimagesize($value);
    //             $width = $image[0];
    //             $height = $image[1];
    
    //             if ($height / $width > 1.2) {
    //                 $fail('The image height is too long.');
    //             }
    //         }],
    //         'category' => 'required|string',
    //     ]);
    
    //     $imageName = time() . '.' . $request->image->extension();
    //     $request->image->move(public_path('images'), $imageName);
    
    //     $post = new Post();
    //     $post->title = $request->title;
    //     $post->description = $request->description;
    //     $post->image = $imageName;
    //     $post->category = $request->category;
    //     $post->user_id = auth()->id(); // Associate the post with the authenticated user
    
    //     $post->save();
    
    //     return redirect()->route('dashboard.all-post')->with('success', 'Post created successfully.');
    // }
    

    // Show a single post
    public function show(Post $post)
    {
        return view('dashboard.admin.show-post', compact('post'));
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

        return redirect()->route('dashboard.all-post')->with('success', 'Post updated successfully.');
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

  
    public function viewComment()
    {
       
        return view('dashboard.view-comment');
    }

}