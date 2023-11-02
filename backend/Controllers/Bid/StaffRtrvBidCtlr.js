import { Prisma } from "@prisma/client";

export default class StaffRtrvBidCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveStaffBids() {
    try {
      const accountId = parseInt(this.req.params.accountId);

      const staff = await this.prisma.Bids.findMany({
        where: {
          accountId: accountId,
        },
        include: {
          accounts: true,
        },
      });

      // 200 OK.
      this.res.status(200).json({
        staff: staff,
      });
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message: "Internal Server Error." });
    }
  }
}
