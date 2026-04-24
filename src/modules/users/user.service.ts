import { pool } from "../../database/db";
import bcrypt from "bcryptjs"
const createUserIntoDb = async(payload: Record<string,unknown>) =>{
  const { name, email, password } = payload;

  const hashPassword = await bcrypt.hash(password as string ,10)

    const result = await pool.query(
      `
    INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *
    `,
      [name, email, hashPassword],
    );
    return result;
}

export const userService = {
  createUserIntoDb
}