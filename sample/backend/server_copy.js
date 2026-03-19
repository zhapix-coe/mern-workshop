const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


/**
 * READ enrollments (GET)
 */
app.get("/enroll", async (req, res) => {
  console.log('Received Get Request for Enrollment');
  res.json({
    message: "Get Request is procssed successfully"
  })
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
