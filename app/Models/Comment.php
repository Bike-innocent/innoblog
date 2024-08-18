<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // public function replies()
    // {
    //     return $this->hasMany(Comment::class, 'parent_id');
    // }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id')->with('replies'); // Recursive relation for nested replies
    }

    // A comment may belong to a parent comment (if it's a reply)
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }
}
