export default class SearchProfileController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async search(profileId) {
    try {
      const searchProfile = await this.prisma.profile.findUnique({
        where: {
          profileId: Number(profileId),
        },
      });

      // 200 OK
      this.res.status(200).json(searchProfile);
    } catch (err) {
      console.error(err);

      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send("Internal Server Error.");
    }
  }
}
