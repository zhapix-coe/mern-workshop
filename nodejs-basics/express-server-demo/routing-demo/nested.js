// nested.js
const express = require('express');
const app = express();

const userRouter = express.Router();
const profileRouter = express.Router();

profileRouter
  .get('/', (_, res) => res.send('User profile ROOT'))
  .get('/bio', (_, res) => res.send('User bio'))
  .get('/photos', (_, res) => res.send('User photos'));

userRouter.get('/', (_, res) => res.send('All users'));
userRouter.use('/:id/profile', profileRouter);   // nested!

app.use('/users', userRouter);

app.listen(3005, () =>
  console.log('Nested routing on :3005 — try /users/42/profile/photos')
);



http://localhost:3005/users/42/profile/photos

// User Profiles