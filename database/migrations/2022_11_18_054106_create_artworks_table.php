<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artworks', function (Blueprint $table) {
            $table->id();
            $table->string('title');

            // This path is where the artwork is stored on disk
            $table->string('path');

            // We get the width and height
            // to preload image size in React
            $table->integer('width');
            $table->integer('height');

            $table->string('alt_text')->nullable();
            $table->string('description')->nullable();
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('artworks');
        Storage::deleteDirectory('public/artworks');
    }
};
