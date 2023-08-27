const { Pool } = require('pg');

const pool = new Pool({
  connectionString = "postgres://kcavgsmupzkxzi:72f1c5875dc878c63ece38475e7b345d9aa531eea9e297c4a68a71a68d8e141f@ec2-44-215-40-87.compute-1.amazonaws.com:5432/dao96376jl1cte";
  ssl: {
    rejectUnauthorized: false
  }
});

// Function to assign permanent IDs to polygons
const assignPermanentIDs = async () => {
  try {
    const { rowCount } = await pool.query('SELECT * FROM PropertyTable');
    console.log(`Total records in PropertyTable: ${rowCount}`);
  } catch (err) {
    console.error(err);
  }
};

assignPermanentIDs();

module.exports = pool;