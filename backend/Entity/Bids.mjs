export default class Bids {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async retrieveBids() {
    const response = await this.prisma.Profiles.findMany({
      orderBy: [
        {
          profileId: "asc",
        },
      ],
    });
    return response;
  }

  async updateBid(bidId, accountId, profileId) {
    const response = await this.prisma.Profiles.update({
      where: {
        bidId: Number(bidId),
      },
      data: {
        accountId: accountId,
        profileId: profileId,
      },
    });
    return response;
  }

  async searchBid(bidId, accountId, workslotId, status) {
    const searchBid = await this.prisma.workslots.findUnique({
      where: {
        bidId: Number(bidId),
        accountId: Number(accountId),
        workslotId: Number(workslotId),
        status: status,
      },
    });
    return response;
  }

  async ApproveBid(bidId, accountId, workslotId, status) {
    const response = await this.prisma.Bids.update({
      where: {
        bidId: bidId,
        accountId: accountId,
        workslotId: workslotId,
      },
      data: {
        status: status,
      },
    });
    return response;
  }

  async retrieveStaff() {
    const response = await this.prisma.Profiles.findMany({
      orderBy: [
        {
          profileId: "asc",
        },
      ],
    });
    return response;
  }

  async rejectBid(bidId, accountId, workslotId, reason) {
    const response = await this.prisma.Profiles.update({
      where: {
        bidId: bidId,
        accountId: accountId,
        workslotId: workslotId,
      },
      data: {
        status: "Reject",
        reason: reason || null, // Set to null if not provided
      },
    });
    return response;
  }

  async viewStaffWithSlot() {
    const staffWithAssignedWorkSlots = await this.prisma.Staff.findMany({
      where: {
        workslots: {
          some: {
            staffId: {
              not: null,
            },
          },
        },
      },
    });
    return response;
  }

  async viewStaffBid(accountId) {
          const response = await this.prisma.Bids.findMany({
        where: {
          accountId: accountId,
        },
        include: {
          accounts: true,
        },
      });
    return response;
  }

  // --------------------- NOT IN USER STORY --------------------- //
  async createBid(accountId, workslotId, status, reason) {
    const response = await this.prisma.Bids.create({
      data: {
        accountId: accountId,
        workslotId: workslotId,
        status: status,
        reason: reason,
      },
    });
    return response;
  }
}
