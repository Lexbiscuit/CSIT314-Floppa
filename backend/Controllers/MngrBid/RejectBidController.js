import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";

export default class RejectBidController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async rejectBid(bidId, reason) {
    try {
      const bids = new Bids(this.prisma);
      const response = await bids.rejectBid(bidId, reason);

      // 201 Created
      this.res.status(201).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
