   const mongoose = require('mongoose');
   
   const participantSchema = new mongoose.Schema({
     name: { type: String, required: true, trim: true, maxlength: 150 },
     email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254, index: true },
     phone: { type: String, required: true, trim: true, maxlength: 30 },
     createdAt: { type: Date, default: Date.now }
   });
   
   // Unique index on email to prevent duplicate enrollments
   participantSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { email: { $exists: true } } });
   
   module.exports = mongoose.model('Participant', participantSchema);
   
  