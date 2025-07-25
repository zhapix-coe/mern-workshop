// params.js
const express = require('express');
const app = express();

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.send(`User ID requested → ${id}`);
});

app.get('/posts/:year/:month', (req, res) => {
  const { year, month } = req.params;
  res.send(`Posts for ${month}/${year}`);
});

app.listen(3001, () => console.log('Parameterized routing on :3001'));
