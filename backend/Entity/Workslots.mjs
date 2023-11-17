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
          const { role } = bid.accounts;
          bidMap.has(`${role}s`)
            ? bidMap.set(`${role}s`, bidMap.get(`${role}s`) + 1)
            : bidMap.set(`${role}s`, 1);
        });

        let isAvailable = false;
        ["cashiers", "chefs", "waiters"].forEach((role) => {
          if (bidMap.get(role) == undefined) {
            isAvailable = true;
          }

          if (bidMap.get(role) < workslot[role]) {
            isAvailable = true;
          }
        });

        if (isAvailable)
          return {
            workslotId: workslot.workslotId,
            startTime: workslot.startTime,
            endTime: workslot.endTime,
            cashiers: workslot.cashiers,
            chefs: workslot.chefs,
            waiters: workslot.waiters,
            currentBids: Array.from(bidMap, ([key, value]) => ({
              role: key,
              count: value,
            })),
          };
      })
      .filter((workslot) => workslot !== undefined);

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

    const response = workslots
      .map((ws) => {
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
      })
      .filter((ws) => ws !== undefined);

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

  async checkAvail(newWorkslotId, role) {
    const workslot = await this.prisma.Workslots.findUnique({
      where: { workslotId: Number(newWorkslotId) },
      include: {
        bids: {
          include: { accounts: true },
        },
      },
    });

    const currentCount = workslot.bids.reduce((accumulator, bid) => {
      if (bid.accounts.role == role) {
        accumulator++;
      }
      return accumulator;
    }, 0);

    if (workslot[`${role}s`] > currentCount) {
      return true;
    }
    return false;
  }
}
