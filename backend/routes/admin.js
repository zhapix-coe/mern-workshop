   const express = require('express');
   const router = express.Router();
   const Participant = require('../models/Participant');
   const createCsvWriter = require('csv-writer').createObjectCsvWriter;
   const path = require('path');
   const fs = require('fs');
   const adminAuth = require('../middleware/adminAuth');
   
   // Admin: protected list all (no pagination for simplicity)
   router.get('/participants', adminAuth, async (req, res) => {
     try {
       const items = await Participant.find({}).sort({ createdAt: -1 }).lean();
       res.json(items);
     } catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Internal server error' });
     }
   });
   
   // Admin: export CSV
   router.get('/participants/export', adminAuth, async (req, res) => {
     try {
       const items = await Participant.find({}).sort({ createdAt: -1 }).lean();
       const tmpDir = path.join(__dirname, '..', 'tmp');
       if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
       const filePath = path.join(tmpDir, `participants_${Date.now()}.csv`);
       const csvWriter = createCsvWriter({
         path: filePath,
         header: [
           { id: '_id', title: 'ID' },
           { id: 'name', title: 'Name' },
           { id: 'email', title: 'Email' },
           { id: 'phone', title: 'Phone' },
           { id: 'createdAt', title: 'CreatedAt' }
         ]
       });
       await csvWriter.writeRecords(items);
       res.download(filePath, err => {
         if (err) console.error('Download error', err);
         // optionally cleanup file after some time or immediately:
         // fs.unlinkSync(filePath);
       });
     } catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Internal server error' });
     }
   });
   
   module.exports = router;
   
  