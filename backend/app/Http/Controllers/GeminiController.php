<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Gemini\Laravel\Facades\Gemini;
use App\Models\UserData;
use App\Models\DemandData;
use Illuminate\Support\Str;

class GeminiController extends Controller
{
    /**
    * post
    *
    * @param  Request  $request
    */
    public function question(Request $request)
    {
        // uuidを取得
        $uuid = $request->input('uuid');

        // uuidからユーザーの使える技術を取得
        $user = UserData::with('learned')->where('uuid', $uuid)->first();

        // ユーザーが使える技術を取得
        foreach($user->learned as $tech){
            $techs[] = [
                'name' => $tech->name,
                'status' => $tech->pivot->status
            ];
        }
        // システムメッセージを記述
        $system = "あなたはエンジニアが技術を習得する際のアドバイザーです。現在会社に寄せられている案件の情報やユーザーの習得している技術から学習に必要な時間を考慮しつつ、ユーザーが習得するべき技術を話し合いを通して後ほど示すリストの中から提案します。次に示すのは相談相手のユーザーが習得している技術と習得中の技術です。";
        $system .= "\n";
        foreach($techs as $tech){
            $system .= $tech['name'];
            if($tech['status'] == 'mastered'){
                $system .= " : 習得済み";
            }else{
                $system .= " : 習得中";
            }
            $system .= "\n";
        }
        $system .= "\n";
        foreach($techs as $tech){
            $system .= $tech['name'] . " : " . $tech['status'];
            $system .= "\n";
        }
        $system .= "```";
        $system .= "\n";

        // 案件のデータの取得
        $demandData = DemandData::with('need')->get();
        $system .= "会社に寄せられている案件の情報は以下の通りです。";
        $system .= "\n";
        $system .= "```";
        $system .= "\n";
        foreach($demandData as $demand){
            $system .= "案件名 : " . $demand->name;
            $system .= "\n";
            $system .= "開始日 : " . $demand->start_date;
            $system .= "\n";
            $system .= "終了日 : " . $demand->end_date;
            $system .= "\n";
            $system .= "必要な技術 : ";
            foreach($demand->need as $need){
                $system .= $need->name . " ";
            }
            $system .= "\n";
            $system .= "\n";
        }
        $system .= "```";
        $system .= "\n";
        $system .= "よってユーザーの既に習得している技術や案件に必要な技術の情報を用いた質問を通して、ユーザーが習得するべき技術を決定してください。またユーザーは案件の情報を一切知らず、やりたい技術が分からず困っていると仮定して、できるだけ丁寧に対応してください。またこのレスポンスでは質問を一つだけ送ってください。三回目の質問の後に、ユーザーが習得するべき技術を提案します。絶対にマークダウンは使わないこと。";

        $history_raw = $request->input('history');
        // history_rawが空の場合
        if(!$history_raw){
            $chat = Gemini::chat()->startChat();
            $response = $chat->sendMessage($system);
            $response_text = $response->text();
            return response()->json([$response_text]);
        }
        $history = [ $system, $history_raw ];
        $chat = Gemini::chat()->startChat($history);
        $message = $request->input('message');
        $response = $chat->sendMessage($message);

        $response_text = $response->text();
        return response()->json([$response_text]);
    }

    function geminiTest (Request $request) {
        $toGeminiCommand = "こんにちは";

        $result = Gemini::geminiPro()->generateContent('Hello');

        $response_text = $result->text();

        return response()->json($response_text);
    }
}
