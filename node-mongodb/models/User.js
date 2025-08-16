const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({
    internId: Number,
    internName: String,
    internEmail: String,
    internPhone: Number,
    internStatus: String
});

module.exports = mongoose.model("Intern", internSchema);
