import {
  SmoothStepEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import React from "react";
import { MdOutlineClear } from "react-icons/md";
import { Button } from "./ui/button";

export default function CustomEdge(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    // sourceHandle,
    // targetHandle,
  } = props;

  const { setEdges } = useReactFlow();

  // Utilisation de getSmoothStepPath pour générer le chemin de l'arête
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 20, // Vous pouvez ajuster le radius selon votre besoin
  });

  return (
    <>
      {/* Remplacez BezierEdge par SmoothStepEdge */}
      <SmoothStepEdge {...props} />
      <EdgeLabelRenderer>
        <Button
          variant="icon"
          className={`absolute text-red-500 pointer-events-auto bg-transparent`}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
          onClick={async () => {
            const edgeResponse = await fetch(
              `http://localhost:5000/api/edges/${id}`,
              {
                method: "DELETE",
              }
            );

            if (!edgeResponse.ok) {
              throw new Error("Erreur lors de la suppression du nœud");
            }

            setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
          }}
        >
          <MdOutlineClear />
        </Button>
      </EdgeLabelRenderer>
    </>
  );
}
