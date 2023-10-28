import { Prisma } from "@prisma/client";

export default class ApproveBidController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async approveBid(bidId, accountId, workslotId, status) {
    try {
      const updateBid = await this.prisma.Bids.update({
        where: {
          bidId: bidId,
          accountId: accountId,
          workslotId: workslotId,
        },
        data: {
          status: status,
        },
      });

      // 201 Created
      this.res.status(201).json(updateBid);
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
