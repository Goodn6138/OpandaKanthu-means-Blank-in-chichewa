import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: true,
});

export { pool };

export async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        image TEXT,
        first_visit TIMESTAMP DEFAULT NOW(),
        last_visit TIMESTAMP DEFAULT NOW(),
        visit_count INTEGER DEFAULT 1
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS generations (
        id SERIAL PRIMARY KEY,
        user_email TEXT,
        filename TEXT,
        endpoint TEXT,
        status TEXT DEFAULT 'success',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
  } finally {
    client.release();
  }
}

export async function trackUser(
  email: string,
  name: string | null,
  image: string | null
) {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO users (email, name, image, first_visit, last_visit, visit_count)
       VALUES ($1, $2, $3, NOW(), NOW(), 1)
       ON CONFLICT (email) DO UPDATE SET
         last_visit = NOW(),
         visit_count = users.visit_count + 1,
         name = COALESCE(EXCLUDED.name, users.name),
         image = COALESCE(EXCLUDED.image, users.image)`,
      [email, name, image]
    );
  } finally {
    client.release();
  }
}

export async function logGeneration(
  userEmail: string | null,
  filename: string,
  endpoint: string,
  status: string = 'success'
) {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO generations (user_email, filename, endpoint, status)
       VALUES ($1, $2, $3, $4)`,
      [userEmail, filename, endpoint, status]
    );
  } finally {
    client.release();
  }
}
