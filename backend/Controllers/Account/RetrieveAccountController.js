import Accounts from "../../Entity/Accounts.mjs";

export default class RetrieveAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveAccounts() {
    try {
      const accounts = new Accounts(this.prisma);
      const response = await accounts.retrieveAccounts();

      // 200 OK
      this.res.status(200).json(response);
    } catch (err) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message: err });
    }
  }
}
