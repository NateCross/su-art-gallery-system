<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function artworks()
    {
        return $this
            ->belongsToMany(Artwork::class)
            ->latest()
            ->paginate(15);
    }

    public function artworksSearch()
    {
        return $this
            ->belongsToMany(Artwork::class)
            ->latest()
            ->take(4);
    }
}
