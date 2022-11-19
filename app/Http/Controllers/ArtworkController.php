<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use Illuminate\Http\Request;
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
            ['except' => ['index', 'show']],
            // ['only' => ['store', 'create', 'edit', 'update']],
        );
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Artworks/Index', [
            'artworks' => Artwork::with('users')->latest()->paginate(15),
        ]);
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
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'title' => ['required'],
            'date' => ['required'],
            'description' => ['nullable'],
            'alt_text' => ['nullable'],
        ]);

        $path = $request->file('image')->store('public/artworks');

        $validatedData['path'] = $path;

        $art = Artwork::create($validatedData);
        $art->users()->attach($request->user()->id);

        return $this->index();
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
        $artwork->users;
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
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
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

        return($this->show($artwork));
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
        return $this->index();
        // Artwork::truncate();
        // $artwork->delete();
    }
}
