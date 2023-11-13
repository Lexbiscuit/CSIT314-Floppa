import * as bcrypt from "bcrypt";
export default class Accounts {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createAccount(account) {
    const hashedPassword = await bcrypt.hash(account.password, 10);
    account.password = hashedPassword;

    await this.prisma.Accounts.create({
      data: account,
    });

    return { message: "Account created successfully" };
  }

  async retrieveAccounts() {
    const response = await this.prisma.Accounts.findMany({
      include: {
        profiles: true,
        roles: true,
      },
    });
    return response;
  }

  async updateAccount(account) {
    const { accountId, ...updatedData } = account;

    if (updatedData.password) {
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);
      updatedData.password = hashedPassword;
    }

    await this.prisma.Accounts.update({
      where: {
        accountId: Number(accountId),
      },
      data: updatedData,
    });

    return { message: "Account updated successfully" };
  }

  async suspendAccount(accountId) {
    await this.prisma.Accounts.update({
      where: { accountId: Number(accountId) },
      data: { suspended: true },
    });

    return { message: "Account suspended successfully" };
  }

  async unsuspendAccount(accountId) {
    await this.prisma.Accounts.update({
      where: { accountId: Number(accountId) },
      data: { suspended: false },
    });

    return { message: "Account unsuspended successfully" };
  }

  async searchAccounts(accountFilter) {
    const response = await this.prisma.Accounts.findMany({
      where: accountFilter,
      include: {
        profiles: { select: { name: true } },
        roles: { select: { name: true } },
      },
    });

    return response;
  }

  async loginAccount(email) {
    const response = await this.prisma.Accounts.findUnique({
      where: {
        email: email,
      },
    });
    return response;
  }

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

  async retrieveStaffSlot() {
    const response = await this.prisma.Accounts.findMany({
      //1st where, condition for Accounts
      where: {
        bids: {
          some: {
            status: "Approve",
          },
        },
      },
      select: {
        accountId: true,
        name: true,
        email: true,
        suspended: true,
        bids: {
          select: {
            bidId: true,
            workslots: {
              select: {
                startTime: true,
                endTime: true,
                weekNumber: true,
              },
            },
          }, //2nd where, condition for Bids
          where: {
            status: "Approve",
          },
        },
      },
    });

    return response;
  }
}
