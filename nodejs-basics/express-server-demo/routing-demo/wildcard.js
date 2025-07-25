// wildcard.js
const express = require('express');
// const path = require('path');
const app = express();

// Serve any file under /files/*
app.get('/files/*splat', (req, res) => {
  res.send(`Pretend download of a file`);
});

// 404 catch‑all must come LAST
app.get('*splat', (req, res) => {
  res.status(404).send(`❌ Route ${req.originalUrl} not found`);
});

app.listen(3006, () => console.log('Wildcard routing on :3006'));
