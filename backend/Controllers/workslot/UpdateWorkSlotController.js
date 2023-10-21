import { Prisma } from "@prisma/client";

export default class UpdateWorkslotController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateWorkslot(
    workslotId,
    date,
    baristas_required,
    cashiers_required,
    chefs_required,
    waiters_required,
  ) {
    try {
      const updateWorkslot = await this.prisma.Workslots.update({
        where: {
          workslotId: Number(workslotId),
        },
        data: {
          date: date,
          chefs_required: chefs_required,
          waiters_required: waiters_required,
          cashiers_required: cashiers_required,
          baristas_required: baristas_required,
        },
      });

      // 200 OK
      this.res.status(200).send({ message: "Workslot updated successfully." });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025")
          this.res.status(500).send({ message: "Record to update not found." });
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send({ message: "Internal Server Error." });
      }
    }
  }
}
