// router-app.js
const express = require('express');
const app = express();

const userRoutes = require('./routes/users');    // <-- modular file
const productRoutes = require('./routes/products');

app.use('/users', userRoutes);     // http://localhost:3002/users/...
app.use('/products', productRoutes);

app.get('/')


app.listen(3002, () => console.log('Modular routing on :3002'));

