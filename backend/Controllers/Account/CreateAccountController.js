import { Prisma } from "@prisma/client";
import Accounts from "../../Entity/Accounts.mjs";

export default class CreateAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async createAccount(name, profileId, email, password, roleId, dob) {
    try {
      const accounts = new Accounts(this.prisma);

      const response = await accounts.createAccount(
        name,
        profileId,
        email,
        password,
        roleId,
        dob
      );

      // 201 CREATED
      this.res.status(201).json(response);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        this.res.status(500).send({ message: err.message });
      } else {
        // 500 INTERNAL SERVER ERROR
        this.res.status(500).send({ message: err });
      }
    }
  }
}
