import { Prisma } from "@prisma/client";

export default class CreateAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async create(accountId, name, password, dob) {
    try {
      let createAccount;
      if (!accountId) {
        createAccount = await this.prisma.account.create({
          data: {
            name: name,
            password: password,
            dob: dob,
          },
        });
      } else {
        createAccount = await this.prisma.account.create({
          data: {
            accountId: Number(accountId),
            name: name,
            password: password,
            dob: dob,
          },
        });
      }

      // 201 CREATED
      this.res.status(201).send("Account created successfully.");
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002")
          this.res
            .status(500)
            .send("Unique constraint failed on the fields: (`accountId`)");
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send("Internal Server Error.");
      }
    }
  }
}
