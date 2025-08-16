const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Middleware to parse JSON

// ✅ MongoDB Connection (Make sure MongoDB is running locally)
mongoose.connect('mongodb://localhost:27017/booksDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Book Schema and Model
const bookSchema = new mongoose.Schema({
  bookName: String,
  bookAuthor: String,
  bookPrice: Number
});

const Book = mongoose.model('Book', bookSchema);

// ✅ CREATE a Book
app.post('/book', async (req, res) => {
  try {
    const book = new Book(req.body); // expects JSON body
    await book.save();
    res.status(201).send(book); // 201 Created
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// ✅ READ All Books
app.get('/book', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// ✅ READ a Book by ID
app.get('/book/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send({ message: "Book not found" });
    res.send(book);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// ✅ UPDATE a Book by ID
app.put('/book/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).send({ message: "Book not found" });
    res.send(book);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// ✅ DELETE a Book by ID
app.delete('/book/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send({ message: "Book not found" });
    res.send({ message: "Book deleted" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// ✅ Start the server
app.listen(2121, () => {
  console.log('🚀 Server is running on http://localhost:2121');
});
