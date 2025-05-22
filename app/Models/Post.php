<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            $post->slug = self::generateSlug();
        });
    }

    // public function getImageAttribute($value)
    // {
    //     if (!$value) return null;

    //     return config('image.url') . $value;
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

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'saves')->withTimestamps();
    }


    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public static function generateSlug()
    {
        $uuid = Str::uuid();
        $randomStr = Str::random(8);
        return $uuid . '-' . $randomStr;
    }
}
