const express = require('express');
const axios = require('axios');

// Initialize Express app
const app = express();

// FileMaker API Configurations for different layouts
const apiProperties = axios.create({
  baseURL: 'http://127.0.0.1/fmi/data/v1/databases/shepton-ownership1/layouts/API_Properties',
  auth: {
    username: 'Admin',
    password: 'R6[hjhnm',
  }
});

const apiOwnership = axios.create({
  baseURL: 'http://127.0.0.1/fmi/data/v1/databases/shepton-ownership1/layouts/API_Ownership',
  auth: {
    username: 'Admin',
    password: 'R6[hjhnm',
  }
});

const apiPolygons = axios.create({
  baseURL: 'http://127.0.0.1/fmi/data/v1/databases/shepton-ownership1/layouts/API_Polygons',
  auth: {
    username: 'Admin',
    password: 'R6[hjhnm',
  }
});

// Sample API endpoints
app.get('/properties', async (req, res) => {
  try {
    const response = await apiProperties.get('/records');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/ownership', async (req, res) => {
  try {
    const response = await apiOwnership.get('/records');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/polygons', async (req, res) => {
  try {
    const response = await apiPolygons.get('/records');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});