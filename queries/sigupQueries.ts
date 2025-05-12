const pool = require('../db/pool');

async function signUp(username: string, email: string, hashedPassword: string): Promise<void> {
  const query = `
   INSERT INTO users (username, email, password_hash)
   VALUES ($1, $2, $3)
  `
  await pool.query(query, [username, email, hashedPassword]);
}

module.exports = {
  signUp
}


