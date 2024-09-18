"use client";

import { useRouter } from "next/navigation";
import { FaUsers, FaPlus } from "react-icons/fa";

const Family = () => {
  const router = useRouter();
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
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="familyCode"
            >
              Code de Famille
            </label>
            <div className="flex items-center border rounded-lg bg-gray-800">
              <FaUsers className="text-gray-400 ml-3" />
              <input
                type="text"
                id="familyCode"
                className="w-full px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Entrez le code de famille"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Rejoindre la Famille
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-blue-400 hover:text-blue-600 flex items-center justify-center"
              onClick={() => router.push("/family/create")}
            >
              <FaPlus className="mr-2" />
              Créer une Nouvelle Famille
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Family;
