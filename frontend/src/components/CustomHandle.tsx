import { Handle, HandleProps } from "@xyflow/react";

export default function CustomHandle(props: HandleProps) {
  return (
    <Handle
      {...props}
      style={{
        width: 1,
        height: 1,
        background: "#000",
        border: "1px solid #ccc",
      }}
    />
  );
}
