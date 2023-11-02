import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import CreateWorkslotController from "../Controllers/Workslot/CreateWorkSlotController.js";
import DeleteWorkslotController from "../Controllers/Workslot/DeleteWorkslotController.js";
import RetrieveWorkslotController from "../Controllers/Workslot/RetrieveWorkslotController.js";
import SearchWorkslotController from "../Controllers/Workslot/SearchWorkslotController.js";
import UpdateWorkslotController from "../Controllers/Workslot/UpdateWorkslotController.js";
import { authJwt } from "../middleware/authJwt.js";

const workslotRoutes = Router();
const prisma = new PrismaClient();

// workslotRoutes.post("/create", [authJwt.verifyToken], async (req, res) => {
workslotRoutes.post("/create", async (req, res) => {
  const workslot = req.body;

  const createWorkslotController = new CreateWorkslotController(
    prisma,
    req,
    res
  );
  await createWorkslotController.createWorkslot(workslot);
});

// workslotRoutes.get("/retrieve", [authJwt.verifyToken], async (req, res) => {
workslotRoutes.get("/retrieve", async (req, res) => {
  const retrieveWorkslotController = new RetrieveWorkslotController(
    prisma,
    req,
    res
  );
  await retrieveWorkslotController.retrieveWorkslots();
});

// workslotRoutes.put("/update", [authJwt.verifyToken], async (req, res) => {
workslotRoutes.put("/update", async (req, res) => {
  const workslot = req.body;

  const updateWorkslotController = new UpdateWorkslotController(
    prisma,
    req,
    res
  );
  await updateWorkslotController.updateWorkslot(workslot);
});

// workslotRoutes.delete("/delete", [authJwt.verifyToken], async (req, res) => {
workslotRoutes.delete("/delete", async (req, res) => {
  const { workslotId } = req.body;

  const deleteWorkslotController = new DeleteWorkslotController(
    prisma,
    req,
    res
  );
  await deleteWorkslotController.deleteWorkslot(workslotId);
});

// workslotRoutes.get("/search", [authJwt.verifyToken], async (req, res) => {
workslotRoutes.post("/search", async (req, res) => {
  const workslotFilter = req.body;

  const searchWorkslotController = new SearchWorkslotController(
    prisma,
    req,
    res
  );
  await searchWorkslotController.searchWorkslot(workslotFilter);
});

export default workslotRoutes;
