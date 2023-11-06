export default class Bids {
  constructor(prisma) {
    this.prisma = prisma;
  }


  // --------------------- THIS IS MANAGER CREATE BIDS ENTITY--------------------- //
  async createBid(bid) {
    await this.prisma.Bids.create({
      data: bid,
    });
    return { message: "Bids created successfully" };
  }

  // --------------------- THIS IS MANAGER RETRIEVE BIDS ENTITY--------------------- //
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

  // --------------------- THIS IS MANAGER UPDATE BIDS ENTITY--------------------- //
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

  // --------------------- THIS IS MANAGER SEARCH BIDS ENTITY--------------------- //
  async searchBid(bidFilter) {
    const response = await this.prisma.Bids.findMany({
      where: bidFilter,
    });
    return response;
  }

  // --------------------- THIS IS MANAGER APPROVE BIDS ENTITY--------------------- //
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

  // --------------------- THIS IS MANAGER RETRIEVE STAFF ENTITY---------------------//
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

  // --------------------- THIS IS MANAGER REJECT BIDS ENTITY--------------------- //
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

  // --------------------- THIS IS MANAGER VIEW STAFF SLOT ENTITY--------------------- //
  async viewStaffWithSlot() { // to be tested
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
    return { message: "Your beads have been submitted" }
  }

  async retrieveBids() {
    await this.prisma.Bids.findMany({
      orderBy: [
        {
          bidId: "asc",
        },
      ],
    });
    return response;
  }

  async updateBid(bid) {
    const { bidId, ...updateData } = bid;
    const response = await this.prisma.Bids.update({
      where: {
        bidId: bidId
      },
      data: updateData
    });

    return { message: "Bid update successfully." };
  }

  async deleteBidSlot(bidId) {
    const response = await this.prisma.Bids.delete({
      where: {
        bidId: bidId
      }
    });

    return { message: "Bid delete successfully." };

  }

}
