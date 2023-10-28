import { Prisma } from "@prisma/client";
import Accounts from "../../Entity/Accounts.mjs";
import { InvalidProfileError } from "../../Entity/Accounts.mjs";

export default class CreateAccountController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  async createAccount(name, profile, email, password, role, dob) {
    try {
      const accounts = new Accounts(this.prisma);

      const createAccount = await accounts.createAccount(
        name,
        profile,
        email,
        password,
        role,
        dob
      );

      // 201 CREATED
      this.res.status(201).send({ message: "Account created successfully." });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002")
          this.res.status(500).send({ message: err.message });
      } else if (err instanceof InvalidProfileError) {
        this.res.status(500).send({ message: err.message });
      } else {
        // 500 INTERNAL SERVER ERROR
        console.log(err);
        this.res.status(500).send({ message: "Internal System Error" });
      }
    }
  }
}
