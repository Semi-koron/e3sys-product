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
        Schema::create('user_data', function (Blueprint $table) {
            $table->id();
            $table->string('userName');
            $table->string('uuid');
            $table->foreignId('masteredTech')->nullable()->constrained('tech_data');
            $table->foreignId('masteringTech')->nullable()->constrained('tech_data');
            $table->foreignId('joinDemand')->nullable()->constrained('user_data')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_data');
    }
};
