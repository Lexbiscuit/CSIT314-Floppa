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
    const response = await this.prisma
      .$queryRaw`select a.accountId, a.profileId, p.name as profile, a.name, a.email, a.password, r.roleName as role, a.roleId, a.dob, a.suspended 
      from Accounts as a
      inner join Profiles as p on a.profileId = p.profileId
      inner join Roles as r on r.roleId = a.roleId`;
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

  async searchAccount(accountFilter) {
    const response = await this.prisma.Accounts.findMany({
      where: accountFilter,
    });
    return response;
  }
}
