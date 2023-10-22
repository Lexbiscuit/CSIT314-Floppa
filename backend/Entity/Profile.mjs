import * as bcrypt from "bcrypt";

export class InvalidProfileError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidProfileError";
  }
}

export default class Profiles {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createProfile(name, description) {
    const response = await this.prisma.Profiles.create({
      data: {
        name: name,
        description: description,
      },
    });

    return response;
  }

  async retrieveProfile() {
    const retrieveProfiles = await this.prisma.Profiles.findMany({
        orderBy: [
          {
            profileId: "asc",
          },
        ],
      });
    return response;
  }

  async updateProfile(profileId, name, description){
    const response = await this.prisma.Profiles.update({
        where: {
          profileId: Number(profileId),
        },
        data: {
          name: name,
          description: description,
        },
    });
    return response;
  }

  async deleteProfile(profileId){
    const response = await this.prisma.Profiles.delete({
        where: {
          profileId: Number(profileId),
        },
    });
    return response;
  }

  async searchProfile(profileId){
    const response = await this.prisma.Profiles.findUnique({
        where: {
          profileId: Number(profileId),
        },
      });
      return response;
  }
}
