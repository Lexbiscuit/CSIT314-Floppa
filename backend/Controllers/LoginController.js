import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class LoginController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  loginAccount = async (email, password) => {
    await this.prisma.accounts
      .findUnique({
        where: {
          email: email,
        },
      })
      .then((account) => {
        bcrypt
          .compare(password, account.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return this.res
                .status(400)
                .send({ message: "Incorrect password." });
            }

            const token = jwt.sign(
              {
                accountId: account.accountId,
                name: account.name,
                email: account.email,
              },
              "RANDOM-TOKEN",
              { expiresIn: "24h" },
            );

            this.res.status(200).send({
              message: "Login Successful.",
              name: account.name,
              token,
            });
          })
          .catch(() => {
            this.res
              .status(400)
              .send({ message: "An error occurred. Please try again later." });
          });
      })
      .catch((err) => {
        console.error(err);
        this.res.status(500).send({ message: "Email not found." });
      });
  };
}
