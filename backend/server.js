   require('dotenv').config();
   const express = require('express');
   const mongoose = require('mongoose');
   const helmet = require('helmet');
   const cors = require('cors');
   const morgan = require('morgan');
   const enrollRoutes = require('./routes/enroll');
   const adminRoutes = require('./routes/admin');
   const path = require('path');
   
   const app = express();
   app.use(helmet());
   app.use(cors());
   app.use(express.json({ limit: '20kb' }));
   app.use(morgan('dev'));
   
   // API routes
   app.use('/api/enroll', enrollRoutes);
   app.use('/api/admin', adminRoutes);
   
   // Simple health check
   app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
   
   // static tmp for downloads (optional)
   app.use('/tmp', express.static(path.join(__dirname, 'tmp')));
   
   // Connect DB and start
   const PORT = process.env.PORT || 4000;
   const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/irp-enrollment';
   
   async function start() {
     try {
       await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
       console.log('MongoDB connected');
       app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
     } catch (err) {
       console.error('Failed to start server', err);
       process.exit(1);
     }
   }
   start();
  