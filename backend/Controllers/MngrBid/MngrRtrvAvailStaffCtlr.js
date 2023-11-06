import { Prisma } from "@prisma/client";
import Accounts from "../../Entity/Accounts.mjs";

export default class FindAvailableStaffController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async findAvailableStaff() {
    try {
      const accounts = new Accounts(this.prisma);
      const availableStaff = await accounts.findAvailableStaff();

      this.res.status(200).json(availableStaff);
    } catch (error) {
      this.res.status(500).send({ message: error.message });
    }
  }
}