<?php

// use Illuminate\Database\Migrations\Migration;
// use Illuminate\Database\Schema\Blueprint;
// use Illuminate\Support\Facades\Schema;

// return new class extends Migration
// {
//     /**
//      * Run the migrations.
//      */
//     public function up(): void
//     {
//         Schema::create('tags', function (Blueprint $table) {
//             $table->id();
//             $table->string('name')->unique();
//             $table->string('slug')->unique(); // Slug column for URL-friendly names
//             $table->foreignId('sub_category_id')->constrained('sub_categories')->onDelete('cascade'); // Add this line
//             $table->timestamps();
//         });
//     }

//     /**
//      * Reverse the migrations.
//      */
//     public function down(): void
//     {
//         Schema::dropIfExists('tags');
//     }
// };