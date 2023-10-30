import { Prisma } from "@prisma/client";
import Profiles from "../../Entity/Profile.mjs";

export default class DeleteProfileController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async deleteProfile(profileId) {
    try {
      const profile = new Profiles(this.prisma);
      const response = await profile.deleteProfile(profileId);

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
