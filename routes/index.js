const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  res.send('Welcome to the Fight Companion API!');
});


router.use('/events', require('./events'));

router.use('/fights', require('./fights'));

module.exports = router;