<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AboutUs;

class AboutUsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Check if there is no existing record
        if (AboutUs::count() == 0) {
            AboutUs::create([
                'title' => 'About Us Title',
                'subtitle' => 'About Us Subtitle',
                'content' => 'This is the company history content.',
                'mission_vision' => 'This is the mission and vision content.',
                'image_path' => null, // Assuming no default image
                'team1_name' => 'Team Member 1',
                'team1_position' => 'Position 1',
                'team1_description' => 'Description for team member 1.',
                'team1_image' => null, // Assuming no default image
                'team2_name' => 'Team Member 2',
                'team2_position' => 'Position 2',
                'team2_description' => 'Description for team member 2.',
                'team2_image' => null, // Assuming no default image
                'team3_name' => 'Team Member 3',
                'team3_position' => 'Position 3',
                'team3_description' => 'Description for team member 3.',
                'team3_image' => null, // Assuming no default image
                'team4_name' => 'Team Member 4',
                'team4_position' => 'Position 4',
                'team4_description' => 'Description for team member 4.',
                'team4_image' => null, // Assuming no default image
                'team5_name' => 'Team Member 5',
                'team5_position' => 'Position 5',
                'team5_description' => 'Description for team member 5.',
                'team5_image' => null, // Assuming no default image
                'team6_name' => 'Team Member 6',
                'team6_position' => 'Position 6',
                'team6_description' => 'Description for team member 6.',
                'team6_image' => null, // Assuming no default image
            ]);
        }
    }
}
