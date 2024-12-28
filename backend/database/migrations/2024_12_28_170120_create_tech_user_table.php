<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tech_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_data_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tech_data_id')->constrained()->cascadeOnDelete();
            $table->unique(['user_data_id', 'tech_data_id']);
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tech_user');
    }
};
