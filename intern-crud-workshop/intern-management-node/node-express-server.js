const express = require("express");
const cors = require("cors");
const app = express();
const port = 3112;

const internList = [];

const TestIntern = {
  internId: 1,
  internName: "Samruthha",
  internEmail: "sam@gmail.com",
  internPhone: 9342015368,
  internStream: "FullStack",    
  internStatus: "Active",
};

const addIntern = (internDetail) => {
  internList.push(internDetail);
};

addIntern(TestIntern);

app.use(cors());
app.use(express.json());

// GET all interns
app.get("/interns", (req, res) => {
  res.set("content-type", "application/json");
  res.json({
    data: internList,
    message: "Intern List Success",
  });
});

// POST new intern
app.post("/interns", (req, res) => {
  console.log(req.body);

  const { internName, internEmail, internPhone, internStatus, internStream } = req.body;

  const newInternId = internList.length + 1;
  const newIntern = {
    internId: newInternId,
    internName,
    internEmail,
    internPhone,
    internStream: internStream || "N/A",  
    internStatus,
  };

  addIntern(newIntern);
  res.status(200).send({
    message: `Name: ${internName} is added successfully!`,
  });
});

// ✅ PUT update intern
app.put("/interns/:id", (req, res) => {
  console.log("Entering into Update Intern");

  const internId = parseInt(req.params.id);
  const { internName, internEmail, internPhone, internStatus, internStream } = req.body;

  const internData = internList.find((curintern) => curintern.internId == internId);
  if (!internData) {
    return res.status(404).json({ error: "Intern not found" });
  }

  internData.internName = internName;
  internData.internEmail = internEmail;
  internData.internPhone = internPhone;
  internData.internStream = internStream || "N/A";  
  internData.internStatus = internStatus;

  res.json({
    message: `Name: ${internName} is updated successfully!`,
  });
});

// DELETE intern
app.delete("/interns/:id", (req, res) => {
  const internId = req.params.id;
  const internIndex = internList.findIndex((curintern) => curintern.internId == internId);

  const deletedintern = internList.splice(internIndex, 1)[0];
  console.log("Deleted intern:", deletedintern);

  res.json({
    message: `Name: ${deletedintern.internName} is deleted successfully!`,
  });
});

app.listen(port, () => {
  console.log("Server started at port:", port);
});
