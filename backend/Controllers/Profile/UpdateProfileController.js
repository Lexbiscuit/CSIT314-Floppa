import { Prisma } from "@prisma/client";

export default class UpdateProfileController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async update(profileId, name, description) {
    try {
      const updateProfile = await this.prisma.profile.update({
        where: {
          profileId: Number(profileId),
        },
        data: {
          name: name,
          description: description,
        },
      });

      // 200 OK
      this.res.status(200).send("Profile updated successfully.");
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025")
          this.res.status(500).send("Record to update not found.");
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send("Internal Server Error.");
      }
    }
  }
}
