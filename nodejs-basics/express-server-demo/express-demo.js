const express = require("express");
const app = express();
const port = 5252;

// Initialise userList to manage users
const userList = [];

// To add user data to the User List
const addUser = (userData) => {
  userList.push(userData);
};

// Sample user
const newUser = {
  userId: 1,
  userName: "John",
  userAge: 20,
};

addUser(newUser);

//Static images / font / css / html - CDN
app.use(express.static("public"));
app.use(express.json());

// Routing for the Endpoints
app.get("/", (req, res) => {
  res.send("Welcome to IRP program - ExpressJS Demo!");
});
// Read all users
app.get("/users", (req, res) => {
  res.json(userList);
});
// Create an user
app.post("/users", (req, res) => {
  const { userName, userAge } = req.body;
  const newUserId = userList.length + 1;
  addUser({ userId: newUserId, userName, userAge });
  res.status(200).send({ message: `Name:${userName} is added Succcessfully!` });
});

// To Update a User data. 
// http://zhapix.com/users/23.    ----> PUT
app.put("/users/:id", (req, res) => {
  console.log("Entering into Update User");
  
  const userId = parseInt(req.params.id);
  const { userName, userAge } = req.body;
  const userData = userList.find((curUser) => curUser.userId == userId);
  userData.userName = userName;
  userData.userAge = userAge;
  res.json({ message: `Name:${userName} is updated Succcessfully!` });
});

// To delete an user
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const userIndex = userList.findIndex((curUser) => curUser.userId == userId);

  const deletedUser = userList.splice(userIndex, 1)[0];
  console.log("deletedUser:",deletedUser);
  
  res.json({
      message: `Name:${deletedUser.userName} is deleted Succcessfully!`,
    });
  
});

// To Simulate an error route
app.get("/error", (req, res, next) => {
  const err = new Error("Something went wrong!");
  err.status = 500;
  next(err); // Pass error to the error handler
});

// Custom error handler middleware (must have 4 args)

const handleError = (err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

app.use(handleError);

app.listen(port, () => {
  console.log("Express Demo Server Started:::5252");
});
