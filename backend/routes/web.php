<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GeminiController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
    //テストのテキストをjson形式で返す
    return response()->json([
        'message' => 'Hello, World!'
    ]);
});

Route::post('/gemini/post', [GeminiController::class, 'post']);
