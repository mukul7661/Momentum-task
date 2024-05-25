"use client";

import React, { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  BackgroundVariant,
  MarkerType,
  Viewport,
} from "reactflow";
import "reactflow/dist/style.css";
import * as d3 from "d3";
import { nodeTypes } from "@/components/nodes";

const transformData = (data: any): { nodes: any[]; edges: any[] } => {
  // Create a d3 hierarchy from the data
  const root = d3.hierarchy(data);

  // Create a tree layout with specified size
  const treeLayout = d3.tree().nodeSize([250, 500]);
  treeLayout(root);

  // Convert d3 hierarchy nodes to React Flow nodes
  const nodes = root.descendants().map((d, index) => {
    const a = d.data.function.split("/");

    return {
      // id: d.data.function,
      id: d.data.id,
      type: "custom-node",
      data: {
        label: d.data.name,
        fileName: a[a.length - 1].split(":")[0],
        dependentLibs: [d.data.function.split(":")[1]],
        params: d.data.params.map((param: any) => param.identifier),
        responseObject: d.data.response_object,
      },
      position: { x: d.y, y: d.x },
    };
  });

  // Convert d3 hierarchy links to React Flow edges
  const edges = root.links().map((link) => ({
    id: `${link.source.data.id}-${link.target.data.id}`, // Ensure the edge ID is unique
    // type: "custom",
    type: "step",
    source: link.source.data.id, // Source should be the parent's function ID
    target: link.target.data.id, // Target should be the child's function ID
    markerEnd: { type: MarkerType.Arrow },
  }));

  return { nodes, edges };
};

const defaultViewport: Viewport = { x: 0, y: 15, zoom: 3 };

interface FlowComponentProps {
  graphData: {
    function: string;
    name: string;
    params: string[];
    response_object: string;
    id: string;
  };
}

export const FlowComponent = ({ graphData }: FlowComponentProps) => {
  const [elements, setElements] = useState<{ nodes: any[]; edges: any[] }>({
    nodes: [],
    edges: [],
  });
  useEffect(() => {
    if (Object.keys(graphData).length === 0) return;
    const { nodes, edges } = transformData(graphData);
    setElements({ nodes, edges });
  }, [graphData]);

  return (
    <ReactFlowProvider>
      <div style={{ height: "100vh", width: "100vw" }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={elements.nodes}
          edges={elements.edges}
          fitView
          defaultViewport={defaultViewport}
        >
          <Background
            color="#222222"
            gap={60}
            variant={BackgroundVariant.Lines}
            className="bg-[#141A20]"
            lineWidth={0.5}
          />
          <Controls />
        </ReactFlow>
        <button className="bg-[#F27400] text-white fixed bottom-20 left-20 p-[6px] rounded-[4px] text-[14px]">
          + Add Methods
        </button>
      </div>
    </ReactFlowProvider>
  );
};
