<?php

// namespace Database\Seeders;

// use App\Models\Tag;
// use App\Models\SubCategory;
// use Illuminate\Database\Seeder;

// class TagSeeder extends Seeder
// {
//     public function run(): void
//     {
//         // Associate tag names with subcategory IDs
//         $tags = [
//             'Free Kicks' => 1, // Replace 1 with the actual ID of the relevant subcategory
//             'AI' => 2,
//             'Nutrition' => 3,
//             'Travel Tips' => 4,
//             'Recipes' => 5,
//         ];

//         foreach ($tags as $tagName => $subCategoryId) {
//             Tag::create([
//                 'name' => $tagName,
//                 'slug' => \Str::slug($tagName),
//                 'sub_category_id' => $subCategoryId,
//             ]);
//         }
//     }
// }