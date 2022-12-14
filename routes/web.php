<?php

use App\Http\Controllers\ArtworkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TagController;
use App\Models\Tag;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use TCG\Voyager\Facades\Voyager;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::controller(RegisteredUserController::class)
    ->prefix('artists')
    ->group(function() {
        Route::get('{user}', 'show')->name('artists.show');
    });


/**
 * Defining Artwork routes
 */
Route::resource('artworks', ArtworkController::class);
Route::controller(ArtworkController::class)
    ->prefix('artworks')
    ->group(function() {
        // Route::post('dd', 'test_route')->name('artworks.dd'); // Route for testing
        // Route::post('search', 'search')->name('artworks.search');
    });


/**
 * Defining Search routes
 */
Route::controller(SearchController::class)
    ->prefix('search')
    ->group(function() {
        Route::get('artworks', 'artworks')->name('search.artworks');
        Route::get('artists', 'artists')->name('search.artists');
        Route::get('tags', 'tags')->name('search.tags');
    });

/**
 * Defining Tag routes
 */
Route::resource('tags', TagController::class)
    ->only(['show']);

require __DIR__.'/auth.php';


Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});
