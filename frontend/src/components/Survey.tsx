"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";

const questions = ["", "", ""];

const Survey = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({
    question1: "",
    question2: "",
    question3: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/gemini/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("結果:", data.response_text);
    } else {
      console.error("送信失敗");
    }
  };

  return (
    <Section title="アンケート">
      <form onSubmit={handleSubmit}>
        <ul>
          {questions.map((question, index) => (
            <li className="text-black" key={index}>
              {index + 1}. {question}
              <input
                type="text"
                name={`question${index + 1}`}
                value={answers[`question${index + 1}`]}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded"
                required
              />
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          送信
        </button>
      </form>
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
