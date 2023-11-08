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
    const availableStaff = await this.prisma.accounts.findMany({
      where: {
        bids: {
          none: {}, // Filter for accounts with no bids
        },
      },
    });
    return availableStaff;
    //   return retrieveAvailStaff;
    //   const response = await this.prisma.Accounts.findMany({
    //     where: {
    //       }
    //     }
    //   })
  }
}
