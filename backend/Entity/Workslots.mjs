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

  // async filterAvailWS() {
  //   const workslots = await this.prisma.Workslots.findMany({
  //     select: {
  //       workslotId: true,
  //         select: {
  //           cashiers: true,
  //           chefs: true,
  //           waiters: true,
  //         },
  //       bids: {
  //         select: {
  //           accounts: {
  //             select: {
  //               accountId: true,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });

  //   const response = workslots.map((workslot) => {
  //     if (workslot.bids == 0) {
  //       return workslot;
  //     }

  //     const bidMap = new Map();
  //     workslot.bids.map((bid) => {
  //       if (bidMap.get(bid.accounts.roleId)) {
  //         bidMap.set(bid.accounts.roleId, bidMap.get(bid.accounts.roleId) + 1);
  //       } else {
  //         bidMap.set(bid.accounts.roleId, 1);
  //       }
  //     });

  //     let isAvailable = true;
  //     workslot.workslots_roles.every((workslot_role) => {
  //       if (bidMap.get(workslot_role.roleId) < workslot_role.count) {
  //         isAvailable = false;
  //         return false;
  //       }
  //     });

  //     if (!isAvailable) {
  //       const { bids, ...workslotDetails } = workslot;
  //       workslotDetails["current_Bids"] = Array.from(bidMap, ([roleId, count]) => ({
  //         roleId,
  //         count,
  //       }));
  //       return workslotDetails;
  //     }
  //   });

  //   return response.filter((ws) => {
  //     return ws != null;
  //   });
  // }

  // async filterAvailWS() {
  //   const workslots = await this.prisma.Workslots.findMany({
  //     select: {
  //       workslotId: true,
  //       startTime: true,
  //       endTime: true,
  //       weekNumber: true,
  //       cashiers: true,
  //       chefs: true,
  //       waiters: true,
  //       bids: {
  //         select: {
  //           accounts: {
  //             select: {
  //               accountId: true,
  //               role: true, 
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });

  //   const response = workslots.map((workslot) => {
  //     if (workslot.bids.length === 0) {
  //       return workslot;
  //     }

  //     const bidMap = new Map();
  //     workslot.bids.forEach((bid) => {
  //       const role = bid.accounts.role;
  //       if (bidMap.has(role)) {
  //         bidMap.set(role, bidMap.get(role) + 1);
  //       } else {
  //         bidMap.set(role, 1);
  //       }
  //     });

  //     let isAvailable = true;
  //     ['cashiers', 'chefs', 'waiters'].every((role) => {
  //       const requiredCount = workslot[role];
  //       const actualCount = bidMap.get(role) || 0;
  //       if (actualCount < requiredCount) {
  //         isAvailable = false;
  //         return false;
  //       }
  //     });

  //     if (!isAvailable) {
  //       const { bids, ...workslotDetails } = workslot;
  //       workslotDetails['current_Bids'] = Array.from(bidMap, ([role, count]) => ({ role, count }));
  //       return workslotDetails;
  //     }
  //   });

  //   return response.filter((ws) => ws != null);
  // }

  async filterAvailWS() {
    const workslots = await this.prisma.Workslots.findMany({
      select: {
        workslotId: true,
        startTime: true,
        endTime: true,
        weekNumber: true,
        cashiers: true,
        chefs: true,
        waiters: true,
        bids: {
          select: {
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
          const role = bid.accounts.role;
          bidMap.set(role, (bidMap.get(role) || 0) + 1);
        });
  
        let isAvailable = true;
        ['cashiers', 'chefs', 'waiters'].every((role) => {
          const requiredCount = workslot[role];
          const actualCount = bidMap.get(role) <= 0;
          if (actualCount < requiredCount) {
            isAvailable = false;
            return false;
          }
        });
  
        if (!isAvailable) {
          const { bids, ...workslotDetails } = workslot;
          workslotDetails['current_Bids'] = Array.from(bidMap, ([role, count]) => ({ role, count }));
          return workslotDetails;
        }
      })
      .filter((ws) => ws != null)
      .sort((a, b) => {
        (a.current_Bids[0]?.count || 0) - (b.current_Bids[0]?.count || 0); 
        console.log(a.current_Bids);
        console.log(a);
        console.log(b.current_Bids);
        console.log(b);
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
