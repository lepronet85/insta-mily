import { Position } from "@xyflow/react";
import React, { useEffect, useState } from "react";
import CustomHandle from "./CustomHandle";
import { NodeProps } from "react-flow-renderer";

const User = ({ data: { profileId } }: NodeProps<{ profileId: string }>) => {
  const [user, setUser] = useState<any | null>();

  const fetchUserData = async () => {
    try {
      const userResponse = await fetch(
        `http://localhost:5000/api/users/${profileId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!userResponse.ok) {
        throw new Error(`Erreur: ${userResponse.statusText}`);
      }

      const userData = await userResponse.json();
      console.log(userData);
      setUser(userData);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    user && (
      <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl flex items-center justify-center rounded-xl transition-transform transform hover:scale-110 cursor-pointer">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
          <img
            src={`http://localhost:5000${user.profilePicture}`}
            className="w-full h-full object-cover"
          />
        </div>
        <CustomHandle type="target" position={Position.Top} />
        <CustomHandle type="source" position={Position.Bottom} />
      </div>
    )
  );
};

export default User;
