import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";
import jwt from "jsonwebtoken";

export default class StaffBidSlotCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async createBid(workslotId) {
    try {
      const staffBids = new Bids(this.prisma);

      const token = this.req.headers["x-access-token"];
      const { accountId } = jwt.verify(token, process.env.JWT_SECRET);

      // check if bid exists
      let bidExists = true;
      bidExists = await staffBids.checkExists(accountId, workslotId);

      if (bidExists) {
        return this.res.status(500).send({
          message: "Bid already exists. Bid not created.",
        });
      }

      const response = await staffBids.createBid(accountId, workslotId);

      // 201 Created
      this.res.status(201).json(response);
    } catch ({ message }) {
      this.res.status(500).send({ message });
    }
  }
}
