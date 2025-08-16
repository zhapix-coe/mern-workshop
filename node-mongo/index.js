const express = require('express');
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookName: String,
  bookAuthor: String,
  bookPrice: Number
});
const Book = mongoose.model('Book', bookSchema);

const app = express();
app.use(express.json());

// Clean connection
mongoose.connect('mongodb://localhost:27017/booksDB')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// CREATE a book
app.post('/book', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.send(book);
});

// READ all books
app.get('/book', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// READ single book by ID
app.get('/book/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.send(book);
});

// UPDATE a book
app.put('/book/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(book);
});

// DELETE a book
app.delete('/book/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.send({ message: 'Book deleted' });
});

// Start the server
app.listen(2121, () => {
  console.log('Server running on http://localhost:2121');
});
