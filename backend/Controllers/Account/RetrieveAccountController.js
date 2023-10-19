export default class RetrieveAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieve() {
    try {
      const retrieveAccount = await this.prisma.Accounts.findMany({
        orderBy: [
          {
            accountId: "asc",
          },
        ],
      });

      // 200 OK
      this.res.status(200).json(retrieveAccount);
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send("Internal Server Error.");
    }
  }
}
