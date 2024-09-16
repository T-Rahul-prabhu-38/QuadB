require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./src/config/database');
const apiRoutes = require('./src/routes/api');
const cryptoService = require('./src/services/cryptoservice');

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', apiRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  cryptoService.startUpdateJob(); // Start the periodic update job
});