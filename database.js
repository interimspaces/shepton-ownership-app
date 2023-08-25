const pool = require('./database.js');

const pool = new Pool({
  connectionString: process.env.kcavgsmupzkxzi:72f1c5875dc878c63ece38475e7b345d9aa531eea9e297c4a68a71a68d8e141f@ec2-44-215-40-87.compute-1.amazonaws.com:5432/dao96376jl1cte/, // Replace with your Heroku PostgreSQL URL
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
