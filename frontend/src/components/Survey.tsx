"use client";
import { useState } from "react";
import { Section } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { tokenVerify } from "@/app/lib/server-action";

const Survey = () => {
  const [isStart, setIsStart] = useState(false);
  const [text, setText] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const uuid = await tokenVerify(token);
    const body = {
      history: history,
      message: text,
      uuid: uuid,
    };
    if (text !== "") {
      setHistory([...history, text]);
    }
    const response = await fetch("http://localhost:8080/api/gemini-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      //historyに追加
      if (text !== "") {
        setHistory([...history, text, data[0]]);
        return;
      }
      setHistory([...history, data[0]]);
    } else {
      console.error("送信失敗");
    }
  };

  return (
    <Section title="技術相談所">
      {isStart ? (
        <>
          <div className="flex flex-col gap-4 mb-4">
            {history.map((item, index) => (
              // 偶数は薄いオレンジ色で右側に寄せて左端にマージンを取る 奇数は薄い灰色で左側に寄せて右端にマージンを取る
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  index % 2 === 0
                    ? "bg-orange-100 text-black ml-auto rounded-lg"
                    : "bg-gray-100 text-black mr-auto rounded-lg"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="flex gap-4 w-full">
            <Input setValue={setText} />
            <Button type="submit" onClick={handleSubmit}>
              送信
            </Button>
          </div>
        </>
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
