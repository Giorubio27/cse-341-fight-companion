const router = require('express').Router();
const passport = require('passport')

router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//   res.send('Welcome to the Fight Companion API!');
// });

// CHANGE THIS IN routes/index.js
router.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username || 'User'}` : "Welcome to the Fight Companion API! You are currently logged out.");
});


router.use('/events', require('./events'));

router.use('/fights', require('./fights'));

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  })
})

module.exports = router;