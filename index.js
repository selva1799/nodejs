const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Import and initialize the database connection
require('./database/database')();

// Middleware to parse URL-encoded bodies and JSON bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/api');

// Use the routes
app.use('/api', userRoutes);

// Start the server
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
