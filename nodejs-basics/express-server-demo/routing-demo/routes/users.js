const router = require('express').Router();

router.get('/', (req, res) => res.send('All users'));
router.post('/', (req, res) => res.send('Create user'));
router.get('/:id', (req, res) => res.send(`User ${req.params.id}`));

module.exports = router;

router.get('/') 
http://localhost:3002/users/


