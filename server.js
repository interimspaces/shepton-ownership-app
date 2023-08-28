const express = require('express');
const path = require('path');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/property-data', async (req, res) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  await client.connect();
  const result = await client.query('SELECT * FROM properties');
  await client.end();
  res.json(result.rows);
});

app.get('/api/svg', (req, res) => {
  res.sendFile(path.join(__dirname, 'path/to/your/svg/file.svg'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});