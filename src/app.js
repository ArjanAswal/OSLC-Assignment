const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const compression = require('compression');

require('express-async-errors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const requirementRouter = require('./routes/requirementRouter');

const app = express();

app.enable('trust proxy');

// Global Middlewares

// Implement Cors
app.use(cors());
app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

// App Routes

app.use('/requirements', requirementRouter);

app.all('*', (req) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

app.use(globalErrorHandler);

module.exports = app;
