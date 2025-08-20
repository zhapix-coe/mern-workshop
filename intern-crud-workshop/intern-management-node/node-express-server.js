const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const portNumber = 3111;
// Set the specific IP address you want the server to listen on
const host = '10.10.100.85'; 

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/demo')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error", err));

// Define the User schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    stream: String, 
    status: String,
    isGraduate: Boolean, 
    place: String 
});
const User = mongoose.model("User", userSchema);

// CREATE a user
app.post('/interns', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// READ all users
app.get('/interns', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// READ single user by ID
app.get('/interns/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// UPDATE a user
app.put('/interns/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE a user
app.delete('/interns/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send({ message: 'User deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Listen on the specific IP address and port
app.listen(portNumber, host, () => {
    console.log(`Server started for Demo:: ${host}:${portNumber}`);
});