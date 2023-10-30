export default class MngrRtrvBidCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveBids() {
    try {
      const countBids = await this.prisma.Bids.count();
      const retrieveBids = await this.prisma.Bids.findMany({
        orderBy: [
          {
            BidId: "asc",
          },
        ],
      });

      // 200 OK.
      this.res.status(200).json({
        message: `There are currently ${countBids} bids present`,
        bids: retrieveBids,
      });
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      console.log(err);
      this.res.status(500).send({ message: "Internal Server Error." });
    }
  }
}
