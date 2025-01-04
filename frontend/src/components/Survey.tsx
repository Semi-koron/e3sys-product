"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const questions = ["", "", ""];

const Survey = () => {
  const [isStart, setIsStart] = useState(false);
  const [text, setText] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (questions.length === 0) {
      setAnswers([text, "", ""]);
    } else if (questions.length === 1) {
      //新しく追加
      setAnswers((prev) => [...prev, text]);
    } else if (questions.length === 2) {
      setAnswers((prev) => [...prev, text]);
    }
    const response = await fetch("http://localhost:8080/api/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //ないときはnullを返す
        question1: questions[0] ?? null,
        question2: questions[1] ?? null,
        question3: questions[2] ?? null,
        answer1: answers[0],
        answer2: answers[1],
        answer3: answers[2],
      }),
    });

    if (response.ok) {
      const data = await response.json();
    } else {
      console.error("送信失敗");
    }
  };

  return (
    <Section title="アンケート">
      {isStart ? (
        <form>
          {questions.map((question, index) => (
            <div key={index}>
              <label>
                {question}
                <input
                  type="text"
                  name={index.toString()}
                  value={answers[index]}
                  onChange={handleChange}
                />
              </label>
            </div>
          ))}
          <Input setValue={setText}></Input>
          <Button type="submit" onClick={handleSubmit}>
            送信
          </Button>
        </form>
      ) : (
        <Button
          onClick={() => {
            setIsStart(true);
            handleSubmit();
          }}
        >
          スタート
        </Button>
      )}
    </Section>
  );
};

export default Survey;

/*
↓元の文です
onst Survey = () => {
    return (
        <div className="bg-white p-4 pl-8 rounded-lg shadow-md">
            <h2 className="text-lg mb-4 text-black">アンケート</h2>
            <ul>
                <li className="text-black">1. 質問内容</li>
                <li className="text-black">2. 質問内容</li>
                <li className="text-black">3. 質問内容</li>
            </ul>
        </div>
    );
};

export default Survey; 
*/
