export default class RetrieveProfileController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveProfiles() {
    try {
      const retrieveProfiles = await this.prisma.Profiles.findMany({
        orderBy: [
          {
            profileId: "asc",
          },
        ],
      });

      // 200 OK
      this.res.status(200).json(retrieveProfiles);
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message: "Internal Server Error." });
    }
  }
}
