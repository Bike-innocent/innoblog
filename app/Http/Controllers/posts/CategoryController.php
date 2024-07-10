<?php


namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function business()
    {
        // Retrieve posts from Business category, paginated
        $posts = Post::where('category', 'Business')
                    ->where('status', 1) // Assuming status 1 means published
                    ->orderBy('created_at', 'desc')
                    ->paginate(5); // Number of posts per page
        $popularPosts = Post::where('category', 'business')->where('status', 1)->inRandomOrder()->limit(10)->get();
        $trendingPosts = Post::where('category', 'business')->where('status', 1)->inRandomOrder()->limit(10)->get();
        $latestPosts = Post::where('category', 'business')->where('status', 1)->latest()->limit(10)->get();

        return view('categories.business', compact('posts', 'popularPosts', 'trendingPosts', 'latestPosts'));

    }
    public function culture()
    {
        // Retrieve posts from culture category, paginated
        $posts = Post::where('category', 'culture')
                    ->where('status', 1) // Assuming status 1 means published
                    ->orderBy('created_at', 'desc')
                    ->paginate(5); // Number of posts per page

        $popularPosts = Post::where('category', 'culture')->where('status', 1)->inRandomOrder()->limit(10)->get();
        $trendingPosts = Post::where('category', 'culture')->where('status', 1)->inRandomOrder()->limit(10)->get();
        $latestPosts = Post::where('category', 'culture')->where('status', 1)->latest()->limit(10)->get();
      

        return view('categories.culture', compact('posts', 'popularPosts', 'trendingPosts', 'latestPosts'));

    }

    public function education()
    {
        // Retrieve posts from education category, paginated
        $posts = Post::where('category', 'education')
                    ->where('status', 1) // Assuming status 1 means published
                    ->orderBy('created_at', 'desc')
                    ->paginate(5); // Number of posts per page

        $popularPosts = Post::where('category', 'education')->where('status', 1)->inRandomOrder()->limit(10)->get();
        $trendingPosts = Post::where('category', 'education')->where('status', 1)->inRandomOrder()->limit(10)->get();
        $latestPosts = Post::where('category', 'education')->where('status', 1)->latest()->limit(10)->get();
      

        return view('categories.education', compact('posts', 'popularPosts', 'trendingPosts', 'latestPosts'));

    }
    public function lifestyle()
    {
        // Retrieve posts from lifestyle category, paginated
        $posts = Post::where('category', 'lifestyle')
                    ->where('status', 1) // Assuming status 1 means published
                    ->orderBy('created_at', 'desc')
                    ->paginate(5); // Number of posts per page

        $popularPosts = Post::where('category', 'lifestyle')->where('status', 1)->inRandomOrder()->limit(10)->get();
        $trendingPosts = Post::where('category', 'lifestyle')->where('status', 1)->inRandomOrder()->limit(10)->get();
        $latestPosts = Post::where('category', 'lifestyle')->where('status', 1)->latest()->limit(10)->get();
      

        return view('categories.lifestyle', compact('posts', 'popularPosts', 'trendingPosts', 'latestPosts'));

    }

    public function sports()
    {
        // Retrieve posts from sports category, paginated
        $posts = Post::where('category', 'sports')
                    ->where('status', 1) // Assuming status 1 means published
                    ->orderBy('created_at', 'desc')
                    ->paginate(5); // Number of posts per page

        $popularPosts = Post::where('category', 'sports')->where('status', 1)->inRandomOrder()->limit(10)->get();
        $trendingPosts = Post::where('category', 'sports')->where('status', 1)->inRandomOrder()->limit(10)->get();
        $latestPosts = Post::where('category', 'sports')->where('status', 1)->latest()->limit(10)->get();
      

        return view('categories.sports', compact('posts', 'popularPosts', 'trendingPosts', 'latestPosts'));

    }

    public function technology()
    {
        // Retrieve posts from technology category, paginated
        $posts = Post::where('category', 'technology')
                    ->where('status', 1) // Assuming status 1 means published
                    ->orderBy('created_at', 'desc')
                    ->paginate(5); // Number of posts per page

        $popularPosts = Post::where('category', 'technology')->where('status', 1)->inRandomOrder()->limit(10)->get();
        $trendingPosts = Post::where('category', 'technology')->where('status', 1)->inRandomOrder()->limit(10)->get();
        $latestPosts = Post::where('category', 'technology')->where('status', 1)->latest()->limit(10)->get();
      

        return view('categories.technology', compact('posts', 'popularPosts', 'trendingPosts', 'latestPosts'));

    }

    //trending,popular and latest on single post
    
   


}
