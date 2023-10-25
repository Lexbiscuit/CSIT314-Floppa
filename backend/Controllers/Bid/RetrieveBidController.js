import { Prisma } from "@prisma/client";

export default class RetrieveBidController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveBids() {
    try {
      const retrieveBid = await this.prisma.Bids.findMany({
        orderBy: [
          {
            BidId: "asc",
          },
        ],
      });

      // 200 OK
      this.res.status(200).json(retrieveBid);
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      console.log(err);
      this.res.status(500).send({ message: "Internal Server Error." });
    }
  }
}
