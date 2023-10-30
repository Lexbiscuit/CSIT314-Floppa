export default class Workslots {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createWorkslot(startTime, endTime) {
    await this.prisma.Workslots.create({
      data: {
        startTime: startTime,
        endTime: endTime,
      },
    });

    return { message: "Workslot created successfully." };
  }

  async retrieveWorkslots() {
    const response = await this.prisma.Workslots.findMany({
      orderBy: [
        {
          workslotId: "asc",
        },
      ],
    });
    return response;
  }

  async updateWorkslot(workslotId, startTime, endTime) {
    await this.prisma.Workslots.update({
      where: {
        workslotId: Number(workslotId),
      },
      data: {
        startTime: startTime,
        endTime: endTime,
      },
    });
    return { message: "Workslot updated successfully." };
  }

  async deleteWorkslot(workslotId) {
    await this.prisma.Workslots.delete({
      where: {
        workslotId: Number(workslotId),
      },
    });
    return { message: "Workslot deleted successfully." };
  }

  async searchWorkslot(workslotFilter) {
    const response = await this.prisma.Workslots.findUnique({
      where: workslotFilter,
    });
    return response;
  }
}
