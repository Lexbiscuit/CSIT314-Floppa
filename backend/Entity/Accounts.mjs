import * as bcrypt from "bcrypt";

export class InvalidProfileError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidProfileError";
  }
}

export default class Accounts {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createAccount(name, profile, email, password, role, dob) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const tempProfile = await this.prisma.Profiles.findFirst({
      where: {
        name: profile,
      },

      select: {
        profileId: true,
      },
    });

    if (!tempProfile)
      throw new InvalidProfileError(
        `'${profile}' is not a valid profile name.`,
      );

    const response = await this.prisma.Accounts.create({
      data: {
        name: name,
        profileId: tempProfile.profileId,
        email: email,
        password: hashedPassword,
        role: role,
        dob: dob,
      },
    });

    return response;
  }

  async retrieveAccounts() {
    const response = await this.prisma
      .$queryRaw`select "accountId", pro.name as profile, acc.name, acc.email, acc.password, acc.role, acc.dob from "Accounts" as acc
inner join "Profiles" as pro on acc."profileId"=pro."profileId"`;
    return response;
  }
}
