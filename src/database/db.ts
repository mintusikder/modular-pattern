import { Pool } from "pg";

export const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_XzwfoqZSLx91@ep-late-lake-aokdti36-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=channel_binding",
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255),
        status VARCHAR(20) DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ Database Connected & Table Ready");
  } catch (error) {
    console.error("❌ DB Init Error:", error);
  }
};
