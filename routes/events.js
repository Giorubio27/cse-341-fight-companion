const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events');

const { eventValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/auth");

// GET /events - Retrieve all events
router.get('/', eventsController.getAllEvents);
// GET /events/:id - Retrieve a specific event by ID

router.get('/:id', eventsController.getEventById);

router.post('/', isAuthenticated, eventValidationRules(), validate, eventsController.createEvent);

router.put('/:id',isAuthenticated, eventValidationRules(), validate, eventsController.updateEvent);

router.delete('/:id', isAuthenticated, eventsController.deleteEvent);

module.exports = router;