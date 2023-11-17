import { DateTime } from "luxon";
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
  async updateBidMngr(bidId, newWorkslotId) {
    await this.prisma.Bids.update({
      where: {
        bidId: Number(bidId),
      },
      data: {
        workslotId: Number(newWorkslotId),
      },
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
    return { message: "Your bid has been submitted" };
  }

  async retrieveBidsStaff(accountId) {
    const response = await this.prisma.Bids.findMany({
      where: {
        accountId: accountId,
        status: "pending",
      },
      select: {
        bidId: true,
        status: true,
        reason: true,
        workslots: {
          select: {
            workslotId: true,
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

  async retrieveResults(accountId) {
    const currentWeek = DateTime.now().weekNumber;
    const response = await this.prisma.Bids.findMany({
      where: {
        workslots: {
          weekNumber: { in: [currentWeek, currentWeek + 1] },
        },
        AND: {
          accountId,
          status: {
            not: "pending",
          },
        },
      },
      select: {
        status: true,
        reason: true,
        workslots: { select: { startTime: true, endTime: true } },
      },
    });

    return response;
  }

  async updateBidStaff(bidId, accountId, newWorkslotId) {
    await this.prisma.Bids.create({
      data: {
        accountId: accountId,
        workslotId: newWorkslotId,
        status: "pending",
      },
    });

    await this.prisma.Bids.delete({
      where: {
        bidId: bidId,
      },
    });

    return { message: "Bid updated successfully." };
  }

  async deleteBidSlot(bidId) {
    const response = await this.prisma.Bids.delete({
      where: {
        bidId: bidId,
      },
    });

    return { message: "Bid deleted successfully." };
  }

  async searchStaffBid(bidFilter) {
    const response = await this.prisma.Bids.findMany({
      where: bidFilter,
      select: {
        status: true,
        reason: true,
        workslots: {
          select: {
            workslotId: true,
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    return response;
  }
}
