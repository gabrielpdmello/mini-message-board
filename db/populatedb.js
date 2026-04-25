#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require('node:process');
// use arguments for connection string and ssl (optional)

const SQL = `
CREATE TABLE messages (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR ( 255 ),
   message VARCHAR (3000),
   added TIMESTAMPTZ
);

INSERT INTO messages (username, message, added)
VALUES 
('Amando', 'Hi there!', NOW()),
('Charles', 'Hello World!', NOW());
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `${argv[2]}`,
    ssl: argv[3] == 'ssl' ? true : false
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();