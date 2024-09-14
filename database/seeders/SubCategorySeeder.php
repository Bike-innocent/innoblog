<?php

// namespace Database\Seeders;

// use App\Models\SubCategory;
// use App\Models\Category;
// use Illuminate\Database\Seeder;

// class SubCategorySeeder extends Seeder
// {
//     public function run(): void
//     {
//         $subCategories = [
//             'Sports' => ['Football', 'Basketball', 'Tennis', 'Cricket', 'Swimming'],
//             'Technology' => ['Software', 'Hardware', 'AI', 'Gadgets', 'Cybersecurity'],
//             'Health' => ['Nutrition', 'Fitness', 'Mental Health', 'Diseases', 'Wellness'],
//             'Travel' => ['Destinations', 'Tips', 'Guides', 'Budget Travel', 'Adventure'],
//             'News' => ['Local', 'International', 'Breaking News', 'Analysis', 'Reports'],
//             'Business' => ['Markets', 'Economy', 'Startups', 'Investing', 'Corporate'],
//             'Innovation' => ['Tech Trends', 'Startups', 'Research', 'Design', 'Future'],
//             'Earth' => ['Environment', 'Wildlife', 'Climate Change', 'Conservation', 'Sustainability'],
//             'Education' => ['Schools', 'Colleges', 'Online Learning', 'Scholarships', 'Research'],
//             'Science' => ['Physics', 'Biology', 'Chemistry', 'Space', 'Discoveries'],
//             'Relationship' => ['Family', 'Friendship', 'Dating', 'Marriage', 'Advice'],
//             'Entertainment' => ['Movies', 'Music', 'Celebrities', 'TV Shows', 'Events'],
//             'Culture' => ['Art', 'History', 'Literature', 'Traditions', 'Languages'],
//             'Politics' => ['Elections', 'Policies', 'Government', 'International Relations', 'Political Analysis'],
//         ];

//         foreach ($subCategories as $category => $subs) {
//             $categoryModel = Category::where('name', $category)->first();
//             foreach ($subs as $subCategory) {
//                 $uniqueSlug = \Str::slug($subCategory . '-' . $category);
//                 SubCategory::create([
//                     'name' => $subCategory,
//                     'slug' => $uniqueSlug,
//                     'category_id' => $categoryModel->id,
//                 ]);
//             }
//         }
//     }
// }


namespace Database\Seeders;

use App\Models\SubCategory;
use App\Models\Category;
use Illuminate\Database\Seeder;

class SubCategorySeeder extends Seeder
{
    public function run(): void
    {
        $subCategories = [
            'Sports' => ['Football', 'Basketball', 'Tennis', 'Cricket', 'Swimming'],
            'Technology' => ['Software', 'AI', 'Cybersecurity', 'Startups'],
            'Health' => ['Nutrition', 'Mental Health', 'Fitness'],
            'News' => ['Local News', 'International', 'Breaking News'],
            'Lifestyle' => ['Travel', 'Culture', 'Relationships'],
            'Entertainment' => ['Movies', 'Music', 'TV Shows'],

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
