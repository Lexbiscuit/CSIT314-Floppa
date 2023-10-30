import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import LoginController from "../Controllers/LoginController.js";

const authRoutes = Router();
const prisma = new PrismaClient();

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginController = new LoginController(prisma, req, res);
    await loginController.loginAccount(email, password);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

export default authRoutes;
