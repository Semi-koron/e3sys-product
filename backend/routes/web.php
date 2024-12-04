<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
    //テストのテキストをjson形式で返す
    return response()->json([
        'message' => 'Hello, World!'
    ]);
});