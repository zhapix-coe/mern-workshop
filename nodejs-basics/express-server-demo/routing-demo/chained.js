// chained.js
const express = require('express');
const app = express();

app.route('/books')
  .get((_, res) => res.send('📚 List books'))
  .post((_, res) => res.send('➕ Add a book'))
  .delete((_, res) => res.send('🗑️ Delete all books'))

    

app.route('/books/:id')
  .get((req, res) => res.send(`📖 Book ${req.params.id}`))
  .put((req, res) => res.send(`✏️ Update book ${req.params.id}`))
  .delete((req, res) => res.send(`🗑️ Delete book ${req.params.id}`));

app.listen(3004, () => console.log('Chained routing on :3004'));
