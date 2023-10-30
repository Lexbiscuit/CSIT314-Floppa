import { Prisma } from "@prisma/client";
import Profiles from "../../Entity/Profiles.mjs";

export default class UpdateProfileController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateProfile(profileId, name, description) {
    try {
      const profile = new Profiles(this.prisma);
      const response = await profile.updateProfile(
        profileId,
        name,
        description
      );

      // 200 OK
      this.res.status(200).json(response);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        this.res.status(500).send({ message: err.message });
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send({ message: err });
      }
    }
  }
}
