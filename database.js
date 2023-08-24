const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Replace with your Heroku PostgreSQL URL
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
