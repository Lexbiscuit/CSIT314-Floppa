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
    const updatedData = JSON.parse(JSON.stringify(profile));
    delete updatedData.profileId;
    await this.prisma.Profiles.update({
      where: {
        profileId: Number(profile.profileId),
      },
      data: updatedData,
    });
    return { message: "Profile updated successfully." };
  }

  async deleteProfile(profileId) {
    await this.prisma.Profiles.delete({
      where: {
        profileId: Number(profileId),
      },
    });
    return { message: "Profile deleted successfully." };
  }

  async searchProfile(profileFilter) {
    const response = await this.prisma.Profiles.findMany({
      where: profileFilter,
    });
    return response;
  }
}
