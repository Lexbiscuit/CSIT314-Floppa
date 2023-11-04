import { Prisma } from "@prisma/client";
import Accounts from "../../Entity/Accounts.mjs";

export default class SuspendAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async suspendAccount(accountId) {
    try {
      const account = new Accounts(this.prisma);
      const response = await account.suspendAccount(accountId);

      // 200 OK
      this.res.status(200).json(response);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        this.res.status(500).send({ message: err.message });
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send({ message: err });
      }
    }
  }

  async unsuspendAccount(accountId) {
    try {
      const account = new Accounts(this.prisma);
      const response = await account.unsuspendAccount(accountId);

      // 200 OK
      this.res.status(200).json(response);
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
