import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import LoginController from "../Controllers/LoginController.js";

const authRoutes = Router();
const prisma = new PrismaClient();

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const loginController = new LoginController(prisma, req, res);

  try {
    await loginController.loginAccount(email, password);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  //   return res.status(200).json({ user: user, message: "Login Successful." });
});

export default authRoutes;
