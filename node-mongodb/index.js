const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json()); // Parse JSON body

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/demo', {}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error", err));

// CREATE a user
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

// READ all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// READ single user by ID
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

// UPDATE a user
app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(user);
});

// DELETE a user
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: 'User deleted' });
});

app.listen(2121, () => {
  console.log('Server running on http://localhost:2121');
<<<<<<< HEAD
});
=======
});
>>>>>>> f222f3b1e449969c6a401ac3fa3ad9724e14b36b
