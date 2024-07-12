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
            'Food',
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category,
                'slug' => \Str::slug($category),
            ]);
        }
    }
}