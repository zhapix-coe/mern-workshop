const router = require('express').Router();

router.get('/', (req, res) => res.send('All products'));
router.get('/:sku', (req, res) => res.send(`Product SKU ${req.params.sku}`));

module.exports = router;

// http://localhost:3002/products