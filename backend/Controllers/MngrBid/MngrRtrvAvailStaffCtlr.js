import { Prisma } from "@prisma/client";
import Accounts from "../../Entity/Accounts.mjs";
import Bids from "../../Entity/Bids.mjs";

export default class MngrRtrvAvailStaffCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveAvailStaff() {
    try {
      const accounts = new Bids(this.prisma);
      const response = await accounts.retrieveAvailStaff();

      this.res.status(200).json(response);
    } catch (message) {
      console.log(message);
      this.res.status(500).send({ message });
    }
  }
}
