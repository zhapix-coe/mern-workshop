const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// Corrected import path for Participant model
// This assumes 'Participant.js' is in a 'models' folder directly within the same directory as 'server.js'
const Participant = require('./models/Participant'); 

const app = express();
const port = 3111; // Consistent port variable name

const MONGODB_URI = 'mongodb://localhost:27017/intern_management';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.post("/interns", async (req, res) => {
    try {
        const { internName, internEmail, internPhone, internStatus } = req.body;
        if (!internName || !internEmail || !internPhone || !internStatus) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const existingIntern = await Participant.findOne({ email: internEmail });
        if (existingIntern) {
            return res.status(409).json({ message: 'Intern with this email already exists.' });
        }
        const newIntern = new Participant({
            name: internName,
            email: internEmail,
            phone: internPhone,
            status: internStatus
        });
        await newIntern.save();
        res.status(201).json({
            // Corrected typo: removed 'c' and ensured correct string termination
            message: `Intern ${internName} added successfully!`, 
            intern: newIntern
        });
    } catch (error) {
        console.error('Error adding intern:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Duplicate email entry.' });
        }
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.get('/interns', async (req, res) => {
    try {
        const interns = await Participant.find({});
        res.status(200).json({
            data: interns,
            message: "Intern List Success"
        });
    } catch (error) {
        console.error('Error fetching interns:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.put("/interns/:id", async (req, res) => {
    try {
        const internId = req.params.id;
        const { internName, internEmail, internPhone, internStatus } = req.body;
        if (!internName || !internEmail || !internPhone || !internStatus) {
            return res.status(400).json({ message: 'All fields are required for update.' });
        }
        const updatedIntern = await Participant.findByIdAndUpdate(
            internId,
            {
                name: internName,
                email: internEmail,
                phone: internPhone,
                status: internStatus
            },
            { new: true }
        );
        if (!updatedIntern) {
            return res.status(404).json({ message: 'Intern not found.' });
        }
        res.status(200).json({
            message: `Intern ${updatedIntern.name} updated successfully!`,
            intern: updatedIntern
        });
    } catch (error) {
        console.error('Error updating intern:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.delete("/interns/:id", async (req, res) => {
    try {
        const internId = req.params.id;
        const deletedIntern = await Participant.findByIdAndDelete(internId);
        if (!deletedIntern) {
            return res.status(404).json({ message: 'Intern not found.' });
        }
        res.status(200).json({
            message: `Intern ${deletedIntern.name} deleted successfully!`
        });
    } catch (error) {
        console.error('Error deleting intern:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Listen on the 'port' variable
app.listen(port, () => { 
    console.log(`Server started at the port: ${port}`);
});
