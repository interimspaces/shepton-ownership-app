// Required Modules
const express = require('express');
const path = require('path');
const pool = require('./database');

// Initialisation
const app = express();
const port = process.env.PORT || 3000;

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

// GET All Properties
app.get('/properties', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM PropertyTable'); // SQL query to get all properties
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

// GET Single Property by ID
app.get('/properties/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const { rows } = await pool.query('SELECT * FROM PropertyTable WHERE PropertyID = $1', [id]); // SQL query to get a single property
    res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT Update Property
app.put('/properties/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const propertyData = req.body;

  const updateQuery = 'UPDATE PropertyTable SET ... WHERE PropertyID = $1'; // Replace with actual SQL update query

  try {
    await pool.query(updateQuery, Object.values(propertyData).concat(id));
    res.status(200).send('Property updated successfully.');
  } catch (err) {
    next(err);
  }
});

// POST Add New Owner
app.post('/owners', async (req, res, next) => {
  const ownerData = req.body;

  const insertQuery = 'INSERT INTO OwnershipTable (...) VALUES (...)'; // Replace with actual SQL insert query

  try {
    await pool.query(insertQuery, Object.values(ownerData));
    res.status(201).send('Ownership added successfully.');
  } catch (err) {
    next(err);
  }
});

// DELETE Ownership History
app.delete('/owners/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const deleteQuery = 'DELETE FROM OwnershipTable WHERE OwnerID = $1'; // SQL query to delete an ownership record
  
  try {
    await pool.query(deleteQuery, [id]);
    res.status(200).send('Ownership history deleted successfully.');
  } catch (err) {
    next(err);
  }
});

// Use the error handler middleware
app.use(errorHandler);

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// SVG admin
app.post('/api/saveSVGIds', async (req, res, next) => {
  const { svgIds } = req.body; // Array of SVG element IDs
  
  try {
      // Insert IDs into the database
      await pool.query(
          'INSERT INTO SVGElements (element_id) VALUES ($1) ON CONFLICT (element_id) DO NOTHING', 
          [svgIds]
      );
      res.status(201).send('SVG IDs saved successfully.');
  } catch (err) {
      next(err);
  }
});

app.get('/api/getSVGIds', async (req, res, next) => {
  try {
      const { rows } = await pool.query('SELECT element_id FROM SVGElements');
      res.status(200).json(rows);
  } catch (err) {
      next(err);
  }
});

