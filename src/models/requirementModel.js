const { Schema, model } = require('mongoose');

const RequirementSchema = new Schema({
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
  '@context': {
    type: Schema({
      _id: { type: Schema.Types.ObjectId, select: false },
      title: String,
      description: String,
    }),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('Requirement', RequirementSchema);
