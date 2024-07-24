<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;


class HomePageController extends Controller
{
    public function MixedPostOnHome()
    {
        // Fetch the latest 12 posts, skipping the first 5
        $posts = Post::with( 'category')->orderBy('created_at', 'desc')->skip(5)->take(12)->get();

        // Modify each post to include full image URLs
        $posts->transform(function ($post) {
            $post->image = url('post-images/' . $post->image);
            if ($post->user && $post->user->avatar) {
                $post->user->avatar = url('avatars/' . $post->user->avatar);
            }
            return $post;
        });

        // Return the posts as JSON
        return response()->json($posts);
    }

    // HomeController.php
    public function getRandomCategories()
    {
        $categories = Category::all()->pluck('slug')->toArray();
        shuffle($categories);
        return array_slice($categories, 0, 3);
    }

    public function sectionPosts($categorySlug)
    {
        $posts = Post::with(['user', 'category'])
            ->whereHas('category', function ($query) use ($categorySlug) {
                $query->where('slug', $categorySlug);
            })
            ->latest()
            ->take(10)
            ->get();

        $posts->transform(function ($post) {
            $post->image = url('post-images/' . $post->image);
            if ($post->user && $post->user->avatar) {
                $post->user->avatar = url('avatars/' . $post->user->avatar);
            }
            return $post;
        });

        return $posts;
    }

    public function sections()
    {
        $categories = $this->getRandomCategories();

        $sections = [];
        foreach ($categories as $categorySlug) {
            $posts = $this->sectionPosts($categorySlug);
            $sections[$categorySlug] = $posts;
        }

        return response()->json($sections);
    }



}
