"use client";
import MenuButton from "@/components/Button";
import Header from "@/components/Header";
import Graph from "@/components/Graph";
import { applyDagreLayout } from "@/components/Graph";
import type { TechData } from "../types/Tech";
import { techData } from "@/components/TechGraph";
import { useNodesState, useEdgesState, Controls } from "@xyflow/react";
import { Section } from "@/components/ui/Section";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import TechSelector from "@/components/TechSelector";
import axios from "axios";

export default function GraphEditting() {
  const generateGraph = (data: TechData[]) => {
    const nodes = data.map((tech) => ({
      id: tech.techId.toString(),
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: tech.techName },
    }));

    const edges: { id: string; source: string; target: string }[] = [];
    data.forEach((tech) => {
      tech.needTech.forEach((dependencyId) => {
        edges.push({
          id: `e${dependencyId}-${tech.techId}`,
          source: dependencyId.toString(),
          target: tech.techId.toString(),
        });
      });
    });

    const positionedGraph = applyDagreLayout({ nodes, edges });
    return positionedGraph;
  };

  const initialNodes = generateGraph(techData).nodes;
  const initialEdges = generateGraph(techData).edges;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectChildTechId, setSelectChildTechId] = useState<number[]>([]);
  const [selectParentTechId, setSelectParentTechId] = useState<number[]>([]);
  const [techName, setTechName] = useState("");

  const addNode = async () => {
    const req = {
      techName: techName,
      parentTechIds: selectParentTechId,
      childTechIds: selectChildTechId,
    };

    const res = await axios.post("http://localhost:8080/api/tech-data", req);

    console.log(res);
    // axios.post("/api/tech", req).then((res) => {
    //   const newTech = res.data;
    //   const newNodes = [
    //     ...nodes,
    //     {
    //       id: newTech.techId.toString(),
    //       position: { x: Math.random() * 500, y: Math.random() * 500 },
    //       data: { label: newTech.techName },
    //     },
    //   ];
    //   const newEdges = [
    //     ...edges,
    //     ...newTech.needTech.map((dependencyId: number) => ({
    //       id: `e${dependencyId}-${newTech.techId}`,
    //       source: dependencyId.toString(),
    //       target: newTech.techId.toString(),
    //     })),
    //   ];

    //   setNodes(newNodes);
    //   setEdges(newEdges);
    // });
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
        <Section title="グラフ編集">
          <Graph graphNode={nodes} graphEdge={edges}>
            <Controls />
          </Graph>
          <h2 className="text-lg mb-2 bg-white text-black">技術追加</h2>
          <Input title="技術名" setValue={setTechName} />
          <h2 className="text-lg mb-2 bg-white text-black">技術関係(親)</h2>
          <TechSelector
            setTechIds={setSelectParentTechId}
            techIds={selectParentTechId}
          />
          <h2 className="text-lg mb-2 bg-white text-black">技術関係(子)</h2>
          <TechSelector
            setTechIds={setSelectChildTechId}
            techIds={selectChildTechId}
          />
          <Button onClick={addNode}>追加</Button>
        </Section>
      </main>
    </div>
  );
}
