import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
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
      const token = this.req.headers["x-access-token"];
      const { accountId } = jwt.verify(token, process.env.JWT_SECRET);

      const bids = new Bids(this.prisma);
      const response = await bids.retrieveBidsStaff(accountId);

      // 200 OK.
      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
