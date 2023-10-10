import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import CreateProfileController from "./Controllers/CreateProfileController.js";

const prisma = new PrismaClient();
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users/create", async (req, res) => {
  new CreateProfileController(prisma).create(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
