import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import RetrieveBidController from "../Controllers/Bid/RetrieveBidController";
import auth from "../auth.cjs";
import RetrieveBidController from "../Controllers/Bid/RetrieveBidController";

const bidRoutes = Router();
const prisma = new PrismaClient();

bidRoutes.get("/retrieve", async (req, res) =>{
    const RetrieveBidController = new RetrieveBidController(
        prisma,
        req,
        res,
    )
    await RetrieveBidController.retrieveBids();
});

export default bidRoutes;