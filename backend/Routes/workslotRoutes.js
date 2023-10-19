import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import CreateWorkslotController from "../Controllers/Workslot/CreateWorkslotController.js";
import DeleteWorkslotController from "../Controllers/Workslot/DeleteWorkslotController.js";
import RetrieveWorkslotController from "../Controllers/Workslot/RetrieveWorkslotController.js";
import SearchWorkslotController from "../Controllers/Workslot/SearchWorkslotController.js";
import UpdateWorkslotController from "../Controllers/Workslot/UpdateWorkslotController.js";
import auth from "../auth.cjs";

const workslotRoutes = Router();
const prisma = new PrismaClient();

// workslotRoutes.post("/create", auth, async (req, res) => {
workslotRoutes.post("/create", async (req, res) => {
    const { date, baristas_required, cashiers_required, chefs_required, waiters_required } = req.body;
    new CreateWorkslotController(prisma, req, res).createWorkslot(
        date,
        baristas_required, 
        cashiers_required, 
        chefs_required, 
        waiters_required
    );
});

// workslotRoutes.get("/retrieve", auth, async (req, res) => {
workslotRoutes.get("/retrieve", async (req, res) => {
    new RetrieveWorkslotController(prisma, req, res).retrieveWorkslots();
});

// workslotRoutes.put("/update", auth, async (req, res) => {
workslotRoutes.put("/update", async (req, res) => {
    const { workslotId, date, baristas_required, cashiers_required, chefs_required, waiters_required } = req.body;
    new UpdateWorkslotController(prisma, req, res).updateWorkslot(
        workslotId,
        date,
        baristas_required,
        cashiers_required,
        chefs_required,
        waiters_required
    );
});

// workslotRoutes.delete("/delete", auth, async (req, res) => {
workslotRoutes.delete("/delete", async (req, res) => {
    const { workslotId } = req.body;
    new DeleteWorkslotController(prisma, req, res).deleteWorkslot(workslotId);
});

// workslotRoutes.get("/search/:workslotId", auth, async (req, res) => {
workslotRoutes.get("/search/:workslotId", async (req, res) => {
    const { workslotId } = req.params;
    new SearchWorkslotController(prisma, req, res).searchWorkslot(workslotId);
});

export default workslotRoutes;