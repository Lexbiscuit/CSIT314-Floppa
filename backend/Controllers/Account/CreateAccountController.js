import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

export default class CreateAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async create(accountId, name, email, password, dob) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      let createAccount;
      if (!accountId) {
        createAccount = await this.prisma.account.create({
          data: {
            name: name,
            email: email,
            password: hashedPassword,
            dob: dob,
          },
        });
      } else {
        createAccount = await this.prisma.account.create({
          data: {
            accountId: Number(accountId),
            name: name,
            email: email,
            password: hashedPassword,
            dob: dob,
          },
        });
      }

      // 201 CREATED
      this.res.status(201).send("Account created successfully.");
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") this.res.status(500).send(err.message);
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send("Error creating account.");
      }
    }
  }
}
