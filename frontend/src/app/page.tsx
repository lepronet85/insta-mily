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
import { Position } from "@xyflow/react";
import ProfileDetails from "@/components/ProfileDetails";
import EditProfileDetails from "@/components/EditProfileDetails";
import AddNode from "@/components/AddNode";
import { getCookie } from "cookies-next";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import MessageBox from "@/components/MessageBox";

const initialNodes: Node[] = [
  // {
  //   id: "1",
  //   position: { x: 100, y: 100 },
  //   data: {
  //     profilePic: "https://avatars.githubusercontent.com/u/1",
  //     profileId: 1,
  //   },
  //   type: "user",
  // },
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
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [timeUp, setTimeUp] = useState(false);
  const [showAddNode, setShowAddNode] = useState(false);
  const router = useRouter();
  const { user, loading } = useUser();
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Famille",
      type: "family",
      lastMessage: "Salut tout le monde!",
      lastMessageDate: new Date(),
      messages: [
        { id: 1, text: "Salut tout le monde!", date: new Date() },
        { id: 2, text: "Comment ça va?", date: new Date() },
      ],
    },
    {
      id: 2,
      name: "Jean",
      type: "private",
      lastMessage: "À bientôt!",
      lastMessageDate: new Date(),
      messages: [
        { id: 1, text: "Salut Jean!", date: new Date() },
        { id: 2, text: "À bientôt!", date: new Date() },
      ],
    },
  ]);

  const handleSendMessage = (conversationId, message) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                { id: Date.now(), text: message, date: new Date() },
              ],
              lastMessage: message,
            }
          : conversation
      )
    );
  };

  const handleDeleteMessage = (conversationId, messageId) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: conversation.messages.filter(
                (message) => message.id !== messageId
              ),
            }
          : conversation
      )
    );
  };

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
    const selectedElement = nodes.find((node) => node.id === elementId);
    console.log(selectedElement);
    setSelectedProfile(selectedElement || null);
    setMenuVisible(true);
  };

  const handleClick = () => {
    setMenuVisible(false);
    setSelectedElementType(null);
    setSelectedElementId(null);
  };

  const onConnect = useCallback(
    async (connection: Connection) => {
      try {
        const token = getCookie("token");
        const response = await fetch("http://localhost:5000/api/edges", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify({
            from: connection.source,
            to: connection.target,
            relationshipType: "parent", // ou autre relation dynamique
          }),
        });

        if (!response.ok)
          throw new Error("Erreur lors de la création de l'edge");

        const data = await response.json();

        // Ajouter l'edge au frontend avec l'ID du backend
        const edge = {
          id: data._id,
          ...connection,
          animated: true,
          type: "customEdge",
        };
        setEdges((prevEdges) => addEdge(edge, prevEdges));
      } catch (error) {
        console.error("Erreur:", error);
      }
    },
    [edges]
  );

  const handleAddProfile = async (newNode: any) => {
    try {
      const token = getCookie("token");
      // Si l'utilisateur est nouveau, créez l'utilisateur d'abord
      let userId = newNode.userId;

      if (!userId) {
        // Création d'un nouvel utilisateur
        const username = (newNode.name.toLowerCase() + Date.now())
          .trim()
          .split(" ")
          .join("");

        const userResponse = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            username,
            name: newNode.name,
            email: username + "@example.com", // Remplacez par un email valide
            password: username, // Remplacez par un mot de passe sécurisé
            // family: "s",
            age: newNode.age,
            description: newNode.description,
            profilePicture: newNode.profileImage,
            gallery: newNode.images || [],
          }),
        });

        if (!userResponse.ok) {
          throw new Error("Failed to create user");
        }

        const userData = await userResponse.json();
        userId = userData._id; // Utilisez l'ID de l'utilisateur nouvellement créé
      }

      // Création du nœud en utilisant l'ID de l'utilisateur
      const nodeResponse = await fetch("http://localhost:5000/api/nodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          user: userId,
          dateOfBirth: newNode.dateOfBirth || null,
          dateOfDeath: newNode.dateOfDeath || null,
          gender: "male",
          relationships: newNode.relationships || [],
        }),
      });

      if (!nodeResponse.ok) {
        throw new Error("Failed to create node");
      }

      const nodeData = await nodeResponse.json();

      // Mise à jour des nœuds dans l'état si nécessaire
      setNodes((prevNodes) => [
        ...prevNodes,
        {
          id: nodeData._id,
          data: {
            profileId: userId,
          },
          type: "user",
          position: newNode.position || {
            x: Math.random() * 500,
            y: Math.random() * 500,
          },
          targetPosition: Position.Top,
          sourcePosition: Position.Bottom,
        },
      ]);
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  const handleEditProfile = async (updatedUser: any) => {
    try {
      const token = getCookie("token");
      console.log(updatedUser);
      // Mise à jour de l'utilisateur existant
      const userResponse = await fetch(
        `http://localhost:5000/api/users/${updatedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            name: updatedUser.name,
            age: updatedUser.age,
            description: updatedUser.description,
            profilePicture: updatedUser.profileImage,
            gallery: updatedUser.images || [],
          }),
        }
      );

      if (!userResponse.ok) {
        throw new Error("Failed to update user");
      }

      const userData = await userResponse.json();

      // Mise à jour de l'état des utilisateurs si nécessaire
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userData._id ? userData : user))
      );

      console.log("User updated successfully:", userData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleRemoveProfile = async (nodeId: string) => {
    const token = getCookie("token");
    try {
      // Supprimer tous les edges associés au nœud
      const edgeResponse = await fetch(
        `http://localhost:5000/api/edges/byNode/${nodeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      if (!edgeResponse.ok) {
        throw new Error("Erreur lors de la suppression des edges");
      }

      // Supprimer le nœud
      const nodeResponse = await fetch(
        `http://localhost:5000/api/nodes/${nodeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      if (!nodeResponse.ok) {
        throw new Error("Erreur lors de la suppression du nœud");
      }

      // Mettre à jour l'état des nœuds et des edges dans React
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
      setEdges((prevEdges) =>
        prevEdges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId
        )
      );

      console.log("Nœud et edges supprimés avec succès.");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du nœud et des edges:",
        error
      );
    }
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

  const handleShowEditProfileDetails = (elementId: string) => {
    setShowEditProfileDetails(true);
  };

  const handleHideEditProfileDetails = () => {
    setShowEditProfileDetails(false);
  };

  const handleShowAddNode = () => {
    setShowAddNode(true);
  };

  const handleHideAddNode = () => {
    setShowAddNode(false);
  };

  const fetchUsers = async () => {
    const token = getCookie("token");
    const res = await fetch("http://localhost:5000/api/users", {
      next: { revalidate: 10 },
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const users = await res.json();

    setUsers(users);
    console.log(users);
  };

  const fetchNodesAndEdges = async () => {
    try {
      // Récupérer les Nodes
      const token = getCookie("token");
      const resNodes = await fetch("http://localhost:5000/api/nodes", {
        next: { revalidate: 10 },
        headers: {
          Authorization: token,
        },
      });

      if (!resNodes.ok) {
        throw new Error("Failed to fetch nodes");
      }

      const bdNodes = await resNodes.json();

      // Vérifier que bdNodes est un tableau et qu'il contient des éléments
      if (Array.isArray(bdNodes) && bdNodes.length > 0) {
        const transformedNodes = bdNodes
          .map((node, index) => {
            if (node && node._id) {
              // Vérifier que node et node._id existent
              return {
                id: node._id,
                position: { x: 100, y: 100 * index },
                data: {
                  profileId: node.user._id,
                },
                type: "user",
              };
            }
            return null; // ou gérez le cas où node est invalide
          })
          .filter((node) => node !== null); // Filtrer les nœuds invalides

        // Mettre à jour l'état
        setNodes(transformedNodes);
        console.log(transformedNodes);
      } else {
        // Pas de nœuds à traiter
        setNodes([]);
      }

      // Récupérer les Edges
      const resEdges = await fetch("http://localhost:5000/api/edges", {
        next: { revalidate: 10 },
        headers: {
          Authorization: token,
        },
      });

      if (!resEdges.ok) {
        throw new Error("Failed to fetch edges");
      }

      const bdEdges = await resEdges.json();

      // Vérifier que bdEdges est un tableau et qu'il contient des éléments
      if (Array.isArray(bdEdges) && bdEdges.length > 0) {
        const transformedEdges = bdEdges
          .map((edge) => {
            if (edge && edge._id && edge.from && edge.to) {
              // Vérifier que edge et ses propriétés existent
              return {
                id: edge._id,
                source: edge.from._id,
                target: edge.to._id,
                type: "customEdge",
              };
            }
            return null; // ou gérez le cas où edge est invalide
          })
          .filter((edge) => edge !== null); // Filtrer les arêtes invalides

        // Mettre à jour l'état
        setEdges(transformedEdges);
        console.log(transformedEdges);
      } else {
        // Pas d'arêtes à traiter
        setEdges([]);
      }

      // Mettre à jour l'état de chargement
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchNodesAndEdges();
    if (!isLoading) {
      setTimeout(() => {
        setTimeUp(true);
        onLayout("TB");
      }, 1000);
    }
  }, [isLoading]);

  const renderContextMenu = (menuPosition: { x: number; y: number }) => {
    switch (selectedElementType) {
      case "background":
        return (
          <CustomContextMenu
            menuPosition={menuPosition}
            onAddProfile={handleShowAddNode}
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
    !isLoading &&
    timeUp && (
      <div
        className="w-screen h-screen overflow-hidden relative"
        onContextMenu={(e) => handleContextMenu(e, "background")}
        onClick={handleClick}
      >
        <Header members={users} onRemoveMember={() => {}} user={user} />
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
              background:
                "linear-gradient(to right, #f0f4f8, #d9e2ec, #f0f4f8)",
            }}
          />
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
            profileId={selectedProfile?.data.profileId}
            onSave={handleEditProfile}
            handleClose={handleHideEditProfileDetails}
          />
        )}
        {showAddNode && (
          <AddNode
            handleClose={handleHideAddNode}
            onSave={handleAddProfile}
            users={users || []}
          />
        )}
        <MessageBox
          conversations={conversations}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
        />
      </div>
    )
  );
};

export default Plan;
