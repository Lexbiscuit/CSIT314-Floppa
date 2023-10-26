import { Prisma } from "@prisma/client";

export default class SearchBidController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async searchBid(bidId, accountId, workslotId, status) {
    try {
      const searchBid = await this.prisma.workslots.findUnique({
        where: {
          bidId: Number(bidId),
          accountId: Number(accountId),
          workslotId: Number(workslotId),
          status: status,
        },
      });

      // 200 OK
      this.res.status(200).json(searchBid);
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      console.log(err);
      this.res.status(500).send({ message: "Internal Server Error." });
    }
  }
}
