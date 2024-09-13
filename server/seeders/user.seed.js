const User = require("../models/User");

const createUsers = async () => {
  try {
    const users = [
      {
        username: "john_doe",
        email: "john@example.com",
        password: "password123",
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        password: "password123",
      },
      {
        username: "mike_jones",
        email: "mike@example.com",
        password: "password123",
      },
      {
        username: "emma_white",
        email: "emma@example.com",
        password: "password123",
      },
      {
        username: "oliver_james",
        email: "oliver@example.com",
        password: "password123",
      },
      {
        username: "sophia_brown",
        email: "sophia@example.com",
        password: "password123",
      },
      {
        username: "liam_jackson",
        email: "liam@example.com",
        password: "password123",
      },
      {
        username: "ava_davis",
        email: "ava@example.com",
        password: "password123",
      },
      {
        username: "noah_wilson",
        email: "noah@example.com",
        password: "password123",
      },
      {
        username: "mia_johnson",
        email: "mia@example.com",
        password: "password123",
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log("10 utilisateurs créés:", createdUsers);
    return createdUsers;
  } catch (err) {
    console.error("Erreur lors de la création des utilisateurs:", err);
  }
};

module.exports = { createUsers };
