const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/book');
const book = require('./models/book');

const app = express();
app.use(express.json()); 


mongoose.connect('mongodb://localhost:27017/demo', {}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error", err));


app.post('/book', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(book);
});


app.get('/book', async (req, res) => {
  const users = await User.find();
  res.send(book);
});


app.get('/book/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(book);
});


app.put('/book/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(book);
});


app.delete('/book/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: 'Book deleted' });
});

app.listen(2121, () => {
  console.log('Server running on http://localhost:2121');
});