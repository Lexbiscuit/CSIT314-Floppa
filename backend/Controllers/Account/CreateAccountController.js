import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

export default class CreateAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async createAccount(name, email, password, role, dob) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const createAccount = await this.prisma.accounts.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          role: role,
          dob: dob,
        },
      });

      // 201 CREATED
      this.res.status(201).send({ message: "Account created successfully." });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002")
          this.res.status(500).send({ message: err.message });
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send({ message: "Internal System Error" });
      }
    }
  }
}
