"use client";
import { useState } from "react";
import { FaUsers } from "react-icons/fa";

const Create = () => {
  const [familyName, setFamilyName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/families", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ familyName }),
      });

      if (!response.ok) {
        throw new Error(`Erreur: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Famille créée avec succès:", data);
      // Rediriger ou afficher un message de succès
    } catch (error) {
      console.error("Erreur lors de la création de la famille:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to right, #f0f4f8, #d9e2ec, #f0f4f8)",
      }}
    >
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className="text-4xl font-bold text-white mr-2">
              Insta
              <span className="text-4xl font-bold text-blue-400">Mily</span>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="familyName"
            >
              Nom de la Famille
            </label>
            <div className="flex items-center border rounded-lg bg-gray-800">
              <FaUsers className="text-gray-400 ml-3" />
              <input
                type="text"
                id="familyName"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Entrez le nom de la famille"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Créer la Famille
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
