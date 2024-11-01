<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call([
            UsersTableSeeder::class,
            RolesAndPermissionsSeeder::class,
            AdminSeeder::class,
            CategorySeeder::class,
            SubCategorySeeder::class,
        
            PostSeeder::class,
            ReportReasonSeeder::class,
            AboutUsSeeder::class,
            
            // CommentsTableSeeder::class,
        ]);
    }
}
