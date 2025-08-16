const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const cors = require("cors");

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json()); // ✅ Parse JSON body

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));

/**
 * ROUTES
 */

// CREATE a user
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user); // ✅ return JSON
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err.message });
  }
});

// READ all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // ✅ send JSON array
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// READ single user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Invalid user ID", error: err.message });
  }
});

// UPDATE a user
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Error updating user", error: err.message });
  }
});

// DELETE a user
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted", user });
  } catch (err) {
    res.status(400).json({ message: "Error deleting user", error: err.message });
  }
});

// ✅ Start server
app.listen(2121, () => {
  console.log("🚀 Server running on http://localhost:2121");
});
