import { Prisma } from "@prisma/client";
import Workslots from "../../Entity/Workslots.mjs";

export default class SearchWorkSlotController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async searchWorkslot(workslotId) {
    try {
      /* const searchWorkslot = await this.prisma.workslots.findUnique({
        where: {
          workslotId: Number(workslotId),
        },
      }); */

      const workslot = new Workslots();
      const searchWorkslot = workslot.search(workslotId);

      // 200 OK
      this.res.status(200).json(searchWorkslot);
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      console.log(err);
      this.res.status(500).send({ message: "Internal Server Error." });
    }
  }
}
