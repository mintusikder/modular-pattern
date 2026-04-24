import express, { json, Request, Response } from "express";
import { Pool } from "pg";
const app = express();
app.use(json());
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_XzwfoqZSLx91@ep-late-lake-aokdti36-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=channel_binding",
});

const initDB = async () => {
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
initDB();
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    //   console.log(body);
    const result = await pool.query(
      `
    INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *
    `,
      [name, email, password],
    );
    res.status(200).json({
      message: "user create success",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is the root route",
    path: req.path,
  });
});
app.listen(3000, () => {
  console.log("server is running 3000");
});
