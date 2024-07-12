<?php

namespace Database\Seeders;

use App\Models\SubCategory;
use App\Models\Category;
use Illuminate\Database\Seeder;

class SubCategorySeeder extends Seeder
{
    public function run(): void
    {
        $subCategories = [
            'Sports' => ['Football', 'Basketball', 'Tennis'],
            'Technology' => ['Software', 'Hardware', 'AI'],
            'Health' => ['Nutrition', 'Fitness', 'Mental Health'],
            'Travel' => ['Destinations', 'Tips', 'Guides'],
            'Food' => ['Recipes', 'Restaurants', 'Nutrition'],
        ];

        foreach ($subCategories as $category => $subs) {
            $categoryModel = Category::where('name', $category)->first();
            foreach ($subs as $subCategory) {
                $uniqueSlug = \Str::slug($subCategory . '-' . $category);
                SubCategory::create([
                    'name' => $subCategory,
                    'slug' => $uniqueSlug,
                    'category_id' => $categoryModel->id,
                ]);
            }
        }
    }
}