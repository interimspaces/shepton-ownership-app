const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pool = require('./database');

// Middlewares
app.use(express.json());

// GET all properties
app.get('/properties', (req, res) => {
  pool.query('SELECT * FROM PropertyTable', (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});

// GET a single property by ID
app.get('/properties/:id', (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM PropertyTable WHERE PropertyID = $1', [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0]);
  });
});

// Update a property
app.put('/properties/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const property = req.body; // Assumes the request body contains updated property details

  // Update the property in the PropertyTable
  const updateQuery = `
    UPDATE PropertyTable SET 
      PropertySVGID = $1, PropertyNumber = $2, PropertyName = $3,
      PropertyStreet = $4, PropertyTown = $5, PropertyPostCode = $6,
      PropertyWardLocation = $7, PropertyType = $8, PropertyCategory = $9,
      PropertyTenant = $10, PropertyOccupationStatus = $11, PropertyListedStatus = $12,
      PropertyConservationZone = $13, PropertyNotes = $14, PropertyPurchaseDate = $15,
      PropertyPurchaseAmount = $16
    WHERE PropertyID = $17
  `;

  pool.query(updateQuery, Object.values(property).concat(id), (error, results) => {
    if (error) throw error;
    res.status(200).send('Property updated successfully.');
  });
});

// Add a new owner
app.post('/owners', (req, res) => {
  const owner = req.body; // Assumes the request body contains new ownership details

  // Insert the new owner into the OwnershipTable
  const insertQuery = `
    INSERT INTO OwnershipTable (PropertyID, ResolvedOwner, FreeholdOwner, LeaseholdOwner)
    VALUES ($1, $2, $3, $4)
  `;

  pool.query(insertQuery, Object.values(owner), (error, results) => {
    if (error) throw error;
    res.status(201).send('Ownership added successfully.');
  });
});

// Delete ownership history
app.delete('/owners/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // Delete the ownership history record
  const deleteQuery = 'DELETE FROM OwnershipTable WHERE OwnerID = $1';
  
  pool.query(deleteQuery, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send('Ownership history deleted successfully.');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
