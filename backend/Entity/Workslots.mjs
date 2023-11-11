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
    const workslots = await this.prisma.Workslots.findMany({
      select: {
        workslotId: true,
        workslots_roles: {
          select: {
            roleId: true,
            count: true,
          },
        },
        bids: {
          select: {
            accounts: {
              select: {
                roleId: true,
              },
            },
          },
        },
      },
    });

    const response = workslots.map((workslot) => {
      if (workslot.bids == 0) {
        return workslot;
      }

      const bidMap = new Map();
      workslot.bids.map((bid) => {
        if (bidMap.get(bid.accounts.roleId)) {
          bidMap.set(bid.accounts.roleId, bidMap.get(bid.accounts.roleId) + 1);
        } else {
          bidMap.set(bid.accounts.roleId, 1);
        }
      });

      let isAvailable = true;
      workslot.workslots_roles.every((workslot_role) => {
        if (bidMap.get(workslot_role.roleId) < workslot_role.count) {
          isAvailable = false;
          return false;
        }
      });

      if (!isAvailable) {
        const { bids, ...workslotDetails } = workslot;
        workslotDetails["current"] = Array.from(bidMap, ([roleId, count]) => ({
          roleId,
          count,
        }));
        return workslotDetails;
      }
    });

    return response.filter((ws) => {
      return ws != null;
    });
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
