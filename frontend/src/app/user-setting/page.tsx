"use client";
import { useEffect, useState } from "react";
import MenuButton from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import TechSelector from "@/components/TechSelector";
import axios from "axios";
import { TechData } from "../types/Tech";
import { fetchTechData } from "../lib/server-action";

export default function Home() {
  const [name, setName] = useState("");
  const [techIds, setTechIds] = useState<number[]>([]);
  const [techData, setTechData] = useState<TechData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTechData();
      setTechData(data);
    };
    fetchData();
  }, []);

  const saveProfile = async () => {
    try {
      // Firebaseトークンを取得
      const token = sessionStorage.getItem("token");
      // bearerToken()ヘッダーにトークンをセット
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // トークンを認証
      const res = await axios.get("http://localhost:8080/api/verify-token");
      // トークンが正常ならば、uuidを取得
      if (!res.data.uid) {
        throw new Error("uuidが取得できませんでした");
      }
      const uuid = res.data.uid;

      // プロフィールを保存
      await axios.post("http://localhost:8080/api/user-data", {
        uuid,
        name,
        techIds,
      });

      alert("保存しました");
    } catch (e) {
      console.error(e);
      alert("保存に失敗しました");
    }
  };

  return (
    <div className="bg-orange-500 min-h-screen p-8">
      <div className="flex justify-between items-center mb-4">
        <MenuButton />
        <div className="flex-1 flex justify-center">
          <Header />
        </div>
      </div>
      <main>
        <Section title="プロフィール" className="flex flex-col gap-4 mb-6">
          <Input title="名前" setValue={setName} />
          <TechSelector setTechIds={setTechIds} techData={techData} />
          <Button onClick={saveProfile}>保存</Button>
        </Section>
      </main>
    </div>
  );
}
