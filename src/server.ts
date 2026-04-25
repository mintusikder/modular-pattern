import express, { json, Request, Response } from "express";
import { userRoute } from "./modules/users/user.route";
import { initDB } from "./database/db";

const app = express();
app.use(json());

app.use("/api/v1/users", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is the root route",
    path: req.path,
  });
});

const startServer = async () => {
  await initDB();
  app.listen(3000, () => {
    console.log("server is running on port 3000");
  });
};

startServer();
