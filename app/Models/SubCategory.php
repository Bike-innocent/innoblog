<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;

    protected $guarded = [];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
 
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    
    public function tags()
    {
        return $this->hasMany(Tag::class);
    }
}