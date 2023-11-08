import { Prisma } from "@prisma/client";
import Workslots from "../../Entity/Workslots.mjs";

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

  async filterAvailWS() {
    try {
      const workslots = new Workslots(this.prisma);
      const response = await workslots.filterAvailWS();

      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      console.log({ message });
      this.res.status(500).send({ message });
    }
  }
}
