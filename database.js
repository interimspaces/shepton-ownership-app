const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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