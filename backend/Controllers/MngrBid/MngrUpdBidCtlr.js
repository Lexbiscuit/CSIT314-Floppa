import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";
import Workslots from "../../Entity/Workslots.mjs";

export default class MngrUpdBidCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateBid(bidId, newWorkslotId, role) {
    try {
      const bids = new Bids(this.prisma);
      const workslots = new Workslots(this.prisma);

      const isAvail = await workslots.checkAvail(newWorkslotId, role);
      let response;
      if (isAvail) {
        response = await bids.updateBidMngr(bidId, newWorkslotId);
        // 200 OK.
        this.res.status(200).json(response);
      }
      response = { message: "Workslot is not available." };
    } catch ({ message }) {
      this.res.status(500).send({ message });
    }
  }
}
