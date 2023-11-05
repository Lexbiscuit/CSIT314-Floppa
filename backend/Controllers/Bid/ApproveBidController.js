import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";

export default class ApproveBidController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async approveBid(bidId) {
    try {
      const bids = new Bids(this.prisma);
      const approvedBid = await bids.approveBid(bidId);

      // 201 Created
      this.res.status(201).json(approvedBid); //return "approve" msg OR json string?
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002")
          this.res.status(500).send({ message: err.message });
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send({ message: "Internal Server Error." });
      }
    }
  }
}
