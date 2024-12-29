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
        Schema::create('demand_tech', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tech_data_id')->constrained()->cascadeOnDelete();
            $table->foreignId('demand_data_id')->constrained()->cascadeOnDelete();
            $table->unique(['tech_data_id', 'demand_data_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demand_tech');
    }
};
