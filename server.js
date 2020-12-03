const express = require("express");
const db = require("./database");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "Hello, World" });
});

server.get("/users", (req, res) => {
  const users = db.getUsers();

  if (users) {
    res.json(users);
  } else {
      res.status(500).json({
          errorMessage: "The users information could not be retrieved."
      })
  }
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "Can't find nuthin",
    });
  }
});

server.post("/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user.",
    });
  }

  const newUser = db.createUser({
    name: req.body.name,
    bio: req.body.bio,
  });

  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

server.put("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    const updatedUser = db.updateUser(user.id, {
      name: req.body.name || user.name,
    });

    res.json(updatedUser);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

server.delete("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    db.deleteUser(user.id);

    res.status(204).end();
    // res.json({
    //     message: "User deleted",
    // })
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

server.listen(8000, () => {
  console.log("server started at http://localhost:8000");
});
