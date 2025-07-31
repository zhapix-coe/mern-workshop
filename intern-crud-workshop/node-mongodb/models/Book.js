const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    Bookname: String,
    Bookauthor:String,
    Bookprice:Number
});

module.exports = mongoose.model("Books", bookSchema);