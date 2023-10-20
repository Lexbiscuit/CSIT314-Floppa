import { Prisma } from "@prisma/client";

import { Prisma } from "@prisma/client";
import { Prisma } from "@prisma/client";

export default class DeleteWorkslotController {
    constructor(prisma, req, res) {
        this.prisma = prisma;
        this.req = req;
        this.res = res;
    }

    async delete(workslotId) {
      try {
        const deleteWorkslots = await this.prisma.workslots.delete({
          where: {
            workslotId: Number(workslotId),
          },
        });
  
        // 200 OK
        this.res.status(200).send("Workslot deleted successfully.");
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2025") {
            this.res.status(500).send("Record to delete does not exist.");
          }
        } else {
          // 500 INTERNAL SERVER ERROR
          this.res.status(500).send("Internal Server Error.");
        }
      }
    }
}
