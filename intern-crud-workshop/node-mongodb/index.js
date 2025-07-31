const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();
app.use(express.json()); // Parse JSON body

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/demo', {}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error", err));

// CREATE a book
app.post('/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.send(book);
});

// READ all books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// READ single book by ID
app.get('/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.send(book);
});

// UPDATE a book
app.put('/books/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(book);
});

// DELETE a book
app.delete('/books/:id', async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  res.send({ message: 'Book deleted' });
});

app.listen(2121, () => {
  console.log('Server running on http://localhost:2121');
});