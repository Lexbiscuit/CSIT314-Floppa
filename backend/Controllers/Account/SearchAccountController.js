import Accounts from "../../Entity/Accounts.mjs";

export default class SearchAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async searchAccount(accountFilter) {
    try {
      const account = new Accounts(this.prisma);
      const response = await account.searchAccount(accountFilter);

      // 200 OK
      this.res.status(200).json(response);
    } catch (err) {
      // 500 INTERNAL SERVER ERROR
      console.log(err);
      this.res.status(500).send({ message: "Internal Server Error." });
    }
  }
}
