<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;

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
        $artworks = Artwork::latest()->paginate(15);

        return Inertia::render('Artworks/Index', [
            'artworks' => $artworks,
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
        $tags = null;

        $validatedData = $request->validate([
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:10000',
            'title' => ['required'],
            'date' => ['required', 'date'],
            'is_nsfw' => ['required', 'boolean'],
            'description' => ['nullable'],
            'alt_text' => ['nullable'],
            'tags' => ['nullable', 'array'],
        ]);

        $path = $request->file('image')->store('public/artworks');

        // Creating the thumbnail
        $thumbnail = $request->file('image')->store('public/artworks/thumbnails');

        // The row height of gallery is 360. So we can
        // resize the thumbnail to be exactly 360 so the
        // quality loss is more negligible
        $thumbnail_image = $this->createThumbnail(
            str_replace('public', 'storage', $thumbnail), 
            null, 
            360,
        );

        // return(getimagesize($request->file('image')));
        [$width, $height] = getimagesize($request->file('image'));

        $validatedData['path'] = $path;
        $validatedData['thumbnail'] = $thumbnail;
        $validatedData['width'] = $width;
        $validatedData['height'] = $height;
        $validatedData['thumbnail_width'] = 
            $thumbnail_image->width();
        $validatedData['thumbnail_height'] = 
            $thumbnail_image->height();

        // Separate the tags from the validated data
        // Since that is not an attribute in the artwork
        if (in_array('tags', $validatedData)) {
            $tags = $validatedData['tags'];
            unset($validatedData['tags']);
        }

        $art = Artwork::create($validatedData);

        // Attach users
        $art->users()->attach($request->user()->id);

        // Attach tags
        if ($tags) {
            foreach ($tags as $tag) {
                $sync = Tag::firstOrCreate([
                    'name' => $tag
                ]);
                $art->tags()->attach($sync);
            }
        }

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
    public function edit(Request $request, Artwork $artwork)
    {
        $verifiedArtwork = $this->verifyUser($request, $artwork);
        if (!$verifiedArtwork) {
            return redirect(route('artworks.show', $artwork->id));
        }

        $artwork->users;    // Gets the users first before returning
        return Inertia::render('Artworks/Edit', [
            'artwork' => $artwork,
        ]);
    }

    private function verifyUser(Request $request, Artwork $artwork)
    {
        // return $request->user()->artworks()->where('id', $artwork->id)->get();
        return $request->user()->id == $artwork->users()->first()->id;
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
        $verifiedArtwork = $this->verifyUser($request, $artwork);
        if (!$verifiedArtwork) {
            redirect(route('artworks.show', $artwork->id));
        }

        $validatedData = $request->validate([
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:10000',
            'title' => ['required'],
            'date' => ['required', 'date'],
            'is_nsfw' => ['required', 'boolean'],
            'description' => ['nullable'],
            'alt_text' => ['nullable'],
            'tags' => ['nullable', 'array'],
        ]);

        // Only delete and add the new image if an image
        // is uploaded
        if ($request->hasFile('image')) {
            Storage::delete($artwork->path);

            $path = $request->file('image')->store('public/artworks');

            [$width, $height] = getimagesize($request->file('image'));

            $thumbnail = $request->file('image')->store('public/artworks/thumbnails');

            $thumbnail_image = $this->createThumbnail(
                str_replace('public', 'storage', $thumbnail), 
                null, 
                360,
            );

            $validatedData['path'] = $path;
            $validatedData['thumbnail'] = $thumbnail;
            $validatedData['width'] = $width;
            $validatedData['height'] = $height;
            $validatedData['thumbnail_width'] = 
                $thumbnail_image->width();
            $validatedData['thumbnail_height'] = 
                $thumbnail_image->height();
        }

        // Detach first so there are no duplicates
        $artwork->tags()->detach();
        foreach ($validatedData['tags'] as $tag) {
            $sync = Tag::firstOrCreate([
                'name' => $tag
            ]);
            $artwork->tags()->attach($sync);
        }
        // It is not part of the entity itself so we unset it first
        unset($validatedData['tags']);

        $artwork->update($validatedData);

        return redirect()->route('artworks.show', $artwork);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Artwork  $artwork
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Artwork $artwork)
    {
        $verifiedArtwork = $this->verifyUser($request, $artwork);
        if (!$verifiedArtwork) {
            return redirect(route('artworks.show', $artwork->id));
        }

        Storage::delete($artwork->path);
        $artwork->delete();
        return redirect()->route('artworks.index');
    }

    public function test_route(Request $request)
    {
        dd($request);
    }

    /**
     * Create a thumbnail of specified size
     *
     * @param string $path path of thumbnail
     * @param int $width
     * @param int $height
     */
    public function createThumbnail($path, $width, $height)
    {
        $img = Image::make($path)->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->save($path);
        return $img;
    }
}
