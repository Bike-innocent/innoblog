<?php

namespace App\Http\Controllers\profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\AvatarUpdateRequest;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

class AvatarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     $user = Auth::user();
    //     $avatarPath = $user->avatar ? url('avatars/' . $user->avatar) : null;

    //     // Assuming you have a placeholder color attribute in your user model
    //     $placeholderColor = $user->placeholder_color; // Adjust this if your attribute name is different

    //     return response()->json([
    //         'avatar' => $avatarPath,
    //         'name' => $user->name,
    //         'placeholder_color' => $placeholderColor // Add this to the response
    //     ], 200);
    // }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(AvatarUpdateRequest $request)
    // {
    //     $user = Auth::user();

    //     if ($user->avatar) {
    //         $oldAvatarPath = public_path('avatars/' . $user->avatar);
    //         if (File::exists($oldAvatarPath)) {
    //             File::delete($oldAvatarPath);
    //         }
    //     }

    //     $imageName = time() . '.' . $request->avatar->extension();
    //     $request->avatar->move(public_path('avatars'), $imageName);

    //     $user->avatar = $imageName;
    //     $user->save();

    //     return response()->json(['avatar' => url('avatars/' . $imageName)], 200);
    // }




  
    public function update(AvatarUpdateRequest $request)
    {
        $user = Auth::user();
        $image = $request->file('avatar');
        $imageName = time() . '.' . $image->getClientOriginalExtension();

        $client = new Client();

        // Delete old avatar from remote server
        if ($user->avatar) {
            try {
                $client->post('https://chibuikeinnocent.tech/avatarDelete.php', [
                    'form_params' => [
                        'filename' => $user->avatar
                    ]
                ]);
            } catch (\Exception $e) {
                // Log or ignore silently
            }
        }

        // Upload new avatar to remote server
        try {
            $response = $client->post('https://chibuikeinnocent.tech/avatarUpload.php', [
                'multipart' => [
                    [
                        'name'     => 'image',
                        'contents' => fopen($image->getPathname(), 'r'),
                        'filename' => $imageName,
                    ],
                ],
            ]);

            $body = json_decode($response->getBody(), true);

            if (!isset($body['success']) || !$body['success']) {
                return response()->json([
                    'message' => $body['message'] ?? 'Upload failed',
                ], 500);
            }

            // Save only the filename to DB
            $user->avatar = $imageName;
            $user->save();

            return response()->json([
                'avatar' => 'https://chibuikeinnocent.tech/avatars/' . $imageName
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error uploading avatar: ' . $e->getMessage()
            ], 500);
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    // public function destroy()
    // {
    //     $user = Auth::user();
    //     if ($user->avatar) {
    //         $avatarPath = public_path('avatars/' . $user->avatar);
    //         if (File::exists($avatarPath)) {
    //             File::delete($avatarPath);
    //         }
    //         $user->avatar = null;
    //         $user->save();
    //     }

    //     return response()->json(['message' => 'Avatar deleted'], 200);
    // }



    
public function destroy()
{
    $user = Auth::user();

    if ($user->avatar) {
        try {
            $client = new Client();
            $response = $client->post('https://chibuikeinnocent.tech/avatarDelete.php', [
                'form_params' => [
                    'filename' => $user->avatar
                ]
            ]);

            $body = json_decode($response->getBody(), true);

            if (!isset($body['success']) || !$body['success']) {
                return response()->json([
                    'message' => $body['message'] ?? 'Failed to delete avatar from server.'
                ], 500);
            }

            // Remove from DB
            $user->avatar = null;
            $user->save();

            return response()->json(['message' => 'Avatar deleted'], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting avatar: ' . $e->getMessage()
            ], 500);
        }
    }

    return response()->json(['message' => 'No avatar to delete'], 200);
}
}