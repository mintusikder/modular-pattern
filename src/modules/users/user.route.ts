import { Request, Response, Router } from "express";
import { initDB, pool } from "../../database/db";


const router = Router();
initDB();
router.post("/", async (req: Request, res: Response) => {
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

export const userRoute = router;
