<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // User who made the comment
            $table->foreignId('post_id')->constrained()->onDelete('cascade'); // Post being commented on
            $table->foreignId('parent_id')->nullable()->constrained('comments')->onDelete('cascade'); // Parent comment (for replies)
            $table->text('content'); // Comment text
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};









