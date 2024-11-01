<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\SitemapController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\posts\PostController;

// Route to generate the sitemap
Route::get('/generate-sitemap', [SitemapController::class, 'generateSitemap']);

// Home route
Route::get('/', function () {
    return view('welcome');
});

// Google authentication routes
Route::get('/auth/google/redirect', [GoogleController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);


// routes/web.php


// Route::get('/posts/{slug}', [PostController::class, 'show2']);

// Route::get('/og-data/{slug}', [PostController::class, 'fetchOgData']);

// Route to serve Open Graph metadata
Route::get('/posts/{slug}', [PostController::class, 'showOgTags']);
