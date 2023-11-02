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
      const workslot = new Workslots();
      const response = await workslot.createWorkslot(workslot);

      // 201 CREATED
      this.res.status(201).json(response);
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
