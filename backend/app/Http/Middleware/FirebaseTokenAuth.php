<?php

namespace App\Http\Middleware;

use Closure;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth as FirebaseAuth;
use Kreait\Firebase\Exception\Auth\TokenExpired;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FirebaseTokenAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

     protected $auth;

     public function __construct(FirebaseAuth $auth = null)
     {
         if ($auth) {
             $this->auth = $auth;
         } else {
             // Firebase Factoryから認証インスタンスを作成
             $factory = (new Factory())->withServiceAccount('firebase-admin-key.json');
             $this->auth = $factory->createAuth();
         }
     }

    public function handle(Request $request, Closure $next): Response
    {
        try {
            // Authorizationヘッダーからトークンを取得
            $idToken = $request->bearerToken();

            if (!$idToken) {
                return response()->json(['error' => 'Authorization token not found'], 400);
            }

            // トークンを検証
            $verifiedIdToken = $this->auth->verifyIdToken($idToken);

            // トークンからUIDを取得
            $uid = $verifiedIdToken->claims()->get('sub');
            
            return $next($request);
        } catch (TokenExpired $e) {
            // トークンが期限切れの場合
            return response()->json(['error' => 'Token has expired'], 401);
        } catch (\InvalidArgumentException $e) {
            // トークンが無効または破損している場合
            return response()->json(['error' => 'Invalid token format'], 401);
        } catch (\Exception $e) {
            // その他のエラー
            return response()->json(['error' => 'Invalid token'], 401);
        }
    }
}
