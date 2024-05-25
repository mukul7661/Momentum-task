import type { Node, NodeTypes } from "reactflow";
import { CustomNode } from "./CustomNode";

export const nodeTypes = {
  "custom-node": CustomNode,
} satisfies NodeTypes;
