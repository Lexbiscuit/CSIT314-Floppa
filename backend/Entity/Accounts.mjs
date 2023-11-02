import * as bcrypt from "bcrypt";
export default class Accounts {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createAccount(
    name,
    profileId,
    email,
    password,
    roleId,
    dob,
    suspended
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.Accounts.create({
      data: {
        name: name,
        profileId: Number(profileId),
        email: email,
        password: hashedPassword,
        roleId: Number(roleId),
        dob: dob,
        suspended: suspended,
      },
    });

    return { message: "Account created successfully" };
  }

  async retrieveAccounts() {
    const response = await this.prisma
      .$queryRaw`select acc."accountId", pro.name as profile, acc.name, acc.email, acc.password, acc."roleId", acc.dob 
      from "Accounts" as acc
      inner join "Profiles" as pro on acc."profileId"=pro."profileId"`;
    return response;
  }

  async updateAccount(account) {
    const updatedData = JSON.parse(JSON.stringify(account));
    if (updatedData.password) {
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);
      updatedData.password = hashedPassword;
    }
    delete updatedData.accountId;

    await this.prisma.Accounts.update({
      where: {
        accountId: Number(account.accountId),
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
    await this.prisma.SuspendedAccounts.deleteMany({
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
