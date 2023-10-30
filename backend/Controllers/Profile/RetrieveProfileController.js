import Profiles from "../../Entity/Profile.mjs";

export default class RetrieveProfileController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async retrieveProfiles() {
    try {
      const profile = new Profiles(this.prisma);
      const response = await profile.retrieveProfiles();

      // 200 OK
      this.res.status(200).json(response);
    } catch (err) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message: err });
    }
  }
}
