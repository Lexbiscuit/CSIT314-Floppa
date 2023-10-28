import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import CreateAccountController from "../Controllers/Account/CreateAccountController.js";
import RetrieveAccountController from "../Controllers/Account/RetrieveAccountController.js";
import UpdateAccountController from "../Controllers/Account/UpdateAccountController.js";
import DeleteAccountController from "../Controllers/Account/DeleteAccountController.js";
import SearchAccountController from "../Controllers/Account/SearchAccountController.js";
import { authJwt } from "../Middleware/authJwt.js";

const accountRoutes = Router();
const prisma = new PrismaClient();

// accountRoutes.post("/create", auth, async (req, res) => {
accountRoutes.post("/create", [authJwt.verifyToken], async (req, res) => {
  const { name, profile, email, password, role, dob } = req.body;

  const createAccountController = new CreateAccountController(prisma, req, res);

  await createAccountController.createAccount(
    name,
    profile,
    email,
    password,
    role,
    dob
  );
});

// accountRoutes.get("/retrieve", auth, async (req, res) => {
accountRoutes.get("/retrieve", [authJwt.verifyToken], async (req, res) => {
  const retrieveAccountController = new RetrieveAccountController(
    prisma,
    req,
    res
  );

  await retrieveAccountController.retrieveAccounts();
});

// accountRoutes.put("/update", auth, async (req, res) => {
accountRoutes.put("/update", [authJwt.verifyToken], async (req, res) => {
  const { accountId, name, email, password, role, dob } = req.body;

  const updateAccountController = new UpdateAccountController(prisma, req, res);

  await updateAccountController.updateAccount(
    accountId,
    name,
    email,
    password,
    role,
    dob
  );
});

// accountRoutes.delete("/delete", auth, async (req, res) => {
accountRoutes.delete("/delete", [authJwt.verifyToken], async (req, res) => {
  const { accountId } = req.body;

  const deleteAccountController = new DeleteAccountController(prisma, req, res);

  await deleteAccountController.deleteAccount(accountId);
});

// accountRoutes.get("/search/:accountId", auth, async (req, res) => {
accountRoutes.get(
  "/search/:accountId",
  [authJwt.verifyToken],
  async (req, res) => {
    const { accountId } = req.params;

    const searchAccountController = new SearchAccountController(
      prisma,
      req,
      res
    );

    await searchAccountController.searchAccount(accountId);
  }
);

export default accountRoutes;
