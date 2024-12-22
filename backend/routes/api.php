<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    //テストのテキストをjson形式で返す
    return response()->json([
        'message' => 'Hello, World!'
    ]);
});

Route::post('/echo', function (Request $request) {
    return response()->json([
        'question' => $request->input('question')
    ]);
});

Route::get('/verify-token', [AuthController::class, 'verifyToken']);
