export default class Bids {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // --------------------- THIS IS MANAGER RETRIEVE BIDS ENTITY--------------------- //
  async retrieveBidsMngr() {
    const response = await this.prisma.Workslots.findMany({
      include: {
        bids: {
          orderBy: { bidId: "asc" },
        },
      },
    });
    return response;
  }

  // --------------------- THIS IS MANAGER UPDATE BIDS ENTITY--------------------- //
  async updateBidMngr(bid) {
    const { bidId, ...updatedData } = bid;
    await this.prisma.Bids.update({
      where: {
        bidId: Number(bidId),
      },
      data: updatedData,
    });
    return { message: "Bid updated successfully." };
  }

  // --------------------- THIS IS MANAGER SEARCH BIDS ENTITY--------------------- //
  async searchBidMngr(bidFilter) {
    const response = await this.prisma.Bids.findMany({
      where: bidFilter,
    });
    return response;
  }

  // --------------------- THIS IS MANAGER APPROVE BIDS ENTITY--------------------- //
  async approveBid(bidId) {
    const response = await this.prisma.Bids.update({
      where: {
        bidId: bidId,
      },
      data: {
        status: "Approve",
      },
    });
    return response;
  }

  // --------------------- THIS IS MANAGER RETRIEVE STAFF ENTITY---------------------//
  async retrieveAvailStaff() {
    const response = await this.prisma.Accounts.findMany({
      include: {
        bids: true,
        _count: {
          select: {
            bids: true,
          },
        },
      },
      orderBy: {
        bids: {
          _count: "asc",
        },
      },
    });
    return response;
  }

  // --------------------- THIS IS MANAGER REJECT BIDS ENTITY--------------------- //
  async rejectBid(bidId, reason) {
    const response = await this.prisma.Bids.update({
      where: {
        bidId: bidId,
      },
      data: {
        status: "Reject",
        reason: reason,
      },
    });
    return response;
  }

  // --------------------- THIS IS MANAGER VIEW STAFF SLOT ENTITY--------------------- //
  async viewStaffWithSlot() {
    // to be tested
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

  // --------------------- THIS IS MANAGER RETRIEVE APPROVED STAFF--------------------- //
  async retrieveStaffSlot() {
    const response = await this.prisma.Bids.findMany({
      where: {
        status: "Approve",
      },
      include: {
        accounts: true,
      },
      orderBy: {
        bidId: DESC,
      },
    });
    return response;
  }

  // --------------------- THIS IS MANAGER RETRIEVE STAFF BIDS ENTITY--------------------- //
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

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //------------------------------------!!!!! STAFF CONTROLLERS STARTS FROM HERE !!!!!!------------------------------------
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  async createBid(staffbid) {
    await this.prisma.Bids.create({
      data: staffbid,
    });
    return { message: "Your bid have been submitted" };
  }

  async retrieveBidsStaff() {
    const response = await this.prisma.Bids.findMany({
      orderBy: [
        {
          bidId: "asc",
        },
      ],
    });
    return response;
  }

  async retrieveResults() {
    const response = await this.prisma.Bids.findMany({
      where: {
        status: {
          not: "pending",
        },
      },
    });

    return response;
  }

  async updateBidStaff(bid) {
    const { bidId, ...updateData } = bid;
    const response = await this.prisma.Bids.update({
      where: {
        bidId: bidId,
      },
      data: updateData,
    });

    return { message: "Bid update successfully." };
  }

  async deleteBidSlot(bidId) {
    const response = await this.prisma.Bids.delete({
      where: {
        bidId: bidId,
      },
    });

    return { message: "Bid delete successfully." };
  }

  async searchStaffBid(bid) {
    const response = await this.prisma.Bids.findMany({
      where: bid,
    });

    return response;
  }
}
