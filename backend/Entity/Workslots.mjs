import { DateTime } from "luxon";

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
    const currentWeekNumber = DateTime.local().weekNumber;
    const workslots = await this.prisma.Workslots.findMany({
      where: {
        weekNumber: currentWeekNumber,
      },
      include: {
        bids: {
          select: {
            bidId: true,
            accounts: {
              select: {
                accountId: true,
                role: true,
              },
            },
          },
        },
      },
    });

    const response = workslots
      .map((workslot) => {
        const bidMap = new Map();
        workslot.bids.forEach((bid) => {
          const { accountId, role } = bid.accounts;
          bidMap.set(accountId, { role, count: (bidMap.get(accountId)?.count || 0) + 1 });
        });

        let isAvailable = true;
        ['cashiers', 'chefs', 'waiters'].every((role) => {
          const requiredCount = workslot[role];
          const actualCount = bidMap.get(role)?.count || 0;
          if (actualCount < requiredCount) {
            isAvailable = false;
            return false;
          }
        });

        if (!isAvailable) {
          const { bids, ...workslotDetails } = workslot;
          workslotDetails['currentBids'] = Array.from(bidMap.values());
          return workslotDetails;
        }
      })
      .filter((ws) => ws != null)
      .sort((a, b) => {
        const totalBidCountA = a.currentBids.reduce((acc, cur) => acc + cur.count, 0);
        const totalBidCountB = b.currentBids.reduce((acc, cur) => acc + cur.count, 0);
        return totalBidCountA - totalBidCountB;
      });

    return response;
  }


  async staffRtrvAvailWS() {
    const currentWeekNumber = DateTime.local().weekNumber;

    const workslots = await this.prisma.Workslots.findMany({
      where: {
        weekNumber: currentWeekNumber,
      },
      include: {
        bids: {
          select: {
            bidId: true,
            accounts: {
              select: {
                accountId: true,
                role: true,
              },
            },
          },
        },
      },
    });

    const response = workslots
      .map((workslot) => {
        const bidMap = new Map();
        workslot.bids.forEach((bid) => {
          const { accountId, role } = bid.accounts;
          bidMap.set(accountId, { role, count: (bidMap.get(accountId)?.count || 0) + 1 });
        });

        let isAvailable = true;
        ['cashiers', 'chefs', 'waiters'].every((role) => {
          const requiredCount = workslot[role];
          const actualCount = bidMap.get(role)?.count || 0;
          if (actualCount < requiredCount) {
            isAvailable = false;
            return false;
          }
        });

        if (!isAvailable) {
          const { bids, ...workslotDetails } = workslot;
          workslotDetails['totalBidCount'] = Array.from(bidMap.values()).reduce((acc, cur) => acc + cur.count, 0);
          return workslotDetails;
        }
      })
      .filter((ws) => ws != null)
      .sort((a, b) => a.totalBidCount - b.totalBidCount);

    return response;
  }
}
