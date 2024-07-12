<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $guarded = [];

    // public function category()
    // {
    //     return $this->belongsTo(Category::class);
    // }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

   

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

  
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'post_tag');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}