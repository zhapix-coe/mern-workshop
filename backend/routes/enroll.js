   const express = require('express');
   const router = express.Router();
   const Joi = require('joi');
   const Participant = require('../models/Participant');
   
   const schema = Joi.object({
     name: Joi.string().trim().min(2).max(150).required(),
     email: Joi.string().email().trim().lowercase().max(254).required(),
     phone: Joi.string().pattern(/^[0-9+\-\s()]{7,30}$/).required()
   });
   
   // POST /api/enroll  (create)
   router.post('/', async (req, res) => {
     try {
       const { error, value } = schema.validate(req.body);
       if (error) return res.status(400).json({ error: error.details[0].message });
   
       // Prevent duplicate email (unique index will also enforce)
       const exist = await Participant.findOne({ email: value.email });
       if (exist) return res.status(409).json({ error: 'Email already registered' });
   
       const p = new Participant(value);
       await p.save();
       res.status(201).json({ message: 'Enrollment successful', participant: { id: p._id, name: p.name, email: p.email, phone: p.phone } });
     } catch (err) {
       console.error('Enroll error', err);
       // Duplicate key fallback
       if (err.code === 11000) return res.status(409).json({ error: 'Email already registered' });
       res.status(500).json({ error: 'Internal server error' });
     }
   });
   
   // GET /api/enroll (public read - limited results, optional q)
   router.get('/', async (req, res) => {
     try {
       const { q } = req.query;
       let filter = {};
       if (q) {
         const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
         filter = { $or: [{ name: re }, { email: re }, { phone: re }] };
       }
       const items = await Participant.find(filter).sort({ createdAt: -1 }).limit(500);
       res.json(items);
     } catch (err) {
       console.error('List error', err);
       res.status(500).json({ error: 'Internal server error' });
     }
   });
   
   module.exports = router;
   
  