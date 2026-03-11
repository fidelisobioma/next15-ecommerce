// test-db.ts
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) FROM "Product"');
    console.log("Result:", result.rows);
    client.release();
    await pool.end();
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
