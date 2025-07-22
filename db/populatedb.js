#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const env = process.argv[2];
const DATABASE_URL =
  env === "local"
    ? process.env.DATABASE_URL_LOCAL
    : process.env.DATABASE_URL_REMOTE;

if (!DATABASE_URL) {
  console.error("Missing DB URL for env: ${env}");
  process.exit(1);
}

const messages = [
  {
    id: 1,
    text: "Hi there!",
    username: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World",
    username: "Charles",
    added: new Date(),
  },
];

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text VARCHAR ( 255 ),
    username VARCHAR ( 255 ),
    added TIMESTAMP SET DEFAULT CURRENT_TIMESTAMP
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  // Insert seed messages
  for (const msg of messages) {
    await client.query(
      `INSERT INTO messages (text, username, added) VALUES ($1, $2, $3)`,
      [msg.text, msg.username, msg.added]
    );
  }
  await client.end();
  console.log("done");
}

main();
