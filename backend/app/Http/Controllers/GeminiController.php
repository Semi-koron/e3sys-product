<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GeminiController extends Controller
{
    /**
    * index
    *
    * @param  Request  $request
    */
    public function index(Request $request)
    {
        return view('index');
    }

    /**
    * post
    *
    * @param  Request  $request
    */
    public function post(Request $request)
    {
        $question1 = $request->input('question1');
        $question2 = $request->input('question2');
        $question3 = $request->input('question3');

        $sentence ="あなたは三つの質問に対する答えを受け取ります。一つ目は「今、どんなプログラミング言語に興味がありますか？」という質問です。
        二つ目は「 プログラミングで作りたいものはありますか？」という質問です。三つ目は「プログラミング学習経験はありますか？」という質問です。
        そして、一つ目の質問に対する答えが[$question1]です。二つ目の質問に対する答えは[$question2]です。三つ目に対する答えは[$question3]です。
        これらの回答からデータを元にユーザが学び始めるべき技術を箇条書きで上位3書き出して下さい。箇条書きは技術の名前だけかつ三行以内に収めてください。
        詳細等は絶対書かずにこの三つだけ表示して下さい。
        ";
        // .env に設定したAPIキーを取得
        $yourApiKey = getenv('GEMINI_API_KEY');  // .env からAPIキーを取得
        $client = Gemini::client($yourApiKey);  // Geminiクライアントを作成

        // Gemini APIにリクエストして応答を取得
        $result = $client->geminiPro()->generateContent($sentence);
        $response_text = $result->text();  // Gemini からの応答を取得

        // 応答を画面に表示
        return view('index', compact('sentence', 'response_text'));
    }
}
