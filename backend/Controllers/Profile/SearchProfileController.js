import Profiles from "../../Entity/Profile.mjs";

export default class SearchProfileController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async searchProfile(profileFilter) {
    try {
      const profile = new Profiles(this.prisma);
      const response = await profile.searchProfile(profileFilter);

      // 200 OK
      this.res.status(200).json(response);
    } catch (err) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message: err });
    }
  }
}
