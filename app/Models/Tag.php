<?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

// class Tag extends Model
// {
//     use HasFactory;

//     protected $guarded = [];

//     public function posts()
//     {
//         return $this->belongsToMany(Post::class);
//     }
    
//     public function subCategory()
//     {
//         return $this->belongsTo(SubCategory::class, 'sub_category_id');
//     }

//     // Define a relationship through SubCategory to Category
//     public function category()
//     {
//         return $this->belongsTo(Category::class, 'category_id');
//     }
    
// }