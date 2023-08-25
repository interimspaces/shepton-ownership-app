const pool = require('./database.js');

const pool = new Pool({
  connectionString: process.env.shepton-ownership-app, // Replace with your Heroku PostgreSQL URL
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
