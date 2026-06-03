const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events');

const { eventValidationRules, validate } = require('../middleware/validate');

// GET /events - Retrieve all events
router.get('/', eventsController.getAllEvents);
// GET /events/:id - Retrieve a specific event by ID

router.get('/:id', eventsController.getEventById);

router.post('/', eventValidationRules(), validate, eventsController.createEvent);

router.put('/:id', eventValidationRules(), validate, eventsController.updateEvent);

router.delete('/:id', eventsController.deleteEvent);

module.exports = router;