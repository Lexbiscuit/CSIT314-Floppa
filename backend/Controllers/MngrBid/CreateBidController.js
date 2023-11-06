import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";

export default class CreateBidController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async createBid(bid) {
    try {
      const bids = new Bids(this.prisma);
      const response = await bids.createBid(bid);

      // 201 Created
      this.res.status(201).json(response);
    } catch (message) {
      this.res.status(500).send({ message });
    }
  }
}

