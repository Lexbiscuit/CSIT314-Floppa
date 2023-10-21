import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

export default class UpdateAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateAccount(accountId, name, email, password, role, dob) {
    try {
      if (password != "") {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updateAccount = await this.prisma.Accounts.update({
          where: {
            accountId: Number(accountId),
          },
          data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            dob: dob,
          },
        });
      } else {
        const updateAccount = await this.prisma.accounts.update({
          where: {
            accountId: Number(accountId),
          },
          data: {
            name: name,
            email: email,
            role: role,
            dob: dob,
          },
        });
      }

      // 200 OK
      this.res.status(200).send({ message: "Account updated successfully." });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025")
          this.res.status(500).send({ message: err.message });
        else if (err.code === "P2002")
          this.res.status(500).send({ message: err.message });
      } else {
        // 500 INTERNAL SERVER ERROR
        console.log(err);
        this.res.status(500).send({ message: "Internal Server Error." });
      }
    }
  }
}
