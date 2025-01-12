"use client";
import { ReactFlow, MiniMap, Background } from "@xyflow/react";
import { useCallback } from "react";
import dagre from "dagre";

import "@xyflow/react/dist/style.css";

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

  graph.setGraph({ rankdir: "TB" }); // TB = Top-Bottom (上から下)

  data.nodes.forEach((node) => {
    graph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  data.edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  dagre.layout(graph);

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

type GraphProps = {
  graphNode: {
    position: {
      x: number;
      y: number;
    };
    id: string;
    data: {
      label: string;
    };
  }[];
  graphEdge: {
    id: string;
    source: string;
    target: string;
  }[];
  nodeColor?: string[];
  edgeColor?: string[];
  children?: React.ReactNode;
  setModalOpen?: (isOpen: boolean) => void;
  setTechModalId?: (techId: number) => void;
};

const Graph = ({
  graphNode,
  graphEdge,
  nodeColor,
  edgeColor,
  children,
  setModalOpen,
  setTechModalId,
}: GraphProps) => {
  const getNodeStyle = (node: {
    position: {
      x: number;
      y: number;
    };
    id: string;
    data: {
      label: string;
    };
  }) => {
    switch (nodeColor?.[Number(node.id)]) {
      case "mastered":
        return {
          background: "rgba(34,197,94,1)",
          color: "white",
          border: "1px solid gray",
        };
      case "mastering":
        return {
          background: "rgba(59,130,246,1)",
          color: "white",
          border: "1px solid gray",
        };
      default:
        return {
          background: "white",
          color: "black",
          border: "1px solid gray",
        };
    }
  };

  const getEdgeStyle = (
    edge: {
      id: string;
      source: string;
      target: string;
    },
    index: number
  ) => {
    switch (edgeColor?.[index]) {
      case "mastered":
        return { stroke: "rgba(34,197,94,1)", strokeWidth: 2 };
      case "mastering":
        return { stroke: "rgba(59,130,246,1)", strokeWidth: 2 };
      default:
        return { stroke: "gray", strokeWidth: 1 };
    }
  };

  const positionedGraph = applyDagreLayout({
    nodes: graphNode,
    edges: graphEdge,
  });

  const handleNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    if (setModalOpen) {
      setModalOpen(true);
    }
    setTechModalId?.(Number(node.id));
  }, []);

  return (
    <ReactFlow
      nodes={positionedGraph.nodes.map((node) => ({
        id: node.id,
        position: node.position,
        data: { label: node.data.label },
        style: getNodeStyle(node),
      }))}
      edges={graphEdge.map((edge, index) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        style: getEdgeStyle(edge, index),
      }))}
      className="text-black min-h-64"
      onNodeClick={handleNodeClick}
      onConnect={() => {
        console.log("onConnect");
      }}
    >
      <MiniMap />
      <Background />
      {children}
    </ReactFlow>
  );
};

export default Graph;
