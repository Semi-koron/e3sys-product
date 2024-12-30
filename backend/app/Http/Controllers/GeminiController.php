<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Gemini\Laravel\Facades\Gemini;

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
        $question1 = $request->input('question1');
        $answer1 = $request->input('answer1');
        $question2 = $request->input('question2');
        $answer2 = $request->input('answer2');
        $question3 = $request->input('question3');
        $answer3 = $request->input('answer3');
        $sentence = "";
        if($question1 == null){
            $sentence ="あなたはエンジニアが技術を習得する際のアドバイザーです。現在一人のエンジニアがあなたにどのような技術を習得するべきか相談してきました。3つの質問とエンジニアからの回答で、3つほど技術を提示する予定です。また提示してよい技術はHTML.CSS.JavaScript.Sass.React.Vue.js.Redux.Next.js.Node.js.Express.js.NestJS.Ruby on Rails.Django.Flask.AWS.Amazon S3.Amazon EC2.Docker.Kubernetes.Terraform.Swift.UIKit.Kotlin.Jetpack Compose.React Native.Flutter.Unity.C#.Unreal Engine.C++.Godot.GraphQL.MongoDB.PostgreSQL.SQLite.Git.GitHub.GitLab.Jenkins.CircleCI.Webpack.Vite.ESLint.Prettier.Three.js.AR.js.TensorFlow.js.PyTorch.OpenCV.Rustです。
            最初の質問をしてください。またマークダウンは使用できません。";
        }
        if($question1 != null && $question2 == null){
            $sentence ="あなたはエンジニアが技術を習得する際のアドバイザーです。現在一人のエンジニアがあなたにどのような技術を習得するべきか相談してきました。3つの質問とエンジニアからの回答で、3つほど技術を提示する予定です。また提示してよい技術はHTML.CSS.JavaScript.Sass.React.Vue.js.Redux.Next.js.Node.js.Express.js.NestJS.Ruby on Rails.Django.Flask.AWS.Amazon S3.Amazon EC2.Docker.Kubernetes.Terraform.Swift.UIKit.Kotlin.Jetpack Compose.React Native.Flutter.Unity.C#.Unreal Engine.C++.Godot.GraphQL.MongoDB.PostgreSQL.SQLite.Git.GitHub.GitLab.Jenkins.CircleCI.Webpack.Vite.ESLint.Prettier.Three.js.AR.js.TensorFlow.js.PyTorch.OpenCV.Rustです。
            一つ目の質問は既に終わっており、" .
            $question1 . "という質問に対して、" . $answer1 . "という回答がありました。2つ目の質問をしてください。またマークダウンは使用できません。";
        }
        if($question2 != null && $question3 == null){
            $sentence ="あなたはエンジニアが技術を習得する際のアドバイザーです。現在一人のエンジニアがあなたにどのような技術を習得するべきか相談してきました。3つの質問とエンジニアからの回答で、3つほど技術を提示する予定です。また提示してよい技術はHTML.CSS.JavaScript.Sass.React.Vue.js.Redux.Next.js.Node.js.Express.js.NestJS.Ruby on Rails.Django.Flask.AWS.Amazon S3.Amazon EC2.Docker.Kubernetes.Terraform.Swift.UIKit.Kotlin.Jetpack Compose.React Native.Flutter.Unity.C#.Unreal Engine.C++.Godot.GraphQL.MongoDB.PostgreSQL.SQLite.Git.GitHub.GitLab.Jenkins.CircleCI.Webpack.Vite.ESLint.Prettier.Three.js.AR.js.TensorFlow.js.PyTorch.OpenCV.Rustです。
            一つ目の質問は既に終わっており、" .
            $question1 . "という質問に対して、" . $answer1 . "という回答がありました。2つ目の質問は既に終わっており、" .
            $question2 . "という質問に対して、" . $answer2 . "という回答がありました。3つ目の質問をしてください。またマークダウンは使用できません。";
        }
        if($question3 != null){
            $sentence ="あなたはエンジニアが技術を習得する際のアドバイザーです。現在一人のエンジニアがあなたにどのような技術を習得するべきか相談してきました。3つの質問とエンジニアからの回答で、3つほど技術を提示してください。また提示してよい技術はHTML.CSS.JavaScript.Sass.React.Vue.js.Redux.Next.js.Node.js.Express.js.NestJS.Ruby on Rails.Django.Flask.AWS.Amazon S3.Amazon EC2.Docker.Kubernetes.Terraform.Swift.UIKit.Kotlin.Jetpack Compose.React Native.Flutter.Unity.C#.Unreal Engine.C++.Godot.GraphQL.MongoDB.PostgreSQL.SQLite.Git.GitHub.GitLab.Jenkins.CircleCI.Webpack.Vite.ESLint.Prettier.Three.js.AR.js.TensorFlow.js.PyTorch.OpenCV.Rustです。
            一つ目の質問は既に終わっており、" .
            $question1 . "という質問に対して、" . $answer1 . "という回答がありました。2つ目の質問は既に終わっており、" .
            $question2 . "という質問に対して、" . $answer2 . "という回答がありました。3つ目の質問は既に終わっており、" .
            $question3 . "という質問に対して、" . $answer3 . "という回答がありました。エンジニアに提示する技術を選んでください。またマークダウンは使用できません。";
        }
        // .env に設定したAPIキーを取得

        // Gemini APIにリクエストして応答を取得
        $result = Gemini::geminiPro()->generateContent($sentence);
        $response_text = $result->text();  // Gemini からの応答を取得

        // json形式で返す
        return response()->json([
            'response' => $response_text
        ]);
    }

    function geminiTest (Request $request) {
        $toGeminiCommand = "こんにちは";

        $result = Gemini::geminiPro()->generateContent('Hello');

        $response_text = $result->text();

        return response()->json($response_text);
    }
}
