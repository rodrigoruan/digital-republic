const express = require('express');
require('dotenv').config();

const app = express();

const route = require('./routes/routes');

app.use(express.json());
app.use('/', route);

const PORT = process.env.PORT || 3000;

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
  });
}

module.exports = app;
