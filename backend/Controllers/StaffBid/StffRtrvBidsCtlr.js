import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";
import jwt from "jsonwebtoken";

export default class StaffRtrvBidCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveBids() {
    try {
      const bids = new Bids(this.prisma);

      const token = this.req.headers["x-access-token"];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const response = await bids.retrieveBidsStaff(decoded);

      // 200 OK.
      this.res.status(200).json({
        bids: response,
      });
    } catch (message) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
