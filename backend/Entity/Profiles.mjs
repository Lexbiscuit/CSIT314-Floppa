export default class Profiles {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createProfile(profile) {
    await this.prisma.Profiles.create({
      data: profile,
    });

    return { message: "Profile created successfully." };
  }

  async retrieveProfiles() {
    const response = await this.prisma.Profiles.findMany({
      orderBy: [
        {
          profileId: "asc",
        },
      ],
    });
    return response;
  }

  async updateProfile(profile) {
    const { profileId, ...updatedData } = JSON.parse(JSON.stringify(profile));
    await this.prisma.Profiles.update({
      where: {
        profileId: Number(profileId),
      },
      data: updatedData,
    });
    return { message: "Profile updated successfully." };
  }

  async suspendProfile(profileId) {
    await this.prisma.Profiles.update({
      where: {
        profileId: Number(profileId),
      },
      data: {
        suspended: true,
      },
    });
    return { message: "Profile suspended successfully." };
  }

  async unsuspendProfile(profileId) {
    await this.prisma.Profiles.update({
      where: {
        profileId: Number(profileId),
      },
      data: {
        suspended: false,
      },
    });
    return { message: "Profile unsuspended successfully." };
  }

  async searchProfile(profileFilter) {
    const response = await this.prisma.Profiles.findMany({
      where: profileFilter,
    });
    return response;
  }
}
