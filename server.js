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
    pool.query('SELECT * FROM PropertyTable WHERE PropertyID = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    });
});

// Update a property
app.put('/properties/:id', async (req, res) => {
  const { id } = req.params;
  const propertyData = req.body.property;
  const query = `
    UPDATE PropertyTable SET
    PropertySVGID = $1,
    PropertyNumber = $2,
    PropertyName = $3,
    PropertyStreet = $4,
    PropertyTown = $5,
    PropertyPostCode = $6,
    PropertyWardLocation = $7,
    PropertyType = $8,
    PropertyCategory = $9,
    PropertyTenant = $10,
    PropertyOccupationStatus = $11,
    PropertyListedStatus = $12,
    PropertyConservationZone = $13,
    PropertyNotes = $14,
    PropertyPurchaseDate = $15,
    PropertyPurchaseAmount = $16
    WHERE PropertyID = $17;
  `;
  try {
    await pool.query(query, Object.values(propertyData).concat(id));
    res.status(200).json({ message: 'Property updated successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Could not update property' });
  }
});

// Add a new owner
app.post('/properties/:id/ownership', async (req, res) => {
  const { id } = req.params;
  const ownershipData = req.body;
  const query = `
    INSERT INTO OwnershipTable (PropertyID, ResolvedOwner, FreeholdOwner, LeaseholdOwner)
    VALUES ($1, $2, $3, $4);
  `;
  try {
    await pool.query(query, [id, ...Object.values(ownershipData)]);
    res.status(201).json({ message: 'Ownership added successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Could not add ownership' });
  }
});

// Delete ownership history
app.delete('/ownership/:ownerId', async (req, res) => {
  const { ownerId } = req.params;
  const query = 'DELETE FROM OwnershipTable WHERE OwnerID = $1;';
  try {
    await pool.query(query, [ownerId]);
    res.status(200).json({ message: 'Ownership deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Could not delete ownership' });
  }
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
