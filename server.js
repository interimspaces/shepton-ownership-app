const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// JSON middleware
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

// Get all properties
app.get('/properties', (req, res) => {
  pool.query('SELECT * FROM PropertyTable', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// Get individual property by ID
app.get('/properties/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM PropertyTable WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    });
});

// Update a property
app.put('/properties/:id', (req, res) => {
  // Code to update property in the database
});

// Delete a property
app.delete('/properties/:id', (req, res) => {
  // Code to delete property from the database
});

// Add a new owner
app.post('/owners', (req, res) => {
  // Code to insert a new owner into the database
});

// Send index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
