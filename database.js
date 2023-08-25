const pool = require('./database.js');

const pool = new Pool({
  connectionString: process.env.shepton-ownership-app-60f62ab2a676.herokuapp.com/, // Replace with your Heroku PostgreSQL URL
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
