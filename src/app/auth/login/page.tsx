import { FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

const Login = () => {
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
            <div className="text-4xl font-bold text-white mr-2">Insta</div>
            <div className="text-4xl font-bold text-blue-400">Mily</div>
          </div>
        </div>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center border rounded-lg bg-gray-800">
              <FaEnvelope className="text-gray-400 ml-3" />
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <div className="flex items-center border rounded-lg bg-gray-800">
              <FaLock className="text-gray-400 ml-3" />
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Mot de passe"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Se connecter
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-blue-400 hover:text-blue-600 flex items-center justify-center"
              onClick={() => (window.location.href = "/register")} // Remplacez par votre logique de navigation
            >
              <FaUserPlus className="mr-2" />
              Pas encore de compte ? Inscrivez-vous
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
