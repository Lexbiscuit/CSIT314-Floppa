import Accounts from "../../Entity/Accounts.mjs";

export default class SearchAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async searchAccount(accountFilter) {
    try {
      const accounts = new Accounts(this.prisma);
      const response = await accounts.searchAccounts(accountFilter);
      // 200 OK
      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
