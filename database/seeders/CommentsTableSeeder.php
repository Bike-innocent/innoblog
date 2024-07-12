<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Faker\Factory as Faker;

class CommentsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $users = User::all();
        $posts = Post::all();

        // Seed comments
        foreach ($posts as $post) {
            $commentCount = rand(1, 5); // Number of comments per post, between 1 and 5

            for ($i = 0; $i < $commentCount; $i++) {
                $user = $users->random();

                $comment = Comment::create([
                    'user_id' => $user->id,
                    'post_id' => $post->id,
                    'body' => $faker->paragraph,
                    'parent_id' => null,
                ]);

                // Seed replies to the comment
                $replyCount = rand(1, 3); // Number of replies per comment, between 1 and 3

                for ($j = 0; $j < $replyCount; $j++) {
                    $replyUser = $users->random();

                    Comment::create([
                        'user_id' => $replyUser->id,
                        'post_id' => $post->id,
                        'body' => $faker->paragraph,
                        'parent_id' => $comment->id,
                    ]);
                }
            }
        }
    }
}

/////<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('post_id')->constrained()->onDelete('cascade');
            $table->foreignId('parent_id')->nullable()->constrained('comments')->onDelete('cascade');
            $table->text('body');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
}