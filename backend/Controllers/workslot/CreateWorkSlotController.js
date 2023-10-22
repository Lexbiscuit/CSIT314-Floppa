import { Prisma } from "@prisma/client";

export default class CreateWorkslotController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async createWorkslot(
    date,
    baristas_required,
    cashiers_required,
    chefs_required,
    waiters_required,
  ) {
    try {
      const createWorkslotController = await this.prisma.Workslots.create({
        data: {
          date: date,
          baristas_required: baristas_required,
          cashiers_required: cashiers_required,
          chefs_required: chefs_required,
          waiters_required: waiters_required,
        },
      });
      // 201 CREATED
      this.res.status(201).send({ message: "Work Slot created successfullly." });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002")
          this.res.status(500).send({ message: err.message });
      } else {
        // 500 INTERNAL SERVER ERROR
        console.log(err);
        this.res.status(500).send({ message: "Internal Server Error." });
      }
    }
  }
}
