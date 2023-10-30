import { Prisma } from "@prisma/client";
import Workslots from "../../Entity/Workslots.mjs";

export default class DeleteWorkslotController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async deleteWorkslot(workslotId) {
    try {
      /* const deleteWorkslots = await this.prisma.Workslots.delete({
        where: {
          workslotId: Number(workslotId),
        },
      }); */

      const workslot = new Workslots(); //instantiates workslot object
      const deleteWorkslot = await workslot.deleteWorkslot(workslotId); // called the workslot delete function present in the Workslot entity.
      

      // 200 OK
      this.res.status(200).send({message:"Workslot deleted successfully."});
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          this.res
            .status(500)
            .send({ message: "Record to delete does not exist." });
        }
      } else {
        // 500 INTERNAL SERVER ERROR
        console.log(err);
        this.res.status(500).send({ message: "Internal Server Error." });
      }
    }
  }
}