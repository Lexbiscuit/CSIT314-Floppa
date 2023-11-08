import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";

export default class StaffRtrvBidCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveBids() {
    try {
      const bids = new Bids(this.prisma);
      const response = await bids.retrieveBidsStaff();

      // 200 OK.
      this.res.status(200).json({
        bids: response,
      });
    } catch (message) {
      // 500 INTERNAL SERVER ERROR
      console.log(message);
      this.res.status(500).send({ message });
    }
  }
}
