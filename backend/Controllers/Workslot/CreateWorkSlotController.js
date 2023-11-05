import { Prisma } from "@prisma/client";
import Workslots from "../../Entity/Workslots.mjs";

export default class CreateWorkslotController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async createWorkslot(workslot) {
    try {
      const workslots = new Workslots(this.prisma);
      const response = await workslots.createWorkslot(workslot);

      // 201 CREATED
      this.res.status(201).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
