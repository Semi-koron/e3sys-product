<?php
namespace App\Http\Controllers;

use Kreait\Firebase\Auth as FirebaseAuth;
use Kreait\Firebase\Exception\Auth\TokenExpired;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    protected $auth;

    public function __construct(FirebaseAuth $auth)
    {
        $this->auth = $auth;
    }

    public function verifyToken(Request $request)
    {
        try {
            // Firebase reuest headerからトークンを取得
            $idToken = $request->bearerToken();
            $verifiedIdToken = $this->auth->verifyIdToken($idToken);

            // トークンが有効なら、ユーザー情報を取得
            $uid = $verifiedIdToken->getClaim('sub');
            $user = User::where('firebase_uid', $uid)->first();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            return response()->json($user);

        } catch (TokenExpired $e) {
            return response()->json(['error' => 'Token has expired'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
    }
}
