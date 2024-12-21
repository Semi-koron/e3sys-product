<?php

use App\Http\Controllers\AuthController;

Route::get('/verify-token', [AuthController::class, 'verifyToken']);
