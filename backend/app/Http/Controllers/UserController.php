namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Auth as FirebaseAuth;
use Kreait\Laravel\Firebase\Facades\Firebase;

class UserController extends Controller
{
    public function verifyToken(Request $request)
    {
        // トークンをリクエストから受け取る
        $token = $request->input('token');

        try {
            // FirebaseのAuthインスタンスを使ってトークンを検証
            $verifiedIdToken = Firebase::auth()->verifyIdToken($token);

            // トークンが正しければ、ユーザーIDを取得
            $uid = $verifiedIdToken->getClaim('sub');

            // ユーザーIDを使ってMySQLからユーザー情報を取得
            $user = \App\Models\User::where('firebase_uid', $uid)->first();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            // ユーザー情報を返す
            return response()->json($user);

        } catch (\Throwable $e) {
            return response()->json(['error' => 'Invalid token'], 400);
        }
    }
}
