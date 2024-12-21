"use client"

import { useState } from "react";

const Survey = () => {
    // AIからの応答一覧（仮）
    const aiResponses = [
        "あなたの学びたいプログラミング言語は何ですか？",
        "その理由を教えてください。",
        "どのくらいの期間で習得したいと考えていますか？",
    ];

    // 回答を始めたかを管理するstate
    const [hasStarted, setHasStarted] = useState<boolean>(false);

    // 現在のステップを管理するstate
    const [step, setStep] = useState<number>(0);

    // ユーザーの解答一覧を管理するstate
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    // 解答を送信したかを示すフラグ
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // 現在の質問を取得
    const currentAiResponse = aiResponses[step];

    // 解答入力欄の値を管理するstate
    const [userAnswer, setUserAnswer] = useState<string>("");

    // 解答送信処理
    const handleSubmit = () => {
        setUserAnswers((prevAnswers) => [...prevAnswers, userAnswer]);
        setUserAnswer("");

        if (step < aiResponses.length - 1) {
            setStep(step + 1);
        } else {
            setIsSubmitted(true);
        }
    };

    return (
        <div className="bg-white p-4 pl-8 rounded-lg shadow-md">
            <h2 className="text-lg mb-4 text-black font-bold">アンケート</h2>

            {/* 回答を始めるボタン */}
            {!hasStarted ? (
                <button
                    onClick={() => setHasStarted(true)}
                    className="w-40 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600"
                >
                    回答を始める
                </button>
            ) : (
                <>
                    {/* 現在の質問 */}
                    <div className="mb-4 text-black">
                        <p className="font-medium">{currentAiResponse}</p>
                    </div>

                    {/* 解答入力欄または完了メッセージ */}
                    {!isSubmitted ? (
                        <div>
                            <textarea
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="解答を入力してください"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={!userAnswer.trim()}
                                className={`w-20 bg-blue-500 text-white py-2 rounded-lg font-medium ${!userAnswer.trim()
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-blue-600"
                                    }`}
                            >
                                送信
                            </button>
                        </div>
                    ) : (
                        <div className="text-green-600 font-medium">
                            アンケートは終了しました！ ご協力ありがとうございます。
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Survey;
