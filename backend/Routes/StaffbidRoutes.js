import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import StaffRtrvBidCtlr from "../Controllers/StaffBid/StffRtrvBidsCtlr.js";
import StaffBidSlotCtlr from "../Controllers/StaffBid/StaffBidSlotCtlr.js";
import StaffUpdBidCtlr from "../Controllers/StaffBid/StaffUpdBidCtlr.js";
import StaffDltBidSlotCtlr from "../Controllers/StaffBid/StffDltBidSlotCtlr.js";
import StaffSrchBidCtlr from "../Controllers/StaffBid/StaffSrchBidCtlr.js";
//import StaffRtrvAvailWrkslotCtlr from "../Controllers/StaffBid/StffRtrvAvailWrksltCtlr.js";
import StffRtrvBidsRsltCtlr from "../Controllers/StaffBid/StffRtrvBidsRslt.js";

const StaffbidRoutes = Router();
const prisma = new PrismaClient();

StaffbidRoutes.post("/create", async (req, res) => {
    const staffbid = req.body;

    const StaffcreateBidController = new StaffBidSlotCtlr(prisma, req, res);
    await StaffcreateBidController.createBid(staffbid);
});

StaffbidRoutes.get("/retrieve", async (req, res) => {
    const staffRtrvBidCtlr = new StaffRtrvBidCtlr(prisma, req, res);
    await staffRtrvBidCtlr.retrieveBids();
})

StaffbidRoutes.get("/result", async (req, res) => {
    const staffRtrvBidResultCtlr = new StffRtrvBidsRsltCtlr(prisma, req, res);
    await staffRtrvBidResultCtlr.retrieveResults();
})

StaffbidRoutes.put("/update", async (req, res) => {
    const staffbid = req.body;

    const staffUpdBidCtlr = new StaffUpdBidCtlr(prisma, req, res);
    await staffUpdBidCtlr.updateBid(staffbid);
});

StaffbidRoutes.delete("/delete", async (req, res) => {
    const { bidId } = req.body;

    const staffDltBidSlotCtlr = new StaffDltBidSlotCtlr(prisma, req, res);
    await staffDltBidSlotCtlr.deleteBidSlot(bidId);
});

StaffbidRoutes.post("/search", async (req, res) => {
    const bid = req.body;

    const staffSrchBidCtlr = new StaffSrchBidCtlr(prisma, req, res);
    await staffSrchBidCtlr.searchStaffBid(bid);
});

export default StaffbidRoutes;