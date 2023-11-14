import { Prisma } from "@prisma/client";
import Workslots from "../../Entity/Workslots.mjs";
import { DateTime } from "luxon";

export default class UpdateWorkslotController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateWorkslot(workslot) {
    try {
      // Work slot validation
      const { cashiers, chefs, waiters } = workslot;
      const startTime = DateTime.fromISO(workslot.startTime);
      const endTime = DateTime.fromISO(workslot.endTime);

      if (startTime > endTime) {
        return this.res.status(500).send({
          message: "Start time must be before end time. Workslot not updated.",

        });
      }

      if (cashiers < 1 || chefs < 1 || waiters < 1) {
        return this.res.status(500).send({
          message:
            "Number of cashiers, chefs and waiters must be positive and > 0. Workslot not updated.",
        });
      }

      const workslots = new Workslots(this.prisma);
      const response = await workslots.updateWorkslot(workslot);

      // 200 OK
      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
