const express = require('express');
const router = express.Router();
const fightsController = require('../controllers/fights');

// GET /fights - Retrieve all fights
router.get('/', fightsController.getAllFights);
// GET /fights/:id - Retrieve a specific fight by ID
router.get('/:id', fightsController.getFightById);

router.post('/', fightsController.createFight);

router.put('/:id', fightsController.updateFight);

router.delete('/:id', fightsController.deleteFight);

module.exports = router;