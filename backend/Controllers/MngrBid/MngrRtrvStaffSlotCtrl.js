import { Prisma } from "@prisma/client";

export default class MngrRtrvStaffSlotCtrl {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }
  async viewWorkSlotsForAccount(accountId) { // to be tested
    try {
      // Step 2: Retrieve all work slots associated with the account.
      const workSlotsForAccount = await this.prisma.Workslots.findMany({
        where: {
          bids: {
            some: {
              accountId: accountId,
            },
          },
        },
      });

      // Step 3: Display all records.
      this.res.status(200).json(workSlotsForAccount);
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      console.log(err);
      this.res.status(500).send({ message: "Internal Server Error." });
    }
  }
}
