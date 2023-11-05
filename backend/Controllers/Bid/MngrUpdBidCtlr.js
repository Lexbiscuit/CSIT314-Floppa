import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";

export default class MngrUpdBidCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateBid(bid) {

    try {
      const bids = new Bids(this.prisma);
      const response = await bids.updateBid(bid);

      // 200 OK.
      this.res.status(200).json(response);
    } catch (err) {
      this.res.status(500).send({ message });
    }
  }
}


