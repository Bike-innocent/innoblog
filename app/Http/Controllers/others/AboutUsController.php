<?php
// app/Http/Controllers/AboutUsController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AboutUs;

class AboutUsController extends Controller
{
    public function edit()
    {
        $aboutUs = AboutUs::first();
        if (!$aboutUs) {
            $aboutUs = new AboutUs();
            $aboutUs->title = ''; // Default title
            $aboutUs->subtitle = ''; // Default subtitle
            $aboutUs->content = ''; // Default content
            $aboutUs->mission_vision = ''; // Default mission & vision
            // Initialize team fields with empty values
            for ($i = 1; $i <= 6; $i++) {
                $aboutUs->{'team'.$i.'_name'} = '';
                $aboutUs->{'team'.$i.'_position'} = '';
                $aboutUs->{'team'.$i.'_description'} = '';
                $aboutUs->{'team'.$i.'_image'} = '';
            }
            $aboutUs->save();
        }
        return view('setting.pages.about', compact('aboutUs'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'content' => 'required|string',
            'mission_vision' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'team1_name' => 'nullable|string|max:255',
            'team1_position' => 'nullable|string|max:255',
            'team1_image' => 'nullable|image|max:2048',
            'team1_description' => 'nullable|string',

            'team2_name' => 'nullable|string|max:255',
            'team2_position' => 'nullable|string|max:255',
            'team2_image' => 'nullable|image|max:2048',
            'team2_description' => 'nullable|string',

            'team3_name' => 'nullable|string|max:255',
            'team3_position' => 'nullable|string|max:255',
            'team3_image' => 'nullable|image|max:2048',
            'team3_description' => 'nullable|string',

            'team4_name' => 'nullable|string|max:255',
            'team4_position' => 'nullable|string|max:255',
            'team4_image' => 'nullable|image|max:2048',
            'team4_description' => 'nullable|string',

            'team5_name' => 'nullable|string|max:255',
            'team5_position' => 'nullable|string|max:255',
            'team5_image' => 'nullable|image|max:2048',
            'team5_description' => 'nullable|string',

            'team6_name' => 'nullable|string|max:255',
            'team6_position' => 'nullable|string|max:255',
            'team6_image' => 'nullable|image|max:2048',
            'team6_description' => 'nullable|string',
        ]);

        $aboutUs = AboutUs::first();
        if (!$aboutUs) {
            $aboutUs = new AboutUs();
        }

        $aboutUs->title = $request->title;
        $aboutUs->subtitle = $request->subtitle;
        $aboutUs->content = $request->content;
        $aboutUs->mission_vision = $request->mission_vision;

        // Handle About Us image
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $aboutUs->image_path = 'images/' . $imageName;
        }

        // Handle team fields and images
        for ($i = 1; $i <= 6; $i++) {
            $teamName = 'team' . $i . '_name';
            $teamPosition = 'team' . $i . '_position';
            $teamImage = 'team' . $i . '_image';
            $teamDescription = 'team' . $i . '_description';

            $aboutUs->$teamName = $request->$teamName;
            $aboutUs->$teamPosition = $request->$teamPosition;
            $aboutUs->$teamDescription = $request->$teamDescription;

            if ($request->hasFile($teamImage)) {
                $teamImageName = time() . "_team{$i}." . $request->$teamImage->extension();
                $request->$teamImage->move(public_path('images'), $teamImageName);
                $aboutUs->$teamImage = 'images/' . $teamImageName;
            }
        }

        $aboutUs->save();

        return redirect()->back()->with('success', 'About Us page updated successfully');
    }

    public function show()
    {
        $aboutUs = AboutUs::first();
        return view('pages.about', compact('aboutUs'));
    }
}
