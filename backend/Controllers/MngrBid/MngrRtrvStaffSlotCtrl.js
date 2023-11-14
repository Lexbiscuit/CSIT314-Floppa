import { Prisma } from "@prisma/client";
import Accounts from "../../Entity/Accounts.mjs";
import { response } from "express";

export default class MngrRtrvStaffSlotCtrl {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveStaffSlot() {
    try {
      const accounts = new Accounts(this.prisma);
      const response = await accounts.retrieveStaffSlot();

      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
