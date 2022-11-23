<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    // public function search(Request $request)
    // {
    //     $validatedData = $request->validate([
    //         'search' => ['nullable'],
    //         'option' => ['nullable'],
    //     ]);

    //     $search = '%' . $validatedData['search'] . '%';
    //     $option = strtolower($validatedData['option']);
    // }

    private function validateData(Request $request)
    {
        return $request->validate([
            'search' => ['nullable'],
        ]);
    }

    private function getSearchQuery($data)
    {
        return '%' . $data . '%';
    }

    public function artworks(Request $request)
    {
        return $request->whenHas('search', function($input) {
            $search = $this->getSearchQuery($input);

            $artworks = Artwork::query()
                ->latest()
                ->where('title', 'LIKE', $search)
                ->paginate(15)
                ->appends('search', $input);
            
            return Inertia::render('Search/Artwork', [
                'artworks' => $artworks,
            ]);
        }, function() {
            return redirect(route('home'));
        });
    }
}
