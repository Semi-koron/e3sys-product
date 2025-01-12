"use client";
import type { TechData } from "@/app/types/Tech";
import dagre from "dagre";

import "@xyflow/react/dist/style.css";
import Graph from "@/components/Graph";

type TechGraphProps = {
  techData: TechData[];
  masteredTech: number[];
  masteringTech: number[];
};

const generateGraph = (data: TechData[]) => {
  const nodes = data.map((tech) => ({
    id: tech.techId.toString(),
    position: { x: Math.random() * 500, y: Math.random() * 500 },
    data: { label: tech.techName },
  }));

  const edges: { id: string; source: string; target: string }[] = [];
  data.forEach((tech) => {
    tech.neededTech.forEach((dependencyId) => {
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

export function applyDagreLayout(data: {
  nodes: {
    id: string;
    position: { x: number; y: number };
    data: { label: string };
  }[];
  edges: { id: string; source: string; target: string }[];
}) {
  const graph = new dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 180;
  const nodeHeight = 50;

  // グラフの設定
  graph.setGraph({ rankdir: "TB" }); // TB = Top-Bottom (上から下)

  // ノードを追加
  data.nodes.forEach((node) => {
    graph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // エッジを追加
  data.edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  // レイアウト計算
  dagre.layout(graph);

  // 新しい位置を更新
  const positionedNodes = data.nodes.map((node) => {
    const nodeWithPosition = graph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: positionedNodes, edges: data.edges };
}

const TechGraph = ({
  techData,
  masteredTech,
  masteringTech,
}: TechGraphProps) => {
  const initialNodes = generateGraph(techData).nodes;
  const initialEdges = generateGraph(techData).edges;

  // ノードとエッジのスタイルを更新
  const getNodeStyle = (node: {
    id: string;
    position: { x: number; y: number };
    data: { label: string };
  }) => {
    if (masteredTech.includes(Number(node.id) - 1)) {
      return "mastered"; // 緑色
    } else if (masteringTech.includes(Number(node.id) - 1)) {
      return "mastering"; // 青色
    }
    return "";
  };

  const getEdgeStyle = (edge: {
    id: string;
    source: string;
    target: string;
  }) => {
    const sourceMastered = masteredTech.includes(Number(edge.source));
    const targetMastered = masteredTech.includes(Number(edge.target));
    const sourceMastering = masteringTech.includes(Number(edge.source));
    const targetMastering = masteringTech.includes(Number(edge.target));

    if (sourceMastered && targetMastered) {
      return "mastered"; // 緑色
    } else if (sourceMastering || targetMastering) {
      return "mastering"; // 青色
    }
    return ""; // デフォルト色
  };

  return (
    <section className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg text-black">グラフ</h2>
      <Graph
        nodeColor={initialNodes.map((node) => getNodeStyle(node))}
        edgeColor={initialEdges.map((edge) => getEdgeStyle(edge))}
        graphNode={initialNodes}
        graphEdge={initialEdges}
      />
    </section>
  );
};

export default TechGraph;
