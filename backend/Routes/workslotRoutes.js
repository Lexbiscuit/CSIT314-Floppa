import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import CreateWorkSlotController from "../Controllers/Profile/CreateWorkSlotController.js";
import DeleteWorkSlotController from "../Controllers/Profile/DeleteWorkSlotController.js";
import RetreiveWorkSlotController from "../Controllers/Profile/RetreiveWorkSlotController.js";
import SearchWorkSlotController from "../Controllers/Profile/SearchWorkSlotController.js";
import UpdateWorkSLotController from "../Controllers/Profile/UpdateWorkSLotController.js";
import auth from "../auth.cjs";

const WorkSlotRoutes = Router();
const prisma = new PrismaClient();

