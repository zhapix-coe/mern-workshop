const mongoose = require("mongoose");

// Define the schema for a Participant
const participantSchema = new mongoose.Schema({
    // 'name' field, required for all participants
    name: {
        type: String,
        required: true,
        trim: true // Removes whitespace from both ends of a string
    },
    // 'email' field, required and must be unique for each participant
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no two participants have the same email
        trim: true,
        lowercase: true // Converts email to lowercase before saving
    },
    // 'phone' field, required for all participants
    phone: {
        type: String,
        required: true,
        trim: true
    },
    // 'status' field, required for all participants (e.g., 'Active', 'Inactive')
    status: {
        type: String,
        required: true,
        trim: true
    },
    // 'createdAt' field, automatically set to the current date when a document is created
    createdAt: {
        type: Date,
        default: Date.now // Default value is the current timestamp
    }
});

// Export the Mongoose model.
// The model name is "Participant", which will automatically create a collection named "participants" in MongoDB.
module.exports = mongoose.model("Participant", participantSchema);
