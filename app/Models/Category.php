<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];
    
   

    public function subCategories()
    {
        return $this->hasMany(SubCategory::class, 'category_id'); // Ensure the foreign key is correct
    }
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    
}