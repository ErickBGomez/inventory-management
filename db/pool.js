const { Pool } = require("pg");
require("dotenv").config();

const { CONNECTION_STRING } = process.env;

module.exports = new Pool({
  connectionString: CONNECTION_STRING,
});
