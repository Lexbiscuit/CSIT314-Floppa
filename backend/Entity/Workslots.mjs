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
        weekNumber: { in: [currentWeekNumber, currentWeekNumber + 1] },
        startTime: {
          gte: DateTime.local().startOf("week").toJSDate(),
          lt: DateTime.local().startOf("week").plus({ weeks: 2 }).toJSDate(),
        },
      },
      include: {
        bids: {
          select: {
            accounts: {
              select: {
                accountId: true,
                profileId: true,
                name: true,
                email: true,
                role: true,
                suspended: true,
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
          bidMap.set(accountId, {
            role,
            count: (bidMap.get(accountId)?.count || 0) + 1,
          });
        });
        const isAvailable = ["cashiers", "chefs", "waiters"].every(
          (role) => (bidMap.get(role)?.count || 0) >= workslot[role]
        );
        return isAvailable
          ? null
          : {
              ...workslot,
              bids: workslot.bids.map(({ accounts }) => ({ accounts })),
              weekNumber: undefined,
            };
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a.weekNumber !== b.weekNumber) {
          return a.weekNumber - b.weekNumber;
        }
        return a.bids.length - b.bids.length;
      });

    return response;
  }

  async staffRtrvAvailWS(accountId, role) {
    const currentWeekNumber = DateTime.now().weekNumber;
    const workslots = await this.prisma.Workslots.findMany({
      where: {
        weekNumber: { in: [currentWeekNumber, currentWeekNumber + 1] },
        startTime: {
          gte: DateTime.local().startOf("week").toJSDate(),
          lt: DateTime.local().startOf("week").plus({ weeks: 2 }).toJSDate(),
        },
        bids: { none: { accounts: { accountId: Number(accountId) } } },
      },
      select: {
        workslotId: true,
        startTime: true,
        endTime: true,
        cashiers: true,
        chefs: true,
        waiters: true,
        bids: {
          select: { accounts: true },
        },
      },
    });

    const response = workslots.map((ws) => {
      const targetCount = ws[`${role}s`];
      const actualCount = ws.bids.filter(
        (bid) => bid.accounts.role == role
      ).length;
      if (actualCount < targetCount) {
        return {
          workslotId: ws.workslotId,
          startTime: ws.startTime,
          endTime: ws.endTime,
          vacancies: targetCount - actualCount,
        };
      }
    });

    // const response = workslots
    //   .map((workslot) => {
    //     const bidMap = new Map();
    //     workslot.bids.forEach((bid) => {
    //       const { role } = bid;
    //       bidMap.set(role, { count: (bidMap.get(role)?.count || 0) + 1 });
    //     });
    //     const isAvailable = ['cashiers', 'chefs', 'waiters'].every(role => (bidMap.get(role)?.count || 0) >= workslot[role]);
    //     return isAvailable ? null : { ...workslot, weekNumber: undefined };
    //   })
    //   .filter(Boolean)
    //   .sort((a, b) => {
    //     if (a.weekNumber !== b.weekNumber) {
    //       return a.weekNumber - b.weekNumber;
    //     }
    //     return a.bids.length - b.bids.length;
    //   });

    return response;
  }
}
