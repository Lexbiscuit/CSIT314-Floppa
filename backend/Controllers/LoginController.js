import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class LoginController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }

  loginAccount = async (email, password) => {
    await this.prisma.Accounts.findFirst({
      where: {
        email: email,
      },
    }).then((account) => {
      bcrypt.compare(password, account.password).then((passwordCheck) => {
        if (!passwordCheck) {
          return this.res
            .status(400)
            .send({ message: "Incorrect email or password." });
        }

        const token = jwt.sign(
          {
            name: account.name,
            email: account.email,
            profileId: account.profileId,
            role: account.role,
          },
          process.env.JWT_SECRET,
          {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: 60 * 60 * 2, // 2 hours
          }
        );

        this.res.status(200).send({
          message: "Login Successful.",
          name: account.name,
          email: account.email,
          profileId: account.profileId,
          role: account.role,
          accessToken: token,
        });
      });
    });
  };
}
