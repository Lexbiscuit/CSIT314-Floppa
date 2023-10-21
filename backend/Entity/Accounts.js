import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default class Accounts {
  constructor() {}

  async createAccount(name, email, password, role, dob) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.accounts.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
        dob: dob,
      },
    });
  }
}
