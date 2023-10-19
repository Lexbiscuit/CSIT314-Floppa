import { Prisma } from "@prisma/client";

export default class CreateProfileController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async create(name, description) {
    try {
      const createProfile = await this.prisma.Profiles.create({
        data: {
          name: name,
          description: description,
        },
      });

      // 201 CREATED
      this.res.status(201).send("Profile created successfully.");
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") this.res.status(500).send(err.message);
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send("Internal Server Error.");
      }
    }
  }
}
