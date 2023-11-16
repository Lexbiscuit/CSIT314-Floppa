import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import StaffRtrvBidCtlr from "../Controllers/StaffBid/StffRtrvBidsCtlr.js";
import StaffBidSlotCtlr from "../Controllers/StaffBid/StaffBidSlotCtlr.js";
import StaffUpdBidCtlr from "../Controllers/StaffBid/StaffUpdBidCtlr.js";
import StaffDltBidSlotCtlr from "../Controllers/StaffBid/StffDltBidSlotCtlr.js";
import StaffSrchBidCtlr from "../Controllers/StaffBid/StaffSrchBidCtlr.js";
import StaffRtrvAvailWrkslotCtlr from "../Controllers/StaffBid/StffRtrvAvailWrksltCtlr.js";
import StffRtrvBidsRsltCtlr from "../Controllers/StaffBid/StffRtrvBidsRslt.js";
import { authJwt } from "../middleware/authJwt.js";

const staffbidRoutes = Router();
const prisma = new PrismaClient();
//staffbidroutes
staffbidRoutes.post("/create", async (req, res) => {
  const { workslotId } = req.body;

  const StaffcreateBidController = new StaffBidSlotCtlr(prisma, req, res);
  await StaffcreateBidController.createBid(workslotId);
});

staffbidRoutes.get("/retrieve", async (req, res) => {
  const staffRtrvBidCtlr = new StaffRtrvBidCtlr(prisma, req, res);
  await staffRtrvBidCtlr.retrieveBids();
});

staffbidRoutes.get("/result", [authJwt.verifyToken], async (req, res) => {
  // StaffbidRoutes.get("/result", async (req, res) => {
  const staffRtrvBidResultCtlr = new StffRtrvBidsRsltCtlr(prisma, req, res);
  await staffRtrvBidResultCtlr.retrieveResults();
});

staffbidRoutes.put("/update", async (req, res) => {
  const { bidId, newWorkslotId } = req.body;

  const staffUpdBidCtlr = new StaffUpdBidCtlr(prisma, req, res);
  await staffUpdBidCtlr.updateBid(bidId, newWorkslotId);
});

staffbidRoutes.delete("/delete", async (req, res) => {
  const { bidId } = req.body;

  const staffDltBidSlotCtlr = new StaffDltBidSlotCtlr(prisma, req, res);
  await staffDltBidSlotCtlr.deleteBidSlot(bidId);
});

staffbidRoutes.post("/search", async (req, res) => {
  const bidFilter = req.body;

  const staffSrchBidCtlr = new StaffSrchBidCtlr(prisma, req, res);
  await staffSrchBidCtlr.searchStaffBid(bidFilter);
});

staffbidRoutes.get("/availws", async (req, res) => {
  const staffRtrvAvailWrkslotCtlr = new StaffRtrvAvailWrkslotCtlr(
    prisma,
    req,
    res
  );
  await staffRtrvAvailWrkslotCtlr.staffRtrvAvailWS();
});

export default staffbidRoutes;
