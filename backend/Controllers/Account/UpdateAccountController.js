import { Prisma } from "@prisma/client";

export default class UpdateAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async updateAccount(accountId, name, email, password, dob) {
    try {
      const updateAccount = await this.prisma.accounts.update({
        where: {
          accountId: Number(accountId),
        },
        data: {
          name: name,
          email: email,
          password: password,
          dob: dob,
        },
      });

      // 200 OK
      this.res.status(200).send("Account updated successfully.");
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025")
          this.res.status(500).send("Record to update not found.");
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send("Internal Server Error.");
      }
    }
  }
}
