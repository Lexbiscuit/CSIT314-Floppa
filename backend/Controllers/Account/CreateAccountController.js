import Accounts from "../../Entity/Accounts.mjs";

export default class CreateAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async createAccount(account) {
    try {
      const accounts = new Accounts(this.prisma);
      const response = await accounts.createAccount(account);
      // 201 CREATED
      this.res.status(201).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
