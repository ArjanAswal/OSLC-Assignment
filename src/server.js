const app = require('./app');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err);
  process.exit(1);
});

mongoose
  .connect(process.env.MONGO_URL ?? 'mongodb://mongodb:27017/node')
  .then(() => {
    logger.info('MongoDB connection successful!');
  });

const port = process.env.PORT ?? 80;
const server = app.listen(port, () => {
  logger.info(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err);
  server.close(() => {
    process.exit(1);
  });
});

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint() {
  logger.info('👋 SIGINT RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('💥 Process terminated!');
  });
});

// quit properly on docker stop
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('💥 Process terminated!');
  });
});
