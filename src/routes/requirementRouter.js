const express = require('express');
const requirementController = require('../controllers/requirementController');
const router = express.Router();

router
  .route('/')
  .get(requirementController.getRequirements)
  .post(requirementController.createRequirement);

router
  .route('/:id')
  .get(requirementController.getRequirement)
  .patch(requirementController.updateRequirement)
  .delete(requirementController.deleteRequirement);

module.exports = router;
