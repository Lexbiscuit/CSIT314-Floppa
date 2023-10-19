import express from "express";
import accountRoutes from "./Routes/accountRoutes.js";
import profileRoutes from "./Routes/profileRoutes.js";
import workslotRoutes from "./Routes/workslotRoutes.js";
import { PrismaClient } from "@prisma/client";
import LoginController from "./Controllers/LoginController.js";
import auth from "./auth.cjs";

const app = express();
const port = 3000;
const prisma = new PrismaClient();

// -- middleware --
app.use(express.json()); // parses incoming requests with JSON payloads

// -- CORS --
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

app.all("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  new LoginController(prisma, req, res).loginAccount(email, password);
});

app.use("/accounts", accountRoutes);

app.use("/profiles", profileRoutes);

app.use("/workslots", workslotRoutes);

app.listen(port, () => {
  console.log(`CSIT314 "Team Floppa" Express.js app listening on port ${port}`);
});
