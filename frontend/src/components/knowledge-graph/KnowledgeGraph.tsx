import { useMemo } from "react";
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { Concept } from "../../types";
import ProgressBar from "../ui/ProgressBar";
function ConceptNode({ data }: { data: any }) {
  return (
    <div className={`graph-node ${data.status}`}>
      <Handle type="target" position={Position.Top} />
      <div className="graph-node-top">
        <span className="graph-dot" />
        <span>
          {data.status === "mastered"
            ? "MASTERED"
            : data.status === "weak"
              ? "WEAK"
              : data.status === "locked"
                ? "LOCKED"
                : "LEARNING"}
        </span>
      </div>
      <strong>{data.name}</strong>
      <div className="graph-mastery">
        <ProgressBar value={data.mastery * 100} thin />
        <b>{Math.round(data.mastery * 100)}%</b>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default function KnowledgeGraph({
  concepts,
  edges,
}: {
  concepts: Concept[];
  edges: { source: string; target: string }[];
}) {
  const nodes = useMemo(
    () =>
      concepts.map((c) => ({
        id: c.id,
        type: "concept",
        position: { x: c.x, y: c.y },
        data: c,
      })),
    [concepts],
  );

  const flowEdges = useMemo(
    () =>
      edges.map((e, i) => ({
        id: `e${i}`,
        source: e.source,
        target: e.target,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: "#92817a", strokeWidth: 1.4 },
      })),
    [edges],
  );

  return (
    <div className="graph-wrap">
      <ReactFlow
        nodes={nodes}
        edges={flowEdges}
        nodeTypes={{ concept: ConceptNode }}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={22} size={1} color="#d8c9bb" />
        <Controls />
        <MiniMap
          nodeColor={(n) =>
            n.data.status === "weak"
              ? "#362417"
              : n.data.status === "mastered"
                ? "#92817a"
                : "#f1dabf"
          }
        />
      </ReactFlow>
    </div>
  );
}
