export default class RetrieveProfileController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieve() {
    try {
      const retrieveProfile = await this.prisma.profile.findMany({
        orderBy: [
          {
            profileId: "asc",
          },
        ],
      });

      // 200 OK
      this.res.status(200).json(retrieveProfile);
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send("Internal Server Error.");
    }
  }
}
