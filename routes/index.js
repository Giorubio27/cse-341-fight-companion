const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Fight Companion API!');
});

module.exports = router;