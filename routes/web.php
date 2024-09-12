<?php

use Illuminate\Support\Facades\Route;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Post; // Assuming you have a Post model


use App\Http\Controllers\Auth\GoogleController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
// in web.php


Route::get('/auth/google/redirect', [GoogleController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);



Route::get('/generate-sitemap', function () {
    // Create a new sitemap instance
    $sitemap = Sitemap::create();

    // Add React Frontend URLs
    $sitemap->add(Url::create('https://innoblog.com.ng/'))
            // ->add(Url::create('https://innoblog.com.ng/about'))
            // ->add(Url::create('https://innoblog.com.ng/contact'));

    // Fetch all your blog posts and add them to the sitemap
    $posts = Post::all(); // Fetch posts from the database
    foreach ($posts as $post) {
        $sitemap->add(Url::create("https://innoblog.com.ng/posts/{$post->slug}")
                         ->setLastModificationDate($post->updated_at)
                         ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                         ->setPriority(0.8));
    }

    // Write the sitemap to the public directory
    $sitemap->writeToFile(public_path('sitemap.xml'));

    return 'Sitemap generated successfully';
});

