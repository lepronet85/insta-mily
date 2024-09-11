import { Button } from "./ui/button";

export const CustomContextMenu = ({
  menuPosition,

  onAddProfile,
}: {
  menuPosition: { x: number; y: number };
  onAddProfile: () => void;
}) => {
  return (
    <div
      className="!absolute bg-gray-800 border border-gray-700 z-[1000] shadow-lg select-none"
      style={{ top: menuPosition.y, left: menuPosition.x }}
    >
      <ul className="list-none p-0 m-0">
        <li
          className="py-[8px] px-[12px] cursor-pointer hover:bg-gray-700 text-white"
          onClick={onAddProfile}
        >
          Add profile
        </li>
      </ul>
    </div>
  );
};
