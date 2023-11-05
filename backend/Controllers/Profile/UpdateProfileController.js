import { Prisma } from "@prisma/client";
import Profiles from "../../Entity/Profiles.mjs";

export default class UpdateProfileController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateProfile(profile) {
    try {
      const profiles = new Profiles(this.prisma);
      const response = await profiles.updateProfile(profile);

      // 200 OK
      this.res.status(200).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
