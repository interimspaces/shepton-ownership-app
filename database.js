const { Pool } = require('pg'); // Importing the Pool object from the 'pg' module

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Using an environment variable to securely store the database URL
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool; // Exporting the pool object for use in other files

