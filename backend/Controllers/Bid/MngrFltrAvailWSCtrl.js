import { Prisma } from "@prisma/client";

export default class MngrFltrAvailWSCtrl {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  /**
   * Retrieves available work slots for the Cafe Manager.
   *
   * @returns {Workslots[]} - An array of available work slots.
   */
  async rtrvAvailWS() {
    try {
      
      const availableWorkslots = await this.prisma.Workslots.findMany({
        
        where: {
           Bids: null,
        },
        
        orderBy: [
          {
            workslotId: "asc",
          },
        ],
      });


      this.res.status(200).json(availableWorkslots);
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      console.log(err);
      this.res.status(500).send({ message: "Internal Server Error." });
    }
  }
}
