const { Schema, model, Types } = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Requirement:
 *       type: object
 *       required:
 *       - _id
 *       - title
 *       - description
 *       properties:
 *         _id:
 *           type: string
 *           uniqueItems: true
 *         title:
 *           type: string
 *           description: The title of the requirement
 *         description:
 *           type: string
 *           description: The description of the requirement
 *         createdAt:
 *           type: string
 *           description: The date the requirement was created
 *     Requirements:
 *       type: array
 *       "$ref": "#/components/schemas/Requirements"
 */

const RequirementSchema = new Schema(
  {
    _id: {
      type: String,
      default: new Types.ObjectId(),
    },
    title: {
      type: String,
      required: [true, 'Title cannot be empty!'],
      trim: true,
      maxlength: [50, 'Title cannot be longer than 50 characters!'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot be longer than 1000 characters!'],
    },
    '@context': {},
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

module.exports = model('Requirement', RequirementSchema);
