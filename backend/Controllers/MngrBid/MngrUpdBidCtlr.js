import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";
import Workslots from "../../Entity/Workslots.mjs";

export default class MngrUpdBidCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateBid(bidId, accountId, workslotId, role) {
    try {
      const bids = new Bids(this.prisma);
      const workslots = new Workslots(this.prisma);

      const isAvail = await bids.checkAvail(workslotId, role);
      let response;
      if (isAvail) {
        response = await bids.updateBidMngr(bidId, accountId, workslotId);
      }
      // 200 OK.
      this.res.status(200).json(response);
    } catch ({ message }) {
      this.res.status(500).send({ message });
    }
  }
}
