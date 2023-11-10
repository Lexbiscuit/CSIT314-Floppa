import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import CreateAccountController from "../Controllers/Account/CreateAccountController.js";
import RetrieveAccountController from "../Controllers/Account/RetrieveAccountController.js";
import UpdateAccountController from "../Controllers/Account/UpdateAccountController.js";
import SuspendAccountController from "../Controllers/Account/SuspendAccountController.js";
import UnsuspendAccountController from "../Controllers/Account/UnsuspendAccountController.js";
import SearchAccountController from "../Controllers/Account/SearchAccountController.js";
import { authJwt } from "../middleware/authJwt.js";

const accountRoutes = Router();
const prisma = new PrismaClient();

// accountRoutes.post("/create", [authJwt.verifyToken], async (req, res) => {
accountRoutes.post("/create", async (req, res) => {
  const account = req.body;

  const createAccountController = new CreateAccountController(prisma, req, res);
  await createAccountController.createAccount(account);
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
  const account = req.body;

  const updateAccountController = new UpdateAccountController(prisma, req, res);
  await updateAccountController.updateAccount(account);
});

// accountRoutes.post("/suspend", [authJwt.verifyToken], async (req, res) => {
accountRoutes.post("/suspend", async (req, res) => {
  const { accountId } = req.body;

  const suspendAccountController = new SuspendAccountController(
    prisma,
    req,
    res
  );
  await suspendAccountController.suspendAccount(accountId);
});

// accountRoutes.post("/unsuspend", [authJwt.verifyToken], async (req, res) => {
accountRoutes.post("/unsuspend", async (req, res) => {
  const { accountId } = req.body;

  const unsuspendAccountController = new UnsuspendAccountController(
    prisma,
    req,
    res
  );
  await unsuspendAccountController.unsuspendAccount(accountId);
});

// accountRoutes.get("/search", [authJwt.verifyToken], async (req, res) => {
accountRoutes.post("/search", async (req, res) => {
  const accountFilter = req.body;

  const searchAccountController = new SearchAccountController(prisma, req, res);
  await searchAccountController.searchAccounts(accountFilter);
});

export default accountRoutes;
