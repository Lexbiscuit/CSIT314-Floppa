import { Prisma } from "@prisma/client";
import Workslots from "../../Entity/Workslots.mjs";
import jwt from "jsonwebtoken";

export default class StffRtrvAvailWrksltCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async staffRtrvAvailWS() {
    try {
      const token = this.req.headers["x-access-token"];
      const { accountId, role } = jwt.verify(token, process.env.JWT_SECRET);

      const workslots = new Workslots(this.prisma);
      const response = await workslots.staffRtrvAvailWS(accountId, role);

      this.res.status(200).json(response);
    } catch ({ message }) {
      console.log(message);
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
