import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";
import { response } from "express";

export default class MngrRtrvStaffSlotCtrl {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveStaffSlot() {
    try {
      const bids = new Bids(this.prisma);
      const response = await bids.retrieveStaffSlot();

      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
