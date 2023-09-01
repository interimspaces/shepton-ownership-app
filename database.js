const axios = require('axios');

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

module.exports = {
  apiProperties,
  apiOwnership,
  apiPolygons
};