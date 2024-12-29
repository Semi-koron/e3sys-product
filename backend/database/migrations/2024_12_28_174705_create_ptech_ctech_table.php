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
        Schema::create('ptech_ctech', function (Blueprint $table) {
            $table->id();

            // 親の技術を参照する外部キー
            $table->foreignId('parent_tech_data_id')->constrained('tech_datas')->cascadeOnDelete();

            // 子の技術を参照する外部キー
            $table->foreignId('child_tech_data_id')->constrained('tech_datas')->cascadeOnDelete();

            // 親と子のペアにユニーク制約を追加
            $table->unique(['parent_tech_data_id', 'child_tech_data_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ptech_ctech');
    }
};
