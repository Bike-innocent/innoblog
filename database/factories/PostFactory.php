<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use App\Models\SubCategory;

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

        $user = User::inRandomOrder()->first();
        $category = Category::inRandomOrder()->first();
        $subCategory = SubCategory::where('category_id', $category->id)->inRandomOrder()->first();


        return [
            'title' => $faker->sentence,
            'content' => $faker->paragraph,
            'image' => $randomImage,
            'status' => 1,
            'user_id' => $user ? $user->id : null,
            'category_id' => $category ? $category->id : null,
            'sub_category_id' => $subCategory ? $subCategory->id : null,
        ];
    }


}
