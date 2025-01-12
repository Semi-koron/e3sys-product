"use client";
import MenuButton from "@/components/Button";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import Survey from "@/components/Survey";
import TechGraph from "@/components/TechGraph";
import { TechData } from "./types/Tech";
import { DemandData } from "./types/Demand";
import {
  fetchTechData,
  fetchUserData,
  fetchDemandData,
  tokenVerify,
} from "./lib/server-action";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserData } from "./types/User";
3;
import DemandList from "@/components/DemandList";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [masteredTech, setMasteredTech] = useState<number[]>([]);
  const [masteringTech, setMasteringTech] = useState<number[]>([]);
  const [demandData, setDemandData] = useState<DemandData[]>([]);

  const [techData, setTechData] = useState<TechData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const uuid = await tokenVerify(token);
        //userDataを取得
        const res: UserData | null = await fetchUserData(uuid);
        if (!res) {
          router.push("/user-setting");
          return;
        }
        setMasteredTech(res.masteredTech);
        setMasteringTech(res.learningTech);
        setName(res.userName);
      } catch (e) {
        console.log(e);
        router.push("/login");
        return;
      }
      const techData = await fetchTechData();
      const demandData = await fetchDemandData();
      setDemandData(demandData);
      setTechData(techData);
    };

    fetchData();
  }, []);
  return (
    <div className="bg-orange-400 min-h-screen p-8">
      <div className="flex justify-between items-center mb-4">
        <MenuButton />
        <div className="flex-1 flex justify-center">
          <Header />
        </div>
      </div>
      <main className="flex flex-col gap-4 mb-6">
        <Profile name={name} />
        <Survey />
        <TechGraph
          techData={techData}
          masteredTech={masteredTech}
          masteringTech={masteringTech}
        />
        <DemandList demandData={demandData} />
      </main>
    </div>
  );
}
