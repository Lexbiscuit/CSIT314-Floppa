export default class SearchAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async searchAccount(accountId) {
    try {
      const searchAccount = await this.prisma.accounts.findUnique({
        where: {
          accountId: Number(accountId),
        },
      });

      // 200 OK
      this.res.status(200).json(searchAccount);
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send("Internal Server Error.");
    }
  }
}
