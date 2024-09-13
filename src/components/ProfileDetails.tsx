import { Node } from "@xyflow/react";
import React, { useState } from "react";
import { FaTimes, FaEnvelope } from "react-icons/fa";

const ProfileDetails = ({
  handleClose,
  profile,
}: {
  handleClose: () => void;
  profile: Node | null;
}) => {
  const [position, setPosition] = useState({ x: 40, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      // Ensure the component stays within the viewport
      const boundedX = Math.max(0, Math.min(window.innerWidth - 320, newX));
      const boundedY = Math.max(0, Math.min(window.innerHeight - 320, newY));

      setPosition({
        x: boundedX,
        y: boundedY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  React.useEffect(() => {
    console.log(profile);
  }, []);

  return (
    <div
      className="absolute w-80 h-auto bg-gray-800 shadow-lg rounded-lg p-4 text-white select-none"
      style={{ top: position.y, left: position.x }}
    >
      <div
        className="flex justify-between items-center mb-4 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-xl font-semibold">Détails du Profil</h2>
        <button
          className="text-gray-400 hover:text-gray-200"
          onClick={handleClose}
        >
          <FaTimes />
        </button>
      </div>
      <div className="flex items-center mb-4">
        <img
          src={profile?.data.profilePic}
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-gray-400">Age: 30</p>
          <p className="text-gray-400">Relation: Cousin</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Galerie d'Images</h3>
        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {/* Placeholders for images */}
          <div className="w-full h-24 bg-gray-600 rounded-lg cursor-pointer overflow-hidden">
            <img
              src="https://avatars.githubusercontent.com/u/1"
              alt="Image 1"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-24 bg-gray-600 rounded-lg cursor-pointer overflow-hidden">
            <img
              src="https://avatars.githubusercontent.com/u/2"
              alt="Image 1"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-24 bg-gray-600 rounded-lg cursor-pointer overflow-hidden">
            <img
              src="https://avatars.githubusercontent.com/u/3"
              alt="Image 1"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-24 bg-gray-600 rounded-lg cursor-pointer overflow-hidden">
            <img
              src="https://avatars.githubusercontent.com/u/4"
              alt="Image 1"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-24 bg-gray-600 rounded-lg cursor-pointer overflow-hidden">
            <img
              src="https://avatars.githubusercontent.com/u/5"
              alt="Image 1"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-24 bg-gray-600 rounded-lg cursor-pointer overflow-hidden">
            <img
              src="https://avatars.githubusercontent.com/u/6"
              alt="Image 1"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-24 bg-gray-600 rounded-lg cursor-pointer overflow-hidden">
            <img
              src="https://avatars.githubusercontent.com/u/7"
              alt="Image 1"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-24 bg-gray-600 rounded-lg cursor-pointer overflow-hidden">
            <img
              src="https://avatars.githubusercontent.com/u/8"
              alt="Image 1"
              className="w-full h-full"
            />
          </div>
          <div className="w-full h-24 bg-gray-600 rounded-lg cursor-pointer overflow-hidden">
            <img
              src="https://avatars.githubusercontent.com/u/9"
              alt="Image 1"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button className="flex items-center text-blue-400 hover:text-blue-200">
          <FaEnvelope className="mr-2" />
          Envoyer un message
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
