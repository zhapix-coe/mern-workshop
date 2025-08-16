const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
    bookName: String,
    bookAuthor:String,
    bookPrice:Number
=======
    name: String,
    email:String,
    age:Number
>>>>>>> f222f3b1e449969c6a401ac3fa3ad9724e14b36b
});

module.exports = mongoose.model("User", userSchema);