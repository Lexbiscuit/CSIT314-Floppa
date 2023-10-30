import { Prisma } from "@prisma/client";
import Workslots from "../../Entity/Workslots.mjs";

export default class UpdateWorkslotController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateWorkslot(workslotId, startTime, endTime) {
    try {
      const workslot = new Workslots();
      const response = await workslot.updateWorkslot(
        workslotId,
        startTime,
        endTime
      );

      // 200 OK
      this.res.status(200).json(response);
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
