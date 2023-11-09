export default class Workslots {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createWorkslot(workslot) {
    await this.prisma.Workslots.create({
      data: workslot,
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

  async updateWorkslot(workslot) {
    const { workslotId, ...updatedData } = workslot;

    await this.prisma.Workslots.update({
      where: {
        workslotId: Number(workslotId),
      },
      data: updatedData,
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
    const response = await this.prisma.Workslots.findMany({
      where: workslotFilter,
    });
    return response;
  }

  async filterAvailWS() {
    const response = await this.prisma.Workslots.findMany({
      where: {
        bids: {
          none: {},
        },
      },
      orderBy: [
        {
          workslotId: "asc",
        },
      ],
    });
    return response;
  }

  // Retrieve datas from tables Workslots -> Workslots-roles -> Roles
  // Datas: [workslotId, workslots_roles{count}, roles{name}]
  async staffRtrvAvailWS() {
    const response = await this.prisma.Workslots.findMany({
      //1st where, condition for Workslots
      where: {
        workslots_roles: {
          some: {
            NOT: {
              count: 0,
            },
          },
        },
      },
      //2nd where, condition for workslots_roles
      select: {
        workslotId: true,
        workslots_roles: {
          where: {
            NOT: {
              count: 0,
            },
          },
          select: {
            count: true,
            roles: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return response;
  }
}
