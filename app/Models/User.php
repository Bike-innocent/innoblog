<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Str;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email',



        'email_verified_at',
        'google_id',
        'created_at',
        'updated_at',
        'user_id',
    ];


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * The attributes that should be appended to the model's array form.
     *
     * @var array
     */
    protected $appends = ['avatar_url'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function savedPosts()
    {
        return $this->belongsToMany(Post::class, 'saves')->withTimestamps();
    }



    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            $user->placeholder_color = self::generateRandomColor();
            $user->username = self::generateUniqueUsername($user->name);
        });
    }

    public static function generateRandomColor()
    {
        $letters = '0123456789ABCDEF';
        $color = '#';
        for ($i = 0; $i < 6; $i++) {
            $color .= $letters[rand(0, 15)];
        }
        return $color;
    }

    public static function generateUniqueUsername($name)
    {
        // Clean the name to be used as username
        $baseUsername = '@' . strtolower(preg_replace('/[^a-zA-Z0-9]+/', '', $name));

        if (!self::where('username', $baseUsername)->exists()) {
            return $baseUsername;
        }

        do {
            $username = $baseUsername . rand(1000, 9999);
        } while (self::where('username', $username)->exists());

        return $username;
    }


    // Accessor for the avatar URL
    public function getAvatarUrlAttribute()
    {
        return $this->avatar ? url('avatars/' . $this->avatar) : null;
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }



}