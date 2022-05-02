const express = require('express');
const requirementController = require('../controllers/requirementController');
const router = express.Router();

/**
 * @swagger
 * tags:
 * - name: Requirement
 *   description: API for Requirements
 */

/**
 * @swagger
 * "/requirements":
 *   get:
 *     tags:
 *     - Requirement
 *     description: Get requirements
 *     produces:
 *     - application/json
 *     responses:
 *       '200':
 *         description: Returns the requirements
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/Requirements"
 *   post:
 *     tags:
 *     - Requirement
 *     description: Create a new requirement
 *     produces:
 *     - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             "$ref": "#/components/schemas/Requirement"
 *           example:
 *             title: "Requirement title"
 *             description: "Requirement content"
 *       required: true
 *     responses:
 *       '201':
 *         description: Returns the created requirement
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/Requirement"
 */

router
  .route('/')
  .get(requirementController.getRequirements)
  .post(requirementController.createRequirement);

/**
 * @swagger
 * "/requirements/{id}":
 *   get:
 *     tags:
 *     - Requirement
 *     description: Get a specific requirement
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Unique id of the requirement
 *       type: string
 *       required: true
 *     responses:
 *       '200':
 *         description: Returns the requirement
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/Requirement"
 *   patch:
 *     tags:
 *     - Requirement
 *     description: Update the requirement
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Unique id of the requirement
 *       type: string
 *       required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             "$ref": "#/components/schemas/Requirement"
 *           example:
 *             title: "Requirement title"
 *             description: "Requirement content"
 *       required: true
 *     responses:
 *       '201':
 *         description: Returns the updated requirement
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/Requirement"
 *   delete:
 *     tags:
 *     - Requirement
 *     description: Delete a specific requirement
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Unique id of the requirement
 *       type: string
 *       required: true
 *     responses:
 *       '204':
 *         description: Returns no content
 */

router
  .route('/:id')
  .get(requirementController.getRequirement)
  .patch(requirementController.updateRequirement)
  .delete(requirementController.deleteRequirement);

module.exports = router;
