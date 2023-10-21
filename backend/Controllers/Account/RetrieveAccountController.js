export default class RetrieveAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveAccounts() {
    try {
      const retrieveAccounts = await this.prisma.Accounts.findMany({
        orderBy: [
          {
            accountId: "asc",
          },
        ],
      });

      // 200 OK
      this.res.status(200).json(retrieveAccounts);
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message: "Internal Server Error." });
    }
  }
}
