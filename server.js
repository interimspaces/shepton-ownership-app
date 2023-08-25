// Required Modules
const express = require('express');
const path = require('path');
const pool = require('./database');

// Initialisation
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Middleware
app.use(express.json());

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Main Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET all properties
app.get('/properties', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM PropertyTable');
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

// GET a single property by ID
app.get('/properties/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const { rows } = await pool.query('SELECT * FROM PropertyTable WHERE PropertyID = $1', [id]);
    res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// PUT - Update a property
app.put('/properties/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const property = req.body;

  // Your existing SQL update query
  const updateQuery = /* your SQL update query here */;

  try {
    await pool.query(updateQuery, Object.values(property).concat(id));
    res.status(200).send('Property updated successfully.');
  } catch (err) {
    next(err);
  }
});

// POST - Add a new owner
app.post('/owners', async (req, res, next) => {
  const owner = req.body;

  // Your existing SQL insert query
  const insertQuery = /* your SQL insert query here */;

  try {
    await pool.query(insertQuery, Object.values(owner));
    res.status(201).send('Ownership added successfully.');
  } catch (err) {
    next(err);
  }
});

// DELETE - Delete ownership history
app.delete('/owners/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const deleteQuery = 'DELETE FROM OwnershipTable WHERE OwnerID = $1';
  try {
    await pool.query(deleteQuery, [id]);
    res.status(200).send('Ownership history deleted successfully.');
  } catch (err) {
    next(err);
  }
});

// Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
