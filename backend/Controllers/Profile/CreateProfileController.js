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
      const profiles = new Profiles(this.prisma);
      const response = await profiles.createProfile(profile);

      // 201 CREATED
      this.res.status(201).json(response);
    } catch ({ message }) {
      // 500 INTERNAL SERVER ERROR
      this.res.status(500).send({ message });
    }
  }
}
