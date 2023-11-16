import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";
import jwt from "jsonwebtoken";

export default class StaffSrchBidCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async searchStaffBid(bidFilter) {
    const token = this.req.headers["x-access-token"];
    const { accountId } = jwt.verify(token, process.env.JWT_SECRET);

    const bids = new Bids(this.prisma);
    const response = await bids.searchStaffBid({ accountId, ...bidFilter });

    // 201 Created
    this.res.status(201).json(response);
  }
  catch({ message }) {
    this.res.status(500).send({ message });
  }
}
