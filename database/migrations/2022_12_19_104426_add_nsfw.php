<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('artworks', function(Blueprint $table) {
            $table->boolean('is_nsfw')->default(false);
        });

        Schema::table('users', function(Blueprint $table) {
            $table->boolean('nsfw_enabled')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('artworks', function(Blueprint $table) {
            $table->dropColumn('is_nsfw');
        });

        Schema::table('users', function(Blueprint $table) {
            $table->dropColumn('nsfw_enabled');
        });
    }
};
