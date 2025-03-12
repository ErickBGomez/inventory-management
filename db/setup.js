const { Client } = require("pg");

require("dotenv").config();

const setup = async () => {
  const { CONNECTION_STRING } = process.env;

  const client = new Client({ connectionString: CONNECTION_STRING });

  console.log("Setting up data...");

  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS category (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(255) NOT NULL
    );`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS brand (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(255) NOT NULL,
      logo_url VARCHAR(255)
    );`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS watch (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(255) NOT NULL,
      price MONEY NOT NULL,
      description VARCHAR(255),
      image_url VARCHAR(255),
      category_id INTEGER REFERENCES category(id) NOT NULL,
      brand_id INTEGER REFERENCES brand(id) NOT NULL,
    );`);

  await client.end();

  console.log("Done!");
};

setup();
