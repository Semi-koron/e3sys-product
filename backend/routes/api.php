use App\Http\Controllers\AuthController;

Route::post('/verify-token', [AuthController::class, 'verifyToken']);
