const express = require("express");
const db = require("./database");

const server = express();

server.use(express.json());

// GET REQUESTS
server.get("/users", (req, res) => {
  const users = db.getUsers();
  res.json(users);

  if (!users) {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved.",
    });
  }
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }
});
// GET REQUESTS

// POST REQUEST
server.post("/users", (req, res) => {
  const { name, bio } = req.body;
  if (name && bio) {
    const newUser = db.createUser({
      name: req.body.name,
      bio: req.body.bio,
    });
    res.status(201).json(newUser).end();
  } else if (!name || !bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user.",
    });
  } else {
    res.status(500).json({
      message: "There was an error while saving the user to the database.",
    });
  }
});
// POST REQUEST

// DELETE REQUEST
server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  if (!user) {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }

  const removeUser = db.deleteUser(id);

  if (!removeUser) {
    res.status(200).json({
      message: "User was deleted.",
      user,
    });
  } else {
    res.status(500).json({
      errorMessage: "The user could not be removed",
    });
  }
});
// DELETE REQUEST

// PUT REQUEST
server.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUser = {
    name: req.body.name,
    bio: req.body.bio,
  };
  const user = db.updateUser(userId, updatedUser);

  if (!updatedUser.name || !updatedUser.bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user.",
    });
  } else if (!user) {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  } else if (user) {
    res.status(200).json({
      message: "Successfully updated user.",
      user,
    });
  } else {
    res.status(500).json({
      errorMessage: "The user information could not be modified.",
    });
  }
});
// PUT REQUEST

// SERVER LISTENER
server.listen(8081, () => {
  console.log("server started");
});
// SERVER LISTENER
