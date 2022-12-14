<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artwork extends Model
{
    use HasFactory;

    // Eager loads the relations automatically
    protected $with = [
        'users',
        'tags',
    ];

    protected $fillable = [
        'title',
        'path',
        'date',
        'description',
        'alt_text',
        'width',
        'height',
        'thumbnail',
        'thumbnail_width',
        'thumbnail_height',
        'is_nsfw',
    ];

    /**
     * Get the users attached to an artwork
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Get the tags of this artwork
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
