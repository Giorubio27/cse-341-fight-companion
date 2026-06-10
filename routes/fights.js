const express = require('express');
const router = express.Router();
const fightsController = require('../controllers/fights');

const { fightValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/auth");

// GET /fights - Retrieve all fights
router.get('/', fightsController.getAllFights);
// GET /fights/:id - Retrieve a specific fight by ID
router.get('/:id', fightsController.getFightById);

router.post('/',isAuthenticated, fightValidationRules(), validate, fightsController.createFight);

router.put('/:id',isAuthenticated, fightValidationRules(), validate, fightsController.updateFight);

router.delete('/:id',isAuthenticated, fightsController.deleteFight);

module.exports = router;