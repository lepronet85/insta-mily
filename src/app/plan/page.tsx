"use client";

import { CustomContextMenu } from "@/components/CustomContextMenu";
import User from "@/components/User";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { profile: "https://avatars.githubusercontent.com/u/1" },
    type: "user",
  },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
  user: User,
};

const Plan = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();

    setMenuPosition({ x: event.pageX, y: event.pageY });
    setMenuVisible(true);
  };

  const handleClick = (event: MouseEvent) => {
    setMenuVisible(false);
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length + 1}`,
        // type: "customEdge",
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges]
  );

  const handleAddProfile = () => {
    const location = Math.random() * 500;
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `${prevNodes.length + 1}`,
        data: {
          profile: `https://avatars.githubusercontent.com/u/${
            prevNodes.length + 1
          }`,
        },
        type: "user",
        position: { x: location, y: location },
      },
    ]);
  };

  return (
    <div
      className="w-screen h-screen"
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {menuVisible && (
        <CustomContextMenu
          menuPosition={menuPosition}
          onAddProfile={handleAddProfile}
        />
      )}
    </div>
  );
};

export default Plan;
