<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition()
    {
        $faker = \Faker\Factory::create('en_US'); // Set the locale to English

        $images = [
            '1718486207.jpg', 
            '1718483390.jpg',
            '1718491950.jpg',
            '1718494763.jpg',
            '1718636339.jpg',
            '1718636705.jpg',
            '1718636825.png',
            '1718636969.jpg',
            '1718637073.jpg',
        ];
        $randomImage = $images[array_rand($images)];

        $categories = [
            'Sports', 
            'Education',
            'Business',
            'Culture',
            'Technology',
            'Lifestyle'
        ];
        $randomCategory = $categories[array_rand($categories)];

        // Check if there are any users
        $user = User::inRandomOrder()->first();

        return [
            'title' => $faker->sentence,
            'description' => $faker->paragraph,
            'image' => $randomImage,
            'category' => $randomCategory,
            'status' => 1,
            'user_id' => $user ? $user->id : null, // Assign user_id if user exists
        ];
    }
}