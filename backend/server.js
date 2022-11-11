const express = require('express');
const apiRoutes = require("./routes/api");
const bodyParser = require('body-parser');
require("./config/database").connect();

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Use Api routes in the App
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, function () {
  console.log(`Running TaskLog on port ${PORT}`);
});