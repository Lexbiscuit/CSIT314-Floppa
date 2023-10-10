export default class CreateProfileController {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async create(req, res) {
    const { name, description } = req.body;
    const profile = await this.prisma.profiles.create({
      data: {
        name,
        description,
      },
    });
    res.json(profile);
  }
}
