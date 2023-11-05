import Profiles from "../../Entity/Profiles.mjs";

export default class UnsuspendProfileController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async unsuspendProfile(profileId) {
    try {
      const profile = new Profiles(this.prisma);
      const response = await profile.unsuspendProfile(profileId);

      // 200 OK
      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
