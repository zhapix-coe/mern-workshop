const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    bookName: String,
    bookAuthor:String,
    bookPrice:Number
});

module.exports = mongoose.model("User", userSchema);