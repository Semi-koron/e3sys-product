<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserDataController;
use App\Http\Controllers\TechDataController;
use App\Http\Controllers\DemandDataController;
use App\Http\Controllers\GeminiController;
use App\Http\Middleware\FirebaseTokenAuth;
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
        'message' => $request->input('question')
 ]);
})->middleware(FirebaseTokenAuth::class);

//middlewareを使わない
Route::post('/echo2', function (Request $request) {
    return response()->json([
        'question' => $request->input('question')
    ]);
});

Route::post('/user-data', [UserDataController::class, 'store']);
Route::post('/user-data/get', [UserDataController::class, 'show']);
Route::post('/user-data/search', [UserDataController::class, 'search']);
Route::post('/user-data/learn', [UserDataController::class, 'learn']);
Route::post('/user-data/master', [UserDataController::class, 'master']);
Route::post('/tech-data', [TechDataController::class, 'store']);
Route::get('/tech-data', [TechDataController::class, 'index']);

Route::get('/demand-data', [DemandDataController::class, 'index']);
Route::post('/demand-data', [DemandDataController::class, 'store']);

Route::post('/gemini-question', [GeminiController::class, 'question']);

Route::get('/gemini-test', [GeminiController::class, 'geminiTest']);

Route::get('/verify-token', [AuthController::class, 'verifyToken']);

