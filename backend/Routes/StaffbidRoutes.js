import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import StaffRtrvBidCtlr from "../Controllers/StaffBid/StffRtrvBidsCtlr";
import StaffBidSlotCtlr from "../Controllers/StaffBid/StaffBidSlotCtlr";
import StaffUpdBidCtlr from "../Controllers/StaffBid/StaffUpdBidCtlr";
import StaffDltBidSlotCtlr from "../Controllers/StaffBid/StffDltBidSlotCtlr";
import StaffSrchBidCtlr from "../Controllers/StaffBid/StaffSrchBidCtlr";
import StaffRtrvAvailWrkslotCtlr from "../Controllers/StaffBid/StffRtrvAvailWrksltCtlr";
import StaffRtrvBidsRslt from "../Controllers/StaffBid/StffRtrvBidsRslt";
import CreateBidController from "../Controllers/StaffBid/StaffBidSlotCtlr";

const StaffbidRoutes = Router();
const prisma = new PrismaClient();

StaffbidRoutes.post("/create", async (req, res) => {
    const staffbid = req.body;

    const StaffcreateBidController = new CreateBidController(prisma, req, res);
    await StaffcreateBidController.createBid(staffbid);
});

StaffbidRoutes.get("/retrieve", async (req, res) => {
    const staffRtrvBidCtlr = new StaffRtrvBidCtlr(prisma, req, res);
    await staffRtrvBidCtlr.retrieveBids();
})

export default StaffbidRoutes;