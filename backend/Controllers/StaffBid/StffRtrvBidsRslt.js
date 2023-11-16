import { Prisma } from "@prisma/client";
import Bids from "../../Entity/Bids.mjs";
import jwt from "jsonwebtoken";

export default class StffRtrvBidsRsltCtlr {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveResults() {
    try {
      const bids = new Bids(this.prisma);
      const token = this.req.headers["x-access-token"];
      const { accountId } = jwt.verify(token, process.env.JWT_SECRET);

      //For testing purpose:(change 'name' value as per your db data)
      // const token = jwt.sign({name: "Constantin Hacaud", password: "password"}, "Floppa-Secret");
      // const decoded = jwt.verify(token, "Floppa-Secret");

      const response = await bids.retrieveResults(accountId);

      // 200 OK.
      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
