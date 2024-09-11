import { Position } from "@xyflow/react";
import React from "react";
import CustomHandle from "./CustomHandle";
import { NodeProps } from "react-flow-renderer";

const User = ({ data: { profile } }: NodeProps<{ profile: string }>) => {
  return (
    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl flex items-center justify-center rounded-xl transition-transform transform hover:scale-110 cursor-pointer">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
        <img src={profile} className="w-full h-full object-cover" />
      </div>
      <CustomHandle type="target" position={Position.Top} />
      <CustomHandle type="source" position={Position.Bottom} />
    </div>
  );
};

export default User;
