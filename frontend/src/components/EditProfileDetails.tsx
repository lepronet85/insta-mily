import React, { useState, useEffect } from "react";
import { FaTimes, FaSave, FaPlus } from "react-icons/fa";

const EditProfileDetails = ({
  handleClose,
  profile,
  onSave,
}: {
  handleClose: () => void;
  profile: any;
  onSave: (updatedProfile: any) => void;
}) => {
  const [name, setName] = useState(profile.name || "");
  const [age, setAge] = useState(profile.age || "");
  const [relation, setRelation] = useState(profile.relation || "");
  const [images, setImages] = useState(profile.images || []);
  const [position, setPosition] = useState({
    x: window.innerWidth - 320 - 40,
    y: 40,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleAddImage = () => {
    setImages([...images, ""]);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleSave = () => {
    onSave({ name, age, relation, images });
    handleClose();
  };

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

  return (
    <div
      className="absolute w-80 h-auto bg-gray-800 shadow-lg rounded-lg p-4 text-white select-none"
      style={{ top: position.y, left: position.x }}
    >
      <div
        className="flex justify-between items-center mb-4 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-xl font-semibold">Modifier le Profil</h2>
        <button
          className="text-gray-400 hover:text-gray-200"
          onClick={handleClose}
        >
          <FaTimes />
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Nom</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Âge</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Relation</label>
        <input
          type="text"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Galerie d'Images</h3>
        {images.map((image: string, index: number) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="URL de l'image"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
        ))}
        <button
          className="flex items-center text-blue-400 hover:text-blue-200 mt-2"
          onClick={handleAddImage}
        >
          <FaPlus className="mr-2" />
          Ajouter une image
        </button>
      </div>
      <div className="flex justify-between items-center">
        <button
          className="flex items-center text-blue-400 hover:text-blue-200"
          onClick={handleSave}
        >
          <FaSave className="mr-2" />
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default EditProfileDetails;
