import { Prisma } from "@prisma/client";

export default class CreateBidController {
  constructor(prisma, req, res) {
    this.prisma = prisma;
    this.req = req;
    this.res = res;
  }


  async createBid(
    bidId,
    accountId,
    profileId,
  ){

  }

}