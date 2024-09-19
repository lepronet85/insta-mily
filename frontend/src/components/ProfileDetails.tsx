import { Node } from "@xyflow/react";
import { getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { FaTimes, FaEnvelope, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProfileDetails = ({
  handleClose,
  profile,
}: {
  handleClose: () => void;
  profile: Node | null;
}) => {
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState<any | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  const fetchUserData = async () => {
    const { profileId } = profile?.data;
    const token = getCookie("token");
    try {
      const userResponse = await fetch(
        `http://localhost:5000/api/users/${profileId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
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
  }, [profile]);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsFullscreen(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % user.gallery.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + user.gallery.length) % user.gallery.length
    );
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    user && (
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
            src={`http://localhost:5000${user.profilePicture}`}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-400">Age: {user.age}</p>
            <p className="text-gray-400">Relation: ?</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-400 text-justify">{user.description}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Galerie d'Images</h3>
          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {user.gallery.map((image: string, index: number) => (
              <div
                key={index}
                className="w-full h-24 bg-gray-600 rounded-lg cursor-pointer overflow-hidden"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={`http://localhost:5000${image}`}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button className="flex items-center text-blue-400 hover:text-blue-200">
            <FaEnvelope className="mr-2" />
            Envoyer un message
          </button>
        </div>

        {isFullscreen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={handleCloseFullscreen}
            >
              <FaTimes />
            </button>
            <button
              className="absolute left-4 text-white text-2xl"
              onClick={handlePrevImage}
            >
              <FaArrowLeft />
            </button>
            <img
              src={`http://localhost:5000${user.gallery[currentImageIndex]}`}
              alt={`Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute right-4 text-white text-2xl"
              onClick={handleNextImage}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default ProfileDetails;
