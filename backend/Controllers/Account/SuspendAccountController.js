import Accounts from "../../Entity/Accounts.mjs";

export default class SuspendAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async suspendAccount(accountId) {
    try {
      const accounts = new Accounts(this.prisma);
      const response = await accounts.suspendAccount(accountId);
      // 200 OK
      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
