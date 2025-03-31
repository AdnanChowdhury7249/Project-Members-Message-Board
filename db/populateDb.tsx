#!/usr/bin/env node
require('dotenv').config({ path: '../.env' });
const { Client } = require('pg');
const bcrypt = require('bcrypt');


const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function main() {
  try {
    await client.connect();
    // Create Tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await client.query(`
    INSERT INTO users (username, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `, ['Adnan', 'adnanchowdhury7249@gmail.com', hashedPassword, 'superadmin']);

    const superAdminId = rows[0].id;

    await client.query(`
    INSERT INTO messages (user_id, content)
    VALUES 
    ($1, 'Welcome to the secret board!'),
    ($1, 'This is a message from Super Admin.');
  `, [superAdminId]);

    console.log(' Tables created and seeded with superadmin + messages.');

  } catch (error) {
    console.error('Error seeding database:', error);

  } finally {
    await client.end()
  }
}

main()
