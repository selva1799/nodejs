const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Import and initialize the database connection
require('./database/database')();

// Middleware to parse URL-encoded bodies and JSON bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const productRoutes = require('./routes/api');

// Use the routes
app.use('/api', productRoutes);

// Start the server
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
