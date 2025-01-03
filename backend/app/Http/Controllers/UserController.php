<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Auth as FirebaseAuth;
use Kreait\Laravel\Firebase\Facades\Firebase;

class UserController extends Controller
{
    public function verifyToken(Request $request)
    {
        $token = $request->input('token');

        try {
            $verifiedIdToken = Firebase::auth()->verifyIdToken($token);

            $uid = $verifiedIdToken->getClaim('sub');

            $user = \App\Models\User::where('firebase_uid', $uid)->first();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

 
            return response()->json($user);

        } catch (\Throwable $e) {
            return response()->json(['error' => 'Invalid token'], 400);
        }
    }
}
