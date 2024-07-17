<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Sports',
            'Technology',
            'Health',
            'Travel',
            'News',
            'Business',
            'Innovation',
            'Earth',
            'Education',
            'Science',
            'Relationship',
            'Entertainment',
            'Culture',
            'Politics',
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category,
                'slug' => \Str::slug($category),
            ]);
        }
    }
}