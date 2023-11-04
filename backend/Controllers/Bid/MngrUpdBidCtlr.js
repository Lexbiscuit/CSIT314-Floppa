import { Prisma } from "@prisma/client";

export default class MngrUpdBidCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateBid(bidId, accountId, workslotId, status, reason) {
    try {
      const updateBid = await this.prisma.Bids.update({
        where: {
          bidId: Number(bidId),
        },
        data: {
          accountId: accountId,
          workslotId: workslotId,
          status: status,
          reason: reason,
        },
      });

      // 200 OK.
      this.res.status(200).send({ message: "Workslot updated successfully." });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        this.res.status(500).send({ message: err.message });
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send({ message: err });
      }
    }
  }
}
