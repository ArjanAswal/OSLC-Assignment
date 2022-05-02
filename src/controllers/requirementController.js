const Requirement = require('../models/requirementModel');
const AppError = require('../utils/appError');
const jsonld = require('jsonld');

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
  const doc = {};
  const context = {};

  for (const [key, value] of Object.entries(req.body)) {
    context[`${key}`] = `http://schema.org/${key}`;
    doc[`http://schema.org/${key}`] = [
      {
        '@value': value,
      },
    ];
  }

  const compacted = await jsonld.compact(doc, context);

  const requirement = await Requirement.create(compacted);

  res.status(201).json({
    status: 'success',
    data: {
      requirement,
    },
  });
};

exports.updateRequirement = async (req, res, next) => {
  const doc = {};
  const context = {};

  for (const [key, value] of Object.entries(req.body)) {
    context[`${key}`] = `http://schema.org/${key}`;
    doc[`http://schema.org/${key}`] = [
      {
        '@value': value,
      },
    ];
  }

  const compacted = await jsonld.compact(doc, context);

  const requirement = await Requirement.findById(req.params.id);

  if (!requirement) {
    throw new AppError('Requirement does not exist', 404);
  }

  const newRequirement = await Requirement.updateOne(compacted);

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
