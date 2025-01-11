"use client";
import MenuButton from "@/components/Button";
import Header from "@/components/Header";
import type { TechData } from "../types/Tech";
import { Section } from "@/components/ui/Section";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import TechSelector from "@/components/TechSelector";
import axios from "axios";
import { fetchTechData } from "../lib/server-action";
import { useRouter } from "next/navigation";

export default function GraphEditting() {
  const [techData, setTechData] = useState<TechData[]>([]);
  const [selectWantTechId, setSelectWantTechId] = useState<number[]>([]);
  const [startDay, setStartDay] = useState<string>("");
  const [finishDay, setFinishDay] = useState<string>("");
  const [demandName, setDemandName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTechData();
      setTechData(data);
    };
    fetchData();
  }, []);

  const createDemand = async () => {
    const response = await axios.post("http://localhost:8080/api/demand-data", {
      name: demandName,
      end_time: finishDay,
      start_time: startDay,
      techId: selectWantTechId,
    });
    if (response.status === 200) {
      alert("案件を作成しました");
      router.push("/");
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
      <main className="flex flex-col gap-4 mb-6">
        <Section title="案件追加">
          <Input title="案件名" setValue={setDemandName} />
          <h2 className="text-lg mb-2 bg-white text-black">必要な技術</h2>
          <TechSelector techData={techData} setTechIds={setSelectWantTechId} />
          <div className="flex flex-col gap-4 p-3">
            <h2 className="text-lg mb-2 bg-white text-black">開始日</h2>
            <input type="date" onChange={(e) => setStartDay(e.target.value)} />
            <h2 className="text-lg mb-2 bg-white text-black">終了日</h2>
            <input type="date" onChange={(e) => setFinishDay(e.target.value)} />
          </div>
          <Button onClick={createDemand}>案件作成</Button>
        </Section>
      </main>
    </div>
  );
}
