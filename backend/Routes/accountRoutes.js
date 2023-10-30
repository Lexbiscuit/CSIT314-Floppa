import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import CreateAccountController from "../Controllers/Account/CreateAccountController.js";
import RetrieveAccountController from "../Controllers/Account/RetrieveAccountController.js";
import UpdateAccountController from "../Controllers/Account/UpdateAccountController.js";
import DeleteAccountController from "../Controllers/Account/DeleteAccountController.js";
import SearchAccountController from "../Controllers/Account/SearchAccountController.js";
import { authJwt } from "../middleware/authJwt.js";

const accountRoutes = Router();
const prisma = new PrismaClient();

// accountRoutes.post("/create", [authJwt.verifyToken], async (req, res) => {
accountRoutes.post("/create", async (req, res) => {
  const { name, profileId, email, password, roleId, dob } = req.body;

  const createAccountController = new CreateAccountController(prisma, req, res);
  await createAccountController.createAccount(
    name,
    profileId,
    email,
    password,
    roleId,
    dob
  );
});

// accountRoutes.get("/retrieve", [authJwt.verifyToken], async (req, res) => {
accountRoutes.get("/retrieve", async (req, res) => {
  const retrieveAccountController = new RetrieveAccountController(
    prisma,
    req,
    res
  );
  await retrieveAccountController.retrieveAccounts();
});

// accountRoutes.put("/update", [authJwt.verifyToken], async (req, res) => {
accountRoutes.put("/update", async (req, res) => {
  const { accountId, name, profileId, email, password, roleId, dob } = req.body;

  const updateAccountController = new UpdateAccountController(prisma, req, res);
  await updateAccountController.updateAccount(
    accountId,
    name,
    profileId,
    email,
    password,
    roleId,
    dob
  );
});

// accountRoutes.delete("/delete", [authJwt.verifyToken], async (req, res) => {
accountRoutes.delete("/delete", async (req, res) => {
  const { accountId } = req.body;

  const deleteAccountController = new DeleteAccountController(prisma, req, res);
  await deleteAccountController.deleteAccount(accountId);
});

// accountRoutes.get("/search", [authJwt.verifyToken], async (req, res) => {
accountRoutes.get("/search", async (req, res) => {
  const accountFilter = req.query;

  const searchAccountController = new SearchAccountController(prisma, req, res);
  await searchAccountController.searchAccount(accountFilter);
});

export default accountRoutes;
