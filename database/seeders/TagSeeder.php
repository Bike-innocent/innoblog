<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            'Free Kicks',
            'AI',
            'Nutrition',
            'Travel Tips',
            'Recipes',
        ];

        foreach ($tags as $tag) {
            Tag::create([
                'name' => $tag,
                'slug' => \Str::slug($tag),
            ]);
        }
    }
}