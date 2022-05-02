const Requirement = require('../models/requirementModel');
const AppError = require('../utils/appError');
require('express-async-errors');

exports.getRequirements = async (req, res, next) => {
  const requirements = await Requirement.find();

  res.status(200).json({
    status: 'success',
    data: {
      requirements,
    },
  });
};

exports.getRequirement = async (req, res, next) => {
  const requirement = await Requirement.findById(req.params.id);

  if (!requirement) {
    throw new AppError('requirement not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      requirement,
    },
  });
};

exports.createRequirement = async (req, res, next) => {
  const { title, description } = req.body;

  const requirement = await Requirement.create({
    title,
    description,
  });

  res.status(201).json({
    status: 'success',
    data: {
      requirement,
    },
  });
};

exports.updateRequirement = async (req, res, next) => {
  const { title, description } = req.body;

  const requirement = await Requirement.findById(req.params.id);

  if (!requirement) {
    throw new AppError('Requirement does not exist', 404);
  }

  const newRequirement = await Requirement.updateOne(
    { id: req.params.id },
    {
      title,
      description,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      requirement: newRequirement,
    },
  });
};

exports.deleteRequirement = async (req, res, next) => {
  const requirement = await Requirement.findById(req.params.id);

  if (!requirement) {
    throw new AppError('Requirement not found', 404);
  }

  await requirement.remove();

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
