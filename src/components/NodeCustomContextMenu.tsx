export const NodeCustomContextMenu = ({
  menuPosition,
  nodeId,
  onRemoveProfile,
}: {
  menuPosition: { x: number; y: number };
  nodeId: string;
  onRemoveProfile: (id: string) => void;
}) => {
  return (
    <div
      className="!absolute bg-gray-800 border border-gray-700 z-[1000] shadow-lg select-none"
      style={{ top: menuPosition.y, left: menuPosition.x }}
    >
      <ul className="list-none p-0 m-0">
        <li
          className="py-[8px] px-[12px] cursor-pointer hover:bg-gray-700 text-white"
          onClick={() => onRemoveProfile(nodeId)}
        >
          Remove profile
        </li>
      </ul>
    </div>
  );
};
