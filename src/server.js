const express = require('express');
const logger = require('./utils/logger');

const app = express();

app.listen(process.env.PORT ?? 3000, () => {
  logger.log('Server started on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
