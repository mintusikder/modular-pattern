import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
  const result = await userService.createUserIntoDb(req.body);
    res.status(200).json({
      message: "user create success",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "user create failed",
      error: error.message,
    });
  }
};

export const userController = {
  createUser,
};
