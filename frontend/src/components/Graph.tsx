"use client";
import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from "@xyflow/react";
import type { TechData } from "@/app/types/Tech";
import dagre from "dagre";

import "@xyflow/react/dist/style.css";

const masteredTech: number[] = [1, 3, 5, 9]; // 習得済みの技術ID
const masteringTech: number[] = [6, 15]; // 習得中の技術ID

const techData = [
  // フロントエンド技術
  { techId: 1, techName: "HTML", needTech: [], neededTech: [2, 3] },
  { techId: 2, techName: "CSS", needTech: [1], neededTech: [4] },
  { techId: 3, techName: "JavaScript", needTech: [1], neededTech: [5, 6] },
  { techId: 4, techName: "Sass", needTech: [2], neededTech: [] },
  { techId: 5, techName: "React", needTech: [3], neededTech: [7, 8] },
  { techId: 6, techName: "Vue.js", needTech: [3], neededTech: [] },
  { techId: 7, techName: "Redux", needTech: [5], neededTech: [] },
  { techId: 8, techName: "Next.js", needTech: [5], neededTech: [] },

  // バックエンド技術
  { techId: 9, techName: "Node.js", needTech: [3], neededTech: [10, 11] },
  { techId: 10, techName: "Express.js", needTech: [9], neededTech: [] },
  { techId: 11, techName: "NestJS", needTech: [9], neededTech: [] },
  { techId: 12, techName: "Ruby on Rails", needTech: [], neededTech: [] },
  { techId: 13, techName: "Django", needTech: [], neededTech: [] },
  { techId: 14, techName: "Flask", needTech: [], neededTech: [] },

  // インフラ技術
  { techId: 15, techName: "AWS", needTech: [], neededTech: [16, 17] },
  { techId: 16, techName: "Amazon S3", needTech: [15], neededTech: [] },
  { techId: 17, techName: "Amazon EC2", needTech: [15], neededTech: [] },
  { techId: 18, techName: "Docker", needTech: [], neededTech: [19] },
  { techId: 19, techName: "Kubernetes", needTech: [18], neededTech: [] },
  { techId: 20, techName: "Terraform", needTech: [], neededTech: [] },

  // モバイル開発技術
  { techId: 21, techName: "Swift", needTech: [], neededTech: [22] },
  { techId: 22, techName: "UIKit", needTech: [21], neededTech: [] },
  { techId: 23, techName: "Kotlin", needTech: [], neededTech: [24] },
  { techId: 24, techName: "Jetpack Compose", needTech: [23], neededTech: [] },
  { techId: 25, techName: "React Native", needTech: [5], neededTech: [] },
  { techId: 26, techName: "Flutter", needTech: [3], neededTech: [] },

  // ゲーム開発技術
  { techId: 27, techName: "Unity", needTech: [3], neededTech: [28] },
  { techId: 28, techName: "C#", needTech: [27], neededTech: [] },
  { techId: 29, techName: "Unreal Engine", needTech: [], neededTech: [30] },
  { techId: 30, techName: "C++", needTech: [29], neededTech: [] },
  { techId: 31, techName: "Godot", needTech: [3], neededTech: [] },

  // その他
  { techId: 32, techName: "GraphQL", needTech: [9], neededTech: [] },
  { techId: 33, techName: "MongoDB", needTech: [9], neededTech: [] },
  { techId: 34, techName: "PostgreSQL", needTech: [], neededTech: [] },
  { techId: 35, techName: "SQLite", needTech: [], neededTech: [] },
  { techId: 36, techName: "Git", needTech: [], neededTech: [] },
  { techId: 37, techName: "GitHub", needTech: [36], neededTech: [] },
  { techId: 38, techName: "GitLab", needTech: [36], neededTech: [] },
  { techId: 39, techName: "Jenkins", needTech: [], neededTech: [] },
  { techId: 40, techName: "CircleCI", needTech: [], neededTech: [] },
  { techId: 41, techName: "Webpack", needTech: [3], neededTech: [] },
  { techId: 42, techName: "Vite", needTech: [3], neededTech: [] },
  { techId: 43, techName: "ESLint", needTech: [3], neededTech: [] },
  { techId: 44, techName: "Prettier", needTech: [3], neededTech: [] },
  { techId: 45, techName: "Three.js", needTech: [3], neededTech: [] },
  { techId: 46, techName: "AR.js", needTech: [3], neededTech: [] },
  { techId: 47, techName: "TensorFlow.js", needTech: [3], neededTech: [] },
  { techId: 48, techName: "PyTorch", needTech: [], neededTech: [] },
  { techId: 49, techName: "OpenCV", needTech: [], neededTech: [] },
  { techId: 50, techName: "Rust", needTech: [], neededTech: [] },
];

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

const Graph = () => {
  const initialNodes = generateGraph(techData).nodes;
  const initialEdges = generateGraph(techData).edges;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // ノードとエッジのスタイルを更新
  const getNodeStyle = (node: any) => {
    if (masteredTech.includes(Number(node.id))) {
      return {
        background: "rgba(34,197,94,0.8)", // 緑色
        color: "white",
        border: "2px solid rgba(34,197,94,1)",
      };
    } else if (masteringTech.includes(Number(node.id))) {
      return {
        background: "rgba(59,130,246,0.8)", // 青色
        color: "white",
        border: "2px solid rgba(59,130,246,1)",
      };
    }
    return {
      background: "white",
      color: "black",
      border: "1px solid gray",
    };
  };

  const getEdgeStyle = (edge: any) => {
    const sourceMastered = masteredTech.includes(Number(edge.source));
    const targetMastered = masteredTech.includes(Number(edge.target));
    const sourceMastering = masteringTech.includes(Number(edge.source));
    const targetMastering = masteringTech.includes(Number(edge.target));

    if (sourceMastered && targetMastered) {
      return { stroke: "rgba(34,197,94,1)", strokeWidth: 2 }; // 緑色
    } else if (sourceMastering && targetMastering) {
      return { stroke: "rgba(59,130,246,1)", strokeWidth: 2 }; // 青色
    }
    return { stroke: "gray", strokeWidth: 1 }; // デフォルト色
  };

  return (
    <section className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg text-black">グラフ</h2>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          style: getNodeStyle(node),
        }))}
        edges={edges.map((edge) => ({
          ...edge,
          style: getEdgeStyle(edge),
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className="text-black min-h-64"
      >
        <MiniMap />
        <Background />
      </ReactFlow>
    </section>
  );
};

export default Graph;
