const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const portNumber = 3111;

// Middleware
app.use(cors());
app.use(express.json());

//  Connect to MongoDB (local or Atlas)
mongoose
  .connect("mongodb://127.0.0.1:27017/internDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// ✅ Define Schema
const internSchema = new mongoose.Schema({
  internId: Number,
  internName: String,
  internEmail: String,
  internPhone: Number,
  internStatus: String,
});

// ✅ Model
const Intern = mongoose.model("Intern", internSchema);

// ------------------- ROUTES -------------------

// GET all interns
app.get("/interns", async (req, res) => {
  try {
    const interns = await Intern.find();
    res.json({ data: interns, message: "Intern List Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a new intern
app.post("/interns", async (req, res) => {
  try {
    const { internName, internEmail, internPhone, internStatus } = req.body;

    // auto increment internId
    const lastIntern = await Intern.findOne().sort({ internId: -1 });
    const newInternId = lastIntern ? lastIntern.internId + 1 : 1;

    const newIntern = new Intern({
      internId: newInternId,
      internName,
      internEmail,
      internPhone,
      internStatus,
    });

    await newIntern.save();
    res.json({ message: `Intern ${internName} added successfully!`, data: newIntern });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE an intern
app.put("/interns/:id", async (req, res) => {
  try {
    const internId = parseInt(req.params.id);
    const { internName, internEmail, internPhone, internStatus } = req.body;

    const updatedIntern = await Intern.findOneAndUpdate(
      { internId: internId },
      { internName, internEmail, internPhone, internStatus },
      { new: true }
    );

    if (!updatedIntern) {
      return res.status(404).json({ message: "Intern not found" });
    }

    res.json({ message: `Intern ${updatedIntern.internName} updated successfully!`, data: updatedIntern });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE an intern
app.delete("/interns/:id", async (req, res) => {
  try {
    const internId = parseInt(req.params.id);
    const deletedIntern = await Intern.findOneAndDelete({ internId: internId });

    if (!deletedIntern) {
      return res.status(404).json({ message: "Intern not found" });
    }

    res.json({ message: `Intern ${deletedIntern.internName} deleted successfully!`, data: deletedIntern });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- START SERVER -------------------
app.listen(portNumber, () => {
  console.log(`🚀 Server running on http://localhost:${portNumber}`);
});
