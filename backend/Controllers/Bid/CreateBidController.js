import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";

export default class CreateBidController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async createBid(accountId, workslotId, status, reason) {
    try {
      const bids = new Bids(this.prisma);
      const createBid = await bids.createBid(accountId, workslotId, status, reason);

      // 201 Created
      this.res.status(201).json(createBid);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002")
          this.res.status(500).send({ message: err.message });
      } else {
        // 500 INTERNAL SERVER ERROR
        console.log(err);
        this.res.status(500).send({ message: "Internal Server Error." });
      }
    }
  }
}
