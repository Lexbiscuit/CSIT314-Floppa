import { Prisma } from "@prisma/client";
import Profiles from "../../Entity/Profiles.mjs";

export default class CreateProfileController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async createProfile(profile) {
    try {
      const profile = new Profiles(this.prisma);
      const response = await profile.createProfile(name, description);

      // 201 CREATED
      this.res.status(201).json(response);
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
