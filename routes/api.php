<?php

use App\Http\Controllers\admin\AllPostController;
use App\Http\Controllers\admin\AllUserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Category\ManageCategoryController;
use App\Http\Controllers\posts\MyPostController;
use App\Http\Controllers\posts\PostController;
use App\Http\Controllers\posts\SinglePostController;
use App\Http\Controllers\profile\AvatarController;
use App\Http\Controllers\profile\ProfileController;
use App\Http\Controllers\profile\UpdatePasswordController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\category\SubCategoryController;

use App\Http\Controllers\Category\TagController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Posts routes
    Route::prefix('posts')->group(function () {
        Route::get('/form-data', [MyPostController::class, 'formData']);
        Route::get('/', [MyPostController::class, 'index']);
        Route::post('/', [MyPostController::class, 'store']);
        Route::get('/{id}', [MyPostController::class, 'show']);
        Route::put('/{id}', [MyPostController::class, 'update']);
        Route::delete('/{id}', [MyPostController::class, 'destroy']);
        Route::get('/latest', [SinglePostController::class, 'latest']);
        Route::get('/popular', [SinglePostController::class, 'popular']);
    });
    

    // Profile routes
    Route::prefix('profile')->group(function () {
        Route::get('/user', [ProfileController::class, 'index']);
        Route::patch('/update', [ProfileController::class, 'update']);
        Route::delete('/delete', [ProfileController::class, 'destroy']);
        Route::post('/avatar', [AvatarController::class, 'update']);
        Route::delete('/avatar', [AvatarController::class, 'destroy']);
        Route::get('/avatar', [AvatarController::class, 'index']);
        Route::put('/password/update', [UpdatePasswordController::class, 'update']);
    });

    // Posts Index route
    Route::prefix('blog')->group(function () {
        Route::get('/posts', [PostController::class, 'index']);
        Route::get('/show/posts/{id}', [PostController::class, 'show']);
    });

    // Route::prefix('manage-category')->group(function () {
    //     Route::get('/', [ManageCategoryController::class, 'index']);
    //     Route::post('/category', [ManageCategoryController::class, 'storeCategory']);
    //     Route::put('/category/{category}', [ManageCategoryController::class, 'updateCategory']);
    //     Route::delete('/category/{category}', [ManageCategoryController::class, 'destroyCategory']);

    //     // Define similar routes for sub-categories and tags
    // });
   
  
    
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('subcategories', SubCategoryController::class);

// // API Routes for SubCategories
// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::get('/subcategories', [SubCategoryController::class, 'index']);
//     Route::post('/subcategories', [SubCategoryController::class, 'store']);
//     Route::get('/subcategories/{id}', [SubCategoryController::class, 'show']);
//     Route::put('/subcategories/{id}', [SubCategoryController::class, 'update']);
//     Route::delete('/subcategories/{id}', [SubCategoryController::class, 'destroy']);
// });


    //end middle ware
});

// Admin routes
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // All posts routes
    Route::prefix('all-posts')->group(function () {
        Route::get('/', [AllPostController::class, 'index']);
        Route::delete('/{id}', [AllPostController::class, 'delete']);
    });

    // All users routes
    Route::get('/all-users', [AllUserController::class, 'index']);
});