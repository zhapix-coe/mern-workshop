// basic.js
const express = require('express');
const app = express();
/*
URL format
https://example.com
https://example.com/about

*/


app.get('/', (req, res) => res.send('🏠 Home page'));
app.get('/about', (req, res) => res.send('ℹ️ About page'));

app.listen(3000, () => console.log('Basic routing on http://localhost:3000'));

