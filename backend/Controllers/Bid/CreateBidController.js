import { Prisma } from "@prisma/client";

export default class CreateBidController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async createBid(accountId, workslotId, status, reason) {
    try {

      const newBid = await this.prisma.Bids.create({
        data: {
          accountId: accountId,
          workslotId: workslotId,
          status: status || "Pending", // Set to "Pending" if not provided
          reason: reason || null, // Set to null if not provided
        },
      });

      // 201 Created
      this.res.status(201).json(newBid);
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