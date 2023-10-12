import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import CreateAccountController from "../Controllers/Account/CreateAccountController.js";
import RetrieveAccountController from "../Controllers/Account/RetrieveAccountController.js";
import UpdateAccountController from "../Controllers/Account/UpdateAccountController.js";
import DeleteAccountController from "../Controllers/Account/DeleteAccountController.js";
import SearchAccountController from "../Controllers/Account/SearchAccountController.js";

const accountRoutes = Router();
const prisma = new PrismaClient();

accountRoutes.post("/create", async (req, res) => {
  const { accountId, name, password, dob } = req.body;

  const createAccountController = new CreateAccountController(prisma, req, res);

  await createAccountController.create(accountId, name, password, dob);
});

accountRoutes.get("/retrieve", async (req, res) => {
  const retrieveAccountController = new RetrieveAccountController(
    prisma,
    req,
    res
  );

  await retrieveAccountController.retrieve();
});

accountRoutes.put("/update", async (req, res) => {
  const { accountId, name, password, dob } = req.body;

  const updateAccountController = new UpdateAccountController(prisma, req, res);

  await updateAccountController.update(accountId, name, password, dob);
});

accountRoutes.delete("/delete", async (req, res) => {
  const { accountId } = req.body;

  const deleteAccountController = new DeleteAccountController(prisma, req, res);

  await deleteAccountController.delete(accountId);
});

accountRoutes.get("/search/:userId", async (req, res) => {
  const { userId } = req.params;

  const searchAccountController = new SearchAccountController(prisma, req, res);

  await searchAccountController.search(userId);
});

export default accountRoutes;
