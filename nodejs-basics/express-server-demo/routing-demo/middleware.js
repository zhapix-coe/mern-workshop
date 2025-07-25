// middleware.js
const express = require('express');
const app = express();

// auth-like middleware (dummy)
function auth(req, res, next) {
  console.log("Inside Auth Validation....");
  next(); 
}

app.use('/admin', auth);           // applies to ALL /admin routes

app.get('/admin/dashboard', (req, res) => res.send('🔒 Admin dashboard'));
app.get('/admin/settings', (req, res) => res.send('⚙️ Admin settings'));

app.get('/user/check',(req,res)=>res.send('Non Admin user'))

app.listen(3003, () => console.log('Middleware routing on :3003'));
/*
http://localhost:3003/admin
http://localhost:3003/admin/dashboard
http://localhost:3003/admin/settings
*/