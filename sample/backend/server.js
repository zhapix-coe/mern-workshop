const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose.connect("mongodb+srv://ws_user_01:Workshop123*@cluster0.7ucykqm.mongodb.net/mern-workshop");

// Schema
const EnrollmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});
``
// Model
const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

/**
 * ADD enrollment (POST)
 */
app.post("/enroll", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields required" });
  }

  const enrollment = new Enrollment(req.body);
  await enrollment.save();

  res.json({ message: "Enrollment added successfully" });
});

/**
 * READ enrollments (GET)
 */
app.get("/enroll", async (req, res) => {
  console.log('Inside get');
  
  const data = await Enrollment.find();
  res.json(data);
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
