<?php

use App\Http\Controllers\AllPostController;
use App\Http\Controllers\AllUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\MyPostController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

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

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'getUser']);
});

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/posts', [MyPostController::class, 'index']);
    Route::post('/posts', [MyPostController::class, 'store']);

    //profile
    Route::patch('/profile/update', [ProfileController::class, 'update']);

    Route::delete('/profile/delete', [ProfileController::class, 'destroy']);

    Route::put('/password/update', [PasswordController::class, 'update']);

   
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('all-posts', [AllPostController::class, 'index']);
    Route::delete('all-posts/{id}', [AllPostController::class, 'delete']);
    // routes/api.php or routes/web.php

    Route::get('/all-users', [AllUserController::class, 'index']);

});