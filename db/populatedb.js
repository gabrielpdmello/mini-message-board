#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require('node:process');
// use arguments for:
// role, password, host, port, db

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
    connectionString: `postgresql://${argv[2]}:${argv[3]}@${argv[4]}:${argv[5]}/${argv[6]}`,
    ssl: argv[4] == 'localhost' ? false : true
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();