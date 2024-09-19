import React, { useState } from "react";
import {
  FaComments,
  FaTimes,
  FaTrash,
  FaPaperPlane,
  FaArrowLeft,
  FaUserFriends,
  FaUser,
} from "react-icons/fa";

const MessageBox = ({ conversations, onSendMessage, onDeleteMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(selectedConversation.id, newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
        onClick={handleToggle}
      >
        <FaComments size={24} />
      </button>
      <div
        className={`bg-gray-800 text-white w-80 h-96 rounded-lg shadow-lg p-4 mt-2 transition-all duration-300 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{
          transformOrigin: "bottom right",
          width: isOpen ? "320px" : "0px",
          height: isOpen ? "384px" : "0px",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {selectedConversation ? (
              <button
                className="text-gray-400 hover:text-gray-200 mr-2"
                onClick={() => setSelectedConversation(null)}
              >
                <FaArrowLeft />
              </button>
            ) : (
              "Conversations"
            )}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-200"
            onClick={handleToggle}
          >
            <FaTimes />
          </button>
        </div>
        {!selectedConversation ? (
          <div className="overflow-y-auto max-h-80">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="p-2 hover:bg-gray-700 cursor-pointer rounded flex items-center"
                onClick={() => handleSelectConversation(conversation)}
              >
                <div className="mr-2">
                  {conversation.type === "family" ? (
                    <FaUserFriends size={20} className="text-green-500" />
                  ) : (
                    <FaUser size={20} className="text-blue-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{conversation.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {conversation.lastMessage}
                  </p>
                </div>
                <div className="text-gray-400 text-xs">
                  {new Date(conversation.lastMessageDate).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto max-h-64">
              {selectedConversation.messages.map((message) => (
                <div key={message.id} className="p-2 relative group rounded">
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(message.date).toLocaleString()}
                  </span>
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hidden group-hover:block"
                    onClick={() =>
                      onDeleteMessage(selectedConversation.id, message.id)
                    }
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-2 rounded bg-gray-700 text-white"
                  placeholder="Type a message..."
                />
                <button
                  className="ml-2 bg-blue-500 text-white p-2 rounded"
                  onClick={handleSendMessage}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
