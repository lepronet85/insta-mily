import React, { useState, useEffect } from "react";
import { FaTimes, FaSave, FaPlus, FaTrash, FaUpload } from "react-icons/fa";

const AddNode = ({
  handleClose,
  users,
  onSave,
}: {
  handleClose: () => void;
  users: any[];
  onSave: (newNode: any) => void;
}) => {
  const [isExistingUser, setIsExistingUser] = useState(true);
  const [selectedUser, setSelectedUser] = useState(users[0]?.id || "");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [images, setImages] = useState<string[]>([]);
  const [position, setPosition] = useState({
    x: window.innerWidth - 320 - 40,
    y: 40,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => prevImages.concat(fileArray));
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file); // Stocke le fichier dans l'état
      setProfileImagePreview(URL.createObjectURL(file)); // Prévisualisation
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImageFile) {
      console.error("Aucun fichier sélectionné.");
      return;
    }

    const formData = new FormData();
    formData.append("image", profileImageFile);

    try {
      const response = await fetch("http://localhost:5000/api/upload_file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement de l'image");
      }

      const data = await response.json();
      console.log("Image téléchargée avec succès:", data);

      // Vous pouvez enregistrer le chemin de l'image dans votre backend ici
      return data;
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    let data = null;
    if (!isExistingUser) {
      data = await uploadProfileImage();
    }

    const newNode = isExistingUser
      ? { userId: selectedUser }
      : {
          name,
          age: parseInt(age),
          description,
          profileImage: data.path,
          images,
        };
    onSave(newNode);
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
      className="absolute w-80 h-auto max-h-screen bg-gray-800 shadow-lg rounded-lg p-4 text-white select-none"
      style={{ top: position.y, left: position.x }}
    >
      <div
        className="flex justify-between items-center mb-4 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-xl font-semibold">Ajouter un Nœud</h2>
        <button
          className="text-gray-400 hover:text-gray-200"
          onClick={handleClose}
        >
          <FaTimes />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto scrollbar- scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Type de Nœud</label>
          <select
            value={isExistingUser ? "existing" : "new"}
            onChange={(e) => setIsExistingUser(e.target.value === "existing")}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="existing">Utilisateur Existant</option>
            <option value="new">Nouveau Utilisateur</option>
          </select>
        </div>
        {isExistingUser ? (
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">
              Sélectionner Utilisateur
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option></option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
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
              <label className="block text-gray-400 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white resize-none"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Profil</label>
              <div className="flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="hidden"
                  id="profileImageInput"
                />
                <label
                  htmlFor="profileImageInput"
                  className="flex items-center cursor-pointer text-blue-400 hover:text-blue-200"
                >
                  <FaUpload className="mr-2" />
                  Sélectionner une image
                </label>
              </div>
              {profileImagePreview && (
                <img
                  src={profileImagePreview}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full mt-2 mx-auto"
                />
              )}
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Galerie d'Images</h3>
              <div className="grid grid-cols-2 gap-2">
                {images.map((image: string, index: number) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <button
                      className="absolute top-0 right-0 mt-1 mr-1 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleAddImage}
                  className="hidden"
                  id="galleryImageInput"
                />
                <label
                  htmlFor="galleryImageInput"
                  className="flex items-center cursor-pointer text-blue-400 hover:text-blue-200"
                >
                  <FaPlus className="mr-2" />
                  Ajouter des images
                </label>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-between items-center mt-4">
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

export default AddNode;
