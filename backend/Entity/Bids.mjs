export default class Bids {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // --------------------- THIS IS MANAGER RETRIEVE BIDS ENTITY--------------------- //
  async retrieveBidsMngr() {
    const response = await this.prisma.Workslots.findMany({
      orderBy: [{ startTime: "asc" }],
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
    await this.prisma.Bids.update({
      where: {
        bidId: bidId,
      },
      data: {
        status: "approved",
      },
    });

    return { message: "Bid approved successfully." };
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
      select: {
        accountId: true,
        profileId: true,
        name: true,
        email: true,
        role: true,
        suspended: true,
        bids: true,
        _count: true,
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
    await this.prisma.Bids.update({
      where: {
        bidId: bidId,
      },
      data: {
        status: "rejected",
        reason: reason,
      },
    });
    return { message: "Bid rejected successfully." };
  }

  // --------------------- THIS IS MANAGER RETRIEVE APPROVED STAFF--------------------- //
  async retrieveStaffSlot() {
    const response = await this.prisma.Bids.findMany({
      where: {
        status: "approved",
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

  async checkExists(accountId, workslotId) {
    const response = await this.prisma.Bids.findFirst({
      where: {
        AND: {
          accountId,
          workslotId,
        },
      },
    });

    if (!response) return false;
    return true;
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //------------------------------------!!!!! STAFF CONTROLLERS STARTS FROM HERE !!!!!!------------------------------------
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  async createBid(accountId, workslotId) {
    await this.prisma.Bids.create({
      data: { accountId, workslotId, status: "pending" },
    });
    return { message: "Your bid have been submitted" };
  }

  async retrieveBidsStaff(accountId) {
    const response = await this.prisma.Bids.findMany({
      where: {
        accountId,
      },
      select: {
        status: true,
        reason: true,
        workslots: {
          select: {
            startTime: true,
            endTime: true,
          },
        },
      },
      orderBy: [
        {
          bidId: "asc",
        },
      ],
    });
    return response;
  }

  async retrieveResults(decoded) {
    let newMap = new Map(Object.entries(decoded));
    let name = newMap.get("name");

    const acctData = await this.prisma.Accounts.findFirst({
      where: { name: name },
    });

    newMap = new Map(Object.entries(acctData));
    const accountId = newMap.get("accountId");

    const response = await this.prisma.Bids.findMany({
      where: {
        AND: {
          accountId: accountId,
          status: {
            not: "pending",
          },
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
