<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artwork extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'path',
        'date',
        'description',
        'alt_text',
    ];

    /**
     * Get the users attached to an artwork
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
