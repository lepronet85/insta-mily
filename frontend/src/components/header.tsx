import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { FaUser, FaUsers, FaTimes } from "react-icons/fa";

const Header = ({ members, onRemoveMember, user, onLogout }) => {
  const [showMembers, setShowMembers] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [family, setFamily] = useState<any | null>(null);

  const handleToggleMembers = () => {
    setShowMembers(!showMembers);
  };

  const handleToggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  const fetchFamily = async () => {
    const token = getCookie("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/families/${user.family}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFamily(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFamily();
  }, []);

  return (
    <header className="bg-gray-900 p-4 flex justify-between items-center select-none">
      <div className="flex items-center">
        <div className="text-4xl font-bold text-white mr-2">
          Insta
          <span className="text-4xl font-bold text-blue-400">Mily</span>
        </div>
        {family && (
          <div className="ml-4 p-2 bg-blue-500 text-white rounded-lg text-lg font-semibold">
            {family.familyName}
          </div>
        )}
      </div>
      <div className="flex items-center">
        <div className="relative">
          <FaUsers
            className="text-white text-2xl cursor-pointer"
            onClick={handleToggleMembers}
          />
          {showMembers && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 z-50">
              <h3 className="text-gray-900 font-bold mb-2">Membres</h3>
              <ul>
                {members.map((member) => (
                  <li
                    key={member._id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>{member.name}</span>
                    <FaTimes
                      className="text-red-500 cursor-pointer"
                      onClick={() => onRemoveMember(member.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative ml-4">
          {!user?.profilePicture ? (
            <FaUser
              className="text-white text-2xl cursor-pointer"
              onClick={handleToggleUserInfo}
            />
          ) : (
            <img
              src={`http://localhost:5000${user?.profilePicture}`}
              alt="User Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={handleToggleUserInfo}
            />
          )}
          {showUserInfo && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-6 z-50">
              <div className="flex flex-col">
                {!user?.profilePicture ? (
                  <FaUser
                    className="w-16 h-16 rounded-full mb-4 self-center"
                    onClick={handleToggleUserInfo}
                  />
                ) : (
                  <img
                    src={`http://localhost:5000${user?.profilePicture}`}
                    alt="User Profile"
                    className="w-16 h-16 rounded-full mb-4 self-center"
                  />
                )}
                <h3 className="text-gray-900 font-bold mb-2">Profil</h3>
                <p className="text-gray-700 mb-2">Nom: {user.name}</p>
                <p className="text-gray-700 mb-2">
                  Email: <span className="text-xs">{user.email}</span>
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2">
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={onLogout}
                >
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
