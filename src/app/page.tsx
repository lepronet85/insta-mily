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
import { useCallback, useEffect, useState } from "react";
import dagre from "dagre";
import CustomEdge from "@/components/CustomEdge";
import { NodeCustomContextMenu } from "@/components/NodeCustomContextMenu";

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: {
      profilePic: "https://avatars.githubusercontent.com/u/1",
      profileId: 1,
    },
    type: "user",
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    type: "customEdge",
  },
];

const nodeTypes = {
  user: User,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 82;

import { Position } from "@xyflow/react";
import ProfileDetails from "@/components/ProfileDetails";
import EditProfileDetails from "@/components/EditProfileDetails";

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "TB"
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const Plan = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedElementType, setSelectedElementType] = useState<string | null>(
    null
  );
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const [selectedProfile, setSelectedProfile] = useState<Node | null>(null);
  const [showProfileDetails, setShowProfileDetails] = useState<boolean>(false);
  const [showEditProfileDetails, setShowEditProfileDetails] =
    useState<boolean>(false);

  const handleContextMenu = (
    event: React.MouseEvent,
    elementType: string,
    elementId?: string
  ) => {
    event.preventDefault();
    console.log("handleContextMenu", elementType);
    if (elementType !== "background") {
      event.stopPropagation();
    }
    setMenuPosition({ x: event.pageX, y: event.pageY });
    setSelectedElementType(elementType);
    setSelectedElementId(elementId || null);
    setMenuVisible(true);
  };

  const handleClick = () => {
    setMenuVisible(false);
    setSelectedElementType(null);
    setSelectedElementId(null);
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${Date.now()}`,
        type: "customEdge",
      };
      setEdges((prevEdges) =>
        addEdge({ ...edge, animated: edge.animated ?? true }, prevEdges)
      );
    },
    [edges]
  );

  const handleAddProfile = () => {
    const location = Math.random() * 500;
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `${Date.now()}`,
        data: {
          profilePic: `https://avatars.githubusercontent.com/u/${
            prevNodes.length + 1
          }`,
          profileId: prevNodes.length + 1,
        },
        type: "user",
        position: { x: location, y: location },
        targetPosition: Position.Top,
        sourcePosition: Position.Bottom,
      },
    ]);
  };

  const handleRemoveProfile = (nodeId: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    setEdges((prevEdges) =>
      prevEdges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      )
    );
  };

  const onLayout = useCallback(
    (direction: string) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  const handleShowProfileDetails = (elementId: string) => {
    setShowProfileDetails(true);
    const selectedElement = nodes.find((node) => node.id === elementId);
    console.log(selectedElement);
    setSelectedProfile(selectedElement || null);
  };

  const handleHideProfileDetails = () => {
    setShowProfileDetails(false);
    setSelectedProfile(null);
  };

  const handleShowEditProfileDetails = () => {
    setShowEditProfileDetails(true);
  };

  const handleHideEditProfileDetails = () => {
    setShowEditProfileDetails(false);
  };

  // useEffect(() => {
  //   console.log(nodes);
  // }, [nodes]);

  const renderContextMenu = (menuPosition: { x: number; y: number }) => {
    switch (selectedElementType) {
      case "background":
        return (
          <CustomContextMenu
            menuPosition={menuPosition}
            onAddProfile={handleAddProfile}
            onLayout={onLayout}
          />
        );
      case "node":
        return (
          <NodeCustomContextMenu
            menuPosition={menuPosition}
            onRemoveProfile={handleRemoveProfile}
            onShowEditProfile={handleShowEditProfileDetails}
            nodeId={selectedElementId || ""}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      onContextMenu={(e) => handleContextMenu(e, "background")}
      onClick={handleClick}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeContextMenu={(event, node) =>
          handleContextMenu(event, "node", node.id)
        }
        onNodeClick={(event, node) => handleShowProfileDetails(node.id)}
        fitView
      >
        <Background
          gap={16}
          size={1}
          color="#d9e2ec"
          style={{
            background: "linear-gradient(to right, #f0f4f8, #d9e2ec, #f0f4f8)",
          }}
        />
        <Controls />
      </ReactFlow>
      {menuVisible && renderContextMenu(menuPosition)}
      {showProfileDetails && (
        <ProfileDetails
          handleClose={handleHideProfileDetails}
          profile={selectedProfile}
        />
      )}
      {showEditProfileDetails && (
        <EditProfileDetails
          profile={{}}
          onSave={() => {}}
          handleClose={handleHideEditProfileDetails}
        />
      )}
    </div>
  );
};

export default Plan;
