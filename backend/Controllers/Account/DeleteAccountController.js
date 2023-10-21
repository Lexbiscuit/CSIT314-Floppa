import { Prisma } from "@prisma/client";

export default class DeleteAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async deleteAccount(accountId) {
    try {
      const deleteAccount = await this.prisma.Accounts.delete({
        where: {
          accountId: Number(accountId),
        },
      });

      // 200 OK
      this.res.status(200).send({ message: "Account deleted successfully." });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          this.res
            .status(500)
            .send({ message: "Record to delete does not exist." });
        }
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send({ message: "Internal Server Error." });
      }
    }
  }
}
