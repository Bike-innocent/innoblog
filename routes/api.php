<?php
use App\Http\Controllers\admin\AllPostController;
use App\Http\Controllers\admin\AllUserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\category\CategoryController;
use App\Http\Controllers\category\ManageCategoryController;
use App\Http\Controllers\category\SubCategoryController;
use App\Http\Controllers\posts\MyPostController;
use App\Http\Controllers\posts\PostController;
use App\Http\Controllers\posts\HomePageController;
use App\Http\Controllers\posts\SinglePostController;
use App\Http\Controllers\profile\AvatarController;
use App\Http\Controllers\profile\ProfileController;
use App\Http\Controllers\profile\UpdatePasswordController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\posts\ReportController;

use App\Http\Controllers\posts\ReportReasonController;
use App\Http\Controllers\comment\CommentController;
use App\Models\Post;

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

Route::prefix('blog')->group(function () {
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/show/posts/{slug}', [SinglePostController::class, 'show']);
    Route::get('/related/{slug}', [SinglePostController::class, 'related']);
  
});







// Route::get('/categories', [CategoryController::class, 'index']);
// Route::get('/categories/{categorySlug}/subcategories', [CategoryController::class, 'getSubcategories']);
// Route::get('/categories/{categorySlug}/mixed-posts', [CategoryController::class, 'getMixedPosts']);


// Display a listing of the categories
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{categorySlug}/subcategories', [CategoryController::class, 'getSubcategories']);
Route::get('/categories/{categorySlug}/mixed-posts', [CategoryController::class, 'getMixedPosts']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{identifier}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);







// Get all subcategories
Route::get('/subcategories', [SubCategoryController::class, 'index']);
Route::post('/subcategories', [SubCategoryController::class, 'store']);
Route::get('/subcategories/{id}', [SubCategoryController::class, 'show']);
Route::put('/subcategories/{id}', [SubCategoryController::class, 'update']);
Route::delete('/subcategories/{id}', [SubCategoryController::class, 'destroy']);
Route::get('/subcategories/{subcategorySlug}/posts', [SubCategoryController::class, 'getPostsBySubcategory']);

// Route::get('/subcategories/{subcategorySlug}/posts', [SubCategoryController::class, 'getPostsBySubcategory']);



Route::get('/reports', [ReportController::class, 'index']);

Route::post('/report-post', [ReportController::class, 'reportPost']);
Route::post('/report-comment', [ReportController::class, 'reportComment']);
Route::delete('/reports/{id}', [ReportController::class, 'destroy']);


Route::get('/report-reasons', [ReportReasonController::class, 'index']);

Route::put('/report-reasons/{id}', [ReportReasonController::class, 'update']);
Route::delete('/report-reasons/{id}', [ReportReasonController::class, 'destroy']);


Route::get('/posts/{post}/comments', [CommentController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);


    Route::post('/report-reasons', [ReportReasonController::class, 'store']);



    // Posts routes
    Route::prefix('posts')->group(function () {
        Route::get('/saved-posts', [PostController::class, 'getSavedPosts']);
        Route::get('/{slug}/is-saved', [PostController::class, 'isPostSaved']);
        Route::delete('/{slug}/remove-save', [PostController::class, 'removeSave']);
        Route::get('/form-data', [MyPostController::class, 'formData']);
        Route::patch('/{slug}/publish', [MyPostController::class, 'publish']);
        Route::patch('/{slug}/unpublish', [MyPostController::class, 'unPublish']);
        Route::get('/', [MyPostController::class, 'index']);
        Route::post('/', [MyPostController::class, 'store']);
        Route::post('/store-publish', [MyPostController::class, 'storeAndPublish']);
        Route::get('/{slug}', [MyPostController::class, 'show']);
        Route::put('/{slug}', [MyPostController::class, 'update']);
        Route::delete('/{slug}', [MyPostController::class, 'destroy']);
        Route::post('/{slug}/like', [PostController::class, 'like']);
        Route::post('/{slug}/save', [PostController::class, 'toggleSave']);
    });




    Route::post('/comments', [CommentController::class, 'store']);

    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);




    // Profile routes
    Route::prefix('profile')->group(function () {
        Route::get('/user', [ProfileController::class, 'index']);
        Route::patch('/update', [ProfileController::class, 'update']);
        Route::delete('/delete', [ProfileController::class, 'destroy']);
        Route::post('/avatar', [AvatarController::class, 'update']);
        Route::delete('/avatar', [AvatarController::class, 'destroy']);
        Route::get('/avatar', [AvatarController::class, 'index']);
        Route::put('/password/update', [UpdatePasswordController::class, 'update']);
        Route::get('/{username}', [ProfileController::class, 'show']);

    });


    Route::get('/posts-from/{username}', [ProfileController::class, 'getPostsByUsername']);


    Route::get('/search', [HomePageController::class, 'search']);






    // Posts Index route


    // // Manage Category routes
    // Route::prefix('manage-category')->group(function () {
    //     Route::get('/', [ManageCategoryController::class, 'index']);
    //     Route::post('/category', [ManageCategoryController::class, 'storeCategory']);
    //     Route::put('/category/{category}', [ManageCategoryController::class, 'updateCategory']);
    //     Route::delete('/category/{category}', [ManageCategoryController::class, 'destroyCategory']);
    //     // Define similar routes for sub-categories and tags
    // });














});





















Route::get('/posts/slugs/site-map', function () {
    return Post::pluck('slug'); // Fetch only the slugs
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