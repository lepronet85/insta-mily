"use client";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Create = () => {
  const [familyName, setFamilyName] = useState("");
  const { user, loading } = useUser();
  const router = useRouter();

  const handleCreateFamily = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = getCookie("token");

      if (!token) {
        console.error("Utilisateur non authentifié.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/families", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclure le token JWT
        },
        body: JSON.stringify({ familyName, id: user.id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Famille créée avec succès:", data);
        document.cookie = `familyCode=${data.family.code}; path=/; max-age=${
          7 * 24 * 60 * 60
        }; secure; samesite=strict`;
        router.push("/");
      } else {
        console.error("Erreur lors de la création de la famille.");
      }
    } catch (error) {
      console.error("Erreur lors de la création de la famille:", error);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

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
        <form onSubmit={handleCreateFamily}>
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
