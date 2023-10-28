import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import ApproveBidController from "../Controllers/Bid/ApproveBidController.js";
import CreateBidController from "../Controllers/Bid/CreateBidController.js";
import MngrUpdBidCtlr from "../Controllers/Bid/MngrUpdBidCtlr.js";
import MngrRtrvStaffCtlr from "../Controllers/Bid/MngrRtrvStaffCtlr.js";
import MngrRtrvBidCtlr from "../Controllers/Bid/MngrRtrvBidCtlr.js";
import MngrRtrvStaffSlotCtrl from "../Controllers/Bid/MngrRtrvStaffSlotCtrl.js";
import RejectBidController from "../Controllers/Bid/RejectBidController.js";
import SearchBidController from "../Controllers/Bid/SearchBidController.js";
import auth from "../auth.cjs";

const bidRoutes = Router();
const prisma = new PrismaClient();

bidRoutes.put("/update/approve", async (req, res) => {
    const { bidId, accountId, workslotId, status } = req.body;

    const approveBidController = new ApproveBidController(prisma, req, res);

    await approveBidController.approveBid(
        bidId,
        accountId,
        workslotId,
        status,
    );
});

bidRoutes.post("/create", async (req, res) => {
    const { accountId, workslotId, status, reason } = req.body;

    const createBidController = new CreateBidController(
        prisma,
        req,
        res,)

    await createBidController.createBid(
        accountId,
        workslotId,
        status,
        reason,
    );
});


bidRoutes.get("/retrieve/staff", async (req, res) => {
    const mngrRtrvStaffCtlr = new MngrRtrvStaffCtlr(
        prisma,
        req,
        res,
    );

    await mngrRtrvStaffCtlr.retrieveStaffs();
});

bidRoutes.get("/retrieve/bid", async (req, res) => {
    const mngrRtrvBidCtlr = new MngrRtrvBidCtlr(
        prisma,
        req,
        res,
    );

    await mngrRtrvBidCtlr.retrieveBids();
});

bidRoutes.get("/retrieve/staffslot", async (req, res) => {
    const mngrRtrvStaffSlotCtrl = new MngrRtrvStaffSlotCtrl(
        prisma,
        req,
        res,
    );
    
    await mngrRtrvStaffSlotCtrl.viewStaffWithSLot();
});

bidRoutes.put("/update", async (req, res) => {
    const { bidId, accountId, profileId, } = req.body;

    const mngrUpdBidCtlr = new MngrUpdBidCtlr(prisma, req, res);

    await mngrUpdBidCtlr.updateBid(
        bidId,
        accountId,
    profileId,
    );
});


bidRoutes.put("/reject", async (req, res) => {
    const { bidId, accountId, workslotId, status, reason, } = req.body;

    const rejectBidController = new RejectBidController(prisma, req, res);

    await rejectBidController.rejectBid(
        bidId,
        accountId,
        workslotId,
        status,
        reason,);
});



bidRoutes.get("/search/:bidId", async (req, res) => {
    const { bidId, accountId, workslotId, status, } = req.params;

    const searchBidController = new SearchBidController(prisma, req, res);

    await searchBidController.searchBid(
        bidId,
        accountId,
        workslotId,
        status,);
});

export default bidRoutes;
