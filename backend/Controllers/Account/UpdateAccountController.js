import { Prisma } from "@prisma/client";
import Accounts from "../../Entity/Accounts.mjs";

export default class UpdateAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateAccount(account) {
    try {
      const accounts = new Accounts(this.prisma);
      const response = await accounts.updateAccount(account);
      // 200 OK
      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
