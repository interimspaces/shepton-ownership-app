const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pool = require('/database');

// Middlewares
app.use(express.json());

// Routes
// GET all properties
app.get('/properties', (req, res) => {
  pool.query('SELECT * FROM properties', (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});

// GET a single property by ID
app.get('/properties/:id', (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM properties WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0]);
  });
});

// Other routes here...

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
