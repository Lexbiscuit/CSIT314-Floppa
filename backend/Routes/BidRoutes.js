import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import MngrRtrvBidCtrl from "../Controllers/Bid/MngrRtrvBidCtlr";
import auth from "../auth.cjs";

const bidRoutes = Router();
const prisma = new PrismaClient();

bidRoutes.get("/retrieve", async (req, res) => {
    new MngrRtrvBidCtrl(prisma, req, res).retrieveBids();
});



export default bidRoutes;
