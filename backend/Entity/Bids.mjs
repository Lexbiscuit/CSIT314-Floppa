export default class Bids {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createBid(bid) {
    await this.prisma.Bids.create({
      data: bid,
    });
    return {message : "Bids created successfully"};
  }


  async retrieveBids() {
    const response = await this.prisma.Bids.findMany({
      orderBy: [
        {
          bidId: "asc",
        },
      ],
    });
    return response;
  }

  async updateBid(bid) {
    const { bidId, ...updatedData } = bid;
    const response = await this.prisma.Bids.update({
      where: {
        bidId: Number(bidId),
      },
      data: updatedData
    });
    return response;
  }

  async searchBid(bidFilter) {
    const response = await this.prisma.Bids.findMany({
      where: bidFilter,
    });
    return response;
  }

  async approveBid(bidId) {
    const response = await this.prisma.Bids.update({
      where: {
        bidId: bidId
      },
      data: {
        status: "Approve",
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

  async rejectBid(bidId, reason) {
    const response = await this.prisma.Bids.update({
      where: {
        bidId: bidId
      },
      data: {
        status: "Reject",
        reason: reason
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

}
