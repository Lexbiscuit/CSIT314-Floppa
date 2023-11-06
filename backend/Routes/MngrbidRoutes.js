import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import ApproveBidController from "../Controllers/MngrBid/ApproveBidController.js";
import CreateBidController from "../Controllers/MngrBid/CreateBidController.js";
import MngrUpdBidCtlr from "../Controllers/MngrBid/MngrUpdBidCtlr.js";
import MngrRtrvAvailStaffCtlr from "../Controllers/MngrBid/MngrRtrvAvailStaffCtlr.js";
import MngrRtrvBidCtlr from "../Controllers/MngrBid/MngrRtrvBidCtlr.js";
import MngrRtrvStaffSlotCtrl from "../Controllers/MngrBid/MngrRtrvStaffSlotCtrl.js";
import MngrFltrAvailWSCtrl from "../Controllers/MngrBid/MngrFltrAvailWSCtrl.js";
import RejectBidController from "../Controllers/MngrBid/RejectBidController.js";
import SearchBidController from "../Controllers/MngrBid/SearchBidController.js";
import StaffRtrvBidCtlr from "../Controllers/MngrBid/StaffRtrvBidCtlr.js";
import { authJwt } from "../middleware/authJwt.js";

const bidRoutes = Router();
const prisma = new PrismaClient();

// --------------------- BID CRUS --------------------- //
// bidRoutes.get("/retrieve", [authJwt.verifyToken], async (req, res) => {
bidRoutes.get("/retrieve", async (req, res) => {
  const mngrRtrvBidCtlr = new MngrRtrvBidCtlr(prisma, req, res);
  await mngrRtrvBidCtlr.retrieveBids();
});

// bidRoutes.put("/update", [authJwt.verifyToken], async (req, res) => {
bidRoutes.put("/update", async (req, res) => {
  const bid  = req.body;
  const mngrUpdBidCtlr = new MngrUpdBidCtlr(prisma, req, res);
  await mngrUpdBidCtlr.updateBid(bid);
});

// bidRoutes.get("/search", [authJwt.verifyToken], async (req, res) => {
bidRoutes.post("/search", async (req, res) => {
  const bidFilter = req.body;

  const searchBidController = new SearchBidController(prisma, req, res);
  await searchBidController.searchBid(bidFilter);
});

// --------------------- BID/STAFF FILTERS --------------------- //
// bidRoutes.get("/availstaff", [authJwt.verifyToken], async (req, res) => {
bidRoutes.get("/availstaff", async (req, res) => {
  const mngrRtrvAvailStaffCtlr = new MngrRtrvAvailStaffCtlr(prisma, req, res);
  await mngrRtrvAvailStaffCtlr.rtrvStaff();
});

// bidRoutes.get("/availws", [authJwt.verifyToken], async (req, res) => {
bidRoutes.get("/availws", async (req, res) => {
  const mngrFltrAvailWSCtrl = new MngrFltrAvailWSCtrl(prisma, req, res);
  await mngrFltrAvailWSCtrl.rtrvAvailWs();
});

// bidRoutes.get("/staffslots", [authJwt.verifyToken], async (req, res) => {
bidRoutes.get("/staffslots", async (req, res) => { // to be edited and changed
  const mngrRtrvStaffSlotCtrl = new MngrRtrvStaffSlotCtrl(prisma, req, res);
  await mngrRtrvStaffSlotCtrl.viewWorkslots();
});

// bidRoutes.get("/staffbids/:accountId", [authJwt.verifyToken], async (req, res) => {
  bidRoutes.get("/staffbids/:accountId", async (req, res) => {
    const staffRtrvBidCtlr = new StaffRtrvBidCtlr(prisma, req, res);
    await staffRtrvBidCtlr.viewStaffBid();
  });

// --------------------- APPROVE/REJECT BIDS --------------------- //
// bidRoutes.put("/approve", [authJwt.verifyToken], async (req, res) => {
bidRoutes.put("/approve", async (req, res) => {
  const { bidId } = req.body;

  const approveBidController = new ApproveBidController(prisma, req, res);
  await approveBidController.approveBid(bidId);
});

// bidRoutes.put("/reject", [authJwt.verifyToken], async (req, res) => {
bidRoutes.put("/reject", async (req, res) => {
  const { bidId, reason } = req.body;

  const rejectBidController = new RejectBidController(prisma, req, res);
  await rejectBidController.rejectBid(bidId, reason);
});

// ---------------------- NOT IN USER STORY ---------------------- //
// bidRoutes.post("/create", [authJwt.verifyToken], async (req, res) => {
bidRoutes.post("/create", async (req, res) => {
  const bid = req.body;

  const createBidController = new CreateBidController(prisma, req, res);
  await createBidController.createBid(bid);
});

export default bidRoutes;
