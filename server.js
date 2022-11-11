const express = require('express');
const apiRoutes = require("./routes/api");
const bodyParser = require('body-parser');
const cors = require('cors')
require("./config/database").connect();

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

// Use Api routes in the App
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 8081;

if (process.env.ENV === 'test') {
  module.exports = app;
} else {
  app.listen(PORT, function () {
    console.log(`Running TaskLog on port ${PORT}`);
  });
}