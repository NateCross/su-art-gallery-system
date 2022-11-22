<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArtworkController extends Controller
{
    /**
     * This function declares the middleware.
     * Very important so that only certain routes are
     * restricted
     */
    public function __construct()
    {
        $this->middleware(
            ['auth', 'verified'], 
            ['except' => ['index', 'show', 'search']],
            // ['only' => ['store', 'create', 'edit', 'update']],
        );
    }
    /**
     * Display a listing of the resource.
     * Also displays searched artworks.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $validatedData = $request->validate([
            'search' => ['nullable'],
            'option' => ['nullable'],
        ]);

        if (!array_key_exists('search', $validatedData)) {
            $artworks = Artwork::latest()->paginate(15);
        } else {
            $search = '%' . $validatedData['search'] . '%';

            $option = strtolower($validatedData['option']);
            if ($option == 'title') {
                $artworks = Artwork::query()
                    ->latest()
                    ->where('title', 'LIKE', $search)
                    ->paginate(15)
                    ->appends($validatedData);
            } elseif ($option == 'artist') {
                // TODO: Fix
                // Actually, we need to separate this
                // to show its own page
                $artworks = User::query()
                    ->where('name', 'LIKE', $search)
                    ->artworks()
                    ->with('users')
                    ->latest();
            }
            // dd($artworks);
        }

        return Inertia::render('Artworks/Index', [
            'artworks' => $artworks,
        ]);


        // if ($validatedData['search']) {
        //     return $request;
        // } else {
        // }

        // $req
        // $artworks = null;

        // if ($request) {
        //     $request->whenHas('search', function($input) {
        //         return $input;
        //     }, function() {
        //         $artworks = Artwork::with('users')->latest()->paginate(15);
        //     });
        // } else {
        //     $artworks = Artwork::with('users')->latest()->paginate(15);
        // }
        // $artworks = Artwork::with('users')->latest()->paginate(15);

        // return Inertia::render('Artworks/Index', [
        //     'artworks' => $artworks,
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Artworks/Create', [
            //
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:10000',
            'title' => ['required'],
            'date' => ['required'],
            'description' => ['nullable'],
            'alt_text' => ['nullable'],
        ]);

        $path = $request->file('image')->store('public/artworks');

        // return(getimagesize($request->file('image')));
        [$width, $height] = getimagesize($request->file('image'));

        $validatedData['path'] = $path;
        $validatedData['width'] = $width;
        $validatedData['height'] = $height;

        $art = Artwork::create($validatedData);
        $art->users()->attach($request->user()->id);

        // return $this->index();
        return redirect()->route('artworks.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Artwork  $artwork
     * @return \Illuminate\Http\Response
     */
    public function show(Artwork $artwork)
    {

        $artwork->users;    // Gets the users first before returning
        return Inertia::render('Artworks/Show', [
            'artwork' => $artwork,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Artwork  $artwork
     * @return \Illuminate\Http\Response
     */
    public function edit(Artwork $artwork)
    {
        $artwork->users;    // Gets the users first before returning
        return Inertia::render('Artworks/Edit', [
            'artwork' => $artwork,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Artwork  $artwork
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Artwork $artwork)
    {
        $validatedData = $request->validate([
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:10000',
            'title' => ['required'],
            'date' => ['required'],
            'description' => ['nullable'],
            'alt_text' => ['nullable'],
        ]);

        // Only delete and add the new image if an image
        // is uploaded
        if ($request->hasFile('image')) {
            Storage::delete($artwork->path);

            $path = $request->file('image')->store('public/artworks');

            $validatedData['path'] = $path;
        }

        $artwork->update($validatedData);

        // return($this->show($artwork));
        return redirect()->route('artworks.show', $artwork);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Artwork  $artwork
     * @return \Illuminate\Http\Response
     */
    public function destroy(Artwork $artwork)
    {
        Storage::delete($artwork->path);
        $artwork->delete();
        return redirect()->route('artworks.index');
    }

    public function test_route(Request $request)
    {
        dd($request);
    }

    /**
     * Search for an artwork by title, author, tags
     * TODO: Implement tags
     */
    // public function search(Request $request)
    // {
    //     $input = $request->validate([
    //         'search' => ['nullable'],
    //     ]);

    //     if (empty($input)) {
    //         return redirect()->route('artworks.index');
    //     }

    //     // Adapts query for LIKE
    //     $query = '%' . $input['search'] . '%';

    //     $results = Artwork::query()
    //         ->with('users')
    //         ->latest()
    //         ->where('title', 'LIKE', $query)
    //         ->paginate(15);
    //     dd($results);
    //     // return $this->index($results);
    // }
}
