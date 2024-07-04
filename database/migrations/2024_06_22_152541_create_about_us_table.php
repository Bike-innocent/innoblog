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
        Schema::create('about_us', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle');
            $table->text('content'); // company history
            $table->text('mission_vision'); // mission/vision
            $table->string('image_path')->nullable();
            
            $table->string('team1_name')->nullable();
            $table->string('team1_position')->nullable();
            $table->string('team1_image')->nullable();
            $table->string('team1_description')->nullable();

            $table->string('team2_name')->nullable();
            $table->string('team2_position')->nullable();
            $table->string('team2_image')->nullable();
            $table->string('team2_description')->nullable();

            $table->string('team3_name')->nullable();
            $table->string('team3_position')->nullable();
            $table->string('team3_image')->nullable();
            $table->string('team3_description')->nullable();

            $table->string('team4_name')->nullable();
            $table->string('team4_position')->nullable();
            $table->string('team4_image')->nullable();
            $table->string('team4_description')->nullable();

            $table->string('team5_name')->nullable();
            $table->string('team5_position')->nullable();
            $table->string('team5_image')->nullable();
            $table->string('team5_description')->nullable();

            $table->string('team6_name')->nullable();
            $table->string('team6_position')->nullable();
            $table->string('team6_image')->nullable();
            $table->string('team6_description')->nullable();

            
            // repeat for team2 to team6
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_us');
    }
};
