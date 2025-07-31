<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    // Fields that are allowed for mass assignment
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'image',
    ];

    // Relationship: each post belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
