<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            $category->slug = Str::slug($category->name);
        });
    }

    public function subCategories()
    {
        return $this->hasMany(SubCategory::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}