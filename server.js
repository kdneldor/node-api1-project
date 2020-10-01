const express = require("express");
const db = require("./database");

const server = express();

server.use(express.json());

// GET REQUESTS
server.get("/users", (req, res) => {
  const users = db.getUsers();
  res.json(users);
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
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
    })
    res.status(201).json(newUser)

   if (!newUser) {
       res.status(400).json({
           errorMessage: "Please provide name and bio for the user."
       })
   }
})
// POST REQUEST

// DELETE REQUEST
server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  if (!user) {
      res.status(404).json({
          message: "The user with the specified ID does not exist."
      })
  }

  const removeUser = db.deleteUser(id)

  if (!removeUser) {
      res.status(204).json({
          message: "User was deleted.",
          user
      })
  }

  else {
      res.status(500).json({
          errorMessage: "The user could not be removed"
      })
  }

  
});
// DELETE REQUEST

// PUT REQUEST
server.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  if (user) {
    const updateUser = db.updateUser(id, {
      name: req.body.name,
    });
    res.json(updateUser);
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist",
    });
  }
});
// PUT REQUEST

// SERVER LISTENER
server.listen(8081, () => {
  console.log("server started");
});
// SERVER LISTENER
