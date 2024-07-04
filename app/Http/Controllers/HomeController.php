<?php

namespace App\Http\Controllers;
use App\Models\Post;


class HomeController extends Controller
{
    public function index()
    { 
        
         // Fetch only published posts
         $homeSlider = Post::where('status', 1)->latest()->take(4)->get();
         $mixedCategory = Post::where('status', 1)->latest()->skip(4)->take(12)->get();

         $categoryCulture = Post::where('status', 1)
                                                ->where('category', 'Culture')
                                                ->latest()
                                                ->take(10)
                                                ->get();

        $categoryBusiness = Post::where('status', 1)
                                                ->where('category', 'Business')
                                                ->latest()
                                                ->take(10)
                                                ->get();

        $categoryTechnology = Post::where('status', 1)
                                                ->where('category', 'Technology')
                                                ->latest()
                                                ->take(10)
                                                ->get();

        $categoryLifestyle = Post::where('status', 1)
                                                ->where('category', 'Lifestyle')
                                                ->latest()
                                                ->take(16)
                                                ->get();

    
                                                
 
         return view('index', compact('homeSlider', 'mixedCategory','categoryCulture','categoryBusiness','categoryTechnology','categoryLifestyle'));
    }

    public function welcome()
    { 
        
         // Fetch only published posts
         $slider = Post::where('status', 1)->latest()->take(4)->get();
         $mixedCategory = Post::where('status', 1)->latest()->skip(4)->take(12)->get();

         $categoryCulture = Post::where('status', 1)
                                                ->where('category', 'Culture')
                                                ->latest()
                                                ->take(10)
                                                ->get();

        $categoryBusiness = Post::where('status', 1)
                                                ->where('category', 'Business')
                                                ->latest()
                                                ->take(10)
                                                ->get();

        $categoryTechnology = Post::where('status', 1)
                                                ->where('category', 'Technology')
                                                ->latest()
                                                ->take(10)
                                                ->get();

        $categoryLifestyle = Post::where('status', 1)
                                                ->where('category', 'Lifestyle')
                                                ->latest()
                                                ->take(16)
                                                ->get();

    
                                                
 
         return view('welcome', compact('slider', 'mixedCategory','categoryCulture','categoryBusiness','categoryTechnology','categoryLifestyle'));
    }

    public function show($id)
    {
        $post = Post::with(['comments' => function ($query) {
            $query->whereNull('parent_id')->with('replies')->latest();
        }])->findOrFail($id);
    
        $popularPosts = Post::inRandomOrder()->where('status', 1)->limit(10)->get();
        $trendingPosts = Post::inRandomOrder()->where('status', 1)->limit(10)->get();
        $latestPosts = Post::latest()->where('status', 1)->limit(10)->get();
    
        return view('pages.single-post', compact('post', 'popularPosts', 'trendingPosts', 'latestPosts'));
    }
    

}