import * as bcrypt from "bcrypt";

export default class Accounts {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createAccount(name, profileId, email, password, roleId, dob) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.Accounts.create({
      data: {
        name: name,
        profileId: Number(profileId),
        email: email,
        password: hashedPassword,
        roleId: Number(roleId),
        dob: dob,
      },
    });

    return { message: "Account created successfully" };
  }

  async retrieveAccounts() {
    const response = await this.prisma
      .$queryRaw`select "accountId", pro.name as profile, acc.name, acc.email, acc.password, acc.roleId, acc.dob 
      from "Accounts" as acc
      inner join "Profiles" as pro on acc."profileId"=pro."profileId"`;
    return response;
  }

  async updateAccount(
    accountId,
    name,
    profileId,
    email,
    password,
    roleId,
    dob
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.Accounts.update({
      where: {
        accountId: Number(accountId),
      },
      data: {
        name: name,
        profileId: Number(profileId),
        email: email,
        password: hashedPassword,
        roleId: Number(roleId),
        dob: dob,
      },
    });
    return { message: "Account updated successfully" };
  }

  async deleteAccount(accountId) {
    await this.prisma.Accounts.delete({
      where: {
        accountId: Number(accountId),
      },
    });
    return { message: "Account deleted successfully" };
  }

  async searchAccount(accountFilter) {
    const response = await this.prisma.Accounts.findMany({
      where: accountFilter,
    });
    return response;
  }
}
