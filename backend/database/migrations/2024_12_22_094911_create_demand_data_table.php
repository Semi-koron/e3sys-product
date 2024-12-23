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
        Schema::create('demand_data', function (Blueprint $table) {
            $table->id();
            $table->string('demandName');
            $table->string('startTime');
            $table->string('endTime');
            $table->foreignId('wantTech')->nullable()->constrained('tech_data');
            $table->foreignId('joinUser')->nullable()->constrained('user_data')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demand_data');
    }
};
