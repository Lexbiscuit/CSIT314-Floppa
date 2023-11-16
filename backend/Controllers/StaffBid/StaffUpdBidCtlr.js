import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";
import jwt from "jsonwebtoken";

export default class StaffUpdBidCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateBid(bidId, newWorkslotId) {
    try {
      const token = this.req.headers["x-access-token"];
      const { accountId } = jwt.verify(token, process.env.JWT_SECRET);
      const bids = new Bids(this.prisma);
      const response = await bids.updateBidStaff(
        bidId,
        accountId,
        newWorkslotId
      );

      // 200 OK.
      this.res.status(200).json(response);
    } catch ({ message }) {
      this.res.status(500).send({ message });
    }
  }
}
