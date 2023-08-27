// Required Modules
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const { generatePolygonID } = require('./database'); // Import the new function

// Initialisation
const app = express();
const port = process.env.PORT || 3000;

// Hardcoded connection string as a workaround
const connectionString = 'postgres://kcavgsmupzkxzi:72f1c5875dc878c63ece38475e7b345d9aa531eea9e297c4a68a71a68d8e141f@ec2-44-215-40-87.compute-1.amazonaws.com:5432/dao96376jl1cte';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Function to assign permanent IDs to polygons (removed)

pool.connect((err, client, done) => {
  if (err) return console.error(err);
  console.log('Connected to PostgreSQL');
  done();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON data
app.use(express.json());

// Error handling middleware function
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Main Page Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET All Polygons
app.get('/polygons', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM svgelements');
    const updatedRows = rows.map(row => {
      if (!row.svg_id) {
        row.svg_id = generatePolygonID();
        // Update database here
      }
      return row;
    });
    res.status(200).json(updatedRows);
  } catch (err) {
    next(err);
  }
});

// Existing routes...

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});